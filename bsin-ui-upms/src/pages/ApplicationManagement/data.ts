import type { ProColumns } from '@ant-design/pro-table';

// 定义请求返回数据类型
export type AppColumnsItem = {
  appId: string;
  appName: string;
  appCode: string;
  url: string;
  appLanguage: string;
  createBy: string;
  createTime: string;
  logo: string;
  status: number;
  member: string;
  remark: string;
  updateTime: string;
};

// 定义表头
let columnsData: ProColumns<AppColumnsItem>[] = [
  {
    title: 'ID查询',
    dataIndex: 'appId',
    hideInTable: true,
  },
  {
    title: '应用名称查询',
    hideInTable: true,
    dataIndex: 'appName',
  },

  // 上方查询，下方表头

  {
    title: '应用ID',
    fixed: 'left',
    width: 200,
    hideInSearch: true,
    dataIndex: 'appId',
  },
  {
    title: '应用编号',
    width: 180,
    hideInSearch: true,
    dataIndex: 'appCode',
  },
  {
    title: '应用名称',
    width: 120,
    hideInSearch: true,
    dataIndex: 'appName',
  },
  {
    title: '应用语言',
    hideInSearch: true,
    width: 90,
    dataIndex: 'appLanguage',
  },
  {
    title: '应用类型',
    width: 90,
    hideInSearch: true,
    dataIndex: 'type',
    valueEnum: {
      1: { text: '普通应用' },
      0: { text: '默认应用' },
    },
  },
  {
    title: '应用状态',
    width: 90,
    hideInSearch: true,
    dataIndex: 'status',
    valueEnum: {
      1: { text: '启用', status: 'Processing' },
      0: { text: '未启用', status: 'Default' },
    },
  },
  {
    title: '应用图标',
    width: 120,
    hideInSearch: true,
    dataIndex: 'logo',
  },
  {
    title: '启动端口',
    width: 180,
    hideInSearch: true,
    dataIndex: 'url',
  },
  {
    title: '应用描述',
    width: 200,
    hideInSearch: true,
    dataIndex: 'remark',
  },
  {
    title: '创建人',
    width: 120,
    hideInSearch: true,
    dataIndex: 'createBy',
  },
  {
    title: '创建时间',
    width: 200,
    hideInSearch: true,
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    fixed: 'right',
    width: 90,
    hideInSearch: true,
    dataIndex: 'option',
  },
];
export default columnsData;
