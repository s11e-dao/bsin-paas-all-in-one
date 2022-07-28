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
import styles from './style.css';
import logo2 from '@/assets/logo3.png';

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
    <div className={styles.wrap}>
      <Dropdown placement="bottomRight" overlay={userContent()}>
        <div style={{ height: 64, lineHeight: '64px' }}>
          <span
            className={styles.username}
            style={
              counter.menuTheme === 'light'
                ? { color: '#111' }
                : { color: '#fff' }
            }
          >
            {userInfo.username}
          </span>
          <Avatar
            src={logo2}
            style={{
              backgroundColor: '#777',
              position: 'relative',
              top: '-30px',
            }}
          />
        </div>
      </Dropdown>
      <SetTheme visible={visible} onClose={onClose} />
    </div>
  );
};

export default AvatarDropdown;
