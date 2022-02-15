import { defineConfig } from 'umi';
export default defineConfig({
  define: {
    // 后台访问地址
    'process.env.baseUrl': 'http://192.168.1.105:8097/gateway',
  },
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
  ],
});
