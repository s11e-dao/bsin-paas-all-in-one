import React from 'react';
import { Spin } from 'antd';

const Loading = () => {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        height: 300,
      }}
    >
      <Spin
        style={{
          position: 'relative',
          top: '50%',
          left: '50%',
        }}
        size="large"
        tip="Loading..."
      />
    </div>
  );
};

export default Loading;
