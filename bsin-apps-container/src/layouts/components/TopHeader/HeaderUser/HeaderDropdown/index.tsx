import { Dropdown } from 'antd';
import React from 'react';

export type HeaderDropdownProps = {
  overlay: React.ReactNode | (() => React.ReactNode) | any;
  placement?:
    | 'bottomLeft'
    | 'bottomRight'
    | 'topLeft'
    | 'topCenter'
    | 'topRight'
    | 'bottomCenter';
  children?: React.ReactNode;
};

const HeaderDropdown: React.FC<HeaderDropdownProps> = ({
  overlay,
  children,
  placement,
}) => (
  <Dropdown overlay={overlay} placement={placement}>
    {children}
  </Dropdown>
);

export default HeaderDropdown;
