import columnsData, { AppColumnsItem } from './data';
import React, { useState } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  getPostList,
  addPostInfo,
  editPostInfo,
  delPostInfo,
  assignRole,
  getRoleList,
  getAssignedRoleList,
  getAppList,
} from './service';
import TableTitle from '@/components/TableTitle';
import {
  Modal,
  Popconfirm,
  message,
  Form,
  Input,
  Divider,
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

  // 新增模态框
  const [isFormModal, setIsFormModal] = useState(false);
  // 获取编辑表单信息
  const [FormRef] = Form.useForm();
  // Table action 的引用，便于自定义触发 用于更改数据之后的表单刷新
  const actionRef = React.useRef<ActionType>();
  // 存储record
  const [isRecord, setIsRecord] = useState({});
  // 存储当前操作
  const [isOption, setIsOption] = useState({});
  // 控制角色模态框
  const [isAssignModal, setIsAssignModal] = useState(false);
  // 存储选中的key 存储请求出来的已经分配的角色
  const [targetKeys, setTargetKeys] = useState([]);
  // 存储请求出来的全部角色
  const [roleList, setRoleList] = useState([]);
  // 存储请求出来的全部应用用于search
  const [appList, setAppList] = useState([]);
  // 存储appId
  const [isAppId, setIsAppId] = useState('');
  // 表头赋值
  const columns: ProColumns<AppColumnsItem>[] = columnsData;

  // 操作列渲染
  const optionRender = (text: any, record: any, index: number) => [
    <div key={record.postId}>
      <a onClick={() => handleEditModel(record)}>编辑</a>
      <Divider type="vertical" />
      <Popconfirm
        title="是否删除此条数据?"
        onConfirm={() => confirmDel(record.postId)}
        onCancel={() => {
          message.warning(`取消删除`);
        }}
        okText="是"
        cancelText="否"
      >
        <a>删除</a>
      </Popconfirm>
      <Divider type="vertical" />
      <a onClick={() => assignRoleModal(record)}>分配角色</a>
    </div>,
  ];

  // add模态框
  const handleAddModel = (record: object) => {
    setIsOption({ option: 'add' });
    setIsFormModal(true);
  };

  // edit模态框
  const handleEditModel = (record: object) => {
    setIsOption({ option: 'edit' });
    // 数据回显
    FormRef.setFieldsValue(record);
    setIsRecord(record);
    setIsFormModal(true);
  };

  // cancel
  const cancelOrgInfo = () => {
    // 重置表单
    FormRef.resetFields();
    setIsFormModal(false);
  };

  // 确定操作
  const confirmPostInfo = () => {
    const { postId } = isRecord;
    FormRef.validateFields()
      .then(async () => {
        var response = FormRef.getFieldsValue();
        if (isOption.option === 'add') {
          let res = await addPostInfo({
            ...response,
          });
          res ? message.success('添加成功') : message.error('添加失败！');
        } else {
          let res = await editPostInfo({
            ...response,
            postId,
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

  // del
  const confirmDel = async (postId: string) => {
    let res = await delPostInfo({ postId });
    res ? message.success('删除成功') : message.error('删除失败！');
    // 刷新表单
    actionRef.current?.reload();
  };

  // 分配角色
  const assignRoleModal = async (record: object) => {
    // 保留当前行数据
    setIsRecord(record);
    setIsAssignModal(true);
  };

  // 确定分配
  const confirmAssign = async () => {
    const { postId } = isRecord;
    let res = await assignRole({
      postId,
      roleIds: targetKeys,
      appId: isAppId,
    });
    res ? message.success('分配成功') : message.error('分配失败！');
    setIsAssignModal(false);
  };

  // 取消授权
  const cancelAssign = () => {
    setIsAssignModal(false);
  };

  // 树改变回调函数
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  // 搜索应用
  const searchAppList = async () => {
    let { data } = await getAppList({});
    setAppList(data);
  };

  // 根据应用查看可分配角色
  const searchChange = async (value) => {
    // 保存appId用于确定的时候分配角色
    setIsAppId(value);
    const { postId } = isRecord;
    // 全部的角色
    let { data: roleList } = await getRoleList({ appId: value });
    // 当前岗位下的角色
    let { data } = await getAssignedRoleList({ postId });
    // 创建遍历数组拿到roleId集合
    let assignedRoleList = new Array();
    data.forEach((item) => {
      assignedRoleList.push(item.roleId);
    });
    // 右侧已经有的角色展示
    setTargetKeys(assignedRoleList);
    // 存储请求的数据用于渲染穿梭框
    setRoleList(roleList);
  };

  // 自定义表格头部渲染
  columns.forEach((item: any) => {
    item.dataIndex === 'option' ? (item.render = optionRender) : undefined;
  });

  return (
    <div>
      {/* 表格 */}
      <ProTable<AppColumnsItem>
        actionRef={actionRef}
        scroll={{ x: 900 }}
        bordered
        headerTitle={<TableTitle title="岗位管理" />}
        columns={columns}
        // 请求数据
        request={async (params) => {
          let { data } = await getPostList({ ...params });
          const result = {
            data,
          };
          return result;
        }}
        // 每行表格的key
        rowKey="postId"
        // 搜索表单布局配置
        search={{
          labelWidth: 'auto',
        }}
        // 分页相关配置
        pagination={{
          // 初始页面数据条数
          pageSize: 10,
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={handleAddModel}
          >
            新建
          </Button>,
        ]}
      />
      {/* 新增模态框 */}
      <Modal
        title="新增岗位"
        centered
        visible={isFormModal}
        onOk={confirmPostInfo}
        onCancel={cancelOrgInfo}
      >
        <Form
          name="basic"
          form={FormRef}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ status: 0 }}
        >
          <Form.Item
            label="岗位编码"
            name="postCode"
            rules={[{ required: true, message: '请输入岗位编码!' }]}
          >
            {isOption.option === 'add' ? <Input /> : <Input disabled />}
          </Form.Item>
          <Form.Item
            label="岗位名称"
            name="postName"
            rules={[{ required: true, message: '请输入岗位名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="岗位状态" name="status">
            <Select>
              <Option value={0}>启用</Option>
              <Option value={1}>停用</Option>
            </Select>
          </Form.Item>
          <Form.Item label="描述" name="remark">
            <TextArea
              placeholder="请输入描述信息"
              autoSize={{ minRows: 2, maxRows: 8 }}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* 授权模态框 */}
      <Modal
        title="岗位分配角色"
        centered
        visible={isAssignModal}
        onOk={confirmAssign}
        onCancel={cancelAssign}
        width={800}
      >
        <Select
          showSearch
          placeholder="请选择应用"
          optionFilterProp="children"
          style={{ width: 360, marginBottom: 20 }}
          onFocus={searchAppList}
          onChange={(value) => searchChange(value)}
          // onSearch={onSearch}
        >
          {appList.map((item) => {
            return (
              <Option key={item.appId} value={item.appId}>
                {item.appName}
              </Option>
            );
          })}
        </Select>
        <ConfigProvider locale={locale}>
          <Transfer
            dataSource={roleList}
            // 是否显示全选全部选框
            showSelectAll={false}
            listStyle={{ minWidth: 360, minHeight: 360 }}
            // 渲染
            render={(item) => item.roleName}
            rowKey={(item) => item.roleId}
            titles={['可分配', '已分配']}
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
