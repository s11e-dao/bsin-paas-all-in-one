import { Effect, Reducer, Subscription } from 'umi';
import { getAppByUserId } from '../services/getAppByUserId';
import { getLocalStorageInfo } from '@/utils/localStorageInfo';

export interface AppsState {
  appList: {
    appId: string;
    logo: string;
    appName: string;
    appCode: string;
    url: string;
    appLanguage: string;
    theme: {};
    member: string;
    remark: string;
    updateTime: string;
    props: {
      testProp1: string;
      description: string;
    };
  }[];
  appTotal: number;
}

export interface AppsModelType {
  namespace: 'Apps';
  state: AppsState;
  effects: {
    getApps: Effect;
  };
  reducers: {
    save: Reducer<AppsState>;
  };
  subscriptions: { setup: Subscription };
}

const AppsModel: AppsModelType = {
  namespace: 'Apps',
  state: {
    appList: [],
    appTotal: 0,
  },

  effects: {
    *getApps({ payload }, { call, put }) {
      const res = yield call(getAppByUserId, payload);
      console.log(res);

      if (res.code === '000000') {
        yield put({
          type: 'save',
          payload: {
            list: res.data,
            appTotal: res.pagination.totalSize,
          },
        });
      }
    },
  },
  reducers: {
    save(state, { payload }) {
      let appList = payload.list;
      let appTotal = payload.appTotal;
      return { appList, appTotal };
    },
  },
  subscriptions: {
    setup({ dispatch, history }) {
      return history.listen(({ pathname }) => {
        if (pathname === '/workplace') {
          dispatch({
            type: 'getApps',
            payload: {
              current: 1,
              pageSize: 8,
            },
          });
        }
      });
    },
  },
};

export default AppsModel;
