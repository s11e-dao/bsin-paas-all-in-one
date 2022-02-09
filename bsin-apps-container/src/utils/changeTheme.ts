/**
 * 修改方法
 * @param type 被修改的样式
 * @param color 目标颜色
 */
function _changeTheme({ primaryColor, textColor }: { primaryColor: string, textColor: string }) {
  // 如果 window.less 未开启 直接返回空
  if (!(window as any).less) return;
  // 使用modifyVars方法,是基于 less 在浏览器中的编译来实现。
  // 所以在引入less文件的时候需要通过link方式引入，
  // 然后基于less.js中的方法来进行修改变量
  (window as any).less.modifyVars({
    '@primary-color': primaryColor,
    '@text-color': textColor,
  })
}

// 设置状态参数
let lessNodesAppended: boolean = false;
/**
 * 引入样式文件
 * @param type 被修改的样式
 * @param color 目标颜色
 */
export function onChangeTheme({ primaryColor, textColor }: { primaryColor: string, textColor: string }) {

  // 如果状态参数为 false 没有主题样式文件，引入状态文件
  if (!lessNodesAppended) {
    // 创建覆盖样式的less文件
    const lessStyleNode = document.createElement('link');
    lessStyleNode.setAttribute('rel', 'stylesheet/less');
    lessStyleNode.setAttribute('href', '/styles/components.less'); // public 目标下

    // 创建开启less配置
    const lessConfigNode = document.createElement('script');
    lessConfigNode.innerHTML = `
      window.less = {
        env: 'production',
        async: true,
        javascriptEnabled: true
      };
    `;
    // 引入 less.min.js
    const lessScriptNode = document.createElement('script');
    lessScriptNode.src = '/less.4x.min.js';
    lessScriptNode.async = true;
    lessScriptNode.onload = () => {
      // 调用修改主题色方法
      _changeTheme({ primaryColor, textColor });
      lessScriptNode.onload = null;
    };
    // 插入 less.js，和 颜色主题.less
    document.body.appendChild(lessStyleNode);
    document.body.appendChild(lessConfigNode);
    document.body.appendChild(lessScriptNode);
    // 将状态参数变为 true
    lessNodesAppended = true;
  } else {
    // 状态参数为 true 已有主题样式文件，直接调用方法更改主题颜色
    _changeTheme({ primaryColor, textColor });
  }
}