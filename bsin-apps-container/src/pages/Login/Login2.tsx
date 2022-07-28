import React, { ChangeEvent, FC } from 'react';
import graphic2 from '@/assets/picture/graphic2.svg';
import { connect, Dispatch, Loading, AppsState, history } from 'umi';
import { message, Button, Select } from 'antd';
import { DAOLogin, getTenantList } from '../../services/login';
import { userRegister } from '../../services/register';
import {
  setLocalStorageInfo,
  setSessionStorageInfo,
} from '@/utils/localStorageInfo';
import styles from './iofrm-theme5.less';
import { hex_md5 } from '../../utils/md5';

const { Option } = Select;

interface PageProps {
  Apps: AppsState;
  dispatch: Dispatch;
}

const Login2: FC<PageProps> = ({ Apps, dispatch }) => {
  React.useEffect(() => {
    getAllTenant();
  }, []);

  // 获取所有租户
  const getAllTenant = async () => {
    let res = await getTenantList({});
    console.log('getAllTenant', res.data);
    if (res && res.code === '000000') {
      setTenantList(res.data);
    } else {
      message.error('获取租户列表失败');
    }
  };
  // 租户列表
  const [tenantList, setTenantList] = React.useState<[]>();
  // 登录、注册切换
  const [pagesWitching, setPagesWitching] = React.useState('login');
  // 登录表单值
  const [loginState, setLoginState] = React.useState({
    tenantId: '',
    username: '',
    password: '',
  });
  // 注册表单
  const [registerState, setRegisterState] = React.useState({
    registerUsername: '',
    registerPassword: '',
    phone: '',
  });

  // 按钮点击动画
  const [loadings, setLoadings] = React.useState(false);

  // 登录选择租户
  const handleChange = (value: string) => {
    console.log(`selected ${value}`);
    setLoginState({
      ...loginState,
      tenantId: value,
    });
  };

  // 登录表单值变化调用
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  };

  // 登录按钮调用
  const login = async (event: any) => {
    // 如果用户名和密码为空，则提示
    if (!loginState.username) {
      return message.info('请输入用户名');
    }
    if (!loginState.password) {
      return message.info('请输入密码');
    }
    setLoadings(true);
    console.log(hex_md5(loginState.password));
    console.log(loginState);

    let res = await DAOLogin({
      ...loginState,
      password: hex_md5(loginState.password),
    });
    console.log(res);
    if (res) {
      setLocalStorageInfo('userInformation', res.data.sysUser);
      setLocalStorageInfo('tenantDao', res.data.tenantDao);
      setLocalStorageInfo('customerInfo', res.data.customerInfo);
      setSessionStorageInfo('token', { token: res.data.token });
      dispatch({
        type: 'Apps/getApps',
        payload: {
          current: 1,
          pageSize: 8,
        },
      });
      message.success('登录成功！');
      setTimeout(() => {
        console.log(Apps);
        Apps.appList.length === 1
          ? history.push(Apps.appList[0].url)
          : history.push('/');
        setLoadings(false);
      }, 500);
    }
    setLoadings(false);
  };

  // 注册表单值变化调用
  const onRegisterChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setRegisterState({
      ...registerState,
      [name]: value,
    });
  };

  // 注册按钮调用
  const register = async (event: any) => {
    console.log(registerState);
    const {
      registerUsername: username,
      registerPassword: password,
      phone,
    } = registerState;
    // 如果用户名和密码为空，则提示

    if (!username) {
      return message.info('请输入用户名！');
    }
    if (!password) {
      return message.info('请输入密码！');
    }
    if (!phone) {
      return message.info('请输入手机号！');
    }
    let telTest =
      /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
    if (!telTest.test(phone)) {
      return message.info('请输入正确的手机号！');
    }
    setLoadings(true);
    // console.log(hex_md5(registerState.password));

    let res = await userRegister({
      username,
      phone,
      password: hex_md5(password),
    });
    console.log(res);
    if (res?.code === '000000') {
      setLoginState({
        ...loginState,
        username,
        password,
      });
      message.success('注册成功，可在审批通过后登录');
      setPagesWitching('login');
      getAllTenant();
    }
    setLoadings(false);
  };

  return (
    <div className={styles['form-body']}>
      <div className={styles['row']}>
        <div className={styles['img-holder']}>
          <img src={graphic2} />
        </div>
        <div className={styles['form-holder']}>
          <div className={styles['form-content']}>
            <h3>{process.env.title}</h3>
            <p>欢迎来到{process.env.title}</p>
            {/* <div className={styles['form-name']}>
              <span
                onClick={() => setPagesWitching('login')}
                className={
                  styles[pagesWitching == 'login' ? 'form-checked' : '']
                }
              >
                登录
              </span>
              <span
                onClick={() => setPagesWitching('register')}
                className={
                  styles[pagesWitching == 'register' ? 'form-checked' : '']
                }
              >
                注册
              </span>
            </div> */}
            {pagesWitching === 'register' ? (
              <form>
                <input
                  onChange={onRegisterChange}
                  className={styles['form-control']}
                  type="text"
                  name="registerUsername"
                  placeholder="用户名"
                  required
                />
                <input
                  onChange={onRegisterChange}
                  className={styles['form-control']}
                  type="password"
                  name="registerPassword"
                  placeholder="密码"
                  required
                />
                <input
                  onChange={onRegisterChange}
                  className={styles['form-control']}
                  type="text"
                  name="phone"
                  placeholder="手机号"
                  required
                />
                <div className={styles['form-button']}>
                  <Button
                    className={styles['ibtn']}
                    loading={loadings}
                    onClick={register}
                  >
                    注册
                  </Button>
                  <span className={styles['login-link']}>
                    已注册DAO账号了 ?
                    <a
                      onClick={() => setPagesWitching('login')}
                      className={styles['login-link']}
                    >
                      点击登录
                    </a>
                  </span>
                </div>
              </form>
            ) : (
              <form>
                <input
                  onChange={onChange}
                  className={styles['form-control']}
                  type="text"
                  name="username"
                  placeholder="用户名"
                  required
                />
                <input
                  onChange={onChange}
                  className={styles['form-control']}
                  type="password"
                  name="password"
                  placeholder="密码"
                  required
                />
                <div className={styles['form-button']}>
                  <Button
                    className={styles['ibtn']}
                    loading={loadings}
                    onClick={login}
                  >
                    登录
                  </Button>
                  <span className={styles['login-link']}>
                    还没有自己的DAO ?
                    <a
                      onClick={() => setPagesWitching('register')}
                      className={styles['login-link']}
                    >
                      点击注册
                    </a>
                  </span>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login2;
