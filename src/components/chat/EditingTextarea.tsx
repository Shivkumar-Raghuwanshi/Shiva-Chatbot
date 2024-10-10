"use client";

import React, { useState, useEffect } from 'react';
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

interface EditingTextareaProps {
  editedContent: string;
  setEditedContent: (content: string) => void;
  onSend: () => void;
  textareaRef: React.RefObject<HTMLTextAreaElement>;
}

export const EditingTextarea: React.FC<EditingTextareaProps> = ({
  editedContent,
  setEditedContent,
  onSend,
  textareaRef
}) => {
  const [cursorPosition, setCursorPosition] = useState(editedContent.length);

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const newText = e.target.value;
    const newCursorPosition = e.target.selectionStart;
    setEditedContent(newText);
    setCursorPosition(newCursorPosition);
  };

  useEffect(() => {
    if (textareaRef.current) {
      textareaRef.current.setSelectionRange(cursorPosition, cursorPosition);
    }
  }, [cursorPosition, editedContent, textareaRef]);

  return (
    <div className="relative w-full">
      <Textarea
        ref={textareaRef}
        value={editedContent}
        onChange={handleInputChange}
        onKeyDown={(e) => {
          if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            onSend();
          }
        }}
        className={cn(
          "min-h-[60px] w-full resize-none",
          "bg-background text-foreground",
          "border-none focus-visible:ring-1 focus-visible:ring-primary",
          "placeholder:text-muted-foreground",
          "p-2 rounded-md shadow-inner",
          "text-left"
        )}
        style={{
          direction: 'ltr',
          textAlign: 'left',
          unicodeBidi: 'plaintext',
        }}
        placeholder="Edit your message..."
      />
    </div>
  );
};