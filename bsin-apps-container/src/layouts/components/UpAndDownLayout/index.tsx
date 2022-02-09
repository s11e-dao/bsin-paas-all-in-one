import React from 'react';
import TopHeader from '../TopHeader';
import PageContent from '../PageContent';
import { Layout } from 'antd';
import LayoutContext from '../../stores/LayoutContext';

export default function UpAndDownLayout({ children }: { children: any }) {
  // 引入公共数据
  let counter = LayoutContext.useContainer();
  return (
    <Layout
      style={
        counter.fixedSiderStyle && counter.layoutSider
          ? counter.siderCollapsed
            ? { marginLeft: 80 }
            : { marginLeft: 200 }
          : {}
      }
    >
      <TopHeader />
      <PageContent children={children} />
    </Layout>
  );
}
