import React from 'react';
import styles from './index.css';
import BigDataVisualization from './BigDataVisualization/index.jsx';

export default function index() {
  const [display, setDisplay] = React.useState<undefined | 'none'>('none');

  React.useEffect(() => {
    onClick();
  }, []);

  const onClick = () => {
    let target = document.querySelector('#target');
    let fullscreen = document.querySelector('#fullscreen');

    // 监听事件 注意不同浏览器的兼容性问问题
    // 错误事件为：fullscreenerror ， 同样注意前缀
    document.addEventListener('fullscreenchange', function () {
      if (hasFullScreenElement()) {
        setDisplay(undefined);
      } else {
        setDisplay('none');
      }
    });
    document.addEventListener('webkitfullscreenchange', function () {
      if (hasFullScreenElement()) {
        setDisplay(undefined);
      } else {
        setDisplay('none');
      }
    });
    document.addEventListener('mozfullscreenchange', function () {
      if (hasFullScreenElement()) {
        setDisplay(undefined);
      } else {
        setDisplay('none');
      }
    });
    document.addEventListener('MSFullscreenChange', function () {
      if (hasFullScreenElement()) {
        setDisplay(undefined);
      } else {
        setDisplay('none');
      }
    });

    // 点击切换全屏
    if (isFUllScreenEnabled()) {
      target.addEventListener('click', function () {
        if (hasFullScreenElement()) {
          exitFullScreen();
        } else {
          setFullScreen(fullscreen);
        }
      });
    } else {
      console.log('此浏览器不支持全屏');
    }
  };

  // 判断浏览器是否支持全屏
  function isFUllScreenEnabled() {
    return (
      document.fullscreenEnabled ||
      document.webkitFullscreenEnabled ||
      document.mozFullScreenEnabled ||
      document.msFullscreenEnabled
    );
  }

  // 判断是否有已全屏的元素
  function hasFullScreenElement() {
    return (
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  // 将目标元素设置为全屏展示
  function setFullScreen(fullscreen) {
    if (fullscreen.requestFullscreen) {
      fullscreen.requestFullscreen();
    }
    if (fullscreen.webkitRequestFullscreen) {
      fullscreen.webkitRequestFullscreen();
    }
    if (fullscreen.mozRequestFullScreen) {
      fullscreen.mozRequestFullScreen();
    }
    if (fullscreen.msRequestFullscreen) {
      fullscreen.msRequestFullscreen();
    }
  }

  // 文档退出全屏
  function exitFullScreen() {
    if (document.exitFullscreen) {
      document.exitFullscreen();
    }
    if (document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    }
    if (document.msExitFullscreen) {
      document.msExitFullscreen();
    }
  }
  return (
    <div id="target">
      <div className={styles.open}>全屏数据展示</div>
      <div id="fullscreen" className={styles.fullscreen} style={{ display }}>
        <BigDataVisualization />
      </div>
    </div>
  );
}
