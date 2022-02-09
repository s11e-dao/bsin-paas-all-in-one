import React, { ChangeEvent, useState, useEffect, MouseEvent } from 'react';
import './index.module.less';
import { history } from 'umi';
import { message, Button } from 'antd';
import {
  setLocalStorageInfo,
  setSessionStorageInfo,
} from '@/utils/localStorageInfo';
import { createFromIconfontCN } from '@ant-design/icons';
import { userLogin, getTenantList } from '../../services/login';
import { Select } from 'antd';

const { Option } = Select;

const IconFont = createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_8d5l8fzk5b87iudi.js',
});

export default function Login() {
  useEffect(() => {
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
  const [tenantList, setTenantList] = useState();
  // 选中的租户
  const [tenantId, setTenantId] = useState();
  // 登录表单
  const [loginState, setLoginState] = useState({
    username: '',
    password: '',
  });
  // 注册表单
  const [registerState, setRegisterState] = useState({
    name: '',
    username: '',
    password: '',
  });
  // 登录按钮登录动画
  const [loadings, setLoadings] = useState(false);

  // 登录表单值变化时调用
  function loginInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;
    setLoginState({
      ...loginState,
      [name]: value,
    });
  }

  // 登录按钮调用
  async function login(event: MouseEvent) {
    setLoadings(true);
    setTimeout(() => {
      setLoadings(false);
    }, 3000);
    event.preventDefault();
    // 如果用户名和密码为空，则提示
    if (!loginState.username) return message.info('请输入用户名');
    if (!loginState.password) return message.info('请输入密码');
    console.log(loginState);

    let res = await userLogin({ ...loginState, tenantId });
    console.log(res);
    if (res) {
      setLocalStorageInfo('userInformation', res.data.sysUser);
      setSessionStorageInfo('token', { token: res.data.token });
      message.success('登录成功！');
      setTimeout(() => {
        history.replace('/');
      }, 500);
    }

    // request
    //   .post('/userInfo', {
    //     data: loginState,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //     setLocalStorageInfo('userInformation', res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     message.success('登录成功！');
    //     setTimeout(() => {
    //       history.replace('/');
    //     }, 500);
    //   });
  }

  // 注册表单值变化时调用
  function registerInputChange(event: ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    const name = event.target.name;
    setRegisterState({
      ...registerState,
      [name]: value,
    });
  }

  // 注册按钮调用
  function register(event: MouseEvent) {
    event.preventDefault();
    if (!registerState.name) return message.info('请输入姓名');
    if (!registerState.username) return message.info('请输入用户名');
    if (!registerState.password) return message.info('请输入密码');
    console.log(registerState);
    // request
    //   .put('/api/register', {
    //     data: registerState,
    //   })
    //   .then((res) => {
    //     console.log(res);
    //   })
    //   .catch((err) => {
    //     console.log(err);
    //   })
    //   .finally(() => {
    //     message.success('注册成功，请重新登录');
    //     document
    //       .getElementById('container')
    //       ?.classList.remove('right-panel-active');
    //   });
  }

  function onChange(value) {
    console.log(`selected ${value}`);
    setTenantId(value);
  }

  return (
    <div className="login">
      <div className="container" id="container">
        <div className="form-container sign-up-container">
          <form>
            <h1 style={{ marginBottom: 30 }}>注册</h1>
            <input
              type="text"
              name="name"
              placeholder="姓名"
              onChange={registerInputChange}
            />
            <input
              type="text"
              name="username"
              placeholder="用户名"
              onChange={registerInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="密码"
              onChange={registerInputChange}
            />
            <Button
              onClick={register}
              type="primary"
              loading={loadings}
              style={{
                marginTop: 20,
                marginBottom: 16,
              }}
            >
              注册
            </Button>
            <div className="social-container">
              <span>第三方账号注册</span>
              <a href="/#" className="social">
                <IconFont type="icon-tuichu" />
              </a>
              <a href="/#" className="social">
                <IconFont type="icon-facebook" />
              </a>
              <a href="/#" className="social">
                <IconFont type="icon-twitter" />
              </a>
            </div>
          </form>
        </div>
        <div className="form-container sign-in-container">
          <form onSubmit={() => false}>
            <h1 style={{ marginBottom: 20 }}>登录</h1>
            <Select
              bordered={false}
              style={{
                // marginTop: 20,
                backgroundColor: '#eee',
                border: 'none',
                padding: '7px 0px',
                margin: '8px 0',
                width: '100%',
                textAlign: 'left',
              }}
              showSearch
              placeholder="请选者租户"
              optionFilterProp="children"
              onChange={onChange}
              filterOption={(input, option) =>
                option?.children?.toLowerCase().indexOf(input.toLowerCase()) >=
                0
              }
            >
              {tenantList?.map((item: any) => {
                return (
                  <Option key={item.tenantId} value={item.tenantId}>
                    {item.tenantName}
                  </Option>
                );
              })}
            </Select>
            <input
              type="text"
              name="username"
              placeholder="用户名"
              onChange={loginInputChange}
            />
            <input
              type="password"
              name="password"
              placeholder="密码"
              onChange={loginInputChange}
            />
            <div>
              <div style={{ width: '100%' }}>
                <a
                  style={{
                    width: '100%',
                    display: 'block',
                    fontSize: 12,
                    textAlign: 'right',
                    margin: 0,
                  }}
                  href="#"
                >
                  忘记密码？
                </a>
              </div>
            </div>
            <Button
              style={{
                marginTop: 5,
                marginBottom: 16,
              }}
              type="primary"
              loading={loadings}
              onClick={login}
            >
              登录
            </Button>
            <div className="social-container">
              <span>第三方账号登录</span>
              <a href="#" className="social">
                <IconFont type="icon-facebook" />
              </a>
              <a href="#" className="social">
                <IconFont type="icon-twitter" />
              </a>
              <a href="#" className="social">
                <IconFont type="icon-tuichu" />
              </a>
            </div>
          </form>
        </div>
        <div className="overlay-container">
          <div className="overlay">
            <div className="overlay-panel overlay-left">
              <h1>Bsin-PaaS</h1>
              <p>企业级低代码开发平台</p>
              <button
                className="ghost"
                id="signIn"
                onClick={() => {
                  document
                    .getElementById('container')
                    ?.classList.remove('right-panel-active');
                }}
              >
                登录
              </button>
            </div>
            <div className="overlay-panel overlay-right">
              <h1>Bsin-PaaS</h1>
              <p>企业级低代码开发平台</p>
              <button
                className="ghost"
                id="signUp"
                onClick={() => {
                  document
                    .getElementById('container')
                    ?.classList.add('right-panel-active');
                }}
              >
                注册
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
