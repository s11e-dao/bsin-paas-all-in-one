import React, { useRef, useState, useEffect } from 'react';
import type { ActionType, ProColumns } from '@ant-design/pro-table';
import { PlusOutlined } from '@ant-design/icons';
import ProTable from '@ant-design/pro-table';
import positionColumns, { TableListItem } from './data';
import { Button, Popconfirm, message } from 'antd';
import TableTitle from '@/components/TableTitle';
import { getPageListByOrgId, unbindPost } from './service';
import PositionShuttleModal from './PositionShuttleModal';

export default ({ orgId }) => {
  // 用于表格刷新
  const actionRef = useRef<ActionType>();
  // 控制表单模态框
  const [isAssignModal, setIsAssignModal] = useState(false);

  // 点击分配
  const assignModal = async () => {
    setIsAssignModal(true);
  };

  // FormModal 关闭
  const closeAssignModal = () => {
    setIsAssignModal(false);
  };

  // 移除岗位
  const confirmUnbindPost = async (record: object) => {
    const { postId } = record;
    let res = await unbindPost({ postId, orgId });
    res ? message.success('编辑成功') : message.error('编辑失败！');
    // 刷新表单
    actionRef.current?.reload();
  };

  // 表头赋值
  const columns: ProColumns<TableListItem>[] = positionColumns;
  // 操作列渲染
  const optionRender = (text: any, record: any, index: number) => [
    <div key={record.postId}>
      <Popconfirm
        title="是否移除此岗位?"
        onConfirm={() => {
          confirmUnbindPost(record);
        }}
        onCancel={() => {
          message.warning('取消移除岗位！');
        }}
        okText="是"
        cancelText="否"
      >
        <a>移除岗位</a>
      </Popconfirm>
    </div>,
  ];

  // 自定义表格头部渲染
  columns.forEach((item: any) => {
    item.dataIndex === 'option' ? (item.render = optionRender) : undefined;
  });

  useEffect(() => {
    // 刷新表单
    actionRef.current?.reload();
  }, [orgId]);

  return (
    <div>
      <ProTable<TableListItem>
        headerTitle={<TableTitle title="机构岗位" />}
        scroll={{ x: 900 }}
        bordered
        columns={columns}
        actionRef={actionRef}
        // 请求数据
        request={async (params) => {
          if (orgId) {
            let res = await getPageListByOrgId({ ...params, orgId });
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
        rowKey="postId"
        search={{
          labelWidth: 'auto',
        }}
        pagination={{
          pageSize: 10,
        }}
        toolBarRender={() => [
          <Button
            onClick={assignModal}
            key="button"
            icon={<PlusOutlined />}
            type="primary"
          >
            分配岗位
          </Button>,
        ]}
      />
      <PositionShuttleModal
        isAssignModal={isAssignModal}
        closeAssignModal={closeAssignModal}
        orgId={orgId}
        actionRef={actionRef}
      />
    </div>
  );
};
