import React from 'react'
import { Row, Col, Card } from 'antd';
import { MicroAppWithMemoHistory } from 'umi';

export default function User() {
  const [showApp2, setShowApp2] = React.useState(true)
  const [showApp1, setShowApp1] = React.useState(true)
  return (
    <div>
      <Row>
        <Col span={12}>
          <Card style={{ minHeight: '88vh' }}>
            {
              showApp2 ?
                <MicroAppWithMemoHistory name='app2' url='/home' /> :
                null
            }
          </Card>
        </Col>
        <Col span={12}>
          <Card style={{ minHeight: '88vh' }}>
            {
              showApp1 ?
                <MicroAppWithMemoHistory name='app1' url='/home' /> :
                null
            }
          </Card>
        </Col>
      </Row>
    </div>
  )
}
