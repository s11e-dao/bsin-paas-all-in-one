import React, { FC, useState, useEffect } from 'react';
import { Modal, Transfer, ConfigProvider, message } from 'antd';
import { getPostList, getAssignedPageListByOrgId, assignPost } from './service';
// 汉化
import locale from 'antd/lib/locale/zh_CN';

type PositionFormModalPropsType = {
  isAssignModal: boolean;
  closeAssignModal: Function;
};

const PositionShuttleModal: FC<PositionFormModalPropsType> = ({
  isAssignModal,
  closeAssignModal,
  orgId,
  actionRef,
}) => {
  // 存储选中的key
  const [targetKeys, setTargetKeys] = useState([]);
  // 存储全部的post数据
  const [isPostListAll, setIsPostListAll] = useState([]);

  /**
   * 所有的岗位列表
   */
  useEffect(() => {
    if (isAssignModal === true) {
      // 已分配
      getAssignedPostList();
      // 全部
      getPostListAll();
    }
  }, [isAssignModal]);

  // 已有岗位
  const getAssignedPostList = async () => {
    const { data } = await getAssignedPageListByOrgId({ orgId });
    let assignedPostList = new Array();
    data.forEach((item) => {
      assignedPostList.push(item.postId);
    });
    console.log(assignedPostList);
    // 已有数据渲染
    setTargetKeys(assignedPostList);
  };

  // 全部的岗位
  const getPostListAll = async () => {
    let res = await getPostList({});
    const { data } = res;
    setIsPostListAll(data);
  };

  /**
   * 分配模态框，确认分配
   */
  const confirmAssignPost = async () => {
    let {
      code,
      message: messageInfo,
      data,
    } = await assignPost({
      orgId,
      postIds: targetKeys,
    });
    // 刷新proTable
    actionRef.current?.reload();
    code === '000000'
      ? message.success('分配岗位成功')
      : message.error(`错误：${messageInfo}！`);
    // 刷新proTable
    actionRef.current?.reload();
    closeAssignModal(true);
  };

  /**
   * 树改变回调函数
   * @param nextTargetKeys 选中的key
   * @param direction 移动的方向
   * @param moveKeys  移动的key
   */
  const onChange = async (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Modal
      title="机构分配岗位"
      visible={isAssignModal}
      onOk={confirmAssignPost}
      onCancel={() => {
        closeAssignModal(false);
      }}
      forceRender={true}
      width={800}
    >
      <ConfigProvider locale={locale}>
        <Transfer
          dataSource={isPostListAll}
          // 是否显示全选全部选框
          showSelectAll={false}
          listStyle={{ minWidth: 360, minHeight: 360 }}
          titles={['可分配岗位', '已分配岗位']}
          // 显示在右侧框数据的 key 集合
          // 必须要有key值
          targetKeys={targetKeys}
          // 点击<>的事件
          onChange={onChange}
          // 渲染
          render={(item) => item.postName}
          rowKey={(item) => item.postId}
        />
      </ConfigProvider>
    </Modal>
  );
};

export default PositionShuttleModal;
