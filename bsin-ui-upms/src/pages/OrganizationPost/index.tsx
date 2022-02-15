import React, { useState } from 'react';
import OrganizationTree from './OrganizationTree';
import PositionTable from './PositionTable';
import { Row, Col } from 'antd';

export default function PositionManagement() {
  const [isTreeKey, setIsTreeKey] = useState();

  /**
   * 子传父
   * 拿到OrganizationTree组件里面每次点击tree产生的key值
   */
  const getTreeKey = (orgId) => {
    // 为了能在外面取到
    setIsTreeKey(orgId);
  };

  return (
    <Row gutter={16}>
      <Col span={5}>
        <OrganizationTree getTreeKey={getTreeKey} />
      </Col>
      <Col span={19}>
        {/* 重新赋值为orgId*/}
        <PositionTable orgId={isTreeKey} />
      </Col>
    </Row>
  );
}
