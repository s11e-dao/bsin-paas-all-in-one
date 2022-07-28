import React, { useRef, useState, useEffect } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import positionColumns, { TableListItem } from './data';
import {
  Button,
  Divider,
  Popconfirm,
  Modal,
  Form,
  Input,
  Row,
  Col,
  Select,
  Tag,
  message,
} from 'antd';
import TableTitle from '@/components/TableTitle';
import { getUserInfo, addUserInfo, editUserInfo, delUserInfo } from './service';
import PositionShuttleModal from './PositionShuttleModal';
import { hex_md5 } from '../../utils/md5';

export default ({ orgId }) => {
  const { Option } = Select;
  // proTable行为
  const actionRef = useRef<ActionType>();
  // 控制分配穿梭模态框
  const [isAssignModal, setIsAssignModal] = useState(false);
  // 控制新增模态框
  const [isFormModal, setIsFormModal] = useState(false);
  // 控制编辑还是新增操作
  const [isOption, setIsOption] = useState({});
  // 获取表单
  const [formRef] = Form.useForm();
  // 存储当前的record用于编辑删除操作
  const [isRecord, setIsRecord] = useState({});

  // 点击分配
  const assignModal = async (record: object) => {
    setIsRecord(record);
    setIsAssignModal(true);
  };

  // 分配assignModal 关闭
  const closeAssignModal = () => {
    setIsAssignModal(false);
  };

  // add新增按钮
  const addOption = () => {
    setIsOption({ option: 'add' });
    setIsFormModal(true);
  };

  // 编辑按钮
  const editOption = (record: object) => {
    setIsOption({ option: 'edit' });
    // 保存record
    setIsRecord(record);
    // 数据回显
    formRef.setFieldsValue({ ...record, password: '******' });
    setIsFormModal(true);
  };

  // add edit确定
  const formOk = () => {
    const { option } = isOption;
    const { userId } = isRecord;
    // 表单验证
    formRef
      .validateFields()
      .then(async () => {
        let response = formRef.getFieldsValue();
        if (option === 'add') {
          console.log(hex_md5(response.password));

          let res = await addUserInfo({
            orgId,
            ...response,
            password: hex_md5(response.password),
          });
          console.log(res);
          res ? message.success('添加成功') : message.error('添加失败！');
        } else {
          let res = await editUserInfo({ orgId, ...response, userId });
          res ? message.success('修改成功') : message.error('修改失败！');
        }
        // 重置表单
        formRef.resetFields();
        // 刷新表单
        actionRef.current?.reload();
        setIsFormModal(false);
      })
      .catch(() => {});
  };

  // 取消
  const formCancel = () => {
    // 重置表单
    formRef.resetFields();
    setIsFormModal(false);
  };

  // 删除用户
  const delUserInfoOk = async (record: object) => {
    const { userId } = record;
    let res = await delUserInfo({ userId });
    res ? message.success('删除成功') : message.error('删除失败！');
    // 刷新表单
    actionRef.current?.reload();
  };

  // 表头赋值
  const columns: ProColumns<TableListItem>[] = positionColumns;

  // 操作列渲染
  const optionRender = (text: any, record: any, index: number) => [
    <div key={record.userId}>
      <a onClick={() => editOption(record)}>编辑</a>
      <Divider type="vertical" />
      <Popconfirm
        title="是否删除此条数据？"
        onConfirm={() => {
          delUserInfoOk(record);
        }}
        onCancel={() => {
          message.warning(`取消删除！`);
        }}
        okText="是"
        cancelText="否"
      >
        <a>删除</a>
      </Popconfirm>
      <Divider type="vertical" />
      <a onClick={() => assignModal(record)}>分配岗位</a>
    </div>,
  ];

  // 用户类型自定义渲染
  const typeRender = (text: any, record: any, index: number) => [
    <div key={record.userId}>
      {record.type === 0 ? (
        <Tag color="#108ee9">普通用户</Tag>
      ) : (
        <Tag color="#f50">超级管理员</Tag>
      )}
    </div>,
  ];

  // 自定义表格头部渲染
  columns.forEach((item: any) => {
    item.dataIndex === 'option' ? (item.render = optionRender) : undefined;
    item.dataIndex === 'type' ? (item.render = typeRender) : undefined;
  });

  useEffect(() => {
    // 刷新表单
    actionRef.current?.reload();
  }, [orgId]);

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle={<TableTitle title="用户表格" />}
        scroll={{ x: 900 }}
        bordered
        columns={columns}
        actionRef={actionRef}
        // 请求数据
        request={async (params) => {
          if (orgId) {
            let res = await getUserInfo({ ...params, orgId });
            console.log(res);

            const result = {
              data: res.data,
              total: res.pagination.totalSize,
            };
            return result;
          } else {
            return {};
          }
        }}
        rowKey="userId"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <Button
            onClick={() => {
              addOption();
            }}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            新增
          </Button>,
        ]}
      />
      {/* 新增编辑模态框 */}
      <Modal
        title={isOption.option === 'add' ? '添加用户' : '修改用户'}
        visible={isFormModal}
        onOk={formOk}
        onCancel={formCancel}
        cancelText="取消"
        okText="确定"
        width={700}
      >
        <Form
          name="basic"
          form={formRef}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ type: 1, status: 0 }}
        >
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                label="用户名"
                name="username"
                rules={[{ required: true, message: '请输入用户名!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="用户类型" name="type">
                <Select>
                  <Option value={0}>普通用户</Option>
                  <Option value={1}>超级管理员</Option>
                </Select>
              </Form.Item>
              <Form.Item
                label="邮箱"
                name="email"
                rules={[
                  {
                    pattern:
                      /^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]+)+$/,
                    message: '请输入正确的邮箱地址',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="密码"
                name="password"
                rules={[{ required: true, message: '请输入密码!' }]}
              >
                <Input disabled={isOption.option === 'add' ? false : true} />
              </Form.Item>
              <Form.Item label="状态" name="status">
                <Select>
                  <Option value={0}>在岗</Option>
                  <Option value={1}>离职</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="昵称" name="nickname">
                <Input />
              </Form.Item>
              <Form.Item
                label="电话"
                name="phone"
                rules={[
                  {
                    pattern:
                      /^1([358][0-9]|4[579]|66|7[0135678]|9[89])[0-9]{8}$/,
                    message: '请输入正确的手机号',
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* 分配穿梭框 */}
      <PositionShuttleModal
        isAssignModal={isAssignModal}
        closeAssignModal={closeAssignModal}
        isRecord={isRecord}
        actionRef={actionRef}
      />
    </div>
  );
};
