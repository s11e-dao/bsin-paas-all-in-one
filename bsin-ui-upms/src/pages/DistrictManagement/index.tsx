import React from 'react';
import {
  Card,
  Button,
  Table,
  Divider,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Select,
} from 'antd';
import { PlusOutlined, QuestionCircleOutlined } from '@ant-design/icons';
import DistrictColumnsData from './data';
import type { DistrictColumnsItem } from './data.d';
import {
  getSubNodeTree,
  addSubNodeTree,
  editSubNodeTree,
  deleteSubNodeTree,
  getTopLayerRegions,
} from './service';
import styles from './index.less';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import TableTitle from '@/components/TableTitle';

const { Option } = Select;

const DistrictManagement = () => {
  // 表格数据
  const [tableData, setTableData] = React.useState([]);
  // 表格加载状态
  const [loading, setLoading] = React.useState(false);
  // 模态框
  const [isFromModal, setIsFromModal] = React.useState(false);
  // 新增模态框title
  const [fromModalTitle, setFromModalTitle] = React.useState('');
  // 新增信息
  const [itemInfo, setItemInfo] = React.useState<DistrictColumnsItem>();
  // 获取表单
  const [formRef] = Form.useForm();

  // 确认add
  const formOk = () => {
    formRef.validateFields().then(async () => {
      let response = formRef.getFieldsValue();
      console.log(response);

      if (fromModalTitle === '新增') {
        let res = await addSubNodeTree({ ...response, parentCode: 0 });
        console.log(res);
        res ? message.success('新增成功') : message.error('添加失败！');
      } else if (fromModalTitle === '添加') {
        let res = await addSubNodeTree({
          ...response,
          parentCode: itemInfo?.code,
        });
        res ? message.success('添加成功') : message.error('添加失败！');
      } else {
        let res = await editSubNodeTree({
          ...response,
          regionId: itemInfo?.regionId,
        });
        console.log(res);
        res ? message.success('修改成功') : message.error('修改失败！');
      }
      setIsFromModal(false);
      formRef.resetFields();
      // 刷新表格
      actionRef.current?.reload();
    });
  };

  // 取消
  const formCancel = () => {
    setIsFromModal(false);
    // 重置表单数据
    formRef.resetFields();
  };

  // 新增
  const add = () => {
    setFromModalTitle('新增');
    setIsFromModal(true);
  };

  // 添加
  const handleAdd = (record: DistrictColumnsItem) => {
    setFromModalTitle('添加');
    console.log('handleAdd');
    setItemInfo(record);
    setIsFromModal(true);
  };

  // 编辑
  const handleEdit = (record: DistrictColumnsItem) => {
    setFromModalTitle('编辑');
    setItemInfo(record);
    console.log('Edit');
    // 数据回显
    formRef.setFieldsValue(record);
    setIsFromModal(true);
  };

  // 删除
  const delOk = async (record: DistrictColumnsItem) => {
    console.log('del');
    let res = await deleteSubNodeTree({ regionId: record.regionId });
    console.log(res);
    res ? message.success('删除成功') : message.error('删除失败！');
    // 刷新表格
    actionRef.current?.reload();
  };

  // 定义操作行
  const columnsActionRender: any = {
    option: (text: any, record: any, index: number) => (
      <div>
        <a
          onClick={() => {
            handleAdd(record);
          }}
        >
          添加
        </a>
        <Divider type="vertical" />
        <a
          onClick={() => {
            handleEdit(record);
          }}
        >
          编辑
        </a>
        <Divider type="vertical" />
        <Popconfirm
          title="是否删除此条数据？"
          onConfirm={() => {
            delOk(record);
          }}
          onCancel={() => {
            message.warning(`取消删除！`);
          }}
          okText="是"
          cancelText="否"
        >
          <a>删除</a>
        </Popconfirm>
      </div>
    ),
  };

  // 渲染操作行
  DistrictColumnsData.forEach((item: any) => {
    if (item.dataIndex === 'option')
      item.render = columnsActionRender[item.dataIndex];
  });

  // Table action 的引用，便于自定义触发 用于更改数据之后的表单刷新
  const actionRef = React.useRef<ActionType>();
  return (
    <>
      <ProTable<DistrictColumnsItem>
        actionRef={actionRef}
        // 请求数据
        request={async (params) => {
          let res = await getTopLayerRegions({ ...params });
          console.log('🎉', res);
          const result = {
            data: res.data,
          };
          return result;
        }}
        scroll={{ x: 900 }}
        rowKey="code"
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        columns={DistrictColumnsData}
        search={false}
        dateFormatter="string"
        headerTitle={<TableTitle title="区域管理" />}
        toolBarRender={() => [
          <Button type="primary" icon={<PlusOutlined />} onClick={add}>
            新增
          </Button>,
        ]}
      />

      {/* 添加模态框 */}
      <Modal
        title={fromModalTitle}
        visible={isFromModal}
        onOk={formOk}
        onCancel={formCancel}
        cancelText="取消"
        okText="确定"
      >
        <Form
          form={formRef}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ Type: 1, status: 0 }}
        >
          <Form.Item
            label="地区名称"
            name="name"
            rules={[{ required: true, message: '请输入地区名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="地区序号"
            name="sort"
            rules={[{ required: true, message: '请输入地区序号!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="地区代码"
            name="code"
            rules={[{ required: true, message: '请输入地区代码!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="层级"
            name="layer"
            rules={[{ required: true, message: '请选择地区层级!' }]}
          >
            <Select style={{ width: '100%' }} allowClear>
              <Option value="1">省级</Option>
              <Option value="2">地市</Option>
              <Option value="3">县区</Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="状态"
            name="status"
            rules={[{ required: true, message: '请输入地区状态!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="备注"
            name="remark"
            rules={[{ required: true, message: '请输入地区备注!' }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DistrictManagement;
