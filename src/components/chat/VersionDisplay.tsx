import React, { useRef } from 'react';
import { MessageContent } from '@/components/chat/MessageContent';
import { Branch } from '@/types/chat';

interface VersionDisplayProps {
  version: Branch;
  index: number;
}

export const VersionDisplay: React.FC<VersionDisplayProps> = ({ version, index }) => {
  const userTextareaRef = useRef<HTMLTextAreaElement>(null);
  const aiTextareaRef = useRef<HTMLTextAreaElement>(null);

  // These are placeholder functions. Replace them with actual implementations if needed.
  const noop = () => {};

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">Version {index + 1}</h3>
      <MessageContent 
        message={version.userMessage} 
        isUser={true} 
        isEditing={false}
        editedContent={version.userMessage.content}
        setEditedContent={noop}
        onBranch={noop}
        textareaRef={userTextareaRef}
      />
      <MessageContent 
        message={version.aiMessage} 
        isUser={false} 
        isEditing={false}
        editedContent={version.aiMessage.content}
        setEditedContent={noop}
        onBranch={noop}
        textareaRef={aiTextareaRef}
      />
    </div>
  );
};