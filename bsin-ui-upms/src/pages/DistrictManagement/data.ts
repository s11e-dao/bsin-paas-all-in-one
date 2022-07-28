import { ColumnsType } from 'antd/lib/table';
import type { DistrictColumnsItem } from './data.d';

const DistrictColumnsData: ColumnsType<DistrictColumnsItem> = [
  {
    title: '地区名称',
    dataIndex: 'name',
    key: 'name',
    width: 180,
    fixed: 'left',
  },
  {
    title: 'id',
    dataIndex: 'regionId',
    key: 'regionId',
    width: 180,
  },
  {
    title: '地区序号',
    dataIndex: 'sort',
    key: 'sort',
    width: 100,
  },
  {
    title: '地区代码',
    dataIndex: 'code',
    key: 'code',
    width: 100,
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    key: 'createTime',
    width: 240,
  },
  {
    title: '备注',
    dataIndex: 'remark',
    key: 'remark',
    width: 140,
  },
  {
    title: '操作',
    dataIndex: 'option',
    key: 'option',
    width: 160,
    fixed: 'right',
  },
];

export default DistrictColumnsData;
