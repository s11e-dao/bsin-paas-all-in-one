import { ColumnsType } from 'antd/lib/table';
// 定义请求返回数据类型
export type AppColumnsItem = {
  menuName: string;
  menuId: string;
  menuCode: string;
  status: number;
  icon: string;
  appId: string;
  parentId: string;
  remark: string;
  permission: number;
  member: string;
  updateTime: string;
};

// 定义表头
let columnsData: ColumnsType<AppColumnsItem> = [
  {
    title: '菜单名称',
    dataIndex: 'menuName',
    fixed: 'left',
    width: 180,
  },
  {
    title: '菜单Id',
    dataIndex: 'menuId',
    width: 200,
  },
  {
    title: '菜单编码',
    dataIndex: 'menuCode',
    width: 200,
  },
  {
    title: '菜单类型',
    dataIndex: 'type',
    width: 90,
  },
  {
    title: '菜单图标',
    dataIndex: 'icon',
    width: 90,
  },
  {
    title: '应用ID',
    dataIndex: 'appId',
    width: 200,
  },
  {
    title: '父级ID',
    dataIndex: 'parentId',
    width: 200,
  },
  {
    title: '组件路径',
    dataIndex: 'path',
    width: 240,
  },
  {
    title: '描述',
    dataIndex: 'remark',
    width: 100,
  },
  {
    title: '状态',
    dataIndex: 'status',
    width: 90,
  },
  {
    title: '权限标识',
    dataIndex: 'permission',
    width: 90,
  },
  {
    title: '操作',
    dataIndex: 'action',
    fixed: 'right',
    width: 160,
  },
];
export default columnsData;
