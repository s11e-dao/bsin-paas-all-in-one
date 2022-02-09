import React, { FC } from 'react';
import {
  Row,
  Col,
  Card,
  Avatar,
  Pagination,
  Calendar,
  List,
  message,
} from 'antd';
import { Link } from 'umi';
import { connect, Dispatch, Loading, AppsState, history } from 'umi';
import LayoutContext from '@/layouts/stores/LayoutContext';
import {
  setLocalStorageInfo,
  setSessionStorageInfo,
} from '@/utils/localStorageInfo';
import {
  ScheduleTwoTone,
  AppstoreTwoTone,
  ProfileTwoTone,
} from '@ant-design/icons';
import moment from 'moment';
import styles from './index.less';

interface PageProps {
  Apps: AppsState;
  dispatch: Dispatch;
  loading: boolean;
}

const WorkPlace: FC<PageProps> = ({ Apps, dispatch }) => {
  // 引入公共数据
  const counter = LayoutContext.useContainer();
  // 列表数据
  const data = [
    '曲丽丽 在 高逼格设计天团 新建项目 六月迭代.',
    '周星星 将 5 月日常迭代 更新至已发布状态.',
    '朱偏右 在 工程效能 发布了 留言.',
    '乐哥 在 程序员日常 新建项目 品牌迭代.',
  ];

  const [current, setCurrent] = React.useState(1);

  React.useEffect(() => {
    setTimeout(() => {
      if (window.localStorage.getItem('bsin-microAppMount') === '3') {
        message.warning('子应用加载失败，请检查子应用是否部署');
        setTimeout(() => {
          window.localStorage.setItem('bsin-microAppMount', '2');
        }, 500);
      }
    }, 500);
  }, []);

  // const dataJson = {};
  // add({...dataJson});

  /**
   * 点击跳转到子应用
   * @param app
   */
  const getMenu = async (app: any) => {
    setLocalStorageInfo('bsin-microAppMount', '0');
    // debugger
    history.push('/' + app.appCode);
  };

  /**
   * 页码、每页展示条数变动时调用
   * @param page 当前页
   * @param pageSize 每页展示应用个数
   */
  const pagination = (current: number, pageSize: number) => {
    setCurrent(current);
    dispatch({
      type: 'Apps/getApps',
      payload: {
        current,
        pageSize,
      },
    });
  };
  const style = { padding: '16px 0', height: '100%' };

  return (
    <div className="work-place" style={{ marginTop: 2 }}>
      <Row
        align="middle"
        style={{
          backgroundColor: '#fff',
          marginBottom: 12,
          padding: '0 20px 0 25px',
        }}
      >
        <Col xl={16} lg={12} md={24} sm={24} xs={24}>
          <List itemLayout="horizontal">
            <List.Item>
              <List.Item.Meta
                avatar={
                  <Avatar
                    size={{ xs: 60, sm: 60, md: 60, lg: 60, xl: 60, xxl: 60 }}
                    src="https://joeschmoe.io/api/v1/random"
                  />
                }
                title={<div style={{ fontSize: 24 }}>你好，{}</div>}
                description="欢迎使用 bsin-paas 平台"
              />
            </List.Item>
          </List>
        </Col>
        <Col xl={8} lg={12} md={24} sm={24} xs={24}>
          <Row align="middle" style={{ textAlign: 'center' }}>
            <Col className="gutter-row" xl={6} lg={6} md={6} sm={12} xs={24}>
              <a
                style={{ color: counter.textColor }}
                onClick={() => {
                  // setQiankunGlobalState(4);
                  // console.log(globalState);
                }}
              >
                <Row gutter={[5, 8]} style={style}>
                  <Col className="gutter-row" span={24}>
                    <ProfileTwoTone
                      style={{ fontSize: 40 }}
                      twoToneColor={counter.primaryColor}
                    />
                  </Col>
                  <Col className="gutter-row" span={24}>
                    待办事项
                  </Col>
                </Row>
              </a>
            </Col>
            <Col className="gutter-row" xl={6} lg={6} md={6} sm={12} xs={24}>
              <Link to="/apps" style={{ color: counter.textColor }}>
                <Row gutter={[5, 8]} style={style}>
                  <Col className="gutter-row" span={24}>
                    <ScheduleTwoTone
                      style={{ fontSize: 40 }}
                      twoToneColor={counter.primaryColor}
                    />
                  </Col>
                  <Col className="gutter-row" span={24}>
                    日程
                  </Col>
                </Row>
              </Link>
            </Col>
            <Col className="gutter-row" xl={6} lg={6} md={6} sm={12} xs={24}>
              <Link to="/apps" style={{ color: counter.textColor }}>
                <Row gutter={[5, 8]} style={style}>
                  <Col className="gutter-row" span={24}>
                    <AppstoreTwoTone
                      style={{ fontSize: 40 }}
                      twoToneColor={counter.primaryColor}
                    />
                  </Col>
                  <Col className="gutter-row" span={24}>
                    打开多个应用
                  </Col>
                </Row>
              </Link>
            </Col>
            <Col className="gutter-row" xl={6} lg={6} md={6} sm={12} xs={24}>
              <Row style={style}>
                <Col className="gutter-row" span={24}>
                  拥有子应用数
                </Col>
                <Col style={{ fontSize: 40 }} className="gutter-row" span={24}>
                  {Apps.appTotal}
                </Col>
              </Row>
            </Col>
          </Row>
        </Col>
      </Row>
      <Row gutter={12} style={{ margin: '0 30px' }}>
        <Col xl={16} lg={24} md={24} sm={24} xs={24}>
          <Card
            style={{ minHeight: 400, padding: '0 0 60px', marginBottom: 12 }}
            className={styles.projectList}
            title="可访问的应用"
            bordered={false}
            extra={<Link to="/">全部应用</Link>}
            bodyStyle={{ padding: 0 }}
          >
            {Apps.appList.map((item) => (
              <Card.Grid className={styles.projectGrid} key={item.appId}>
                <Card
                  bodyStyle={{
                    padding: 0,
                    height: 100,
                  }}
                  bordered={false}
                >
                  <Card.Meta
                    title={
                      <div
                        className={styles.cardTitle}
                        onClick={() => getMenu(item)}
                      >
                        <Avatar
                          size="small"
                          src="https://joeschmoe.io/api/v1/random"
                        />
                        <a>{item.appName}</a>
                      </div>
                    }
                    description={item.remark || ' '}
                  />
                  <div className={styles.projectItemContent}>
                    <a>{item.member || ''}</a>
                    {item.updateTime && (
                      <span className={styles.datetime} title={item.updateTime}>
                        {moment(item.updateTime).fromNow()}
                      </span>
                    )}
                  </div>
                </Card>
              </Card.Grid>
            ))}
            {/* 分页器 */}
            <div
              style={{ position: 'absolute', right: '10px', bottom: '10px' }}
            >
              <Pagination
                onChange={pagination}
                total={Apps.appTotal}
                pageSizeOptions={['8']}
                defaultPageSize={8}
                current={current}
                showSizeChanger
                hideOnSinglePage
                showTotal={(total) => `共有 ${total} 个应用`}
              />
            </div>
          </Card>
          <Row gutter={12}>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Card
                style={{ marginBottom: 12 }}
                bodyStyle={{ padding: 10 }}
                bordered={false}
                title="新闻动态"
                extra={<Link to="/">更多</Link>}
              >
                <List
                  size="small"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item}</a>}
                      />
                      <div>2021-11-26</div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
            <Col xl={12} lg={12} md={24} sm={24} xs={24}>
              <Card
                style={{ marginBottom: 12 }}
                bodyStyle={{ padding: 10 }}
                bordered={false}
                title="我的待办"
                extra={<Link to="/">更多</Link>}
              >
                <List
                  size="small"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item}</a>}
                      />
                      <div>2021-11-26</div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
        <Col xl={8} lg={24} md={24} sm={24} xs={24}>
          <Row gutter={12}>
            <Col xl={24} lg={12} md={24} sm={24} xs={24}>
              <Card
                style={{ marginBottom: 12 }}
                bordered={false}
                bodyStyle={{ padding: 0 }}
              >
                <Calendar fullscreen={false} />
              </Card>
            </Col>
            <Col xl={24} lg={12} md={24} sm={24} xs={24}>
              <Card
                bordered={false}
                title="公告"
                extra={<Link to="/">更多</Link>}
              >
                <List
                  size="small"
                  dataSource={data}
                  renderItem={(item, index) => (
                    <List.Item key={index}>
                      <List.Item.Meta
                        title={<a href="https://ant.design">{item}</a>}
                      />
                      <div>2021-11-26</div>
                    </List.Item>
                  )}
                />
              </Card>
            </Col>
          </Row>
        </Col>
      </Row>
    </div>
  );
};

const mapStateToProps = ({
  Apps,
  loading,
}: {
  Apps: AppsState;
  loading: Loading;
}) => {
  return {
    Apps,
    userListLoading: loading.models.users,
  };
};

export default connect(mapStateToProps)(WorkPlace);
