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

// post列表数据请求,查询全部
export const getPostList = (params) => {
  return request('/postList', {
    serviceName: 'PostService',
    methodName: 'getPostList',
    bizParams: {
      ...params,
    },
  });
};

// 根据机构id查询岗位,已分配，无分页
export const getAssignedPageListByOrgId = (params) => {
  return request('/list', {
    serviceName: 'PostService',
    methodName: 'getPostListByOrgId',
    bizParams: {
      ...params,
    },
  });
};

// 根据机构id查询岗位有分页
export const getPageListByOrgId = (params) => {
  return request('/list', {
    serviceName: 'PostService',
    methodName: 'getPageListByOrgId',
    bizParams: {
      ...params,
    },
  });
};

// 分配岗位
export const assignPost = (params) => {
  return request('/postList', {
    serviceName: 'OrgService',
    methodName: 'assignPost',
    bizParams: {
      ...params,
    },
  });
};

// 移除岗位
export const unbindPost = (params) => {
  return request('/unbind', {
    serviceName: 'OrgService',
    methodName: 'unbindPost',
    bizParams: {
      ...params,
    },
  });
};
