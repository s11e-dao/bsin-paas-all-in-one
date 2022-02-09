import { defineConfig } from 'umi';
import routes from './router';

export default defineConfig({
  define: {
    // 后台访问地址
    //'process.env.baseUrl': 'http://192.168.1.101:8083/gateway',
    'process.env.baseUrl': 'http://114.116.93.253:31551/gateway',
  },
  // 设置 node_modules 目录下依赖文件的编译方式。
  // 默认是 all，全部编译，然后可以通过 exclude 忽略不需要编译的依赖库；
  // 可切换为 none，默认值编译 es5-imcompatible-versions 里声明的依赖，可通过 exclude 配置添加额外需要编译的；
  nodeModulesTransform: {
    type: 'none',
  },
  // 按需引入，编译时每个页面编译程不同的js文件
  dynamicImport: {
    // 页面加载动画
    loading: '@/pages/Loading.tsx',
  },
  // 快速刷新（Fast Refresh），开发时可以保持组件状态，同时编辑提供即时反馈。
  fastRefresh: {},
  // 开启乾坤
  qiankun: {
    master: {},
  },
  routes,
  hash: true,
  history: {
    type: 'hash',
  },
  // 控制mock的开启关闭
  mock: false,
  // 打包后资源路径
  publicPath: './',
});
