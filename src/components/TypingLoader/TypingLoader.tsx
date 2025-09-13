import React from 'react';
import styled, { keyframes } from 'styled-components';

const bounce = keyframes`
  0%, 60%, 100% {
    transform: translateY(0);
  }
  30% {
    transform: translateY(-10px);
  }
`;

const TypingContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 16px 20px;
  background-color: #ffffff;
  border-radius: 12px;
  margin: 8px 0;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  max-width: fit-content;
`;

const TypingText = styled.span`
  color: #7A869A;
  font-size: 14px;
  margin-right: 8px;
`;

const DotsContainer = styled.div`
  display: flex;
  gap: 4px;
`;

const Dot = styled.div<{ delay: number }>`
  width: 6px;
  height: 6px;
  background-color: #0052CC;
  border-radius: 50%;
  animation: ${bounce} 1.4s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
`;

const TypingLoader: React.FC = () => {
  return (
    <TypingContainer>
      <TypingText>Thinking...</TypingText>
      <DotsContainer>
        <Dot delay={0} />
        <Dot delay={0.2} />
        <Dot delay={0.4} />
      </DotsContainer>
    </TypingContainer>
  );
};

export default TypingLoader;
