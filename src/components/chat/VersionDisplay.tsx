import React from 'react';
import { Branch } from '@/types/chat';
import { MessageContent } from '@/components/chat/MessageContent';
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

interface VersionDisplayProps {
  version: Branch;
  index: number;
  isEditing: boolean;
  onEdit: () => void;
  isLoading: boolean;
  editedContent: string;
  setEditedContent: (content: string) => void;
  onCancel: () => void;
  onSend: () => void;
  onBranch: () => void;
  onRestore: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
  isActive: boolean;
}

export const VersionDisplay: React.FC<VersionDisplayProps> = ({
  version,
  index,
  isEditing,
  onEdit,
  isLoading,
  editedContent,
  setEditedContent,
  onCancel,
  onSend,
  onBranch,
  onRestore,
  textareaRef,
  isActive
}) => {
  return (
    <div className={`space-y-4 p-4 ${isActive ? 'bg-accent/50 rounded-lg' : ''}`}>
      <div className="flex justify-between items-center">
        <h3 className="text-sm font-semibold">Version {index + 1}</h3>
        {!isActive && (
          <Button variant="ghost" size="sm" onClick={onRestore} className="text-xs">
            <ArrowLeft className="mr-1 h-4 w-4" />
            Restore this version
          </Button>
        )}
      </div>
      <MessageContent
        message={version.userMessage}
        isUser={true}
        isEditing={isEditing}
        isLoading={isLoading}
        editedContent={editedContent}
        setEditedContent={setEditedContent}
        onEdit={onEdit}
        onCancel={onCancel}
        onSend={onSend}
        onBranch={onBranch}
        textareaRef={textareaRef}
      />
      <MessageContent
        message={version.aiMessage}
        isUser={false}
        isEditing={false}
        isLoading={false}
        editedContent=""
        setEditedContent={() => {}}
        onBranch={onBranch}
        textareaRef={textareaRef}
      />
    </div>
  );
};