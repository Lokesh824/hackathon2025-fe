import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Header from '../components/Header/Header';
import Sidebar from '../components/Sidebar/Sidebar';
import ChatInput from '../components/ChatInput/ChatInput';
import ChatWindow from '../components/ChatWindow/ChatWindow';
import TypingLoader from '../components/TypingLoader/TypingLoader';
import { Button } from 'antd';
import { BulbOutlined, ClockCircleOutlined } from '@ant-design/icons';
import { chatService } from '../services/api';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  width: 100%;
`;

const ContentContainer = styled.div`
  display: flex;
  flex-grow: 1;
  overflow: hidden;
`;


const MainContent = styled.div`
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  position: relative;
  background-color: #f4f5f7;
`;

const ChatArea = styled.div`
  flex-grow: 1;
  padding: 24px;
  display: flex;
  flex-direction: column;
  /* justify-content: center; */
  align-items: center;
  z-index: 1;
  overflow: hidden;

  @media (max-width: 768px) {
    padding: 16px;
  }
`;



const WelcomeJohn = styled.h2`
  font-size: 32px;
  font-weight: bold;
  background: linear-gradient(275.55deg, #79BCDB -2.25%, #0052CC 101.83%);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  color: transparent;
  margin-bottom: 16px;

  @media (max-width: 768px) {
    font-size: 24px;
  }
`;

const WelcomeText = styled.h1`
  font-size: 28px;
  font-weight: bold;
  color: #172b4d;

  @media (max-width: 768px) {
    font-size: 20px;
  }
`;

const WelcomeSubtext = styled.p`
  font-size: 16px;
  color: #7A869A;
  text-align: center;
  max-width: 589px;
  margin-top: 8px;

  @media (max-width: 768px) {
    font-size: 14px;
    max-width: 90%;
  }
`;

const TopRightButtons = styled.div`
  position: absolute;
  top: 24px;
  right: 24px;
  display: flex;
  gap: 8px;
  z-index: 1;

  @media (max-width: 768px) {
    top: 16px;
    right: 16px;
  }
`;

const BackgroundImage = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-size: cover;
  background-position: center;
  opacity: 0.1;
  z-index: 0;
`;

interface Message {
  type: 'human' | 'bot';
  text: string;
  attachment?: {
    name: string;
    action: string;
  };
  feedback?: boolean;
  file?: {
    name: string;
    size: number;
    type: string;
  };
}

type ConversationState = 'idle' | 'awaiting_protocol_name';

const Chat: React.FC = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [conversationState, setConversationState] = useState<ConversationState>('idle');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    // Log messages to console when they change, but not for the initial empty state.
    if (messages.length > 0) {
      console.log(JSON.stringify(messages, null, 2));
    }
  }, [messages]);

  const handleSendMessage = async (text: string, file?: File) => {
    const userMessage: Message = { type: 'human', text };
    if (file) {
      userMessage.file = { name: file.name, size: file.size, type: file.type };
    }

    setMessages(prev => [...prev, userMessage]);

        if (conversationState === 'awaiting_protocol_name') {
      const protocolName = text;
      
      try {
        setIsLoading(true);
        setMessages(prev => [...prev, { type: 'bot', text: `Creating protocol: ${protocolName}...` }]);
        
        const data = await chatService.createCSRProtocol(protocolName);
        console.log('CSR Protocol creation response:', data);
        
        const botResponse: Message = {
          type: 'bot',
          text: `Your CSR protocol "${protocolName}" has been created successfully!`,
          attachment: {
            name: `${protocolName}.docx`,
            action: 'View Document',
          },
        };
        setMessages(prev => [...prev, botResponse]);
      } catch (error) {
        console.error('CSR Protocol creation error:', error);
        setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, there was an error creating the CSR protocol. Please try again.' }]);
      } finally {
        setIsLoading(false);
      }

      setConversationState('idle');
    } else if (text.toLowerCase().includes('create a csr protocol document')) {
      const botResponse: Message = { type: 'bot', text: 'What will be the name of the study?' };
      setMessages(prev => [...prev, botResponse]);
      setConversationState('awaiting_protocol_name');
    } else if (text.toLowerCase().startsWith('how do i')) {
      try {
        setIsLoading(true);
        const data = await chatService.sendJiraQuestion(text);
        setMessages(prev => [...prev, { type: 'bot', text: data?.result ?? "" }]);
      } catch (error) {
        console.error('API Error:', error);
        setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, I am having trouble connecting to the server.' }]);
      } finally {
        setIsLoading(false);
      }
    } else if (text.toLowerCase().startsWith('tell me about') || text.toLowerCase().startsWith('give me list')) {
      try {
        setIsLoading(true);
        const data = await chatService.sendGeneralQuestion(text);
        console.log('the data is', data)
        setMessages(prev => [...prev, { type: 'bot', text: `${data?.pubmed ?? ""} \n ${data?.ctgov ?? ""}` }]);
      } catch (error) {
        console.error('API Error:', error);
        setMessages(prev => [...prev, { type: 'bot', text: 'Sorry, I am having trouble connecting to the server.' }]);
      } finally {
        setIsLoading(false);
      }
    } else {
      // Default bot response
      setTimeout(() => {
        setMessages(prev => [...prev, { type: 'bot', text: 'How can I help you today?' }]);
      }, 1000);
    }
  };
  return (
    <AppContainer>
      <Header />
      <ContentContainer>
        <Sidebar />
        <MainContent>
          <BackgroundImage />
          <TopRightButtons>
            <Button icon={<BulbOutlined />}>Insights</Button>
            <Button icon={<ClockCircleOutlined />} />
          </TopRightButtons>
                    <ChatArea>
            {messages.length === 0 ? (
              <>
                <WelcomeJohn>Welcome John</WelcomeJohn>
                <WelcomeText>What do you want to create?</WelcomeText>
                <WelcomeSubtext>
                  Prompt-Driven Workflows, Automated Content, and Seamless Integration for Consistent, High-Quality Documents.
                </WelcomeSubtext>
              </>
            ) : (
              <>
                <ChatWindow messages={messages} />
                {isLoading && <TypingLoader />}
              </>
            )}
            <ChatInput onSendMessage={handleSendMessage} />
          </ChatArea>
        </MainContent>
      </ContentContainer>
    </AppContainer>
  );
};

export default Chat;

