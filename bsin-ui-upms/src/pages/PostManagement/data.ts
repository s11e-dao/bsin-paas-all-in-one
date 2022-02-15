import type { ProColumns } from '@ant-design/pro-table';

// 定义请求返回数据类型
export type AppColumnsItem = {
  postCode: string;
  postName: string;
  postId: string;
  status: number;
  url: string;
  tenantId: string;
  createBy: string;
  createTime: string;
  updateBy: string;
  updateTime: string;
  remark: string;
  option: string;
};

// 定义表头
let columnsData: ProColumns<AppColumnsItem>[] = [
  {
    title: '岗位编码',
    dataIndex: 'postCode',
    hideInTable: true,
  },
  {
    title: '岗位名称',
    dataIndex: 'postName',
    hideInTable: true,
  },
  // 上方查询，下方表头
  {
    title: '岗位ID',
    fixed: 'left',
    hideInSearch: true,
    width: 200,
    dataIndex: 'postId',
  },
  {
    title: '岗位编码',
    hideInSearch: true,
    width: 200,
    dataIndex: 'postCode',
  },
  {
    title: '岗位名称',
    hideInSearch: true,
    width: 120,
    dataIndex: 'postName',
  },
  {
    title: '状态',
    hideInSearch: true,
    width: 90,
    dataIndex: 'status',
    valueEnum: {
      0: { text: '启用', status: 'Processing' },
      1: { text: '停用', status: 'Error' },
    },
  },
  {
    title: '租户id',
    hideInSearch: true,
    width: 200,
    dataIndex: 'tenantId',
  },
  {
    title: '创建者',
    hideInSearch: true,
    width: 90,
    dataIndex: 'createBy',
  },
  {
    title: '创建时间',
    hideInSearch: true,
    width: 200,
    dataIndex: 'createTime',
  },
  {
    title: '更新者',
    hideInSearch: true,
    width: 90,
    dataIndex: 'updateBy',
  },
  {
    title: '更新时间',
    hideInSearch: true,
    width: 200,
    dataIndex: 'updateTime',
  },
  {
    title: '描述',
    hideInSearch: true,
    width: 120,
    dataIndex: 'remark',
  },
  {
    title: '操作',
    hideInSearch: true,
    width: 180,
    dataIndex: 'option',
    fixed: 'right',
  },
];
export default columnsData;
