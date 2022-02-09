const routes = [
  { path: '/login', component: '@/pages/Login/index' },
  {
    path: '/',
    component: '@/layouts/index',
    routes: [
      {
        path: '/',
        redirect: '/workplace',
      },
      {
        name: 'workplace',
        path: '/workplace',
        component: '@/pages/WorkPlace/index',
      },
      {
        name: 'user',
        path: '/user',
        component: '@/pages/User/index',
      },
      {
        name: 'apps',
        path: '/apps',
        component: '@/pages/Apps/index',
      },
      //   {
      //     name: 'app1',
      //     path: '/app1',
      //     microApp: 'app1',
      //   },
    ],
  },
];
export default routes;
