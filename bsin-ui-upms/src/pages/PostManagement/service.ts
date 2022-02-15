import request from '../../utils/bsinRequest';

// 列表数据请求
export const getPostList = (params) => {
  return request('/list', {
    serviceName: 'PostService',
    methodName: 'getPostList',
    bizParams: {
      ...params,
    },
  });
};

// add
export const addPostInfo = (params) => {
  return request('/add', {
    serviceName: 'PostService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

// edit
export const editPostInfo = (params) => {
  return request('/edit', {
    serviceName: 'PostService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};

// del
export const delPostInfo = (params) => {
  return request('/del', {
    serviceName: 'PostService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};

// 获取所有当前应用下的角色列表
export const getRoleList = (params) => {
  return request('/roleList', {
    serviceName: 'RoleService',
    methodName: 'getListByAppId',
    bizParams: {
      ...params,
    },
  });
};

// 获取当前岗位已分配的角色列表
export const getAssignedRoleList = (params) => {
  return request('/roleList', {
    serviceName: 'PostService',
    methodName: 'getRoleByPostId',
    bizParams: {
      ...params,
    },
  });
};

// assignRole
export const assignRole = (params) => {
  return request('/assign', {
    serviceName: 'PostService',
    methodName: 'assignRoles',
    bizParams: {
      ...params,
    },
  });
};

// 搜索查看应用
export const getAppList = (params) => {
  return request('/assign', {
    serviceName: 'AppService',
    methodName: 'getAuthorizableList',
    bizParams: {
      ...params,
    },
  });
};
