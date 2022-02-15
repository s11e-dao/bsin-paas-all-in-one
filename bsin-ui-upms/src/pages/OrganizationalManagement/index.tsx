import columnsData, { AppColumnsItem } from './data';
import React, { useState, useEffect } from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import {
  getOrganizationList,
  addOrganizationInfo,
  editOrganizationInfo,
  delOrganizationInfo,
  getAppList,
  empowerAppList,
  getAppListByOrgId,
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
  Tag,
  Row,
  Col,
  Select,
  Transfer,
  ConfigProvider,
  InputNumber,
} from 'antd';
// 汉化
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
  // 存储选中的key
  const [targetKeys, setTargetKeys] = useState([]);
  // 控制权限的模态框
  const [isPowerModal, setIsPowerModal] = useState(false);
  // 存储请求出来的应用
  const [AppList, setAppList] = useState([]);
  // 表头赋值
  const columns: ProColumns<AppColumnsItem>[] = columnsData;
  // 保存展开的行
  const [isExpandedKeys, setIsExpandedKeys] = useState([]);

  // 操作列渲染
  const optionRender = (text: any, record: any, index: number) => [
    <div key={record.orgId}>
      <a onClick={() => handleAddModel(record)}>添加</a>
      <Divider type="vertical" />
      <a onClick={() => handleEditModel(record)}>编辑</a>
      <Divider type="vertical" />
      <Popconfirm
        title="是否删除此条数据?"
        onConfirm={() => confirmDel(record.orgId)}
        onCancel={() => {
          message.warning(`取消删除`);
        }}
        okText="是"
        cancelText="否"
      >
        <a>删除</a>
      </Popconfirm>
      <Divider type="vertical" />
      <a onClick={() => handlePowerModel(record)}>授权应用</a>
    </div>,
  ];

  // add
  const handleAddModel = (record: object) => {
    setIsOption({ option: 'add' });
    setIsRecord(record);
    setIsFormModal(true);
  };

  // edit
  const handleEditModel = (record: object) => {
    setIsOption({ option: 'edit' });
    // 数据回显
    FormRef.setFieldsValue(record);
    setIsRecord(record);
    setIsFormModal(true);
  };

  // 确定操作
  const confirmOrgInfo = () => {
    const { orgId, parentId } = isRecord;
    FormRef.validateFields()
      .then(async () => {
        var response = FormRef.getFieldsValue();
        if (isOption.option === 'add') {
          let res = await addOrganizationInfo({
            ...response,
            parentId: orgId,
          });
          res ? message.success('添加成功') : message.error('添加失败！');
        } else {
          let res = await editOrganizationInfo({
            ...response,
            parentId,
            orgId,
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

  // cancel
  const cancelOrgInfo = () => {
    // 重置表单
    FormRef.resetFields();
    setIsFormModal(false);
  };

  // del
  const confirmDel = async (orgId: string) => {
    let res = await delOrganizationInfo({ orgId });
    res ? message.success('删除成功') : message.error('删除失败！');
    // 刷新表单
    actionRef.current?.reload();
  };

  // handle授权
  const handlePowerModel = async (record: object) => {
    const { orgId } = record;
    setIsRecord(record);
    // 全部的应用数据
    let { data: appList } = await getAppList({});
    // 已经授权的应用数据
    let { data } = await getAppListByOrgId({ orgId });
    // 找到已授权的所有appID结合
    let assignedAppList = new Array();
    data.forEach((item) => {
      assignedAppList.push(item.appId);
    });
    // 右侧已经有的角色展示
    setTargetKeys(assignedAppList);
    // 全部数据
    setAppList(appList);
    setIsPowerModal(true);
  };

  // 确定授权
  const confirmPower = async () => {
    const { orgId } = isRecord;
    let res = await empowerAppList({ orgId, appIds: targetKeys });
    res ? message.success('授权成功') : message.error('授权失败！');
    setIsPowerModal(false);
  };

  // 取消授权
  const cancelPower = () => {
    setIsPowerModal(false);
  };

  // 机构名称渲染
  const orgTypeRender = (text: any, record: any, index: number) => (
    <div key={record.type}>
      {record.type === 1 ? (
        <Tag color="#f50">公司</Tag>
      ) : record.type === 2 ? (
        <Tag color="#2db7f5">部门</Tag>
      ) : record.type === 3 ? (
        <Tag color="#87d068">小组</Tag>
      ) : (
        <Tag color="#108ee9">其他</Tag>
      )}
    </div>
  );

  // 自定义表格头部渲染
  columns.forEach((item: any) => {
    item.dataIndex === 'option' ? (item.render = optionRender) : undefined;
    item.dataIndex === 'type' ? (item.render = orgTypeRender) : undefined;
  });

  // 树改变回调函数
  const onChange = (nextTargetKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  // 表格点击回调，用于展开表格数据
  const onExpand = (expandedRows) => {
    setIsExpandedKeys(expandedRows);
  };

  return (
    <div>
      {/* 表格 */}
      <ProTable<AppColumnsItem>
        actionRef={actionRef}
        scroll={{ x: 900 }}
        bordered
        headerTitle={<TableTitle title="机构管理" />}
        columns={columns}
        // 请求数据
        request={async (params) => {
          let { data } = await getOrganizationList({ ...params });
          setIsExpandedKeys([data[0]?.orgId]);
          const result = {
            data,
          };
          return result;
        }}
        // 每行表格的key
        rowKey="orgId"
        // 搜索表单布局配置
        search={{
          labelWidth: 'auto',
        }}
        // 取消页码
        pagination={false}
        // 默认展开，受控
        expandedRowKeys={isExpandedKeys}
        // 展开行调用事件
        onExpandedRowsChange={onExpand}
      />
      {/* 新增模态框 */}
      <Modal
        title={isOption.option === 'add' ? '新增机构' : '编辑机构'}
        centered
        visible={isFormModal}
        onOk={confirmOrgInfo}
        onCancel={cancelOrgInfo}
        width={700}
      >
        <Form
          name="basic"
          form={FormRef}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ type: 1, status: 0 }}
        >
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                label="机构编码"
                name="orgCode"
                rules={[{ required: true, message: '请输入机构编码!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                label="机构名称"
                name="orgName"
                rules={[{ required: true, message: '请输入机构名称!' }]}
              >
                <Input />
              </Form.Item>
              <Form.Item label="机构级别" name="level">
                <InputNumber
                  placeholder="机构级别1-10"
                  min={1}
                  max={10}
                  style={{ width: '100%' }}
                ></InputNumber>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="机构类型" name="type">
                <Select>
                  <Option value={1}>公司</Option>
                  <Option value={2}>部门</Option>
                  <Option value={3}>小组</Option>
                  <Option value={4}>其它</Option>
                </Select>
              </Form.Item>
              <Form.Item label="负责人" name="leader">
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
            <Col span={8}>
              <Form.Item label="地址" name="address">
                <Input />
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
              <Form.Item label="描述" name="remark">
                <TextArea
                  placeholder="请输入描述信息"
                  autoSize={{ minRows: 2, maxRows: 8 }}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      {/* 授权模态框 */}
      <Modal
        title="机构授权应用"
        centered
        visible={isPowerModal}
        onOk={confirmPower}
        onCancel={cancelPower}
        width={800}
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
            titles={['可授权', '已授权']}
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
