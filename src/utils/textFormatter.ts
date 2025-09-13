import React from 'react';

export interface FormattedTextElement {
  type: 'text' | 'heading' | 'paragraph';
  content: string;
  level?: number;
}

export const parseFormattedText = (text: string): FormattedTextElement[] => {
  const elements: FormattedTextElement[] = [];
  
  // Split text into lines and process each one
  const lines = text.split('\n');
  
  for (let i = 0; i < lines.length; i++) {
    const line = lines[i].trim();
    
    if (!line) {
      // Skip empty lines but add paragraph breaks
      continue;
    }
    
    // Check for headings marked with **text**
    const headingMatch = line.match(/^\*\*(.*?)\*\*:?$/);
    if (headingMatch) {
      elements.push({
        type: 'heading',
        content: headingMatch[1].trim(),
        level: 3 // Default to h3
      });
      continue;
    }
    
    // Check for numbered headings like "1. **Text**:"
    const numberedHeadingMatch = line.match(/^\d+\.\s*\*\*(.*?)\*\*:?/);
    if (numberedHeadingMatch) {
      elements.push({
        type: 'heading',
        content: numberedHeadingMatch[1].trim(),
        level: 2 // h2 for numbered sections
      });
      continue;
    }
    
    // Check for section headings with ### prefix
    const sectionMatch = line.match(/^###\s*(.*)/);
    if (sectionMatch) {
      elements.push({
        type: 'heading',
        content: sectionMatch[1].trim(),
        level: 3
      });
      continue;
    }
    
    // Regular text - process inline formatting
    let processedText = line;
    
    // Handle inline bold text **text** that's not a heading
    processedText = processedText.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
    
    // Handle bullet points
    if (processedText.match(/^\s*-\s/)) {
      processedText = processedText.replace(/^\s*-\s/, '• ');
    }
    
    elements.push({
      type: 'paragraph',
      content: processedText
    });
  }
  
  return elements;
};

export const renderFormattedText = (elements: FormattedTextElement[]): React.ReactNode[] => {
  return elements.map((element, index) => {
    const key = `${element.type}-${index}`;
    
    switch (element.type) {
      case 'heading': {
        const level = element.level || 3;
        const HeadingTag = level === 2 ? 'h2' : 'h3';
        return React.createElement(
          HeadingTag,
          {
            key,
            style: {
              fontWeight: 'bold',
              fontSize: level === 2 ? '16px' : '14px',
              color: '#172b4d',
              margin: '12px 0 8px 0',
              lineHeight: '1.4'
            }
          },
          element.content
        );
      }
      
      case 'paragraph': {
        return React.createElement(
          'p',
          {
            key,
            style: {
              margin: '8px 0',
              lineHeight: '1.5',
              fontSize: '13px'
            },
            dangerouslySetInnerHTML: { __html: element.content }
          }
        );
      }
      
      default: {
        return React.createElement(
          'span',
          { key },
          element.content
        );
      }
    }
  });
};
