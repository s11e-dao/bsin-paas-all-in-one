import React, { useState } from 'react';
import { Row, Col } from 'antd';
import LayoutContext from '../../../stores/LayoutContext';
import AvatarDropdown from './AvatarDropdown';
import MessageCenter from './MessageCenter';

const HeaderUser = () => {
  // 引入公共数据
  const counter = LayoutContext.useContainer();

  return (
    <Row
      gutter={[16, 16]}
      justify="end"
      style={
        counter.menuTheme === 'light'
          ? { textAlign: 'center' }
          : { color: '#fff', textAlign: 'center' }
      }
    >
      <Col>
        <MessageCenter />
      </Col>
      <Col>
        <AvatarDropdown userInfo={counter.userInfo} />
      </Col>
    </Row>
  );
};

export default HeaderUser;
