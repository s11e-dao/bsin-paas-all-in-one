import request from '../../utils/bsinRequest';

// 机构岗位tree
export const getOrgTree = (params) => {
  return request('/tree', {
    serviceName: 'OrgService',
    methodName: 'getOrgTree',
    bizParams: {
      ...params,
    },
  });
};

// 根据机构id查询岗位
export const getUserInfo = (params) => {
  return request('/list', {
    serviceName: 'UserService',
    methodName: 'getPageListByTenantId',
    bizParams: {
      ...params,
    },
  });
};

// add添加用户
export const addUserInfo = (params) => {
  return request('/add', {
    serviceName: 'UserService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

// edit添加用户
export const editUserInfo = (params) => {
  return request('/edit', {
    serviceName: 'UserService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};

// del删除用户
export const delUserInfo = (params) => {
  return request('/edit', {
    serviceName: 'UserService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};

// 穿梭框左侧
// 根据用户查询可以分配的岗位
export const getAssignPostListAll = (params) => {
  console.log('可分配参数', params);
  return request('/postListAll', {
    serviceName: 'PostService',
    methodName: 'getAssignablePostByUserId',
    bizParams: {
      ...params,
    },
  });
};

// 穿梭框右侧
// 根据用户查询已经分配的岗位
export const getAssignedPostByUserId = (params) => {
  console.log('已分配参数', params);
  return request('/alreadyPostListAll', {
    serviceName: 'PostService',
    methodName: 'getAssignedPostByUserId',
    bizParams: {
      ...params,
    },
  });
};

// 分配岗位
export const assignPost = (params) => {
  console.log('分配操作', params);
  return request('/assign', {
    serviceName: 'UserService',
    methodName: 'assignPost',
    bizParams: {
      ...params,
    },
  });
};
