
"use client";

import React, { useState, useEffect } from "react";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { Message, Branch } from "@/types/chat";
import { sendMessage } from "@/lib/api";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { MoreVertical, Settings, Trash, Download, Users, Share2, Bot } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";

interface ChatContainerProps {
  chatId: string;
  initialMessages: Message[];
}

export function ChatContainer({ chatId, initialMessages }: ChatContainerProps) {
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleUpdate = (updatedMessage: Message) => {
    setMessages(prevMessages =>
      prevMessages.map(msg =>
        msg.id === updatedMessage.id ? updatedMessage : msg
      )
    );
  };

  const handleBranch = (newBranch: Branch) => {
    setMessages(prevMessages => [...prevMessages, newBranch.userMessage, newBranch.aiMessage]);
  };

  const handleSendMessage = async (content: string) => {
    setIsLoading(true);
    try {
      console.log("Sending message:", content);
      const response = await sendMessage(chatId, content);
      console.log("Response received:", response);

      if (!response.userMessage || !response.aiMessage) {
        throw new Error("Invalid response format");
      }

      setMessages(prevMessages => {
        console.log("Updating messages:", [...prevMessages, response.userMessage, response.aiMessage]);
        return [...prevMessages, response.userMessage, response.aiMessage];
      });
    } catch (error) {
      console.error("Failed to send message:", error);
      toast({
        title: "Error",
        description: error instanceof Error ? error.message : "Failed to send message",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("Current messages:", messages);
  }, [messages]);

  return (
    <div className="flex flex-col h-screen bg-gradient-to-b from-background to-background/95">
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="flex items-center justify-between p-4 backdrop-blur-sm border-b bg-background/50"
      >
        <div className="flex items-center space-x-4">
          <Avatar className="h-10 w-10 ring-2 ring-primary/10">
            <AvatarImage src="/bot-avatar.png" alt="AI Assistant" />
            <AvatarFallback className="bg-primary/5">
              <Bot className="h-5 w-5 text-primary" />
            </AvatarFallback>
          </Avatar>
          <div>
            <h2 className="text-xl font-semibold">AI Assistant</h2>
            <p className="text-sm text-muted-foreground">Always here to help</p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <Button variant="ghost" size="icon" className="rounded-full">
            <Users className="h-5 w-5" />
          </Button>
          <Button variant="ghost" size="icon" className="rounded-full">
            <Share2 className="h-5 w-5" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="rounded-full">
                <MoreVertical className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuItem className="py-2">
                <Settings className="mr-2 h-4 w-4" />
                <span>Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="py-2">
                <Download className="mr-2 h-4 w-4" />
                <span>Export Chat</span>
              </DropdownMenuItem>
              <DropdownMenuItem className="text-destructive py-2">
                <Trash className="mr-2 h-4 w-4" />
                <span>Delete Chat</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </motion.div>

      <ScrollArea className="flex-grow backdrop-blur-sm">
        <div className="p-4 md:p-6 max-w-4xl mx-auto">
          <ChatMessages
            messages={messages}
            onUpdate={handleUpdate}
            onBranch={handleBranch}
          />
        </div>
      </ScrollArea>

      <motion.div
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="border-t bg-background/50 backdrop-blur-sm"
      >
        <div className="max-w-4xl mx-auto">
          <ChatInput onSubmit={handleSendMessage} isLoading={isLoading} />
        </div>
      </motion.div>
    </div>
  );
}