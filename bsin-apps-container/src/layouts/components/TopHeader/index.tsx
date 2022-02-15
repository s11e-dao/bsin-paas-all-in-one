import React from 'react';
import { Layout, Menu, Row, Col } from 'antd';
import LayoutContext from '../../stores/LayoutContext';
import HeaderUser from '@/layouts/components/TopHeader/HeaderUser';
import './index.less';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import BaseMenu from '../BaseMenu';
import LogoAndTitle from '../LogoAndTitle';

const { Header } = Layout;

export default function TopHeader() {
  // 引入公共数据
  const counter = LayoutContext.useContainer();

  let width;

  counter.layoutSider
    ? (width = `calc(100% - ${counter.siderCollapsed ? 80 : 200}px)`)
    : (width = '100%');

  return (
    <Header
      className="header"
      style={
        counter.menuTheme === 'light'
          ? counter.fixedHeaderStyle
            ? {
                backgroundColor: '#fff',
                padding: 0,
                position: 'fixed',
                zIndex: 99,
                width,
              }
            : {
                backgroundColor: '#fff',
                padding: 0,
              }
          : counter.fixedHeaderStyle
          ? {
              padding: 0,
              position: 'fixed',
              zIndex: 99,
              width,
            }
          : {
              padding: 0,
            }
      }
    >
      {
        // 控制 header 中的 logo 的显示
        !counter.layoutSider ? (
          <div style={{ float: 'left' }}>
            <LogoAndTitle />
          </div>
        ) : (
          React.createElement(
            counter.siderCollapsed ? MenuUnfoldOutlined : MenuFoldOutlined,
            {
              style: {
                color:
                  counter.menuTheme === 'dark' ? '#fff' : counter.primaryColor,
              },
              className: 'trigger',
              onClick: counter.changeSiderCollapsed,
            },
          )
        )
      }
      <Row justify="space-between" style={{ paddingRight: 2 }}>
        <Col xs={3} sm={6} md={10} lg={14} xl={16}>
          {
            // 判断是否需要显示头部菜单
            counter.layouts === 'Top' &&
            location.hash !== '#/workplace' &&
            location.hash !== '#/user' ? (
              <BaseMenu mode="horizontal" appMenu={counter.appMenu} />
            ) : (
              // 不需要显示头部菜单
              <Menu
                theme={counter.menuTheme}
                mode="horizontal"
                defaultSelectedKeys={['1']}
              >
                {
                  // 判断是否在工作台
                  location.hash !== '#/workplace' &&
                  location.hash !== '#/user' &&
                  location.hash !== '#/apps' &&
                  counter.appMenu ? (
                    <Menu.Item key="1">{counter.appMenu[0].menuName}</Menu.Item>
                  ) : location.hash === '#/user' ? (
                    <Menu.Item key="1">user</Menu.Item>
                  ) : location.hash === '#/apps' ? (
                    <Menu.Item key="1">apps</Menu.Item>
                  ) : null
                }
              </Menu>
            )
          }
        </Col>
        <Col style={{ width: 300 }}>
          <HeaderUser />
        </Col>
      </Row>
    </Header>
  );
}
