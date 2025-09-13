import React from 'react';
import styled from 'styled-components';
import { Avatar, Dropdown, Menu } from 'antd';

const HeaderContainer = styled.div`
  height: 64px;
  background-color: #002967;
  color: white;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 24px;
  position: relative;
`;

const Logo = styled.div`
  font-size: 24px;
  font-weight: bold;
`;

const Header: React.FC = () => {
  const menu = (
    <Menu>
      <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Settings</Menu.Item>
      <Menu.Item key="3">Logout</Menu.Item>
    </Menu>
  );

  return (
    <HeaderContainer>
      <Logo>CliniNex AI</Logo>
      <Dropdown overlay={menu} placement="bottomRight">
        <Avatar style={{ backgroundColor: '#87d068' }} icon={<p>K</p>} />
      </Dropdown>
    </HeaderContainer>
  );
};

export default Header;
