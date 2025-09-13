import React from 'react';
import styled from 'styled-components';
import { AppstoreOutlined } from '@ant-design/icons';

const SidebarContainer = styled.div`
  width: 48px;
  background-color: #ffffff;
  box-shadow: 2px 0px 6px 0px rgba(0,0,0,0.16);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 4px;
  gap: 8px;
`;

const NavItem = styled.div`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f4f5f7;
  }

  &.active {
    background-color: #e8f1ff;
  }
`;

const Sidebar: React.FC = () => {
  return (
    <SidebarContainer>
      <NavItem className="active">
        <AppstoreOutlined style={{ fontSize: '18px', color: '#0052CC' }} />
      </NavItem>
    </SidebarContainer>
  );
};

export default Sidebar;
