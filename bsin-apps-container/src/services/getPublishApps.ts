import bsinRequest from '@/utils/bsinRequest';

// 请求示例
export const getPublishApps = (params: any) => {
  return bsinRequest('/getPublishedApps', {
    serviceName: 'AppService',
    methodName: 'getPublishedApps',
    bizParams: {
      ...params,
    },
  });
};
