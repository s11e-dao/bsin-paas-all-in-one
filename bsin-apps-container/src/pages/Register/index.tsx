import React, { ChangeEvent, FC } from 'react';
import graphic2 from '@/assets/picture/graphic2.svg';
import { connect, Dispatch, Loading, AppsState, history } from 'umi';
import { message, Button } from 'antd';
// import { userRegister, getTenantList } from '../../services/register';
import {
  setLocalStorageInfo,
  setSessionStorageInfo,
} from '@/utils/localStorageInfo';
import styles from './iofrm-theme5.less';
import { hex_md5 } from '../../utils/md5';

interface PageProps {
  Apps: AppsState;
  dispatch: Dispatch;
}

const Register: FC<PageProps> = ({ Apps, dispatch }) => {
  const [registerState, setRegisterState] = React.useState({
    DAOname: '',
    username: '',
    password: '',
  });
  // 注册按钮注册动画
  const [loadings, setLoadings] = React.useState(false);

  // 输入框值变化调用
  const onChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    const name = event.target.name;
    setRegisterState({
      ...registerState,
      [name]: value,
    });
  };

  // 注册按钮调用
  const register = async (event: any) => {
    // 如果用户名和密码为空，则提示
    if (!registerState.DAOname) {
      return message.info('请输入DAO');
    }
    if (!registerState.username) {
      return message.info('请输入用户名');
    }
    if (!registerState.password) {
      return message.info('请输入密码');
    }
    setLoadings(true);
    console.log(registerState);
    console.log(hex_md5(registerState.password));

    // let res = await userRegister({
    //   ...registerState,
    //   // password: hex_md5(registerState.password),
    //   password: registerState.password,
    //   tenantId: '6345824413764157440',
    // });
    // console.log(res);
    setLoadings(false);
  };

  // 切换注册页面
  return (
    <div className={styles['form-body']}>
      <Button
        style={{
          position: 'absolute',
          top: '20px',
          left: '20px',
          zIndex: 999,
          color: '#fff',
        }}
        shape="round"
        type="primary"
        onClick={() => history.push('/login')}
      >
        返回登录
      </Button>
      <div className={styles['row']}>
        <div className={styles['img-holder']}>
          <img src={graphic2} />
        </div>
        <div className={styles['form-holder']}>
          <div className={styles['form-content']}>
            <h3>{process.env.title}</h3>
            <p>欢迎来到{process.env.title}</p>
            <form>
              <input
                onChange={onChange}
                className={styles['form-control']}
                type="text"
                name="DAOname"
                placeholder="DAO"
                required
              />
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
                  onClick={register}
                >
                  注册
                </Button>
              </div>
            </form>
            {/* <div className={styles["other-links"]}>
              <span>第三方账号注册</span>
              <a href="#">Facebook</a>
              <a href="#">Google</a>
              <a href="#">Linkedin</a>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
