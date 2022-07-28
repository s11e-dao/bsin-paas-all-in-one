import { createContainer } from 'unstated-next';
import { useState, useEffect } from 'react';
import { onChangeTheme } from '@/utils/changeTheme';
import {
  setLocalStorageInfo,
  getLocalStorageInfo,
} from '@/utils/localStorageInfo';

export type AppMenu = {
  title: string;
  menuName: string;
  icon: string;
  to: string;
  children?: AppMenu[];
}[];

export type Mode = 'horizontal' | 'vertical' | 'inline';
export type MenuTheme = 'light' | 'dark';
export type Layouts = 'Sider' | 'Top' | 'ContentSider';

type InitialState = {
  primaryColor: string;
  textColor: string;
  userInfo: any;
  layouts: Layouts;
  mode: Mode;
  appMenu?: AppMenu;
  menuTheme: MenuTheme;
};

/**
 * 管理 layouts 中的数据状态
 * @returns
 */
const LayoutContext = (initialState: InitialState | undefined) => {
  // 用户信息
  const [userInfo, setUserInfo] = useState(
    initialState ? initialState.userInfo : 'admin',
  );

  // sider 菜单缩放
  const [siderCollapsed, setSiderCollapsed] = useState(false);

  // logo 缩放
  const [logoStyle, setLogoStyle] = useState({ width: 200 });
  // 布局参数
  const [layouts, setLayouts] = useState(
    initialState ? initialState.layouts : 'Sider',
  );
  // 控制左侧菜单的显示和隐藏的参数
  const [layoutSider, setLayoutSider] = useState(false);
  // 控制上下结构中 内容区左侧菜单的显示和隐藏的参数
  const [contentSider, setContentSider] = useState(false);
  // 控制主题色
  const [primaryColor, setPrimaryColor] = useState(
    initialState ? initialState.primaryColor : '#4e6ef2',
  );
  // 控制文本色
  const [textColor, setTextColor] = useState(
    initialState ? initialState.textColor : '#222',
  );
  // 菜单模式
  const [mode, setMode] = useState(initialState ? initialState.mode : 'inline');
  // 子应用数据
  const [appMenu, setAppMenu] = useState(
    initialState ? initialState.appMenu : undefined,
  );

  // 菜单主题色
  const [menuTheme, setThemeColor] = useState(
    initialState ? initialState.menuTheme : 'light',
  );
  // 通过设置content样式 控制顶部菜单是否固定
  const [fixedHeaderStyle, setFixedHeaderStyle] = useState(true);
  // 通过设置Sider样式 控制左侧菜单是否固定
  const [fixedSiderStyle, setFixedSiderStyle] = useState(true);

  /**
   * 控制侧边菜单固定
   */
  const changFixedSiderStyle = (checked: boolean) => {
    setFixedSiderStyle(checked);
  };

  /**
   * 控制顶部菜单固定
   * @param checked
   */
  const changFixedHeaderStyle = (checked: boolean) => {
    setFixedHeaderStyle(checked);
  };

  /**
   * 控制Sider菜单缩放
   */
  const changeSiderCollapsed = () => {
    setSiderCollapsed(!siderCollapsed);
    !siderCollapsed
      ? setLogoStyle({ width: 80 })
      : setLogoStyle({ width: 200 });
  };

  /**
   * 监听页面路径设置布局
   */
  useEffect(() => {
    // 工作台layout不变
    if (
      location.hash === '#/workplace' ||
      location.hash === '#/user' ||
      location.hash === '#/apps'
    ) {
      setLayoutSider(false);
      setContentSider(false);
      setSiderCollapsed(false);
    } else {
      changeLayout(layouts);
    }
  }, [location.hash]);

  /**
   * setTheme 修改 layout
   * @param layout
   */
  const changeLayout = (layouts: Layouts) => {
    setLayouts(layouts);
    // 在工作台时不可切换layout
    if (location.hash !== '#/workplace' && location.hash !== '#/user') {
      switch (layouts) {
        case 'Sider':
          setLayoutSider(true);
          setContentSider(false);
          break;
        case 'Top':
          setLayoutSider(false);
          setContentSider(false);
          break;
        case 'ContentSider':
          setLayoutSider(false);
          setContentSider(true);
          break;
        default:
          setLayoutSider(false);
          setContentSider(false);
          break;
      }
    }
  };

  /**
   * setTheme 修改 textColor，primaryColor 参数
   * @param  color
   */
  const changeColor = function (changeColor: { type: string; color: string }) {
    let { color, type } = changeColor;
    if (type === 'primaryColor') {
      setPrimaryColor(color);
    } else {
      setTextColor(color);
    }
  };

  /**
   * setTheme 修改 mode 控制菜单显示样式 垂直/内嵌
   */
  const changeMode = (mode: 'horizontal' | 'vertical' | 'inline') => {
    setMode(mode);
  };

  /**
   * 更新用户信息
   */
  const changeUserInfo = () => {
    let theme = {
      primaryColor,
      textColor,
      layouts,
      mode,
      menuTheme,
    };
    let userInfo = getLocalStorageInfo('userInformation');
    userInfo.theme = theme;
    setLocalStorageInfo('userInformation', userInfo);
  };

  /**
   * primaryColor, textColor 改变时调用 onChangeTheme
   * 修改 主题色 和 文本色
   */
  useEffect(() => {
    onChangeTheme({ primaryColor, textColor });
    changeUserInfo();
  }, [primaryColor, textColor]);

  /**
   * 监听layouts, mode, menuTheme
   */
  useEffect(() => {
    changeUserInfo();
  }, [layouts, mode, menuTheme]);

  /**
   * 改变菜单主题色
   * @param color
   */
  const changeMenuTheme = (color: 'light' | 'dark') => {
    setThemeColor(color);
  };

  // 改变子应用菜单
  useEffect(() => {
    setAppMenu(initialState?.appMenu);
  }, [initialState?.appMenu]);

  return {
    layoutSider,
    contentSider,
    primaryColor,
    textColor,
    layouts,
    mode,
    appMenu,
    menuTheme,
    siderCollapsed,
    logoStyle,
    fixedHeaderStyle,
    fixedSiderStyle,
    userInfo,
    changeLayout,
    changeColor,
    changeMode,
    changeMenuTheme,
    changeSiderCollapsed,
    changFixedHeaderStyle,
    changFixedSiderStyle,
  };
};

const LayoutCounter = createContainer(LayoutContext);

export default LayoutCounter;
