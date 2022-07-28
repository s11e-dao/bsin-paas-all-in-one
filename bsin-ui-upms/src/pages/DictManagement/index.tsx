import React from 'react';
import ProTable from '@ant-design/pro-table';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import {
  Descriptions,
  Modal,
  InputNumber,
  Button,
  Divider,
  Popconfirm,
  message,
  Form,
  Input,
  Select,
  DatePicker,
} from 'antd';
import DictColumnsData, { DictItemColumnsData } from './data';
import type { DictColumnsItem, DictItemColumnsItem } from './data.d';
import {
  getPageList,
  addPageList,
  editPageList,
  deletePageList,
  getDictItemPageList,
  addDictItemPageList,
  editDictItemPageList,
  deleteDictItemPageList,
} from './service';

const { Option } = Select;

const DictManagement = () => {
  // 控制查看模态框
  const [isCheckModalVisible, setIsCheckModalVisible] = React.useState(false);
  // 控制新增、编辑模态框
  const [isAddModalVisible, setIsAddModalVisible] = React.useState(false);
  // 控制新增、编辑模态框title
  const [addModalTitle, setAddModalTitle] = React.useState('');
  // 控制查看的字典的 DictType
  const [showDictItem, setShowDictItem] = React.useState<DictColumnsItem>();
  // 控制查看中新增、编辑模态框
  const [isCheckAddModalVisible, setIsCheckAddModalVisible] =
    React.useState(false);
  // 控制查看中新增、编辑模态框title
  const [checkAddModalTitle, setCheckAddModalTitle] = React.useState('');
  // 查看字典项编辑对象
  const [checkItem, setCheckItem] = React.useState<
    DictItemColumnsItem | DictColumnsItem
  >();

  // 查看模态框取消
  const handleCheckModalCancel = () => {
    console.log('handleCheckModalCancel');
    setIsCheckModalVisible(false);
  };

  // 点击新增
  const DictAdd = () => {
    console.log('DictAdd');
    setAddModalTitle('新增');
    setIsAddModalVisible(true);
  };

  // 点击编辑
  const handleEditModel = (record: DictColumnsItem) => {
    console.log('handleEditModel', record);
    dictForm.setFieldsValue(record);
    setCheckItem(record);
    setAddModalTitle('编辑');
    setIsAddModalVisible(true);
  };

  // 新增、编辑模态框取消按钮
  const handleAddModalCancel = () => {
    console.log('handleAddModalCancel');
    dictForm.resetFields();
    setIsAddModalVisible(false);
  };

  // 新增、编辑模态框确定按钮
  const handleAddModalOk = () => {
    console.log('handleAddModalOk');
    // 表单验证
    dictForm.validateFields().then(async () => {
      let response = dictForm.getFieldsValue();
      console.log(response);

      if (addModalTitle === '新增') {
        let res = await addPageList(response);
        console.log(res);
        res ? message.success('新增成功') : message.error('添加失败！');
      } else {
        let res = await editPageList({
          ...response,
          id: checkItem?.id,
        });
        res ? message.success('修改成功') : message.error('修改失败！');
      }
      setIsAddModalVisible(false);
      dictForm.resetFields();
      // 刷新
      DictRef?.current?.reload();
    });
  };

  // 点击查看
  const handleCheckBtn = (record: DictColumnsItem) => {
    console.log('handleCheckModel');
    setShowDictItem(record);
    setIsCheckModalVisible(true);
  };

  // 确定删除
  const confirmDel = async (id?: string | number) => {
    console.log('confirmDel');
    let res = await deletePageList({ id });
    console.log(res);
    // 刷新
    DictRef?.current?.reload();
  };

  // 定义操作单元格
  const columnsOptionRender = (text: any, record: DictColumnsItem) => {
    return [
      <div key={record.dictType}>
        <a onClick={() => handleCheckBtn(record)}>查看</a>
        <Divider type="vertical" />
        <a onClick={() => handleEditModel(record)}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm
          title="是否删除此条数据?"
          onConfirm={() => confirmDel(record.id)}
          onCancel={() => {
            message.warning(`取消删除`);
          }}
          okText="是"
          cancelText="否"
        >
          <a>删除</a>
        </Popconfirm>
      </div>,
    ];
  };

  // 列渲染样式赋值
  DictColumnsData.forEach((item) => {
    item.valueType === 'option'
      ? (item.render = columnsOptionRender)
      : undefined;
  });

  // 查看字典新增
  const DictItemAdd = () => {
    console.log('DictItemAdd');
    checkForm.setFieldsValue({ dictType: showDictItem?.dictType });
    setCheckAddModalTitle('新增');
    setIsCheckAddModalVisible(true);
  };

  // 查看字典项编辑
  const handleCheckEditModel = (record: DictItemColumnsItem) => {
    console.log('handleCheckEditModel', record);
    setCheckAddModalTitle('编辑');
    checkForm.setFieldsValue(record);
    setCheckItem(record);
    setIsCheckAddModalVisible(true);
  };

  //查看字典新增、编辑模态框确定
  const handleCheckAddModalOk = () => {
    console.log('handleCheckAddModalOk');
    // 表单验证
    checkForm.validateFields().then(async () => {
      let response = checkForm.getFieldsValue();
      console.log(response);

      if (checkAddModalTitle === '新增') {
        let res = await addDictItemPageList({
          ...response,
          dictId: showDictItem?.id,
        });
        console.log(res);
        res ? message.success('新增成功') : message.error('添加失败！');
      } else {
        console.log(checkItem);

        let res = await editDictItemPageList({
          ...response,
          id: checkItem?.id,
        });
        res ? message.success('修改成功') : message.error('修改失败！');
      }
      checkForm.resetFields();
      setIsCheckAddModalVisible(false);
      // 刷新
      DictItemRef?.current?.reload();
    });
  };

  //查看字典新增、编辑模态框取消
  const handleCheckAddModalCancel = () => {
    console.log('handleCheckAddModalCancel');
    checkForm.resetFields();
    setIsCheckAddModalVisible(false);
  };

  // 查看字典项删除
  const CheckConfirmDel = async (id?: string | number) => {
    console.log('CheckConfirmDel');
    console.log(id);

    let res = await deleteDictItemPageList({ id });
    console.log(res);

    // 刷新
    DictItemRef?.current?.reload();
  };

  // 定义字典项查看操作单元格
  const CheckColumnsOptionRender = (text: any, record: DictItemColumnsItem) => {
    return [
      <div key={record.id}>
        <a onClick={() => handleCheckEditModel(record)}>编辑</a>
        <Divider type="vertical" />
        <Popconfirm
          title="是否删除此条数据?"
          onConfirm={() => CheckConfirmDel(record.id)}
          onCancel={() => {
            message.warning(`取消删除`);
          }}
          okText="是"
          cancelText="否"
        >
          <a>删除</a>
        </Popconfirm>
      </div>,
    ];
  };

  // 查看字典项表格操作行渲染
  DictItemColumnsData.forEach((item) => {
    item.valueType === 'option'
      ? (item.render = CheckColumnsOptionRender)
      : undefined;
  });

  // 字典表 Table action 的引用，便于自定义触发
  const DictRef = React.useRef<ActionType>();
  // 字典项表 Table action 的引用，便于自定义触发
  const DictItemRef = React.useRef<ActionType>();
  // 字典新增、编辑表单
  const [dictForm] = Form.useForm();
  // 查看新增、编辑表单
  const [checkForm] = Form.useForm();
  return (
    <>
      {/* 列表 */}
      <ProTable<DictColumnsItem>
        scroll={{ x: 900 }}
        bordered
        headerTitle="字典管理"
        columns={DictColumnsData}
        actionRef={DictRef}
        // 请求的数据
        request={async (params) => {
          let res = await getPageList({ ...params, pageNum: params.current });
          console.log(res);
          return {
            data: res.data,
            total: res.pagination.totalSize,
          };
        }}
        // 本地储存表格列的显示参数
        columnsState={{
          persistenceKey: 'DictTable',
          persistenceType: 'localStorage',
        }}
        // 每行表格的key
        rowKey="dictType"
        // 搜索表单布局配置
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            onClick={DictAdd}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            新增
          </Button>,
        ]}
        // 分页相关配置
        pagination={{
          // 初始页面数据条数
          pageSize: 10,
        }}
        dateFormatter="string"
      />
      {/* 字典编辑、新增模态框 */}
      <Modal
        title={addModalTitle}
        visible={isAddModalVisible}
        onOk={handleAddModalOk}
        onCancel={handleAddModalCancel}
      >
        <Form
          name="basic"
          form={dictForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item
            label="类型"
            name="dictType"
            rules={[{ required: true, message: '请输入类型!' }]}
          >
            <Input disabled={addModalTitle === '新增' ? false : true} />
          </Form.Item>
          <Form.Item
            label="字典类型"
            name="systemFlag"
            rules={[{ required: true, message: '请选择字典类型!' }]}
          >
            <Select style={{ width: '100%' }} allowClear>
              <Option value="0">系统类</Option>
              <Option value="1">业务类</Option>
            </Select>
          </Form.Item>
          <Form.Item label="备注" name="remark">
            <Input />
          </Form.Item>
          {addModalTitle === '编辑' ? (
            <Form.Item label="创建时间" name="createTime">
              <Input disabled />
            </Form.Item>
          ) : null}
        </Form>
      </Modal>
      {/* 查看模态框 */}
      <Modal
        bodyStyle={{ margin: 0, padding: 0 }}
        width={1200}
        title="字典项管理"
        visible={isCheckModalVisible}
        onCancel={handleCheckModalCancel}
        footer={[]}
      >
        <ProTable<DictItemColumnsItem>
          actionRef={DictItemRef}
          scroll={{ x: 900 }}
          columns={DictItemColumnsData}
          params={{ dictType: showDictItem?.dictType }}
          // 请求的数据
          request={async (params) => {
            console.log(params);

            let res = await getDictItemPageList({
              ...params,
              pageNum: params.current,
            });
            console.log(res);
            return {
              data: res.data,
              total: res.pagination.totalSize,
            };
          }}
          rowKey="id"
          search={false}
          dateFormatter="string"
          headerTitle="字典项列表"
          toolBarRender={() => [
            <Button
              onClick={DictItemAdd}
              key="button"
              icon={<PlusOutlined />}
              type="primary"
            >
              新增
            </Button>,
          ]}
          // 分页相关配置
          pagination={{
            // 初始页面数据条数
            pageSize: 10,
          }}
        />
      </Modal>

      {/* 查看详情中的编辑、新增模态框 */}
      <Modal
        title={checkAddModalTitle}
        visible={isCheckAddModalVisible}
        onOk={handleCheckAddModalOk}
        onCancel={handleCheckAddModalCancel}
      >
        <Form
          name="basic"
          form={checkForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          initialValues={{ remember: true }}
          autoComplete="off"
        >
          <Form.Item label="类型" name="dictType">
            <Input disabled />
          </Form.Item>
          <Form.Item
            label="数据值"
            name="itemValue"
            rules={[{ required: true, message: '请输入描述!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="标签名"
            name="label"
            rules={[{ required: true, message: '请选择字典类型!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="排序" name="sort">
            <InputNumber />
          </Form.Item>
          <Form.Item label="备注信息" name="remark">
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default DictManagement;
