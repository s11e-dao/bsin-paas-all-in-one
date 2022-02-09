export default {
  // 动态接入子应用数据
  'GET /api/apps': [
    {
      name: 'ngfe-app-test-w',
      entry: 'http://localhost:9091',
      to: '/ngfe-app-test-w',
    },
    // {
    //   name: 'bsin-ui-upms',
    //   entry: 'http://localhost:8003',
    //   to: '/bsin-ui-upms',
    //   props: {
    //     testProp1: 'test1',
    //     description: '权限管理',
    //   },
    // },
    // {
    //   name: 'app1',
    //   entry: ' http://localhost:8001',
    //   to: '/app1',
    //   props: {
    //     testProp1: 'test1',
    //     description: '模拟子应用',
    //   },
    // },
    // {
    //   name: 'bsin-ui-orchestration',
    //   entry: ' http://localhost:8010',
    //   to: '/bsin-ui-orchestration',
    //   props: {
    //     testProp1: 'test1',
    //     description: '服务编排',
    //   },
    // },
    // {
    //   name: 'bsin-ui-digital-assets-manager',
    //   entry: ' http://localhost:9091',
    //   to: '/bsin-ui-digital-assets-manager',
    //   props: {
    //     testProp1: 'test1',
    //     description: '数字资产管理',
    //   },
    // },
  ],
};
