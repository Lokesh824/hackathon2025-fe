import React from 'react';
import styled from 'styled-components';
import BotMessage from './BotMessage';
import HumanMessage from './HumanMessage';

const ChatWindowContainer = styled.div`
  flex-grow: 1;
  overflow-y: auto;
  padding: 24px;
  width: 100%;
  max-width: 1120px;
  margin: 0 auto;
`;

interface Message {
  type: 'human' | 'bot';
  text: string;
  attachment?: {
    name: string;
    action: string;
  };
  feedback?: boolean;
}

interface ChatWindowProps {
  messages: Message[];
}

const ChatWindow: React.FC<ChatWindowProps> = ({ messages }) => {
  return (
    <ChatWindowContainer>
      {messages.map((message, index) => {
        if (message.type === 'human') {
          return <HumanMessage key={index} text={message.text} />;
        } else {
          return (
            <BotMessage
              key={index}
              text={message.text}
              attachment={message.attachment}
              feedback={message.feedback}
            />
          );
        }
      })}
    </ChatWindowContainer>
  );
};

export default ChatWindow;
