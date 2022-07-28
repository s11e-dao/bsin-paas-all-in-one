import React from 'react';
import LayoutContext, {
  AppMenu,
  Mode,
  MenuTheme,
  Layouts,
} from './stores/LayoutContext';
import { Layout } from 'antd';
import SiderMenu from './components/SiderMenu';
import UpAndDownLayout from './components/UpAndDownLayout';
import AppDrawer from '../components/appDrawer';

export type Theme = {
  primaryColor: string;
  textColor: string;
  layouts: Layouts;
  mode: Mode;
  menuTheme: MenuTheme;
};

export type USerInfo = {
  name: string;
  headerUrl: string;
  theme: Theme;
};

export type BsinLayoutProps = {
  appMenu?: AppMenu;
  userInfo: USerInfo;
  children: any;
};

const BsinLayout: React.FC<BsinLayoutProps> = ({
  appMenu,
  userInfo,
  children,
}) => {
  let primaryColor = '#F67825';
  let textColor = '#222';
  let layouts: Layouts = 'Sider';
  let mode: Mode = 'inline';
  let menuTheme: MenuTheme = 'light';

  // 用户信息
  if (userInfo.theme) {
    let theme = userInfo.theme;
    theme.primaryColor
      ? (primaryColor = theme.primaryColor)
      : (theme.primaryColor = primaryColor);
    theme.textColor
      ? (textColor = theme.textColor)
      : (theme.textColor = textColor);
    theme.layouts ? (layouts = theme.layouts) : (theme.layouts = layouts);
    theme.mode ? (mode = theme.mode) : (theme.mode = mode);
    theme.menuTheme
      ? (menuTheme = theme.menuTheme)
      : (theme.menuTheme = menuTheme);
    userInfo.theme = theme;
  } else {
    userInfo.theme = {
      primaryColor,
      textColor,
      layouts,
      mode,
      menuTheme,
    };
  }

  return (
    <LayoutContext.Provider
      initialState={{
        layouts,
        primaryColor,
        textColor,
        userInfo,
        mode,
        appMenu,
        menuTheme,
      }}
    >
      <Layout style={{ width: '100vw', height: '100vh', overflow: 'auto' }}>
        <SiderMenu />
        <UpAndDownLayout children={children} />
      </Layout>
      <AppDrawer />
    </LayoutContext.Provider>
  );
};

export default BsinLayout;
