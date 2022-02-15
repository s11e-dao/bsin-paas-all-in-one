import type { ProColumns } from '@ant-design/pro-table';

// 定义请求返回数据类型
export type AppColumnsItem = {
  orgId: string;
  orgCode: string;
  orgName: string;
  appCode: string;
  url: string;
  level: number;
  type: string;
  tenantId: string;
  parentId: string;
  leader: string;
  phone: string;
  address: string;
  email: string;
  remark: string;
  option: string;
};

// 定义表头
let columnsData: ProColumns<AppColumnsItem>[] = [
  {
    title: '机构ID',
    dataIndex: 'orgId',
    hideInTable: true,
  },
  {
    title: '机构编码',
    dataIndex: 'orgCode',
    hideInTable: true,
  },
  {
    title: '机构名称',
    dataIndex: 'orgName',
    hideInTable: true,
  },
  // 上方查询，下方表头
  {
    title: '机构ID',
    fixed: 'left',
    hideInSearch: true,
    width: 260,
    dataIndex: 'orgId',
  },
  {
    title: '机构编码',
    hideInSearch: true,
    width: 200,
    dataIndex: 'orgCode',
  },
  {
    title: '机构名称',
    hideInSearch: true,
    width: 120,
    dataIndex: 'orgName',
  },
  {
    title: '机构级别',
    hideInSearch: true,
    width: 90,
    dataIndex: 'level',
  },
  {
    title: '机构类型',
    hideInSearch: true,
    width: 90,
    dataIndex: 'type',
  },
  {
    title: '租户id',
    hideInSearch: true,
    width: 200,
    dataIndex: 'tenantId',
  },
  {
    title: '父级id',
    hideInSearch: true,
    width: 200,
    dataIndex: 'parentId',
  },
  {
    title: '负责人',
    hideInSearch: true,
    width: 90,
    dataIndex: 'leader',
  },
  {
    title: '办公电话',
    hideInSearch: true,
    width: 120,
    dataIndex: 'phone',
  },
  {
    title: '地址',
    hideInSearch: true,
    width: 120,
    dataIndex: 'address',
  },
  {
    title: '电子邮箱',
    width: 140,
    hideInSearch: true,
    dataIndex: 'email',
  },
  {
    title: '描述',
    hideInSearch: true,
    width: 120,
    dataIndex: 'remark',
  },
  {
    title: '操作',
    fixed: 'right',
    align: 'center',
    width: 230,
    hideInSearch: true,
    dataIndex: 'option',
  },
];
export default columnsData;
