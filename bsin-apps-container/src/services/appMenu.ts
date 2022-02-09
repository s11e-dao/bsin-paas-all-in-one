import bsinRequest from '@/utils/bsinRequest';

// 请求appsList
export const getUserMenuTreeByAppCode = (params: object) => {
  return bsinRequest('/getUserMenuTreeByAppCode', {
    serviceName: 'MenuService',
    methodName: 'getUserMenuTreeByAppCode',
    bizParams: {
      ...params,
    },
  });
};

// 请求示例
// export const add = (params: object) => {
//   return bsinRequest('/atomicServiceService', {
//     serviceName: 'AtomicServiceService',
//     methodName: 'add',
//     bizParams: {
//       ...params,
//     },
//   });
// };
