import React, { useState, FC } from 'react';
import { Radio, Drawer, Space, Switch, Row, Col } from 'antd';
import LayoutContext, { Layouts, MenuTheme } from '../../stores/LayoutContext';
import { CheckOutlined, SettingOutlined } from '@ant-design/icons';
import './index.less';

type Layout = {
  layout: Layouts;
  name: string;
}[];

// 设置 Primary 组件
function SetPrimary() {
  // 引入公共数据
  const counter = LayoutContext.useContainer();
  // 颜色选项参数
  const color = ['pink', 'gray', '#0fb748', '#4e6ef2', '#F67825'];
  /**
   * 点击选项调用改变PrimaryColor
   * @param color
   */
  const changePrimaryColor = (color: string) => {
    counter.changeColor({ type: 'primaryColor', color });
  };

  return (
    <>
      <h4>Theme color</h4>
      <Row style={{ marginBottom: 30 }}>
        {color.map((item) => (
          <Col
            key={item}
            onClick={() => changePrimaryColor(item)}
            style={{
              marginRight: 10,
              backgroundColor: item,
              width: 20,
              height: 20,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            {counter.primaryColor === item ? <CheckOutlined /> : null}
          </Col>
        ))}
      </Row>
    </>
  );
}

// 设置 textColor 组件
function SetTextColor() {
  // 引入公共数据
  const counter = LayoutContext.useContainer();
  // 选中选项参数
  const color = ['#024349', '#222', '#563905', '#777'];
  /**
   * 点击选项调用
   * @param color
   */
  const changeTextColor = (color: string) => {
    counter.changeColor({ type: 'textColor', color });
  };

  return (
    <>
      <h4>Text color</h4>
      <Row style={{ marginBottom: 30 }}>
        {color.map((item) => (
          <Col
            key={item}
            onClick={() => changeTextColor(item)}
            style={{
              marginRight: 10,
              backgroundColor: item,
              width: 20,
              height: 20,
              textAlign: 'center',
              color: '#fff',
            }}
          >
            {counter.textColor === item ? <CheckOutlined /> : null}
          </Col>
        ))}
      </Row>
    </>
  );
}

// 设置 layout 组件
function SetLayout() {
  // 引入公共数据
  let counter = LayoutContext.useContainer();
  // 选中选项参数
  const layout: Layout = [
    { layout: 'Sider', name: 'sider' },
    { layout: 'Top', name: 'top' },
    { layout: 'ContentSider', name: 'content-sider' },
  ];
  /**
   * 点击选项调用
   * @param e
   */
  const changeLayout = (layout: Layouts) => {
    counter.changeLayout(layout);
  };
  return (
    <>
      <h4>layout</h4>
      <Row className="set-layout" style={{ marginBottom: 30 }}>
        {layout.map((item) => (
          <Col key={item.name}>
            <div
              onClick={() => changeLayout(item.layout)}
              key={item.name}
              className={item.name}
            >
              {counter.layouts === item.layout ? (
                <CheckOutlined
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                  }}
                />
              ) : null}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

// 设置 菜单主题色 组件
function SetMenuTheme() {
  // 引入公共数据
  let counter = LayoutContext.useContainer();
  // 选中选项参数
  const menuTheme: MenuTheme[] = ['dark', 'light'];
  /**
   * 点击选项调用
   * @param e
   */
  const changeMenuTheme = (menuTheme: MenuTheme) => {
    counter.changeMenuTheme(menuTheme);
  };
  return (
    <>
      <h4>SetMenuTheme</h4>
      <Row className="set-menu-theme" style={{ marginBottom: 30 }}>
        {menuTheme.map((item) => (
          <Col key={item}>
            <div onClick={() => changeMenuTheme(item)} className={item}>
              {counter.menuTheme === item ? (
                <CheckOutlined
                  style={{
                    position: 'absolute',
                    bottom: 10,
                    right: 10,
                  }}
                />
              ) : null}
            </div>
          </Col>
        ))}
      </Row>
    </>
  );
}

// 设置 菜单子选项展示样式 组件
function SetMode() {
  // 引入公共数据
  let counter = LayoutContext.useContainer();
  // 选中选项参数
  const [mode, setMode] = useState(counter.mode);
  /**
   * 点击选项调用
   * @param e
   */
  const handleSizeChange = (e: any) => {
    setMode(e.target.value);
    counter.changeMode(e.target.value);
  };
  return (
    <>
      <h4>mode</h4>
      <Radio.Group
        style={{ marginBottom: 30 }}
        value={mode}
        buttonStyle="solid"
        onChange={handleSizeChange}
      >
        <Space size={24}>
          <Radio.Button value="inline">垂直</Radio.Button>
          <Radio.Button value="vertical">内嵌</Radio.Button>
        </Space>
      </Radio.Group>
    </>
  );
}

// 设置菜单固定样式
function SetFixedMenu() {
  // 引入公共数据
  let counter = LayoutContext.useContainer();
  /**
   * 控制顶部菜单
   * @param checked
   */
  const onChangeTop = (checked: boolean) => {
    counter.changFixedHeaderStyle(checked);
  };
  /**
   * 控制左边菜单
   * @param checked
   */
  const onChangeSider = (checked: boolean) => {
    counter.changFixedSiderStyle(checked);
  };
  return (
    <>
      <h4>SetMenuTheme</h4>
      <ul style={{ listStyle: 'none', padding: 0 }}>
        <li style={{ marginBottom: 15 }}>
          顶部菜单固定 <Switch defaultChecked onChange={onChangeTop} />
        </li>
        <li>
          侧边栏固定 <Switch defaultChecked onChange={onChangeSider} />
        </li>
      </ul>
    </>
  );
}

type SetThemeType = {
  visible: boolean;
  onClose: (e: any) => void;
};

// 设置面板
const SetTheme: FC<SetThemeType> = ({ visible, onClose }) => {
  return (
    <div className="set-btn">
      <Drawer
        title="主题设置"
        placement="right"
        width="350px"
        onClose={onClose}
        visible={visible}
      >
        <SetPrimary />
        <SetTextColor />
        <SetLayout />
        <SetMenuTheme />
        <SetMode />
        <SetFixedMenu />
      </Drawer>
    </div>
  );
};

export default SetTheme;
