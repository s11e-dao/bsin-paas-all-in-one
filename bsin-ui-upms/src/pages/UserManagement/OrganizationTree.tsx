import { Tree, Input, Row, Col } from 'antd';
import React, { useEffect, useState } from 'react';
import { getOrgTree } from './service';

const OrganizationTree = ({ getTreeKey }) => {
  const { Search } = Input;
  // 保存树的数据
  const [isTreeData, setIsTreeData] = useState([]);
  // 控制当前点击行的选中
  const [isCheckedKeys, setIsCheckedKeys] = useState();
  // 展开的节点
  const [expandedKeys, setExpandedKeys] = useState();

  /**
   * 调用接口
   * 查询树的数据
   */
  useEffect(() => {
    getTree();
  }, []);
  const getTree = async () => {
    const { data } = await getOrgTree({});
    // 传给父组件用于页面一开始展示头行详细数据
    getTreeKey(data[0]?.orgId);
    setIsTreeData(data);
    // 默认第一个被选中
    setIsCheckedKeys(data[0]?.orgId);
    // 默认展开节点
    setExpandedKeys([data[0]?.orgId]);
  };

  /**
   * 树的点击回调函数
   * 用于请求接口返回不同的值
   * @param key 树选择的orgId值
   * @e 因为onSelect第一个参数判断的是选中不选中，第二次拿到的是[]所以使用第二个参数，确保每次都拿到值
   */
  const onTreeSelect = (key: string, e: any) => {
    setIsCheckedKeys(e.node.key);
    getTreeKey(e.node.key);
  };

  // 展开节点
  const onExpand = (expandedKeysValue: React.Key[]) => {
    setExpandedKeys(expandedKeysValue);
  };

  return (
    <Row style={{ backgroundColor: '#fff', padding: 24, lineHeight: 0 }}>
      <Col span={24}>
        <Search style={{ marginBottom: 24 }} placeholder="搜索机构" />
      </Col>
      <Col span={24}>
        <Tree
          // 树的数据
          treeData={isTreeData}
          // 点击树节点触发
          onSelect={(key, e) => onTreeSelect(key, e)}
          // 更换渲染值
          fieldNames={{ title: 'orgName', key: 'orgId' }}
          selectedKeys={[isCheckedKeys]}
          // defaultExpandAll
          // 展开收起节点调用
          onExpand={onExpand}
          expandedKeys={expandedKeys}
        />
      </Col>
    </Row>
  );
};

export default OrganizationTree;
