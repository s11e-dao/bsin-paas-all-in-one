import React, { useEffect } from 'react';
import BsinLayout from './BsinLayout';
import { getLocalStorageInfo } from '@/utils/localStorageInfo';
import './index.less';
import { getUserMenuTreeByAppCode } from '@/services/appMenu';
import type { AppMenu } from './stores/LayoutContext';
import { message } from 'antd';
import { history } from 'umi';

export default function index(props: any) {
  // 子应用信息
  const [appMenu, setAppMenu] = React.useState<AppMenu>();
  // 菜单所属子应用
  const [appCode, setAppCode] = React.useState<string>();
  // 传入用户信息
  let userInfo = getLocalStorageInfo('userInformation');

  // 传入子应用信息
  useEffect(() => {
    let app = location.hash.split('/')[1];
    if (
      app !== 'workplace' &&
      app !== 'user' &&
      app !== 'apps' &&
      app !== appCode
    ) {
      getUserApplicationMenu(app);
    }
  }, [location.hash]);

  // 获取用户子应用菜单
  const getUserApplicationMenu = async (app: string) => {
    let res = await getUserMenuTreeByAppCode({ appCode: app });
    console.log(res);

    if (res && res.data[0]) {
      setAppMenu(res.data[0]);
      setAppCode(app);
    } else {
      message.error(`你没有${app}菜单权限`);
      setTimeout(() => {
        history.push('/');
        location.reload();
        window.localStorage.setItem('bsin-microAppMount', '3');
      }, 1000);
    }
  };

  // 传入logo信息

  return (
    <BsinLayout
      userInfo={userInfo}
      children={props.children}
      appMenu={appMenu}
    />
  );
}
