import request from '../../utils/bsinRequest';

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

// add increment
export const addMenu = (params) => {
  console.log('add', params);
  return request('/add', {
    serviceName: 'MenuService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

// del
export const delMenu = (params) => {
  return request('/delete', {
    serviceName: 'MenuService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};

// edit
export const editMenu = (params) => {
  return request('/edit', {
    serviceName: 'MenuService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};
