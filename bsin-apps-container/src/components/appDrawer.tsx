import React, { useState } from 'react';
import { Drawer } from 'antd';
import { useModel, MicroAppWithMemoHistory } from 'umi';

const AppDrawer: React.FC = () => {
  const { isShowApp2, setIsShowApp2 } =
    useModel('@@qiankunStateForSlave') || {};
  const onClose = () => {
    setIsShowApp2(false);
  };
  return (
    <>
      <Drawer
        title="Basic Drawer"
        placement="right"
        onClose={onClose}
        visible={isShowApp2}
      >
        <MicroAppWithMemoHistory name="app2" url="/home" />
      </Drawer>
    </>
  );
};

export default AppDrawer;
