import React from 'react';
import LayoutContext from '@/layouts/stores/LayoutContext';
import { history } from 'umi';
import { Row, Col } from 'antd';
import logo2 from '@/assets/logo3.png';
import './index.less';

export default function LogoAndTitle() {
  // 引入公共数据
  const counter = LayoutContext.useContainer();

  const back = () => {
    history.push({
      pathname: '/',
    });
  };

  return (
    <a onClick={back}>
      <div
        className="logo"
        style={
          counter.siderCollapsed && counter.layouts === 'Sider'
            ? { width: 80 }
            : { width: 200 }
        }
      >
        <Row align="middle">
          <Col
            span={
              counter.siderCollapsed && counter.layouts === 'Sider' ? 24 : 6
            }
            style={{ height: 64, textAlign: 'center' }}
          >
            <img width="100%" src={logo2} />
          </Col>
          {counter.layouts !== 'Sider' || !counter.siderCollapsed ? (
            <Col span={18}>
              <div
                style={
                  counter.menuTheme === 'light'
                    ? {
                        fontSize: 18,
                        fontWeight: 600,
                        color: counter.primaryColor,
                      }
                    : {
                        fontSize: 18,
                        fontWeight: 600,
                        color: '#fff',
                      }
                }
              >
                {process.env.title}
              </div>
            </Col>
          ) : null}
        </Row>
      </div>
    </a>
  );
}
