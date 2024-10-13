"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message, Branch } from "@/types/chat";
import { updateMessage, createBranch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { VersionControl } from "@/components/chat/VersionControl";
import { VersionDisplay } from "@/components/chat/VersionDisplay";
import { MessageContent } from "@/components/chat/MessageContent";

interface ChatMessagePairProps {
  userMessage: Message;
  aiMessage: Message;
  onUpdate: (updatedUserMessage: Message, updatedAiMessage: Message) => void;
  onBranch: (newBranch: Branch) => void;
}

export function ChatMessagePair({
  userMessage,
  aiMessage,
  onUpdate,
  onBranch,
}: ChatMessagePairProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [editedContent, setEditedContent] = useState(userMessage.content);
  const [versions, setVersions] = useState<Branch[]>(() => {
    const savedVersions = localStorage.getItem(`versions-${userMessage.id}`);
    return savedVersions ? JSON.parse(savedVersions) : [{ userMessage, aiMessage }];
  });
  const [currentVersionIndex, setCurrentVersionIndex] = useState(() => {
    const savedIndex = localStorage.getItem(`currentVersionIndex-${userMessage.id}`);
    return savedIndex ? parseInt(savedIndex, 10) : 0;
  });
  const [showAllVersions, setShowAllVersions] = useState(false);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem(`versions-${userMessage.id}`, JSON.stringify(versions));
  }, [versions, userMessage.id]);

  useEffect(() => {
    localStorage.setItem(`currentVersionIndex-${userMessage.id}`, currentVersionIndex.toString());
  }, [currentVersionIndex, userMessage.id]);

  const handleEdit = () => setIsEditing(true);
  const handleCancel = () => {
    setIsEditing(false);
    setEditedContent(userMessage.content);
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const updatedMessage = await updateMessage(userMessage.id, editedContent);
      const newBranch = await createBranch(updatedMessage.id, editedContent);
      
      onUpdate(updatedMessage, newBranch.aiMessage);
      setVersions([...versions, { userMessage: updatedMessage, aiMessage: newBranch.aiMessage }]);
      setCurrentVersionIndex(versions.length);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update message:", error);
      toast({
        title: "Error",
        description: "Failed to update message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      <VersionControl
        showAllVersions={showAllVersions}
        setShowAllVersions={setShowAllVersions}
        currentVersionIndex={currentVersionIndex}
        setCurrentVersionIndex={setCurrentVersionIndex}
        versionsCount={versions.length}
      />

      {showAllVersions ? (
        versions.map((version, index) => (
          <VersionDisplay key={index} version={version} index={index} />
        ))
      ) : (
        <div className="space-y-4">
          <MessageContent
            message={versions[currentVersionIndex].userMessage}
            isUser={true}
            isEditing={isEditing}
            isLoading={isLoading}
            editedContent={editedContent}
            setEditedContent={setEditedContent}
            onEdit={handleEdit}
            onCancel={handleCancel}
            onSend={handleSend}
            onBranch={() => onBranch({ userMessage, aiMessage })}
            textareaRef={textareaRef}
          />
          <MessageContent
            message={versions[currentVersionIndex].aiMessage}
            isUser={false}
            isEditing={false}
            isLoading={false}
            editedContent=""
            setEditedContent={() => {}}
            onBranch={() => onBranch({ userMessage, aiMessage })}
            textareaRef={textareaRef}
          />
        </div>
      )}
    </div>
  );
}