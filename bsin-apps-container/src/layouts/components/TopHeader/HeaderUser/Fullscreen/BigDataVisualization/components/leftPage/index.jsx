import React, { PureComponent } from 'react';
import { LeftPage, LeftTopBox, LeftBottomBox } from './style';
import { ModuleTitle } from '../../style/globalStyledSet';
import { BorderBox12, BorderBox13 } from '@jiaminghi/data-view-react';
import TrafficSituation from './charts/TrafficSituation';
import UserSituation from './charts/UserSituation';
import { connect } from 'umi';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.data = {
      accessFrequency: 1500,
      peakFlow: 300,
      trafficSitua: {
        timeList: ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
        outData: [502.84, 205.97, 332.79, 281.55, 398.35, 214.02],
        inData: [281.55, 398.35, 214.02, 179.55, 289.57, 356.14],
      },
      userSitua: {
        header: ['用户', '时间', '状态'],
        data: [
          ['用户1', '2020-11-11 12:00', '在线'],
          ['用户2', '2020-11-11 12:00', '离线'],
          ['用户3', '2020-11-11 12:00', '在线'],
          ['用户4', '2020-11-11 12:00', '在线'],
          ['用户5', '2020-11-11 12:00', '在线'],
          ['用户6', '2020-11-11 12:00', '离线'],
          ['用户7', '2020-11-11 12:00', '在线'],
          ['用户8', '2020-11-11 12:00', '在线'],
          ['用户9', '2020-11-11 12:00', '离线'],
          ['用户11', '2020-11-11 12:00', '离线'],
          ['用户12', '2020-11-11 12:00', '离线'],
          ['用户13', '2020-11-11 12:00', '离线'],
        ],
      },
    };
  }
  render() {
    const { userSitua, trafficSitua, accessFrequency, peakFlow } = this.data;
    return (
      <LeftPage>
        {/* 顶部图表 */}
        <LeftTopBox>
          <BorderBox12 className="left-top-borderBox12">
            <div className="left-top">
              <ModuleTitle>
                <i className="iconfont">&#xe78f;</i>
                <span>今日流量态势</span>
              </ModuleTitle>
              <div className="title-dis">
                <span>
                  平均接纳次数(小时):
                  <span className="title-dis-keyword">{accessFrequency}次</span>
                </span>
                <span>
                  流量峰值:
                  <span className="title-dis-keyword">{peakFlow}M</span>
                </span>
              </div>
              {/* 图表 */}
              <TrafficSituation trafficSitua={trafficSitua}></TrafficSituation>
            </div>
          </BorderBox12>
        </LeftTopBox>

        {/* 底部图表 */}
        <LeftBottomBox>
          <BorderBox13 className="left-bottom-borderBox13">
            <div className="left-bottom">
              <ModuleTitle>
                <i className="iconfont">&#xe88e;</i>
                <span>用户数据状态</span>
              </ModuleTitle>
              {/* 图表 */}
              <UserSituation userSitua={userSitua}></UserSituation>
            </div>
          </BorderBox13>
        </LeftBottomBox>
      </LeftPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    accessFrequency: state.leftPage.accessFrequency,
    peakFlow: state.leftPage.peakFlow,
    userSitua: state.leftPage.userSitua,
    trafficSitua: state.leftPage.trafficSitua,
  };
};

const mapStateToDispatch = (dispatch) => ({});

export default index;
