"use client";

import React, { useState, useRef, useEffect } from "react";
import { Message, Branch } from "@/types/chat";
import { updateMessage, createBranch } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { VersionDisplay } from "@/components/chat/VersionDisplay";
import { MessageContent } from "@/components/chat/MessageContent";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";

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
  const [editingVersionIndex, setEditingVersionIndex] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [editedContent, setEditedContent] = useState(userMessage.content);
  const [versions, setVersions] = useState<Branch[]>(() => {
    const savedVersions = localStorage.getItem(`versions-${userMessage.id}`);
    return savedVersions ? JSON.parse(savedVersions) : [{ userMessage, aiMessage }];
  });
  const [currentVersionIndex, setCurrentVersionIndex] = useState(() => {
    const savedIndex = localStorage.getItem(`currentVersionIndex-${userMessage.id}`);
    return savedIndex ? parseInt(savedIndex, 10) : versions.length - 1;
  });
  const [showVersionHistory, setShowVersionHistory] = useState(false);
  const { toast } = useToast();
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    localStorage.setItem(`versions-${userMessage.id}`, JSON.stringify(versions));
  }, [versions, userMessage.id]);

  useEffect(() => {
    localStorage.setItem(`currentVersionIndex-${userMessage.id}`, currentVersionIndex.toString());
  }, [currentVersionIndex, userMessage.id]);

  const handleEdit = (index: number) => {
    setIsEditing(true);
    setEditingVersionIndex(index);
    setEditedContent(versions[index].userMessage.content);
  };

  const handleCancel = () => {
    setIsEditing(false);
    setEditingVersionIndex(null);
    setEditedContent(versions[currentVersionIndex].userMessage.content);
  };

  const handleSend = async () => {
    setIsLoading(true);
    try {
      const updatedMessage = await updateMessage(versions[editingVersionIndex!].userMessage.id, editedContent);
      const newBranch = await createBranch(updatedMessage.id, editedContent);
      
      const updatedVersions = [...versions, { userMessage: updatedMessage, aiMessage: newBranch.aiMessage }];
      
      setVersions(updatedVersions);
      setCurrentVersionIndex(updatedVersions.length - 1);
      onUpdate(updatedMessage, newBranch.aiMessage);
      setIsEditing(false);
      setEditingVersionIndex(null);
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

  const handlePreviousVersion = () => {
    setCurrentVersionIndex((prevIndex) => Math.max(0, prevIndex - 1));
  };

  const handleNextVersion = () => {
    setCurrentVersionIndex((prevIndex) => Math.min(versions.length - 1, prevIndex + 1));
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Switch
            checked={showVersionHistory}
            onCheckedChange={setShowVersionHistory}
            id="version-history-toggle"
          />
          <label htmlFor="version-history-toggle" className="text-sm text-muted-foreground cursor-pointer">
            Show version history
          </label>
        </div>
        <div className="flex items-center space-x-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handlePreviousVersion}
            disabled={currentVersionIndex === 0}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <span className="text-sm text-muted-foreground">
            Version {currentVersionIndex + 1} of {versions.length}
          </span>
          <Button
            variant="ghost"
            size="sm"
            onClick={handleNextVersion}
            disabled={currentVersionIndex === versions.length - 1}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      {showVersionHistory ? (
        <div className="space-y-4 border-l-2 border-muted pl-4">
          {versions.map((version, index) => (
            <VersionDisplay
              key={index}
              version={version}
              index={index}
              isEditing={isEditing && editingVersionIndex === index}
              onEdit={() => handleEdit(index)}
              isLoading={isLoading}
              editedContent={editedContent}
              setEditedContent={setEditedContent}
              onCancel={handleCancel}
              onSend={handleSend}
              onBranch={() => onBranch(version)}
              onRestore={() => setCurrentVersionIndex(index)}
              textareaRef={textareaRef}
              isActive={index === currentVersionIndex}
            />
          ))}
        </div>
      ) : (
        <div className="space-y-4">
          <MessageContent
            message={versions[currentVersionIndex].userMessage}
            isUser={true}
            isEditing={isEditing && editingVersionIndex === currentVersionIndex}
            isLoading={isLoading}
            editedContent={editedContent}
            setEditedContent={setEditedContent}
            onEdit={() => handleEdit(currentVersionIndex)}
            onCancel={handleCancel}
            onSend={handleSend}
            onBranch={() => onBranch(versions[currentVersionIndex])}
            textareaRef={textareaRef}
          />
          <MessageContent
            message={versions[currentVersionIndex].aiMessage}
            isUser={false}
            isEditing={false}
            isLoading={false}
            editedContent=""
            setEditedContent={() => {}}
            onBranch={() => onBranch(versions[currentVersionIndex])}
            textareaRef={textareaRef}
          />
        </div>
      )}
    </div>
  );
}