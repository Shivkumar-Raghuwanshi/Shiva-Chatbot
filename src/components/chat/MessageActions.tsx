"use client";

import React from 'react';
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { Copy, Edit2, Reply, X, Send } from "lucide-react";
import { cn } from "@/lib/utils";
import { Message } from '@/types/chat';
import { useToast } from "@/hooks/use-toast";

interface MessageActionsProps {
  message: Message;
  isUser: boolean;
  isEditing: boolean;
  onEdit?: () => void;
  onCancel?: () => void;
  onSend?: () => void;
  onBranch: () => void;
}

export const MessageActions: React.FC<MessageActionsProps> = ({
  message,
  isUser,
  isEditing,
  onEdit,
  onCancel,
  onSend,
  onBranch
}) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "The message has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast({
        title: "Copy failed",
        description: "Failed to copy the message. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className={cn(
      "flex items-center gap-2 opacity-0 group-hover:opacity-100 transition-opacity",
      isUser && "justify-end"
    )}>
      <TooltipProvider>
        <div className="flex -space-x-1">
          {!isEditing && (
            <>
              <ActionButton
                tooltip="Copy message"
                onClick={() => copyToClipboard(message.content)}
                icon={<Copy className="h-3 w-3" />}
              />
              {isUser && onEdit && (
                <ActionButton
                  tooltip="Edit message"
                  onClick={onEdit}
                  icon={<Edit2 className="h-3 w-3" />}
                />
              )}
              <ActionButton
                tooltip="Branch from here"
                onClick={onBranch}
                icon={<Reply className="h-3 w-3" />}
              />
            </>
          )}
        </div>
      </TooltipProvider>

      {isEditing && isUser && onCancel && onSend && (
        <div className="flex items-center gap-2">
          <Button
            size="sm"
            variant="ghost"
            onClick={onCancel}
            className="h-7 px-2 text-sm"
          >
            <X className="h-3 w-3 mr-1" /> Cancel
          </Button>
          <Button
            size="sm"
            onClick={onSend}
            className="h-7 px-2 text-sm"
          >
            <Send className="h-3 w-3 mr-1" /> Send
          </Button>
        </div>
      )}

      {!isEditing && (
        <span className="text-xs text-muted-foreground">
          {new Date(message.createdAt).toLocaleTimeString([], {
            hour: '2-digit',
            minute: '2-digit'
          })}
          {message.isEdited && " (edited)"}
        </span>
      )}
    </div>
  );
};

const ActionButton: React.FC<{
  tooltip: string;
  onClick: () => void;
  icon: React.ReactNode;
}> = ({ tooltip, onClick, icon }) => (
  <Tooltip>
    <TooltipTrigger asChild>
      <Button
        variant="ghost"
        size="icon"
        className="h-7 w-7 rounded-full hover:bg-muted"
        onClick={onClick}
      >
        {icon}
      </Button>
    </TooltipTrigger>
    <TooltipContent>{tooltip}</TooltipContent>
  </Tooltip>
);