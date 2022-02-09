import bsinRequest from '@/utils/bsinRequest';

// 获取用户的应用列表
export const getAppByUserId = (params: any) => {
  return bsinRequest('/getAppByUserId', {
    serviceName: 'UserService',
    methodName: 'getAppByUserId',
    bizParams: {
      ...params,
    },
  });
};
