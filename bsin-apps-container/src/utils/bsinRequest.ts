import { extend } from 'umi-request';
import { notification } from 'antd';
import { history } from 'umi';
import { getSessionStorageInfo, getLocalStorageInfo } from './localStorageInfo';

const codeMessage = {
  200: '服务器成功返回请求的数据。',
  201: '新建或修改数据成功。',
  202: '一个请求已经进入后台排队（异步任务）。',
  204: '删除数据成功。',
  400: '发出的请求有错误，服务器没有进行新建或修改数据的操作。',
  401: '用户没有权限（令牌、用户名、密码错误）。',
  403: '用户得到授权，但是访问是被禁止的。',
  404: '发出的请求针对的是不存在的记录，服务器没有进行操作。',
  406: '请求的格式不可得。',
  410: '请求的资源被永久删除，且不会再得到的。',
  422: '当创建一个对象时，发生一个验证错误。',
  500: '服务器发生错误，请检查服务器。',
  502: '网关错误。',
  503: '服务不可用，服务器暂时过载或维护。',
  504: '网关超时。',
};

/**
 * 异常处理程序
 */
export const errorHandler = (error) => {
  // 网络异常
  if (error.message === 'Failed to fetch') {
    notification.error({
      message: '网络异常',
      description: error.message,
    });
    return false;
  }
  notification.error({
    message: '其他错误',
    description: error.message,
  });
  return false;
};

// 实例化
const bsinRequest = extend({
  // timeout: 5000,
  // timeoutMessage: '请求超时',
  errorHandler,
});

// 接口环境地址
let gatewayUrl = process.env.baseUrl;

// useMessage().success('用户认证已过期请重新登录')

// 请求拦截
bsinRequest.interceptors.request.use((url, options) => {
  // 请求方法统一为 POST
  options.method = 'POST';

  // 获取userInfo和token
  let userInfo = getLocalStorageInfo('userInformation');
  let token = getSessionStorageInfo('token')?.token;

  // 判断token和用户信息是否存在
  if (
    (!token || !userInfo) &&
    options.methodName !== 'getIssueApps' &&
    options.methodName !== 'login'
  ) {
    history.push('/login');
  }

  // 判断一些
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    Authorization: token,
  };

  let pagination;
  if (options?.bizParams?.pageSize) {
    pagination = {
      pageSize: options?.bizParams?.pageSize,
      pageNum: options?.bizParams?.current,
    };
    delete options?.bizParams.pageSize;
    delete options?.bizParams.current;
  }
  // 组装报文
  let data = {
    serviceName: options?.serviceName,
    methodName: options?.methodName,
    bizParams: options?.bizParams,
  };
  if (pagination) {
    data = {
      ...data,
      pagination,
    };
  }
  options.headers = {
    ...headers,
  };

  return {
    url: gatewayUrl,
    options: { data, ...options },
  };
});

// response拦截器, 处理response
bsinRequest.interceptors.response.use(
  (response, options) => {
    if (response.status === 200) {
      return response
        .clone()
        .json()
        .then((body) => {
          if (body?.code !== '000000') {
            notification.error({
              message: '',
              description: body?.message,
            });
            body = false;
          }
          return body;
        });
    } else {
      notification.error({
        message: '',
        description: codeMessage?.[response.status],
      });
      return false;
    }
  },
  {
    global: false,
  },
);

export default bsinRequest;
