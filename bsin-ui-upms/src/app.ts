// export function patchRoutes({ routes }) {
//   routes.unshift({
//     path: 'vue3/bsin-ui-upms',
//     exact: true,
//     component: require('vue3/bsin-ui-upms').default,
//   });
// }

export const qiankun = {
  // 应用加载之前
  async bootstrap(props) {
    console.log('upms');
    window.localStorage.setItem('bsin-microAppMount', '3');
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log(props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    window.localStorage.setItem('bsin-microAppMount', '2');
  },
};
