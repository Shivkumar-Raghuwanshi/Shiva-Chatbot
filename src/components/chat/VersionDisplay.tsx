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

  const noop = () => {};

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-muted-foreground">Version {index + 1}</h3>
      <MessageContent 
        message={version.userMessage} 
        isUser={true} 
        isEditing={false}
        isLoading={false}
        editedContent={version.userMessage.content}
        setEditedContent={noop}
        onEdit={noop}
        onCancel={noop}
        onSend={noop}
        onBranch={noop}
        textareaRef={userTextareaRef}
      />
      <MessageContent 
        message={version.aiMessage} 
        isUser={false} 
        isEditing={false}
        isLoading={false}
        editedContent={version.aiMessage.content}
        setEditedContent={noop}
        onEdit={noop}
        onCancel={noop}
        onSend={noop}
        onBranch={noop}
        textareaRef={aiTextareaRef}
      />
    </div>
  );
};