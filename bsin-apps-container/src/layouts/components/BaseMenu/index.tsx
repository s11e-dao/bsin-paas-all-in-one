import React from 'react';
import { Menu, message } from 'antd';
import LayoutCounter, { AppMenu } from '../../stores/LayoutContext';
import { Link } from 'umi';
import { PieChartOutlined, UserOutlined } from '@ant-design/icons';

const { SubMenu } = Menu;

export default function BaseMenu({
  appMenu,
  mode,
}: {
  appMenu?: AppMenu;
  mode: 'horizontal' | 'vertical' | 'inline';
}) {
  // 引入公共数据
  const counter = LayoutCounter.useContainer();

  // 被选中的子级菜单
  const [key, setKey] = React.useState(location.hash.split('#')[1]);

  // 打开的父级菜单
  const [openKeys, setOpenKeys] = React.useState<string[]>(['']);

  // 获取页面刷新时被选中的子级菜单
  React.useEffect(() => {
    let path = location.hash.split('#')[1];
    setKey(path);
    // 判断父级菜单不用展开的条件
    // 如果是上下结构或者子菜单显示模式不是inline
    if (counter.layouts === 'Top' || counter.mode !== 'inline') {
      return;
    }
    if (appMenu) {
      console.log(appMenu);
      getOpenKey(appMenu, path);
    }
  }, [location.hash]);

  React.useEffect(() => {
    let path = location.hash.split('#')[1];
    // 判断父级菜单不用展开的条件
    // 如果是上下结构或者子菜单显示模式不是inline 父级菜单不打开
    if (counter.layouts === 'Top' || counter.mode !== 'inline') {
      return;
    }
    if (appMenu) {
      console.log(appMenu);
      getOpenKey(appMenu, path);
    }
  }, [appMenu]);

  // 查找打开的父级菜单
  const getOpenKey = (item: AppMenu, path: string) => {
    item.children.forEach((i) => {
      if (path === i.path) {
        setOpenKeys([item.path]);
        return;
      } else if (i.children[0]) {
        getOpenKey(i, path);
      }
    });
  };

  // 点击切换打开的父级菜单时调用
  const onOpenChange = (keys: string[]) => {
    console.log(keys);

    const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
    setOpenKeys([latestOpenKey ? latestOpenKey : '']);
  };

  return (
    <>
      {
        // 判断是否有菜单
        appMenu ? (
          <Menu
            openKeys={openKeys}
            onOpenChange={onOpenChange}
            theme={counter.menuTheme}
            selectedKeys={[key]}
            mode={mode}
            style={{ height: '100%' }}
          >
            {
              // 渲染菜单
              appMenu.children.map((item) =>
                // 判断是否有子菜单
                item.children && item.children[0].Type === 1 ? (
                  <SubMenu
                    key={item.path}
                    icon={<UserOutlined />}
                    title={item.menuName}
                  >
                    {item.children.map((items) => (
                      <Menu.Item key={items.path} icon={<PieChartOutlined />}>
                        <Link to={items.path}>{items.menuName}</Link>
                      </Menu.Item>
                    ))}
                  </SubMenu>
                ) : (
                  // 无子菜单
                  <Menu.Item
                    style={{ margin: 0 }}
                    key={item.path}
                    icon={<PieChartOutlined />}
                  >
                    <Link to={item.path}>{item.menuName}</Link>
                  </Menu.Item>
                ),
              )
            }
          </Menu>
        ) : null //没有菜单
      }
    </>
  );
}
