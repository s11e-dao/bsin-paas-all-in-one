import React from 'react';
import style from './index.less';

export default function TableTitle({ title }: { title: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <div
        className={style['title-icon']}
        style={{ width: 6, height: 20, marginRight: 6 }}
      ></div>
      <span>{title}</span>
    </div>
  );
}
