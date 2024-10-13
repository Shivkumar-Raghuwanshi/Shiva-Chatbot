"use client";

import React, { useEffect } from 'react';
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Message } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { User, Bot } from "lucide-react";
import { MarkdownContent } from '@/components/chat/MarkdownContent';
import { EditingTextarea } from '@/components/chat/EditingTextarea';
import { MessageActions } from '@/components/chat/MessageActions';

interface MessageContentProps {
  message: Message;
  isUser: boolean;
  isEditing: boolean;
  isLoading: boolean;
  editedContent: string;
  setEditedContent: (content: string) => void;
  onEdit?: () => void;
  onCancel?: () => void;
  onSend?: () => void;
  onBranch: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const MessageContent: React.FC<MessageContentProps> = ({
  message,
  isUser,
  isEditing,
  isLoading,
  editedContent,
  setEditedContent,
  onEdit,
  onCancel,
  onSend,
  onBranch,
  textareaRef
}) => {
  const messageVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 }
  };

  useEffect(() => {
    if (isEditing && textareaRef?.current) {
      textareaRef.current.focus();
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
    }
  }, [isEditing, editedContent, textareaRef]);

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      exit="exit"
      variants={messageVariants}
      transition={{ duration: 0.2 }}
      className={cn(
        "group flex items-start space-x-4 mb-4",
        isUser ? "justify-end" : "justify-start"
      )}
    >
      <div className={cn(
        "flex items-start space-x-4 max-w-[80%]",
        isUser ? "flex-row-reverse space-x-reverse" : "flex-row"
      )}>
        <Avatar className={cn(
          "w-8 h-8 border-2",
          isUser ? "border-primary/20" : "border-secondary/20"
        )}>
          <AvatarImage src={`/${message.role}.png`} />
          <AvatarFallback className={cn(
            "bg-gradient-to-br",
            isUser ? "from-primary/20 to-primary/10" : "from-secondary/20 to-secondary/10"
          )}>
            {isUser ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
          </AvatarFallback>
        </Avatar>

        <div className="space-y-1">
          <Card className={cn(
            "shadow-sm transition-all duration-200",
            isUser && !isEditing ? "bg-primary text-primary-foreground" : "bg-card",
            "group-hover:shadow-md",
            isEditing && "bg-background/50 backdrop-blur-sm"
          )}>
            <CardContent className={cn("p-3", isUser ? "text-right" : "text-left")}>
              {isEditing && isUser ? (
                <EditingTextarea
                  editedContent={editedContent}
                  setEditedContent={setEditedContent}
                  onSend={onSend!}
                  textareaRef={textareaRef}
                />
              ) : (
                <MarkdownContent content={message.content} isUser={isUser} isEditing={isEditing} />
              )}
            </CardContent>
          </Card>

          <MessageActions
            message={message}
            isUser={isUser}
            isEditing={isEditing}
            isLoading={isLoading}
            onEdit={onEdit}
            onCancel={onCancel}
            onSend={onSend}
            onBranch={onBranch}
          />
        </div>
      </div>
    </motion.div>
  );
};