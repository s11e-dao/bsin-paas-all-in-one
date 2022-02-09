export default {
  'GET /api/ngfe-app-test-w': {
    name: 'ngfe-app-test-w',
    title: '运营平台',
    menuData: [
      {
        title: '首页',
        name: 'home',
        icon: 'DesktopOutlined',
        to: '/ngfe-app-test-w/home',
      },
      {
        title: '交易管理',
        name: 'withdraw',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '提现记录',
            name: 'withdraw-record',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/withdraw-record',
          },
          {
            title: '提现审批',
            name: 'withdraw-apply',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/withdraw-apply',
          },
          {
            title: '付款记录',
            name: 'payment-history',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/payment-history',
          },
          {
            title: '充值记录',
            name: 'recharge-record',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/recharge-record',
          },
          {
            title: '转账记录',
            name: 'transfer-record',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/transfer-record',
          },
          {
            title: '折扣记录',
            name: 'discount-record',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/discount-record',
          },
          {
            title: 'PDB投放记录',
            name: 'release-record',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/release-record',
          },
          {
            title: '积分变更记录',
            name: 'grant-integral',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/grant-integral',
          },
        ],
      },
      {
        title: '汇率管理',
        name: 'exchange-Rate',
        icon: 'PieChartOutlined',
        to: '/ngfe-app-test-w/exchange-Rate',
      },
      {
        title: '报表',
        name: 'reportForm',
        icon: 'DesktopOutlined',
        children: [
          {
            title: '运营视图',
            name: 'operational-view',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/operational-view',
          },
          {
            title: '交易视图',
            name: 'transaction-view',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/transaction-view',
          },
        ],
      },
      {
        title: '运营参数管理',
        name: 'operationalParameters',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '提现费率配置',
            name: 'withdrawal-rata',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/withdrawal-rata',
          },
          {
            title: 'PDB投放管理',
            name: 'launch-management',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/launch-management',
          },
        ],
      },
      {
        title: '积分发放规则',
        name: 'points-distribution',
        icon: 'PieChartOutlined',
        to: '/ngfe-app-test-w/points-distribution',
      },
      {
        title: '商户管理',
        name: 'merchant',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '商户信息',
            name: 'merchant',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/merchant',
          },
          {
            title: '折扣配置',
            name: 'discount-configuration',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/discount-configuration',
          },
          {
            title: '账户信息',
            name: 'merchant-asset-account',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/merchant-asset-account',
          },
        ],
      },
      {
        title: '会员管理',
        name: 'member',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '会员信息',
            name: 'member',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/member',
          },
          {
            title: '积分账户',
            name: 'member-points-account',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/member-points-account',
          },
          {
            title: '资产账户',
            name: 'member-asset-account',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/member-asset-account',
          },
        ],
      },
      {
        title: '密码管理',
        name: 'password',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '交易密码重置记录',
            name: 'trading-password',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/trading-password',
          },
          {
            title: '登录密码重置记录',
            name: 'login-password',
            icon: 'PieChartOutlined',
            to: '/ngfe-app-test-w/login-password',
          },
        ],
      },
    ],
  },
  // 权限管理
  'GET /api/bsin-ui-upms': {
    name: 'bsin-ui-upms',
    title: '权限管理',
    menuData: [
      {
        title: '应用管理',
        name: 'application-management',
        icon: 'AppstoreOutlined',
        to: '/bsin-ui-upms/application-management',
      },
      {
        title: '岗位管理',
        name: 'position-management',
        icon: 'AppstoreOutlined',
        to: '/bsin-ui-upms/position-management',
      },
    ],
  },

  // react子应用
  'GET /api/app1':
    // 应用菜单
    {
      name: 'app1',
      title: 'react子应用',
      menuData: [
        {
          name: 'home',
          title: '首页',
          icon: 'DesktopOutlined',
          to: '/app1/home',
        },
        {
          // 一级菜单
          title: '页面',
          name: 'page',
          icon: 'PieChartOutlined',
          children: [
            // 二级
            {
              title: '页面一',
              name: 'page1',
              icon: 'PieChartOutlined',
              to: '/app1/page1',
            },
            {
              title: '页面二',
              name: 'page2',
              icon: 'PieChartOutlined',
              to: '/app1/page2',
            },
          ],
        },
        {
          title: '用户页',
          name: 'user',
          icon: 'DesktopOutlined',
          to: '/app1/user',
        },
        // 权限管理菜单 每个应用都要添加
        {
          name: 'bsin-ui-upms',
          title: '权限管理',
          icon: 'SettingOutlined',
          children: [
            {
              title: '应用管理',
              name: 'application-management',
              icon: 'AppstoreOutlined',
              to: '/app1/bsin-ui-upms/application-management',
            },
          ],
        },
      ],
    },

  // 流程引擎
  'GET /api/bsin-ui-workflow-admin': {
    name: 'bsin-ui-workflow-admin',
    title: '流程引擎',
    menuData: [
      {
        title: '模型设计',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '模型管理',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-workflow-admin/ModelManagementAdmin',
          },
          {
            title: '模型类型',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-workflow-admin/ModelTypeAdmin',
          },
          {
            title: '模型定义',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-workflow-admin/ModelDefinitionAdmin',
          },
        ],
      },
      {
        title: '流程管理',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '流程定义',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-workflow-admin/ProcessDefinitionAdmin',
          },
          {
            title: '流程任务',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-workflow-admin/ProcessTaskAdmin',
          },
          {
            title: '流程实例',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-workflow-admin/ProcessInstanceAdmin',
          },
          {
            title: '历史流程实例',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-workflow-admin/HistoryProcessInstanceAdmin',
          },
        ],
      },
      {
        name: 'bsin-ui-upms',
        title: '权限管理',
        icon: 'SettingOutlined',
        children: [
          {
            title: '应用管理',
            name: 'application-management',
            icon: 'AppstoreOutlined',
            to: '/app1/bsin-ui-upms/application-management',
          },
        ],
      },
    ],
  },

  // 数字资产管理
  'GET /api/bsin-ui-digital-assets-manager': {
    name: 'bsin-ui-digital-assets-manager',
    title: '数字资产管理',
    menuData: [
      {
        title: '首页',
        name: 'home',
        icon: 'DesktopOutlined',
        to: '/bsin-ui-digital-assets-manager/home',
      },
      {
        title: '交易管理',
        name: 'withdraw',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '提现交易',
            name: 'withdraw-record',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/withdraw-record',
          },
          {
            title: '提现审批',
            name: 'withdraw-apply',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/withdraw-apply',
          },
          {
            title: '付款交易',
            name: 'payment-history',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/payment-history',
          },
          {
            title: '充值记录',
            name: 'recharge-record',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/recharge-record',
          },
          {
            title: '转账记录',
            name: 'transfer-record',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/transfer-record',
          },
          {
            title: '折扣记录',
            name: 'discount-record',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/discount-record',
          },
          {
            title: '和平币发放记录',
            name: 'release-record',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/release-record',
          },
          {
            title: '积分交易',
            name: 'grant-integral',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/grant-integral',
          },
        ],
      },
      {
        title: '运营参数管理',
        name: 'operationalParameters',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '提现费率配置',
            name: 'withdrawal-rata',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/withdrawal-rata',
          },
          {
            title: '运营投放管理',
            name: 'launch-management',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/launch-management',
          },
        ],
      },
      {
        title: '积分发放规则',
        name: 'points-distribution',
        icon: 'PieChartOutlined',
        to: '/bsin-ui-digital-assets-manager/points-distribution',
      },
      {
        title: '商户管理',
        name: 'merchant',
        icon: 'PieChartOutlined',
        to: '/bsin-ui-digital-assets-manager/merchant',
      },
      {
        title: '会员管理',
        name: 'member',
        icon: 'PieChartOutlined',
        to: '/bsin-ui-digital-assets-manager/member',
      },
      {
        title: '账户管理',
        name: 'account-management',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '资产账户',
            name: 'asset-account',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/asset-account',
          },
          {
            title: '积分账户',
            name: 'points-account',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/points-account',
          },
        ],
      },
      {
        title: '密码管理',
        name: 'password',
        icon: 'PieChartOutlined',
        children: [
          {
            title: '交易密码重置记录',
            name: 'trading-password',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/trading-password',
          },
          {
            title: '登录密码重置记录',
            name: 'login-password',
            icon: 'PieChartOutlined',
            to: '/bsin-ui-digital-assets-manager/login-password',
          },
        ],
      },
      {
        name: 'bsin-ui-upms',
        title: '权限管理',
        icon: 'SettingOutlined',
        children: [
          {
            title: '应用管理',
            name: 'application-management',
            icon: 'AppstoreOutlined',
            to: '/bsin-ui-digital-assets-manager/bsin-ui-upms/application-management',
          },
        ],
      },
    ],
  },

  // 服务编排
  'GET /api/bsin-ui-orchestration': {
    name: 'bsin-ui-orchestration',
    title: '服务编排',
    menuData: [
      {
        name: 'bsin-ui-upms',
        title: '权限管理',
        icon: 'SettingOutlined',
        children: [
          {
            title: '应用管理',
            name: 'application-management',
            icon: 'AppstoreOutlined',
            to: '/app1/bsin-ui-upms/application-management',
          },
        ],
      },
    ],
  },
};
