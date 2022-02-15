import React, { PureComponent } from 'react';
import { BorderBox13 } from '@jiaminghi/data-view-react';
import BrowseCategories from './charts/BrowseCategories';
import UserIdentityCategory from './charts/UserIdentityCategory';
import OfflinePortal from './charts/OfflinePortal';
import Feedback from './charts/Feedback';
import { ModuleTitle } from '../../style/globalStyledSet';
import { connect } from 'dva';
import {
  RightPage,
  RightTopBox,
  RightCenterBox,
  RightBottomBox,
} from './style';

class index extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {};
    this.data = {
      browseCategories: {
        data: [782, 621.2, 322.1, 525.3, 265, 224],
        indicator: [
          {
            name: '食物',
            max: 1000,
          },
          {
            name: '娱乐',
            max: 1000,
          },
          {
            name: '运动',
            max: 1000,
          },
          {
            name: '家居',
            max: 1000,
          },
          {
            name: '机械',
            max: 1000,
          },
          {
            name: '学习',
            max: 1000,
          },
        ],
      },
      userIdentityCategory: {
        data: [
          {
            name: '公务',
            value: 57,
          },
          {
            name: '学生',
            value: 167,
          },
          {
            name: '教师',
            value: 123,
          },
          {
            name: '军区',
            value: 55,
          },
          {
            name: '企业',
            value: 198,
          },
        ],
      },
      offline: {
        feedback: [
          {
            title: '服务质量',
            number: 90,
          },
          {
            title: '交互体验',
            number: 82,
          },
          {
            title: '安全防护',
            number: 85,
          },
        ],
        offlinePortalData: {
          data1: [80, 152, 101, 134, 90, 130],
          data2: [120, 182, 191, 210, 170, 110],
          data3: [110, 132, 201, 154, 150, 80],
          data4: [90, 142, 161, 114, 190, 170],
          xData: ['9:00', '12:00', '15:00', '18:00', '21:00', '00:00'],
          barData: [32.2, 60.0, 32.6, 36.4, 53.3, 35.0],
        },
      },
    };
  }
  render() {
    const { offline, browseCategories, userIdentityCategory } = this.data;
    return (
      <RightPage>
        <RightTopBox>
          <div className="right-top">
            <ModuleTitle>
              <i className="iconfont">&#xe7f7;</i>
              <span>关联数据类别分布</span>
            </ModuleTitle>
            <div className="right-top-content">
              <BrowseCategories
                browseCategories={browseCategories}
              ></BrowseCategories>
              <img
                alt="地球"
                className="earth-gif"
                src={require('../../assets/images/earth-rotate.gif')}
              />
            </div>
          </div>
        </RightTopBox>

        <RightCenterBox>
          <ModuleTitle>
            <i className="iconfont">&#xe7fd;</i>
            <span>平均用户类别排布</span>
          </ModuleTitle>
          <UserIdentityCategory
            userIdentityCategory={userIdentityCategory}
          ></UserIdentityCategory>
        </RightCenterBox>

        <RightBottomBox>
          <BorderBox13 className="right-bottom-borderBox13">
            <div className="right-bottom">
              <ModuleTitle>
                <i className="iconfont">&#xe790;</i>
                <span>今日线下门户流量</span>
              </ModuleTitle>
              {/* 反馈 */}
              <div className="feedback-box">
                {offline
                  ? offline.feedback.map((item, index) => {
                      return (
                        <div className="feedback-box-item" key={index}>
                          <Feedback FeedbackData={item}></Feedback>
                          <span className="dis-text">{item.title}</span>
                        </div>
                      );
                    })
                  : ''}
              </div>
              {/* 门店 */}
              <div className="offline-portal-box">
                {offline ? (
                  <OfflinePortal
                    offlinePortalData={offline.offlinePortalData}
                  />
                ) : (
                  ''
                )}
              </div>
            </div>
          </BorderBox13>
        </RightBottomBox>
      </RightPage>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    browseCategories: state.rightPage.browseCategories,
    userIdentityCategory: state.rightPage.userIdentityCategory,
    offline: state.rightPage.offline,
  };
};

const mapStateToDispatch = (dispatch) => ({});

export default index;
