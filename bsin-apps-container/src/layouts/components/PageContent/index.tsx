import React from 'react';
import { Layout, Tabs, Button } from 'antd';
import LayoutContext from '../../stores/LayoutContext';
import BaseMenu from '../BaseMenu';
import { Spin, Alert } from 'antd';

const { Content, Sider } = Layout;

export default function PageContent(props: any) {
  // 引入公共数据
  const counter = LayoutContext.useContainer();

  // 菜单伸缩参数
  const [collapsed, setCollapse] = React.useState(false);

  // 上下结构 有左侧菜单栏时 内容区的样式
  const [contentStyle, setContentStyle] = React.useState({
    marginLeft: 200,
    transition: 'all 0.2s',
  });
  /**
   * 控制菜单伸缩
   * @param collapsed
   */
  const onCollapse = (collapsed: boolean) => {
    setCollapse(collapsed);
    // 控制菜单伸缩 时内容区的样式
    collapsed
      ? setContentStyle({ transition: 'all 0.2s', marginLeft: 80 })
      : setContentStyle({ marginLeft: 200, transition: 'all 0.2s' });
  };

  return (
    <Content style={counter.fixedHeaderStyle ? { marginTop: 64 } : undefined}>
      {
        // 判断是否需要显示 contentSider
        counter.contentSider ? (
          <Layout className="site-layout-background">
            <Sider
              style={
                // 左侧菜单固定与否
                counter.fixedSiderStyle
                  ? {
                      overflow: 'auto',
                      height: '100vh',
                      position: 'fixed',
                      left: 0,
                    }
                  : undefined
              }
              theme={counter.menuTheme}
              className="site-layout-background"
              collapsible
              collapsed={collapsed}
              onCollapse={onCollapse}
            >
              {/* 菜单列表 */}
              <BaseMenu appMenu={counter.appMenu} mode={counter.mode} />
            </Sider>
            <Content
              style={
                // 左侧菜单固定与否
                counter.fixedSiderStyle ? contentStyle : undefined
              }
            >
              <div
                className="site-layout-background"
                style={{
                  margin: '15px 15px',
                }}
              >
                {props.children}
              </div>
            </Content>
          </Layout>
        ) : (
          <div
            className="site-layout-background"
            style={
              location.hash === '#/workplace'
                ? {}
                : {
                    margin: '15px 15px',
                  }
            }
          >
            {props.children}
          </div>
        )
      }
    </Content>
  );
}
