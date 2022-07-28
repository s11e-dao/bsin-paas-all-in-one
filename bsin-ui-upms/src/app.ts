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
    // 判断子应用是否正常接入
    window.localStorage.setItem('bsin-microAppMount', '3');
  },
  // 应用 render 之前触发
  async mount(props) {
    console.log(props);
  },
  // 应用卸载之后触发
  async unmount(props) {
    // 卸载后子恢复子应用接入状态
    window.localStorage.setItem('bsin-microAppMount', '2');
  },
};
