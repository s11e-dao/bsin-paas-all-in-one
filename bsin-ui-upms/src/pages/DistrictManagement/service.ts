import request from '../../utils/bsinRequest';

// 获取地区树
export const getSubNodeTree = (params: any) => {
  return request('/getSubNodeTree', {
    serviceName: 'RegionService',
    methodName: 'getSubNodeTree',
    bizParams: {
      ...params,
    },
  });
};

// 获取地区树
export const getTopLayerRegions = (params: any) => {
  return request('/getSubNodeTree', {
    serviceName: 'RegionService',
    methodName: 'getTopLayerRegions',
    bizParams: {
      ...params,
    },
  });
};

// 新增地区树
export const addSubNodeTree = (params: any) => {
  return request('/add', {
    serviceName: 'RegionService',
    methodName: 'add',
    bizParams: {
      ...params,
    },
  });
};

// 编辑地区树
export const editSubNodeTree = (params: any) => {
  return request('/edit', {
    serviceName: 'RegionService',
    methodName: 'edit',
    bizParams: {
      ...params,
    },
  });
};

// 删除地区树
export const deleteSubNodeTree = (params: any) => {
  return request('/delete', {
    serviceName: 'RegionService',
    methodName: 'delete',
    bizParams: {
      ...params,
    },
  });
};
