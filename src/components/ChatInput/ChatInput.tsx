import React, { useState, useRef } from 'react';
import styled from 'styled-components';
import { Input, Button } from 'antd';
import { PlusOutlined, BookOutlined, LayoutOutlined, PaperClipOutlined, AudioOutlined, SendOutlined, CloseOutlined } from '@ant-design/icons';

const ChatInputWrapper = styled.div`
  width: 100%;
  max-width: 1120px;
  background-color: white;
  border-radius: 8px;
  padding: 16px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  margin-top: auto;
`;

const StyledTextArea = styled(Input.TextArea)`
  border: none;
  resize: none;
  box-shadow: none !important;
  flex-grow: 1;
  font-size: 13px;

  &::placeholder {
    color: #7a869a;
  }
`;

const FilePreviewContainer = styled.div`
  padding: 8px 16px;
  border-top: 1px solid #f0f0f0;
  display: flex;
  justify-content: space-between;
  align-items: center;
  font-size: 13px;
  color: #5e6c84;
`;

const ButtonBar = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 16px;
  padding-top: 16px;
  border-top: 1px solid #f0f0f0;

  @media (max-width: 768px) {
    flex-direction: column;
    align-items: stretch;
    gap: 8px;
  }
`;

const LeftButtons = styled.div`
  display: flex;
  gap: 8px;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

interface ChatInputProps {
  onSendMessage: (text: string, file?: File) => void;
}

const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage }) => {
  const [inputValue, setInputValue] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

      const handleRemoveFile = () => {
    setFile(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSend = () => {
    if (inputValue.trim() || file) {
      onSendMessage(inputValue, file || undefined);
      setInputValue('');
      setFile(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleAttachClick = () => {
    fileInputRef.current?.click();
  };
  return (
    <ChatInputWrapper>
      {file && (
        <FilePreviewContainer>
          <span>{file.name}</span>
          <CloseOutlined onClick={handleRemoveFile} style={{ cursor: 'pointer' }} />
        </FilePreviewContainer>
      )}
      <StyledTextArea
        placeholder="Describe what are you thinking"
        autoSize={{ minRows: 3, maxRows: 3 }}
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onPressEnter={(e) => {
          if (!e.shiftKey) {
            e.preventDefault();
            handleSend();
          }
        }}
      />
      <ButtonBar>
        <LeftButtons>
          <Button icon={<PlusOutlined />}>Create</Button>
          <Button icon={<BookOutlined />}>Knowledge Base</Button>
          <Button icon={<LayoutOutlined />}>Templates</Button>
          <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
      <Button icon={<PaperClipOutlined />} onClick={handleAttachClick}>Attach</Button>
          <Button icon={<AudioOutlined />}>Voice</Button>
        </LeftButtons>
        <Button type="primary" icon={<SendOutlined />} onClick={handleSend}>Send</Button>
      </ButtonBar>
    </ChatInputWrapper>
  );
};

export default ChatInput;
