import React, { FC, useState } from 'react';
import { Link, history } from 'umi';
import { Avatar, Menu, Spin, Dropdown } from 'antd';
import {
  UserOutlined,
  SettingOutlined,
  LogoutOutlined,
} from '@ant-design/icons';
import SetTheme from '@/layouts/components/SetTheme';
import LayoutContext from '../../../../stores/LayoutContext';

type AvatarDropdownType = {
  userInfo: any;
};

const AvatarDropdown: FC<AvatarDropdownType> = ({ userInfo }) => {
  // 引入公共数据
  const counter = LayoutContext.useContainer();
  // 控制抽屉开关参数
  const [visible, setVisible] = useState(false);

  const onClick = (e: any) => {
    switch (e.key) {
      case 'center':
        history.push('/user');
        break;
      case 'settings':
        setVisible(true);
        break;
      case 'logout':
        localStorage.clear();
        sessionStorage.clear();
        history.push('/login');
        break;
    }
  };

  const onClose = () => {
    setVisible(false);
  };

  const userContent = () => {
    return (
      <Menu style={{ width: 150 }} onClick={onClick}>
        <Menu.Item key="center">
          <UserOutlined /> 个人中心
        </Menu.Item>
        <Menu.Item key="settings">
          <SettingOutlined /> 主题设置
        </Menu.Item>
        <Menu.Divider />
        <Menu.Item key="logout">
          <LogoutOutlined /> 退出登录
        </Menu.Item>
      </Menu>
    );
  };
  return (
    <div style={{ textAlign: 'right', marginRight: 30 }}>
      <Dropdown placement="bottomRight" overlay={userContent()}>
        <a style={{ display: 'inline-block', width: '100%', height: '100%' }}>
          <span
            style={
              counter.menuTheme === 'light'
                ? { color: '#111', marginRight: 10 }
                : { color: '#fff', marginRight: 10 }
            }
          >
            Hi，{userInfo.nickname}
          </span>
          <Avatar src="https://joeschmoe.io/api/v1/random" />
        </a>
      </Dropdown>
      <SetTheme visible={visible} onClose={onClose} />
    </div>
  );
};

export default AvatarDropdown;
