import request from '../../utils/bsinRequest';

// 列表数据请求
export const getOrganizationList = (params) => {
  return request('/list', {
    serviceName: 'OrgService',
    methodName: 'getOrgTree',
    bizParams: {
      ...params,
    },
  });
};

// add
export const addOrganizationInfo = (params) => {
  return request('/add', {
    serviceName: 'OrgService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

// edit
export const editOrganizationInfo = (params) => {
  return request('/edit', {
    serviceName: 'OrgService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};

// del
export const delOrganizationInfo = (params) => {
  return request('/del', {
    serviceName: 'OrgService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};

// 穿索框左侧
// app应用请求
export const getAppList = (params) => {
  return request('/appList', {
    serviceName: 'AppService',
    methodName: 'getAuthorizableList',
    bizParams: {
      ...params,
    },
  });
};

// 穿索框右侧
// 根据机构ID已分配
export const getAppListByOrgId = (params) => {
  return request('/appListByOrgId', {
    serviceName: 'OrgService',
    methodName: 'getAppListByOrgId',
    bizParams: {
      ...params,
    },
  });
};

// 授权
export const empowerAppList = (params) => {
  return request('/empower', {
    serviceName: 'OrgService',
    methodName: 'authorizationApps',
    bizParams: {
      ...params,
    },
  });
};
