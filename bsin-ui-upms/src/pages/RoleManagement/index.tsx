import columnsData, { AppColumnsItem } from './data';
import React, { useState, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  getRoleList,
  delRoleInfo,
  addRoleInfo,
  editRoleInfo,
  getMenuList,
  getMenusByAppIdAndRoleId,
  empowerMenu,
} from './service';
import TableTitle from '@/components/TableTitle';
import {
  Button,
  Modal,
  Popconfirm,
  message,
  Form,
  Input,
  Divider,
  Tree,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import { useModel } from 'umi';

export default () => {
  // 获取appId
  const { appId } = useModel('@@qiankunStateFromMaster');
  const { TextArea } = Input;

  // 新增模态框
  const [isAddFormModal, setIsAddFormModal] = useState(false);
  // 编辑模态框
  const [isEditFormModal, setIsEditFormModal] = useState(false);
  // 存储编辑的ID
  const [roleId, setRoleId] = useState(false);
  // 菜单授权模态框
  const [isEmpowerModal, setIsEmpowerModal] = useState(false);
  // 获取新增表单信息
  const addFormRef: any = React.createRef();
  // 获取编辑表单信息
  const [editFormRef] = Form.useForm();
  // 保存请求的全部数据
  const [menuList, setMenuList] = useState([]);
  // 保存请求的勾选的数据
  const [menuListChecked, setMenuListChecked] = useState([]);
  // tree的操作，每次操作保留的key值
  const [isKey, setIsKey] = useState([]);
  // 菜单授权保留每行值
  const [isMenuInfo, setIsMenuInfo] = useState({});

  // Table action 的引用，便于自定义触发 用于更改数据之后的表单刷新
  const actionRef = React.useRef<ActionType>();
  // 表头赋值
  const columns: ProColumns<AppColumnsItem>[] = columnsData;
  // 操作列渲染
  const optionRender = (text: any, record: any, index: number) => [
    <div key={record.roleId}>
      <a onClick={() => edit(record)}>编辑</a>
      <Divider type="vertical" />
      <Popconfirm
        title="是否删除此条数据?"
        onConfirm={() => confirmDel(record.roleId)}
        onCancel={cancelDel}
        okText="是"
        cancelText="否"
      >
        <a>删除</a>
      </Popconfirm>
      <Divider type="vertical" />
      <a
        onClick={() => {
          handleEmpowerMenu(record);
        }}
      >
        菜单授权
      </a>
    </div>,
  ];
  // 自定义表格头部渲染
  columns.forEach((item: any) => {
    item.dataIndex === 'option' ? (item.render = optionRender) : undefined;
  });

  // 点击新增
  const confirmAdd = () => {
    addFormRef.current
      .validateFields()
      .then(async () => {
        var response = addFormRef.current?.getFieldsValue();
        let res = await addRoleInfo({ ...response, appId });
        res ? message.success('新增成功') : message.error('新增失败！');
        // 重置表单
        addFormRef.current.resetFields();
        setIsAddFormModal(false);
        actionRef.current?.reload();
      })
      .catch(() => {});
  };

  // 点击编辑
  const edit = (record) => {
    setIsEditFormModal(true);
    // 存储id
    setRoleId(record.roleId);
    // 数据回显
    editFormRef.setFieldsValue(record);
  };

  // 编辑确认
  const confirmEdit = () => {
    editFormRef
      .validateFields()
      .then(async () => {
        var response = editFormRef.getFieldsValue();
        response.roleId = roleId;
        let res = await editRoleInfo(response);
        res ? message.success('编辑成功') : message.error('编辑失败！');
        // 重置表单
        editFormRef.resetFields();
        setIsEditFormModal(false);
        actionRef.current?.reload();
      })
      .catch(() => {});
  };

  // 点击删除
  const confirmDel = async (roleId: string) => {
    let res = await delRoleInfo({ roleId });
    res ? message.success('删除成功') : message.error('删除失败！');
    actionRef.current?.reload();
  };

  // 取消删除
  const cancelDel = () => {
    message.warning('取消删除');
  };

  // 菜单授权
  const handleEmpowerMenu = async (record) => {
    const { appId, roleId } = record;
    setIsMenuInfo({ appId, roleId });
    // 请求出全部的数据
    const { data: treeData } = await getMenuList({ appId });
    // 用于全部tree渲染
    setMenuList(treeData);
    // 请求的已经勾选的数据
    const { data: defaultTreeData } = await getMenusByAppIdAndRoleId({
      appId,
      roleId,
    });
    console.log('defaultTreeData', defaultTreeData);

    setIsKey(defaultTreeData);
    // 用于默认数据渲染
    setMenuListChecked(defaultTreeData);
    setIsEmpowerModal(true);
  };

  // 授权
  const confrimEmpower = async () => {
    let res = await empowerMenu({ ...isMenuInfo, menuIds: isKey });
    res ? message.success('菜单授权成功') : message.error('菜单授权失败！');
    actionRef.current?.reload();
    setIsEmpowerModal(false);
  };

  // 取消授权
  const cancelEmpower = () => {
    setIsEmpowerModal(false);
  };

  // 树的数据
  const onTreeCheck = (key, a) => {
    console.log(key, a);
    setIsKey(key);
  };

  return (
    <div>
      {/* 表格 */}
      <ProTable<AppColumnsItem>
        actionRef={actionRef}
        scroll={{ x: 900 }}
        bordered
        headerTitle={<TableTitle title="角色管理" />}
        columns={columns}
        // 请求数据
        request={async (params) => {
          let res = await getRoleList({
            ...params,
            appId,
          });
          console.log(res);

          const result = {
            data: res.data,
            total: res.pagination.totalSize,
          };
          return result;
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => setIsAddFormModal(true)}
          >
            新建
          </Button>,
        ]}
        // 本地储存表格列的显示参数
        columnsState={{
          persistenceKey: 'Apps',
          persistenceType: 'localStorage',
        }}
        // 每行表格的key
        rowKey="roleId"
        // 搜索表单布局配置
        search={{
          labelWidth: 'auto',
        }}
        // 分页相关配置
        pagination={{
          // 初始页面数据条数
          pageSize: 10,
        }}
        dateFormatter="string"
      />
      {/* 新增模态框 */}
      <Modal
        title="新增角色"
        visible={isAddFormModal}
        onOk={confirmAdd}
        onCancel={() => {
          setIsAddFormModal(false), addFormRef.current.resetFields();
        }}
        centered
      >
        <Form
          name="basic"
          ref={addFormRef}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="角色编码"
            name="roleCode"
            rules={[{ required: true, message: '请输入角色编码!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="描述" name="remark">
            <TextArea
              placeholder="请输入相关描述信息"
              autoSize={{ minRows: 2, maxRows: 8 }}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* 编辑模态框 */}
      <Modal
        title="编辑角色"
        visible={isEditFormModal}
        onOk={confirmEdit}
        onCancel={() => setIsEditFormModal(false)}
        centered
      >
        <Form
          name="basic"
          form={editFormRef}
          labelCol={{ span: 7 }}
          wrapperCol={{ span: 14 }}
          initialValues={{ remember: true }}
        >
          <Form.Item
            label="角色编码"
            name="roleCode"
            rules={[{ required: true, message: '请输入角色编码!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="角色名称"
            name="roleName"
            rules={[{ required: true, message: '请输入角色名称!' }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="应用Id"
            name="appId"
            rules={[{ required: true, message: '请输入应用Id!' }]}
          >
            <Input disabled />
          </Form.Item>
          <Form.Item label="描述" name="remark">
            <TextArea
              placeholder="请输入相关描述信息"
              autoSize={{ minRows: 2, maxRows: 8 }}
            />
          </Form.Item>
        </Form>
      </Modal>
      {/* 授权模态框 */}
      <Modal
        title="菜单授权"
        visible={isEmpowerModal}
        onOk={confrimEmpower}
        onCancel={cancelEmpower}
        destroyOnClose
      >
        <Tree
          // 树的数据
          treeData={menuList}
          checkable
          defaultCheckedKeys={menuListChecked}
          onCheck={(key, a) => onTreeCheck(key, a)}
          // 更换渲染值
          fieldNames={{ title: 'menuName', key: 'menuId' }}
        />
      </Modal>
    </div>
  );
};
