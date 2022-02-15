import type { ProColumns } from '@ant-design/pro-table';

export type TableListItem = {
  nickname: string;
  username: string;
  userId: string;
  status: number;
  orgId: string;
  tenantId: string;
  phone: string;
  email: string;
  type: string;
  option: string;
};

let columnsData: ProColumns<TableListItem>[] = [
  {
    title: '用户昵称',
    dataIndex: 'nickname',
    hideInTable: true,
  },
  {
    title: '用户名',
    dataIndex: 'username',
    hideInTable: true,
  },
  // 上方查询，下方表头
  {
    title: '用户ID',
    fixed: 'left',
    hideInSearch: true,
    width: 200,
    dataIndex: 'userId',
  },
  {
    title: '用户名',
    hideInSearch: true,
    width: 120,
    dataIndex: 'username',
  },
  {
    title: '状态',
    hideInSearch: true,
    width: 90,
    dataIndex: 'status',
    valueEnum: {
      0: { text: '在岗', status: 'Processing' },
      1: { text: '离职', status: 'Error' },
    },
  },
  {
    title: '所属机构id',
    hideInSearch: true,
    width: 200,
    dataIndex: 'orgId',
  },
  {
    title: '所属租户id',
    hideInSearch: true,
    width: 200,
    dataIndex: 'tenantId',
  },
  {
    title: '昵称',
    hideInSearch: true,
    width: 90,
    dataIndex: 'nickname',
  },
  {
    title: '电话号码',
    hideInSearch: true,
    width: 120,
    dataIndex: 'phone',
  },
  {
    title: '电子邮件',
    hideInSearch: true,
    width: 120,
    dataIndex: 'email',
  },
  {
    title: '用户类型',
    hideInSearch: true,
    width: 120,
    dataIndex: 'type',
  },
  {
    title: '操作',
    fixed: 'right',
    width: 170,
    hideInSearch: true,
    dataIndex: 'option',
  },
];

export default columnsData;
