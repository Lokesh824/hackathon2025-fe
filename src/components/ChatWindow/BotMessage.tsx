import React from 'react';
import styled from 'styled-components';
import { Avatar, Button } from 'antd';
import {
  FileTextOutlined,
  LikeOutlined,
  DislikeOutlined,
  CopyOutlined,
  SyncOutlined,
} from '@ant-design/icons';

const MessageContainer = styled.div`
  display: flex;
  justify-content: flex-start;
  margin-bottom: 16px;
  gap: 12px;
`;

const Bubble = styled.div`
  background-color: transparent;
  color: #172b4d;
  padding: 0;
  border-radius: 8px;
  max-width: 70%;
  font-size: 13px;
  line-height: 1.5;
`;

const Text = styled.div`
  margin-bottom: 12px;
`;

const Attachment = styled.div`
  background-color: #ebecf0;
  border-radius: 8px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: 12px;
`;

const AttachmentInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const AttachmentName = styled.div`
  font-weight: 600;
  color: #172b4d;
`;

const AttachmentMeta = styled.div`
  font-size: 12px;
  color: #5e6c84;
`;

const Feedback = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  margin-top: 8px;
`;

interface BotMessageProps {
  text: string;
  attachment?: {
    name: string;
    action: string;
  };
  feedback?: boolean;
}

const BotMessage: React.FC<BotMessageProps> = ({ text, attachment, feedback }) => {
  return (
    <MessageContainer>
      <Avatar src="http://localhost:3845/assets/ac5e26a51ad906a1ced6441e4766b2930f003da4.png" />
      <Bubble>
        <Text>{text}</Text>
        {attachment && (
          <Attachment>
            <AttachmentInfo>
              <FileTextOutlined style={{ fontSize: '20px', color: '#505F79' }} />
              <div>
                <AttachmentName>{attachment.name.split(' Sep ')[0]}</AttachmentName>
                <AttachmentMeta>Sep 12, 5:42 PM</AttachmentMeta>
              </div>
            </AttachmentInfo>
            <Button size="small">{attachment.action}</Button>
          </Attachment>
        )}
        {feedback && (
          <Feedback>
            <LikeOutlined style={{ cursor: 'pointer' }} />
            <DislikeOutlined style={{ cursor: 'pointer' }} />
            <CopyOutlined style={{ cursor: 'pointer' }} />
            <SyncOutlined style={{ cursor: 'pointer' }} />
          </Feedback>
        )}
      </Bubble>
    </MessageContainer>
  );
};

export default BotMessage;
