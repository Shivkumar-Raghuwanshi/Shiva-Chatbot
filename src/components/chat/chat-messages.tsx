"use client";

import { useMemo } from "react";
import { Message, Branch } from "@/types/chat";
import { ChatMessagePair } from "./chat-message";
import { motion, AnimatePresence } from "framer-motion";

interface ChatMessagesProps {
  messages: Message[];
  onUpdate: (updatedUserMessage: Message, updatedAiMessage: Message) => void;
  onBranch: (newBranch: { userMessage: Message; aiMessage: Message }) => void;
}

function buildMessagePairTree(messages: Message[]): Array<{userMessage: Message; aiMessage: Message}> {
  const messageMap = new Map<string, Message>();
  const pairs: Array<{userMessage: Message; aiMessage: Message}> = [];

  messages.forEach(message => {
    messageMap.set(message.id, { ...message, children: [] });
  });

  messages.forEach(message => {
    if (message.role === 'user') {
      const nextMessage = messages.find(m => m.parentId === message.id && m.role === 'assistant');
      if (nextMessage) {
        pairs.push({
          userMessage: message,
          aiMessage: nextMessage
        });
      }
    }
  });

  pairs.sort((a, b) => {
    const timeA = new Date(a.userMessage.createdAt).getTime();
    const timeB = new Date(b.userMessage.createdAt).getTime();
    return timeA - timeB;
  });

  return pairs;
}

export function ChatMessages({ messages, onUpdate, onBranch }: ChatMessagesProps) {
  const messagePairs = useMemo(() => buildMessagePairTree(messages), [messages]);

  return (
    <div className="relative max-w-4xl mx-auto px-4 py-6">
      <div className="absolute inset-0 bg-gradient-to-b from-background/10 via-background/50 to-background/10 pointer-events-none" />
      <AnimatePresence mode="popLayout">
        {messagePairs.map((pair, index) => (
          <motion.div
            key={pair.userMessage.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="relative"
          >
            <div className="absolute -left-4 h-full w-0.5 bg-gradient-to-b from-primary/20 via-primary/50 to-primary/20" />
            <ChatMessagePair
              userMessage={pair.userMessage}
              aiMessage={pair.aiMessage}
              onUpdate={onUpdate}
              onBranch={onBranch}
            />
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}