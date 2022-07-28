import columnsData, { AppColumnsItem } from './data';
import React, { useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  getTenantList,
  addTenantInfo,
  delTenantInfo,
  editTenantInfo,
  getAppList,
  getAppListByTenantId,
  empowerApp,
} from './service';
import TableTitle from '@/components/TableTitle';
import {
  Modal,
  Popconfirm,
  message,
  Form,
  Input,
  Divider,
  Tag,
  Select,
  Transfer,
  ConfigProvider,
  Button,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
// 汉语
import locale from 'antd/lib/locale/zh_CN';

export default () => {
  const { TextArea } = Input;
  const { Option } = Select;
  // 控制模态框
  const [isFormModal, setIsFormModal] = useState(false);
  // 控制option是add还是edit
  const [isOption, setIsOption] = useState({});
  // 获取表单信息
  const [FormRef] = Form.useForm();
  // 存储record
  const [isRecord, setIsRecord] = useState({});
  // Table action 的引用，便于自定义触发 用于更改数据之后的表单刷新
  const actionRef = React.useRef<ActionType>();
  // 控制授权模态框
  const [isEmpowerModal, setIsEmpowerModal] = useState(false);
  // 表头赋值
  const columns: ProColumns<AppColumnsItem>[] = columnsData;
  // 存储选中的key
  const [targetKeys, setTargetKeys] = useState([]);
  // 存储请求出来的应用
  const [AppList, setAppList] = useState([]);

  // handleadd
  const handleAddTenantInfo = () => {
    // option === add
    setIsOption({ option: 'add' });
    setIsFormModal(true);
  };

  // confirmAdd/Edit
  const confirmTenantInfo = () => {
    FormRef.validateFields()
      .then(async () => {
        let response = FormRef.getFieldsValue();
        if (isOption.option === 'add') {
          let res = await addTenantInfo({
            ...response,
          });
          res ? message.success('添加成功') : message.error('添加失败！');
        } else {
          // 编辑操作所需id
          const { tenantId } = isRecord;
          let res = await editTenantInfo({
            ...response,
            tenantId,
          });
          res ? message.success('编辑成功') : message.error('编辑失败！');
        }
        // 重置表单
        FormRef.resetFields();
        // 刷新表单
        actionRef.current?.reload();
        setIsFormModal(false);
      })
      .catch(() => {});
  };

  // cancelAdd
  const cancelTenantInfo = () => {
    // 重置表单
    FormRef.resetFields();
    setIsFormModal(false);
  };

  // confirmDel
  const confirmDelTenantInfo = async (record: object) => {
    const { tenantId } = record;
    let res = await delTenantInfo({ tenantId });
    res ? message.success('删除成功') : message.error('删除失败！');
    // 刷新表单
    actionRef.current?.reload();
  };

  // cancelDel
  const cancelDelTenantInfo = () => {
    message.warning(`取消删除`);
  };

  // handleEdit
  const handleEditTenantInfo = async (record: object) => {
    // option === edit
    setIsOption({ option: 'edit' });
    setIsFormModal(true);
    // 数据回显
    FormRef.setFieldsValue(record);
    // 存储每行record
    setIsRecord(record);
  };

  // handleEmpower
  const handleEmpower = async (record: object) => {
    const { tenantId } = record;
    // 存储record
    setIsRecord(record);
    // 左侧查询全部应用
    let { data: applist } = await getAppList({});
    // 右侧查询已经授权的应用
    let { data } = await getAppListByTenantId({ tenantId });
    console.log(applist);
    // 找到已授权的所有appID结合
    let appListByTenantId = new Array();
    data.forEach((item) => {
      appListByTenantId.push(item.appId);
    });
    // 全部应用
    setAppList(applist);
    // 已有应用
    setTargetKeys(appListByTenantId);
    setIsEmpowerModal(true);
  };

  // confirmEmpower
  const confirmEmpower = async () => {
    const { tenantId } = isRecord;
    let { code } = await empowerApp({ tenantId, appIds: targetKeys });
    code === '000000' ? message.success('授权应用成功') : '';
    setIsEmpowerModal(false);
  };

  // cancelEmpower
  const cancelEmpower = () => {
    setIsEmpowerModal(false);
  };

  // 树改变回调函数
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  // 操作列渲染
  const optionRender = (text: any, record: any, index: number) => [
    <div key={record.tenantId}>
      <a onClick={() => handleEditTenantInfo(record)}>编辑</a>
      <Divider type="vertical" />
      <Popconfirm
        title="是否删除此条数据?"
        onConfirm={() => confirmDelTenantInfo(record)}
        onCancel={cancelDelTenantInfo}
        okText="是"
        cancelText="否"
      >
        <a>删除</a>
      </Popconfirm>
      <Divider type="vertical" />
      <a
        onClick={() => {
          handleEmpower(record);
        }}
      >
        授权应用
      </a>
    </div>,
  ];

  // 机构名称渲染
  const orgTypeRender = (text: any, record: any, index: number) => (
    <div key={record.type}>
      {record.type === 0 ? (
        <Tag color="#f50">超级租户</Tag>
      ) : (
        <Tag color="#2db7f5">普通租户</Tag>
      )}
    </div>
  );

  // 自定义表格头部渲染
  columns.forEach((item: any) => {
    item.dataIndex === 'option' ? (item.render = optionRender) : undefined;
    item.dataIndex === 'type' ? (item.render = orgTypeRender) : undefined;
  });

  return (
    <div>
      {/* 表格 */}
      <ProTable<AppColumnsItem>
        actionRef={actionRef}
        scroll={{ x: 900 }}
        bordered
        pagination={{
          showQuickJumper: true,
          pageSize: 10,
        }}
        headerTitle={<TableTitle title="租户管理" />}
        columns={columns}
        // 请求数据
        request={async (params) => {
          let res = await getTenantList({
            ...params,
          });
          const result = {
            data: res.data,
            total: res.pagination.totalSize,
          };
          return result;
        }}
        // 每行表格的key
        rowKey="tenantId"
        // 搜索表单布局配置
        search={{
          labelWidth: 'auto',
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleAddTenantInfo}
          >
            新建
          </Button>,
        ]}
      />
      {/* 新增模态框 */}
      <Modal
        title={isOption.option === 'add' ? '新增租户' : '编辑租户'}
        centered
        visible={isFormModal}
        onOk={confirmTenantInfo}
        onCancel={cancelTenantInfo}
      >
        <Form
          name="basic"
          form={FormRef}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ type: 1, status: 0 }}
        >
          <Form.Item
            label="租户编码"
            name="tenantCode"
            rules={[{ required: true, message: '请输入租户编码!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="租户名称"
            name="tenantName"
            rules={[{ required: true, message: '请输入租户名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="logo" name="logo">
            <Input />
          </Form.Item>
          {isOption.option === 'add' ? (
            <>
              <Form.Item label="租户类型" name="type">
                <Select disabled>
                  <Option value={1}>普通租户</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="登录名"
                name="username"
                rules={[{ required: true, message: '请输入登录名!' }]}
              >
                <Input />
              </Form.Item>
            </>
          ) : (
            ''
          )}
          <Form.Item label="租户状态" name="status">
            <Select>
              <Option value={0}>启用</Option>
              <Option value={1}>禁用</Option>
            </Select>
          </Form.Item>
          <Form.Item label="描述" name="remark">
            <TextArea
              placeholder="请输入相关描述信息"
              autoSize={{ minRows: 2, maxRows: 8 }}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* 穿梭模态框 */}
      <Modal
        title="租户授权应用"
        centered
        visible={isEmpowerModal}
        onOk={confirmEmpower}
        onCancel={cancelEmpower}
        width={810}
      >
        <ConfigProvider locale={locale}>
          <Transfer
            dataSource={AppList}
            // 是否显示全选全部选框
            showSelectAll={false}
            listStyle={{ minWidth: 360, minHeight: 360 }}
            // 渲染
            render={(item) => item.appName}
            rowKey={(item) => item.appId}
            titles={['可授权应用', '已授权应用']}
            // 显示在右侧框数据的 key 集合
            // 必须要有key值
            targetKeys={targetKeys}
            // 点击<>的事件
            onChange={onChange}
          />
        </ConfigProvider>
      </Modal>
    </div>
  );
};
