import bsinRequest from '@/utils/bsinRequest';

// 登录接口
export const userLogin = (params: any) => {
  console.log(params);

  return bsinRequest('/login', {
    serviceName: 'UserService',
    methodName: 'login',
    bizParams: {
      ...params,
    },
  });
};

// 获取所有租户
export const getTenantList = (params: any) => {
  return bsinRequest('/getAllTenantList', {
    serviceName: 'TenantService',
    methodName: 'getAllTenantList',
    bizParams: {
      ...params,
    },
  });
};

// Dao登录
export const DAOLogin = (params: any) => {
  console.log(params);
  return bsinRequest('/daoLogin', {
    serviceName: 'AdminTenantDaoService',
    methodName: 'daoLogin',
    bizParams: {
      ...params,
    },
  });
};
