// 定义表格数据类型
export type DictColumnsItem = {
  dictType: string;
  systemFlag: string | number;
  remark: string;
  createTime: string;
  id: string | number;
};

// 字典项查看表格数据
export type DictItemColumnsItem = {
  id: string | number;
  dictType: string;
  sort: string | number;
  remark: string;
  label: string;
  dictId: string | number;
};
