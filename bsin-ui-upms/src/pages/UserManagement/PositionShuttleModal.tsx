import React, { FC, useState, useEffect } from 'react';
import { Modal, Transfer, ConfigProvider, message } from 'antd';
import {
  getAssignPostListAll,
  getAssignedPostByUserId,
  assignPost,
} from './service';
// 汉化
import locale from 'antd/lib/locale/zh_CN';

type PositionFormModalPropsType = {
  isAssignModal: boolean;
  closeAssignModal: Function;
};

const PositionShuttleModal: FC<PositionFormModalPropsType> = ({
  isAssignModal,
  closeAssignModal,
  isRecord,
  actionRef,
}) => {
  const { userId } = isRecord;
  // 存储全部的post数据
  const [isPostListAll, setIsPostListAll] = useState([]);
  // 存储选中的key 存储已经分配的post数据
  const [targetKeys, setTargetKeys] = useState([]);

  useEffect(() => {
    if (isRecord.userId !== undefined) {
      postList();
    }
  }, [isRecord]);

  const postList = async () => {
    // 全部post
    const { data: postListAll } = await getAssignPostListAll({ userId });
    console.log('可分配', postListAll);

    // 已分配post
    const { data } = await getAssignedPostByUserId({ userId });
    console.log('已分配', data);

    // 已分配post 遍历取出每个postId
    let assignedPostList = new Array();
    data.forEach((item) => {
      assignedPostList.push(item.postId);
    });
    setTargetKeys(assignedPostList);
    setIsPostListAll(postListAll);
  };

  /**
   * 分配模态框，确认分配
   */
  const confirmAssignPost = async () => {
    let res = await assignPost({ userId, postIds: targetKeys });
    res ? message.success('分配成功') : message.error('分配失败！');
    // 刷新proTable
    actionRef.current?.reload();
    closeAssignModal(true);
  };

  // 树改变回调函数
  const onChange = (nextTargetKeys, direction, moveKeys) => {
    setTargetKeys(nextTargetKeys);
  };

  return (
    <Modal
      title="用户分配岗位"
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
          // 渲染
          render={(item) => item.postName}
          rowKey={(item) => item.postId}
          titles={['可分配岗位', '已分配岗位']}
          // 显示在右侧框数据的 key 集合
          // 必须要有key值
          targetKeys={targetKeys}
          // 点击<>的事件
          onChange={onChange}
        />
      </ConfigProvider>
    </Modal>
  );
};

export default PositionShuttleModal;
