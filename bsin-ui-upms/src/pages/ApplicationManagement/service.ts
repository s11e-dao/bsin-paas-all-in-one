import request from '../../utils/bsinRequest';

// 列表数据请求
export const getAppList = (params) => {
  return request('/list', {
    serviceName: 'AppService',
    methodName: 'getPageList',
    bizParams: {
      ...params,
    },
  });
};

// add
export const addAppList = (params) => {
  return request('/add', {
    serviceName: 'AppService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

// edit
export const editAppList = (params) => {
  return request('/edit', {
    serviceName: 'AppService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};

// 删除列表数据
export const delAppInfo = (params) => {
  return request('/delete', {
    serviceName: 'AppService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};
