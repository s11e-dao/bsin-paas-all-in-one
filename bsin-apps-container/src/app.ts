import { useState } from 'react';
import { history } from 'umi';
import { addGlobalUncaughtErrorHandler } from 'qiankun';
import { message } from 'antd';
import { getPublishApps } from './services/getPublishApps';

/**
 * 添加全局的未捕获异常处理器
 * 1、捕获子应用加载状态
 */
addGlobalUncaughtErrorHandler((event: any) => {
  if (
    (event.reason && event.reason.message === 'Failed to fetch') ||
    (event.reason && event.reason.message === 'Network request failed')
  ) {
    // 子应用加载失败会触发三次，只有第一次要提示，其他略过
    if (window.localStorage.getItem('bsin-microAppMount') !== '3') {
      window.localStorage.setItem('bsin-microAppMount', '3');
      // history.push('/workplace');
      // location.reload();
    }
  }
});

//取得Token
const token = sessionStorage.getItem('token');

// 判断Token是否过期
if (!token) {
  //清除
  localStorage.clear();
}
// 判断是否有userInfo
const userInfo = localStorage.getItem('userInformation');
if (!userInfo) {
  history.push('/login');
}

// 动态接入子应用
// 从接口中获取子应用配置，export 出的 qiankun 变量是一个 promise
export const qiankun = () => {
  return getPublishApps({}).then((res) => {
    console.log(res);
    if (res) {
      if (res.code === '000000') {
        let apps = res.data.map((item: any) => {
          return {
            name: item.appCode,
            entry: item.url,
            activeRule: `#/${item.appCode}`,
            props: {
              appId: item.appId,
            },
          };
        });
        const routes = res.data.map((item: any) => {
          if (item.appLanguage === 1) {
            return {
              path: `/${item.appCode}`,
              microApp: item.appCode,
              microAppProps: {
                autoSetLoading: true,
                className: 'loading',
                wrapperClassName: 'loading-wrapper',
              },
            };
          } else {
            return {
              path: `/${item.appCode}`,
              microApp: item.appCode,
            };
          }
        });
        return {
          // 注册子应用信息
          apps,
          routes,
        };
      }
    }
    message.error('挂载子应用失败，请检查服务器');
    return {
      // 注册子应用信息
      apps: [],
      routes: [],
    };
  });
};

export function useQiankunStateForSlave() {
  const [isShowApp2, setIsShowApp2] = useState(false);

  return {
    isShowApp2,
    setIsShowApp2,
  };
}
