import React from 'react';
import { Link } from 'umi';
// 引入状态数据
import LayoutContext from '../../stores/LayoutContext';
import BaseMenu from '../BaseMenu';
import { Layout, Row, Col } from 'antd';
import './index.less';
import LogoAndTitle from '../LogoAndTitle';
import style from './index.less';
import { Scrollbars } from 'react-custom-scrollbars';

const { Sider } = Layout;

// 侧边栏
const SiderMenu = () => {
  // 引入公共数据
  const counter = LayoutContext.useContainer();
  let height = `calc(100% - 64px)`;

  return (
    <div className="sider">
      {
        // 判断左边菜单是否显示
        counter.layoutSider ? (
          <Sider
            trigger={null}
            theme={counter.menuTheme}
            style={
              counter.fixedSiderStyle
                ? {
                    overflowX: 'hidden',
                    overflowY: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    boxShadow: '2px 0 8px 0 rgb(0 1 2 / 5%)',
                    zIndex: 100,
                    left: 0,
                  }
                : { backgroundColor: '#fff' }
            }
            collapsible
            collapsed={counter.siderCollapsed}
          >
            <LogoAndTitle />
            {/* 菜单列表 */}
            <Scrollbars style={{ height: height }}>
              <BaseMenu appMenu={counter.appMenu} mode={counter.mode} />
            </Scrollbars>
          </Sider>
        ) : null
      }
    </div>
  );
};
export default SiderMenu;
