import request from '../../utils/bsinRequest';

// 列表数据请求
export const getTenantList = (params) => {
  return request('/list', {
    serviceName: 'TenantService',
    methodName: 'getPageList',
    bizParams: {
      ...params,
    },
  });
};

// add
export const addTenantInfo = (params) => {
  return request('/add', {
    serviceName: 'TenantService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

// del
export const delTenantInfo = (params) => {
  return request('/del', {
    serviceName: 'TenantService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};

// edit
export const editTenantInfo = (params) => {
  return request('/edit', {
    serviceName: 'TenantService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};

/**
 * 穿梭框
 * 左侧查询全部应用
 */
export const getAppList = (params) => {
  return request('/appList', {
    serviceName: 'AppService',
    methodName: 'getAuthorizableList',
    bizParams: {
      ...params,
    },
  });
};

// 右侧根据租户ID查询应用
export const getAppListByTenantId = (params) => {
  return request('/appListByTenantId', {
    serviceName: 'AppService',
    methodName: 'getAuthorizedListByTenantId',
    bizParams: {
      ...params,
    },
  });
};

// 授权
export const empowerApp = (params) => {
  return request('/empower', {
    serviceName: 'TenantService',
    methodName: 'authorizeApps',
    bizParams: {
      ...params,
    },
  });
};
