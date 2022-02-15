import columnsData, { AppColumnsItem } from './data';
import React from 'react';
import type { ProColumns, ActionType } from '@ant-design/pro-table';
import ProTable from '@ant-design/pro-table';
import { getAppList, delAppInfo, addAppList, editAppList } from './service';
import TableTitle from '@/components/TableTitle';
import {
  Button,
  Popconfirm,
  message,
  Modal,
  Form,
  Input,
  Radio,
  Divider,
  Row,
  Col,
  Tag,
  Select,
} from 'antd';
import { PlusOutlined } from '@ant-design/icons';

export default () => {
  const { TextArea } = Input;
  const { Option } = Select;
  // 控制表单模态框
  const [isAppFormModal, setIsAppFormModal] = React.useState(false);
  // Table action 的引用，便于自定义触发 用于更改数据之后的表单刷新
  const actionRef = React.useRef<ActionType>();
  // 获取编辑表单信息
  const [formRef] = Form.useForm();
  // 控制当前操作
  const [isOption, setIsOption] = React.useState<object>({});
  // 存储当前行数据，用于编辑操作
  const [isRecord, setIsRecord] = React.useState({});
  // 表头赋值
  const columns: ProColumns<AppColumnsItem>[] = columnsData;

  // 操作列渲染
  const optionRender = (text: any, record: any, index: number) => [
    <div key={record.appId}>
      <a onClick={() => handleEditAppFormModal(record)}>编辑</a>
      <Divider type="vertical" />
      <Popconfirm
        title="是否确认删除？"
        okText="是"
        cancelText="否"
        onConfirm={() => confirmDel(record.appId)}
        onCancel={() => {
          message.warning('取消删除！');
        }}
      >
        <a>删除</a>
      </Popconfirm>
    </div>,
  ];

  // 应用名称渲染
  const appLanguageRender = (text: any, record: any, index: number) => (
    <div key={record.type}>
      {record.appLanguage === 1 ? (
        <Tag color="#2db7f5">React</Tag>
      ) : record.appLanguage === 0 ? (
        <Tag color="#87d068">vue</Tag>
      ) : (
        <Tag color="#108ee9">其他</Tag>
      )}
    </div>
  );

  // 自定义表格头部渲染
  columns.forEach((item: any) => {
    item.dataIndex === 'option' ? (item.render = optionRender) : undefined;
    item.dataIndex === 'appLanguage'
      ? (item.render = appLanguageRender)
      : undefined;
  });

  // add模态框控制
  const handleAddAppFormModal = () => {
    setIsOption({ option: 'add' });
    setIsAppFormModal(true);
  };

  // edit模态框控制
  const handleEditAppFormModal = (record: object) => {
    setIsRecord(record);
    setIsOption({ option: 'edit' });
    setIsAppFormModal(true);
    // 进行数据的回显
    formRef.setFieldsValue(record);
  };

  // 确定提交
  const appFormModalOk = () => {
    const { option } = isOption;
    const { appId } = isRecord;
    formRef
      .validateFields()
      .then(async () => {
        let response = formRef.getFieldsValue();
        if (option === 'add') {
          let res = await addAppList(response);
          res ? message.success('添加成功') : message.error('添加失败！');
        } else {
          let res = await editAppList({ ...response, appId });
          res ? message.success('编辑成功') : message.error('编辑失败！');
        }
        // 刷新proTble
        actionRef.current?.reload();
        // 重置表单Form
        formRef.resetFields();
        setIsAppFormModal(false);
      })
      .catch(() => {});
  };

  // 取消关闭
  const appFormModalCancel = () => {
    // 重置表单Form
    formRef.resetFields();
    setIsAppFormModal(false);
  };

  // 点击删除
  const confirmDel = async (appId: string) => {
    let res = await delAppInfo({ appId });
    res ? message.success('删除成功') : message.error('删除失败！');
    // 刷新表单
    actionRef.current?.reload();
  };

  return (
    <div>
      {/* 表格 */}
      <ProTable<AppColumnsItem>
        actionRef={actionRef}
        scroll={{ x: 900 }}
        bordered
        headerTitle={<TableTitle title="应用管理" />}
        columns={columns}
        // 请求数据
        request={async (params) => {
          let { data } = await getAppList({ ...params });
          console.log('🎉');

          const result = {
            data,
          };
          return result;
        }}
        toolBarRender={() => [
          <Button
            key="button"
            icon={<PlusOutlined />}
            type="primary"
            onClick={() => {
              handleAddAppFormModal();
            }}
          >
            新建
          </Button>,
        ]}
        // 每行表格的key
        rowKey="appId"
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
      {/* 添加编辑 */}
      <Modal
        title="添加应用"
        visible={isAppFormModal}
        onOk={() => appFormModalOk()}
        onCancel={() => appFormModalCancel()}
        centered
        width={700}
      >
        <Form
          name="basic"
          form={formRef}
          labelCol={{ span: 24 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ status: 1, appLanguage: 1 }}
        >
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                label="应用编码"
                name="appCode"
                rules={[{ required: true, message: '请填写应用编码' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item
                label="应用名称(中文)"
                name="appName"
                rules={[{ required: true, message: '请填写应用名称' }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="应用图标" name="logo">
                <Input />
              </Form.Item>
            </Col>
          </Row>
          <Row gutter={20}>
            <Col span={8}>
              <Form.Item
                label="应用访问地址"
                name="url"
                rules={[
                  {
                    required: true,
                    message: '请填写应用访问地址',
                  },
                  {
                    type: 'url',
                    message: '应用访问地址格式不正确',
                  },
                ]}
              >
                <Input placeholder="格式: http://+域名+端口" />
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="应用语言" name="appLanguage">
                <Select>
                  <Option value={0}>Vue</Option>
                  <Option value={1}>React</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={8}>
              <Form.Item label="应用状态" name="status">
                <Radio.Group>
                  <Radio value={1}>启用</Radio>
                  <Radio value={0}>未启用</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
          </Row>
          <Form.Item label="应用描述" name="remark">
            <TextArea
              showCount
              maxLength={30}
              style={{ height: 60 }}
              placeholder="请输入应用描述信息..."
            />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
