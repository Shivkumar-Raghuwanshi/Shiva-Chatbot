import { ChatAnthropic } from "@langchain/anthropic";
import { HumanMessage, SystemMessage, AIMessage, BaseMessage } from "@langchain/core/messages";
import { AIMessageChunk } from "@langchain/core/messages";

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
    });
  }

  async sendMessage(messages: { role: string; content: string }[]): Promise<string> {
    try {
      console.log("Formatting messages...");
      const formattedMessages = messages.map(msg => this.formatMessage(msg));

      console.log("Invoking ChatAnthropic...");
      const response = await this.chat.invoke(formattedMessages);
      
      console.log("Processing response...");
      return this.processResponse(response);
    } catch (error) {
      console.error("Detailed error in Claude chat:", error);
      if (error instanceof Error) {
        console.error("Error message:", error.message);
        console.error("Error stack:", error.stack);
      }
      throw new Error(`Failed to get response from Claude: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  private formatMessage(msg: { role: string; content: string }): BaseMessage {
    switch (msg.role.toLowerCase()) {
      case "system":
        return new SystemMessage(msg.content);
      case "human":
      case "user":
        return new HumanMessage(msg.content);
      case "ai":
      case "assistant":
        return new AIMessage(msg.content);
      default:
        throw new Error(`Unsupported message role: ${msg.role}`);
    }
  }

  private processResponse(response: AIMessageChunk): string {
    if (typeof response.content === 'string') {
      return response.content;
    } else if (Array.isArray(response.content)) {
      return response.content.map(item => typeof item === 'string' ? item : JSON.stringify(item)).join(' ');
    } else {
      return JSON.stringify(response.content);
    }
  }
}

export const claudeChat = new ClaudeChat();