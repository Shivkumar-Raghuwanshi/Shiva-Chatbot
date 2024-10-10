import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import { AIMessageChunk, MessageContentText, MessageContentImageUrl } from "@langchain/core/messages";

class ClaudeChat {
  private chat: ChatAnthropic;

  constructor() {
    const anthropicApiKey = process.env.ANTHROPIC_API_KEY;
    if (!anthropicApiKey) {
      throw new Error("Anthropic API key is not provided.");
    }

    this.chat = new ChatAnthropic({
      anthropicApiKey: anthropicApiKey,
      modelName: "claude-3-sonnet-20240229",
      temperature: 0.7,
    });
  }

  async sendMessage(history: { role: string; content: string }[]): Promise<string> {
    try {
      console.log("Processing chat history:", history);
      const formattedMessages = history.map(msg => this.formatMessage(msg));

      console.log("Sending request to Claude...");
      const response = await this.chat.invoke(formattedMessages);
      
      console.log("Raw Claude response:", response);
      const processedResponse = this.processResponse(response);
      console.log("Processed response:", processedResponse);
      
      return processedResponse;
    } catch (error) {
      console.error("Error in Claude chat:", error);
      throw error;
    }
  }

  private formatMessage(msg: { role: string; content: string }): BaseMessage {
    const content = typeof msg.content === 'string' ? msg.content : JSON.stringify(msg.content);
    
    switch (msg.role.toLowerCase()) {
      case "system":
        return new SystemMessage(content);
      case "human":
      case "user":
        return new HumanMessage(content);
      case "ai":
      case "assistant":
        return new AIMessage(content);
      default:
        console.warn(`Unsupported message role: ${msg.role}, defaulting to user`);
        return new HumanMessage(content);
    }
  }

  private processResponse(response: AIMessageChunk): string {
    try {
      if (typeof response.content === 'string') {
        return response.content;
      }
      
      if (Array.isArray(response.content)) {
        return response.content
          .map(content => {
            if (typeof content === 'string') {
              return content;
            }
            
            // Handle text content
            if (this.isTextContent(content)) {
              return content.text;
            }
            
            // Handle image URL content
            if (this.isImageContent(content)) {
              return `[Image: ${content.image_url}]`;
            }
            
            return JSON.stringify(content);
          })
          .filter(Boolean)
          .join(' ');
      }
      
      return JSON.stringify(response.content);
    } catch (error) {
      console.error("Error processing response:", error);
      throw new Error("Failed to process AI response");
    }
  }

  private isTextContent(content: any): content is MessageContentText {
    return content && 'type' in content && content.type === 'text';
  }

  private isImageContent(content: any): content is MessageContentImageUrl {
    return content && 'type' in content && content.type === 'image';
  }
}

export const claudeChat = new ClaudeChat();