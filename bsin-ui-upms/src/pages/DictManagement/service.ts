import request from '../../utils/bsinRequest';

// 获取字典列表
export const getPageList = (params: any) => {
  return request('/getPageList', {
    serviceName: 'DictService',
    methodName: 'getPageList',
    bizParams: {
      ...params,
    },
  });
};

// 新增字典
export const addPageList = (params: any) => {
  return request('/addPageList', {
    serviceName: 'DictService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

// 编辑字典
export const editPageList = (params: any) => {
  return request('/editPageList', {
    serviceName: 'DictService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};

// 删除字典
export const deletePageList = (params: any) => {
  return request('/editPageList', {
    serviceName: 'DictService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};

// 字典项查询
export const getDictItemPageList = (params: any) => {
  return request('/getDictItemPageList', {
    serviceName: 'DictService',
    methodName: 'getDictItemPageList',
    bizParams: {
      ...params,
    },
  });
};

// 字典项新增
export const addDictItemPageList = (params: any) => {
  return request('/addItem', {
    serviceName: 'DictService',
    methodName: 'addItem',
    bizParams: {
      ...params,
    },
  });
};

// 字典项编辑
export const editDictItemPageList = (params: any) => {
  return request('/editItem', {
    serviceName: 'DictService',
    methodName: 'editItem',
    bizParams: {
      ...params,
    },
  });
};

// 字典项删除
export const deleteDictItemPageList = (params: any) => {
  return request('/deleteItem', {
    serviceName: 'DictService',
    methodName: 'deleteItem',
    bizParams: {
      ...params,
    },
  });
};
