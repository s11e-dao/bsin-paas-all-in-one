import { defineConfig } from 'umi';
export default defineConfig({
  base: '/vue3/bsin-ui-upms',
  define: {
    // 后台访问地址
    'process.env.baseUrl': 'http://127.0.0.1:8097/gateway',
    // 'process.env.baseUrl': 'http://114.116.93.253:8097/gateway',
  },
  // 按需引入，编译时每个页面编译程不同的js文件
  // dynamicImport: {
  //   // 页面加载动画
  //   // loading: '@/pages/Loading.tsx',
  // },
  // // 打包后资源路径
  // publicPath: './',
  nodeModulesTransform: {
    type: 'none',
  },
  hash: true,
  history: {
    type: 'hash',
  },
  fastRefresh: {},
  qiankun: {
    slave: {},
  },
  routes: [
    {
      path: '/',
      redirect: '/application-management',
    },
    {
      name: '应用管理',
      path: '/application-management',
      component: '@/pages/ApplicationManagement/index',
    },
    {
      name: '租户管理',
      path: '/tenant-management',
      component: '@/pages/TenantManagement/index',
    },
    {
      name: '机构管理',
      path: '/organizational-management',
      component: '@/pages/OrganizationalManagement/index',
    },
    {
      name: '机构岗位',
      path: '/organization-post',
      component: '@/pages/OrganizationPost/index',
    },
    {
      name: '用户管理',
      path: '/user-management',
      component: '@/pages/UserManagement/index',
    },
    {
      name: '岗位管理',
      path: '/post-management',
      component: '@/pages/PostManagement/index',
    },
    {
      name: '角色管理',
      path: '/role-management',
      component: '@/pages/RoleManagement/index',
    },
    {
      name: '菜单管理',
      path: '/menu-management',
      component: '@/pages/MenuManagement/index',
    },
    {
      name: '字典管理',
      path: '/dict-management',
      component: '@/pages/DictManagement/index',
    },
    {
      name: '区域管理',
      path: '/district-management',
      component: '@/pages/DistrictManagement/index',
    },
  ],
});
