import React, { useState } from 'react';
import { Row, Col } from 'antd';
import LayoutContext from '../../../stores/LayoutContext';
import AvatarDropdown from './AvatarDropdown';
import MessageCenter from './MessageCenter';
import Fullscreen from './Fullscreen';

const HeaderUser = () => {
  // 引入公共数据
  const counter = LayoutContext.useContainer();

  return (
    <Row
      justify="end"
      style={
        counter.menuTheme === 'light'
          ? { textAlign: 'center' }
          : { color: '#fff', textAlign: 'center' }
      }
    >
      <Col>
        <Fullscreen />
      </Col>
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
