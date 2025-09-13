import React from 'react';
import styled from 'styled-components';
import { Avatar } from 'antd';

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
  gap: 12px;
`;

const Bubble = styled.div`
  background-color: #e5e9ed;
  color: #172b4d;
  padding: 10px 16px;
  border-radius: 8px;
  max-width: 70%;
  font-size: 13px;
  line-height: 1.5;
`;

const HumanMessage: React.FC<{ text: string }> = ({ text }) => {
  return (
    <MessageContainer>
      <Bubble>{text}</Bubble>
      <Avatar style={{ backgroundColor: '#87d068' }}>K</Avatar>
    </MessageContainer>
  );
};

export default HumanMessage;
