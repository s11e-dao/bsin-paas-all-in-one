import type { ProColumns } from '@ant-design/pro-table';

// 定义请求返回数据类型
export type AppColumnsItem = {
  tenantName: string;
  tenantCode: string;
  tenantId: string;
  logo: string;
  type: string;
  status: number;
  remark: string;
  option: string;
};

// 定义表头
let columnsData: ProColumns<AppColumnsItem>[] = [
  {
    title: '租户名',
    dataIndex: 'tenantName',
    hideInTable: true,
  },
  {
    title: '租户编码',
    dataIndex: 'tenantCode',
    hideInTable: true,
  },
  // 上方查询，下方表头
  {
    title: '租户ID',
    fixed: 'left',
    hideInSearch: true,
    dataIndex: 'tenantId',
  },
  {
    title: '租户编码',
    hideInSearch: true,
    dataIndex: 'tenantCode',
  },
  {
    title: '租户名称',
    hideInSearch: true,
    dataIndex: 'tenantName',
  },
  {
    title: 'logo',
    hideInSearch: true,
    dataIndex: 'logo',
  },
  {
    title: '租户类型',
    hideInSearch: true,
    dataIndex: 'type',
  },
  {
    title: '租户状态',
    hideInSearch: true,
    dataIndex: 'status',
    valueEnum: {
      0: { text: '启用', status: 'Processing' },
      1: {
        text: '禁用',
        status: 'Error',
      },
    },
  },
  {
    title: '描述',
    hideInSearch: true,
    dataIndex: 'remark',
  },
  {
    title: '操作',
    fixed: 'right',
    align: 'center',
    hideInSearch: true,
    dataIndex: 'option',
  },
];
export default columnsData;
