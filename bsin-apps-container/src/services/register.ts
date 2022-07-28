import bsinRequest from '@/utils/bsinRequest';

// 注册接口
export const userRegister = (params: any) => {
  console.log(params);

  return bsinRequest('/register', {
    serviceName: 'AdminTenantDaoService',
    methodName: 'register',
    bizParams: {
      ...params,
    },
  });
};
