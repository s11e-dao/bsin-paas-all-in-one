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
    let appCode = location.hash.split('/')[1];
    if (appCode !== 'workplace' && appCode !== 'user' && appCode !== 'apps') {
      getUserApplicationMenu(appCode);
    }
  }, [location.hash]);

  // 获取用户子应用菜单
  const getUserApplicationMenu = async (app: string) => {
    if (app !== appCode) {
      let res = await getUserMenuTreeByAppCode({ appCode: app });
      console.log(res);

      if (res && res.data[0]) {
        setAppMenu(res.data);
        setAppCode(app);
      } else {
        message.error(`你没有${app}权限`);
        setTimeout(() => {
          history.push('/');
          location.reload();
        }, 1000);
      }
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
