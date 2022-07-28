// 定义请求返回数据类型
export type DistrictColumnsItem = {
  regionId: string;
  name: string;
  sort: string;
  code: string;
  createTime: string;
  remark: string;
  parentCode: string;
  status: string;
  children?: DistrictColumnsItem[];
};
