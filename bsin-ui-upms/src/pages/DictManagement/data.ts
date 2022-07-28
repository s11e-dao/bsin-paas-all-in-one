import type { ProColumns } from '@ant-design/pro-table';
import type { DictColumnsItem, DictItemColumnsItem } from './data.d';

// 定义表头
let DictColumnsData: ProColumns<DictColumnsItem>[] = [
  // 查询
  {
    title: '类型',
    dataIndex: 'dictType',
    hideInTable: true,
    fieldProps: {
      maxLength: 20,
    },
  },
  {
    title: '字典类型',
    dataIndex: 'systemFlag',
    hideInTable: true,
    valueType: 'select',
    valueEnum: {
      0: { text: '系统类' },
      1: { text: '业务类' },
    },
  },
  // 表头
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 50,
    fixed: 'left',
  },
  {
    title: '类型',
    hideInSearch: true,
    dataIndex: 'dictType',
    ellipsis: true,
    width: 160,
    fixed: 'left',
  },
  {
    title: '字典类型',
    hideInSearch: true,
    dataIndex: 'systemFlag',
    width: 160,
    valueType: 'select',
    valueEnum: {
      0: { text: '系统类' },
      1: { text: '业务类' },
    },
  },
  {
    title: '创建时间',
    hideInSearch: true,
    dataIndex: 'createTime',
    valueType: 'dateTime',
    width: 160,
  },
  {
    title: '备注信息',
    hideInSearch: true,
    dataIndex: 'remark',
    width: 160,
  },
  {
    title: '操作',
    fixed: 'right',
    valueType: 'option',
    width: 150,
  },
];

// 字典项查看表头
export const DictItemColumnsData: ProColumns<DictItemColumnsItem>[] = [
  {
    title: '序号',
    dataIndex: 'index',
    valueType: 'indexBorder',
    width: 50,
    fixed: 'left',
  },
  {
    title: '类型',
    hideInSearch: true,
    dataIndex: 'dictType',
    ellipsis: true,
    width: 160,
    fixed: 'left',
  },
  {
    title: '数据值',
    hideInSearch: true,
    dataIndex: 'itemValue',
    ellipsis: true,
    width: 160,
  },
  {
    title: '标签名',
    hideInSearch: true,
    dataIndex: 'label',
    ellipsis: true,
    width: 160,
  },
  {
    title: '排序',
    hideInSearch: true,
    dataIndex: 'sort',
    width: 160,
  },
  {
    title: '备注信息',
    hideInSearch: true,
    dataIndex: 'remark',
    width: 160,
  },
  {
    title: '操作',
    fixed: 'right',
    valueType: 'option',
    width: 120,
  },
];

export default DictColumnsData;
