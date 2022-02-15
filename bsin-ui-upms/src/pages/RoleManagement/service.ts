import request from '../../utils/bsinRequest';

// 列表数据请求
export const getRoleList = (params) => {
  return request('/list', {
    serviceName: 'RoleService',
    methodName: 'getPageList',
    bizParams: {
      ...params,
    },
  });
};

// 删除角色操作
export const delRoleInfo = (params) => {
  return request('/delete', {
    serviceName: 'RoleService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};

//添加角色操作
export const addRoleInfo = (params) => {
  return request('/add', {
    serviceName: 'RoleService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

//编辑角色操作
export const editRoleInfo = (params) => {
  return request('/edit', {
    serviceName: 'RoleService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};

// 菜单数据请求
export const getMenuList = (params) => {
  return request('/list', {
    serviceName: 'MenuService',
    methodName: 'findMenuTree',
    bizParams: {
      ...params,
    },
  });
};

// 已有菜单数据请求
export const getMenusByAppIdAndRoleId = (params) => {
  return request('/byAppIdAndRoleId', {
    serviceName: 'MenuService',
    methodName: 'getMenusByAppIdAndRoleId',
    bizParams: {
      ...params,
    },
  });
};

// 授权
export const empowerMenu = (params) => {
  return request('/empower', {
    serviceName: 'RoleService',
    methodName: 'authorizeMenus',
    bizParams: {
      ...params,
    },
  });
};
