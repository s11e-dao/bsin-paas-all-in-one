import React from 'react';
import { List, Card, Tabs, Typography, Dropdown } from 'antd';
import { BellOutlined } from '@ant-design/icons';

const { TabPane } = Tabs;

export default function MessageCenter() {
  //模拟消息列表
  const data = [
    'Racing car sprays burning fuel into crowd.',
    'Japanese princess to wed commoner.',
    'Australian walks 100km after outback crash.',
    'Man charged over missing wedding girl.',
    'Los Angeles battles huge wildfires.',
  ];

  /**
   * 切换消息列表触发
   * @param key
   */
  const callback = (key: string) => {
    console.log(key);
  };

  const massageContent = () => {
    return (
      <>
        <Card>
          <Tabs defaultActiveKey="1" onChange={callback} centered>
            <TabPane tab="消息" key="1">
              <List
                dataSource={data}
                renderItem={(item) => (
                  <List.Item>
                    <Typography.Text mark>[ITEM]</Typography.Text> {item}
                  </List.Item>
                )}
              />
            </TabPane>
            <TabPane tab="待办" key="2">
              <List
                size="small"
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </TabPane>
            <TabPane tab="通知" key="3">
              <List
                size="large"
                dataSource={data}
                renderItem={(item) => <List.Item>{item}</List.Item>}
              />
            </TabPane>
          </Tabs>
        </Card>
      </>
    );
  };
  return (
    <Dropdown placement="bottomRight" overlay={massageContent}>
      <div style={{ width: '100%', height: 64 }}>
        <BellOutlined
          style={{ position: 'absolute', top: 23, right: 10, fontSize: 25 }}
        />
      </div>
    </Dropdown>
  );
}
