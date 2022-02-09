import bsinRequest from '@/utils/bsinRequest';

// 请求示例
export const getPublishApps = (params: any) => {
  return bsinRequest('/getPublishApps', {
    serviceName: 'AppService',
    methodName: 'getPublishApps',
    bizParams: {
      ...params,
    },
  });
};
