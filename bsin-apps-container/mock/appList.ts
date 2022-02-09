// 工作台子应用列表
const appList = [
  // 子应用信息
  {
    id: '22',
    logo: 'avatars[0]', // logo 地址
    appName: '运营平台',
    appCode: 'ngfe-app-test-w',
    url: 'http://localhost:9091', //应用地址
    appLanguage: 'react', // 前端语言
    theme: {
      layouts: 'Sider', // 布局信息
    },
    member: 'bsin-paas平台',
    remark: '运营平台', //备注
    updateTime: new Date(),
  },
  {
    id: '3',
    logo: 'avatars[0]', // logo 地址
    appName: '权限管理',
    appCode: 'bsin-ui-upms',
    url: 'http://localhost:8003', //应用地址
    appLanguage: 'react', // 前端语言
    theme: {
      layouts: 'Sider', // 布局信息
    },
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的', //备注
    updateTime: new Date(),
  },
  {
    id: '4',
    logo: 'avatars[0]',
    appName: '服务编排',
    appCode: 'bsin-ui-orchestration',
    url: 'http://localhost:8010',
    appLanguage: 'react',
    theme: {},
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的',
    updateTime: new Date(),
  },
  {
    id: '5',
    logo: 'avatars[0]',
    appName: 'devops运维管理平台',
    appCode: 'bsin-ui-devops',
    url: 'http://localhost:8001',
    appLanguage: 'react',
    theme: {},
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的',
    updateTime: new Date(),
  },
  {
    id: '6',
    logo: 'avatars[0]',
    appName: '低代码开发平台',
    appCode: 'bsin-server-devui-tools',
    url: 'http://localhost:8001',
    appLanguage: 'react',
    theme: {},
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的',
    updateTime: new Date(),
  },
  {
    id: '7',
    logo: 'avatars[0]',
    appName: '数字资产管理平台',
    appCode: 'bsin-ui-digital-assets-manager',
    url: 'http://localhost:8001',
    appLanguage: 'react',
    theme: {},
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的',
    updateTime: new Date(),
  },
  {
    id: '8',
    logo: 'avatars[0]',
    appName: '流程引擎管理平台',
    appCode: 'bsin-ui-workflow-admin',
    url: 'http://localhost:8001',
    appLanguage: 'react',
    theme: {},
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的',
    updateTime: new Date(),
  },
  {
    id: '9',
    logo: 'avatars[0]',
    appName: ' 火源社区',
    appCode: 'bsin-ui-huoyuanshequ-admin',
    url: 'http://localhost:8001',
    appLanguage: 'react',
    theme: {},
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的',
    updateTime: new Date(),
  },
  {
    id: '2',
    logo: 'avatars[0]',
    appName: 'vue子应用脚手架',
    appCode: 'vue',
    url: ' http://localhost:7101',
    appLanguage: 'vue',
    theme: {},
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的',
    updateTime: new Date(),
  },
  {
    id: '1',
    logo: 'avatars[0]',
    appName: 'react子应用脚手架1',
    appCode: 'app1',
    url: 'http://localhost:8001',
    appLanguage: 'react',
    theme: {},
    member: 'bsin-paas平台',
    remark: '那是一种内在的东西，他们到达不了，也无法触及的',
    updateTime: new Date(),
  },
];

const getAppList = (req: any, res: any) => {
  let { page, pageSize } = req.query;
  let appTotal = appList.length;
  let apps = appList.filter((_, index) => {
    return index >= page * pageSize - 8 && index < page * pageSize;
  });
  if (page) {
    return res.send({
      body: {
        list: apps,
        appTotal,
      },
      sysHead: {
        retCd: '000000',
        retInf: '查询成功',
      },
    });
  }
  return res.send({
    data: appList,
  });
};

export default {
  'POST /api/appList': getAppList,
};
