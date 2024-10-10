import React from 'react';
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface CodeComponentProps {
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface MarkdownContentProps {
  content: string;
  isUser: boolean;
  isEditing: boolean;
}

export const MarkdownContent: React.FC<MarkdownContentProps> = ({ content, isUser, isEditing }) => {
  const { toast } = useToast();

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      toast({
        title: "Copied to clipboard",
        description: "The code has been copied to your clipboard.",
      });
    } catch (err) {
      console.error("Failed to copy text:", err);
      toast({
        title: "Copy failed",
        description: "Failed to copy the code. Please try again.",
        variant: "destructive",
      });
    }
  };

  return (
    <div className="prose prose-sm max-w-none dark:prose-invert">
      <ReactMarkdown
        className={cn(
          !isUser && "prose-pre:bg-muted",
          isUser && !isEditing && "prose-headings:text-primary-foreground prose-p:text-primary-foreground",
          isUser ? "text-right" : "text-left"
        )}
        components={{
          code({ inline, className, children, ...props }: CodeComponentProps) {
            const match = /language-(\w+)/.exec(className || '');
            return !inline && match ? (
              <div className="relative group">
                <SyntaxHighlighter
                  style={vscDarkPlus as { [key: string]: React.CSSProperties }} // Correct type casting for the style
                  language={match[1]}
                  PreTag="div"
                  {...props}
                >
                  {String(children).replace(/\n$/, '')}
                </SyntaxHighlighter>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-2 opacity-0 group-hover:opacity-100 transition-opacity"
                  onClick={() => copyToClipboard(String(children))}
                >
                  <Copy className="h-4 w-4" />
                </Button>
              </div>
            ) : (
              <code className={cn(className, "bg-muted px-1 py-0.5 rounded text-sm")} {...props}>
                {children}
              </code>
            );
          },
          p({ children }) {
            return <p className="mb-2 last:mb-0">{children}</p>;
          },
          ul({ children }) {
            return <ul className="list-disc pl-4 mb-2">{children}</ul>;
          },
          ol({ children }) {
            return <ol className="list-decimal pl-4 mb-2">{children}</ol>;
          },
          li({ children }) {
            return <li className="mb-1">{children}</li>;
          },
          h1({ children }) {
            return <h1 className="text-2xl font-bold mb-2">{children}</h1>;
          },
          h2({ children }) {
            return <h2 className="text-xl font-bold mb-2">{children}</h2>;
          },
          h3({ children }) {
            return <h3 className="text-lg font-bold mb-2">{children}</h3>;
          },
          blockquote({ children }) {
            return <blockquote className="border-l-4 border-gray-300 pl-4 italic mb-2">{children}</blockquote>;
          },
          a({ href, children }) {
            return <a href={href || "#"} className="text-blue-500 hover:underline" target="_blank" rel="noopener noreferrer">{children}</a>;
          },
          img({ src, alt }) {
            return <img src={src || ""} alt={alt || "image"} className="max-w-full h-auto rounded" />;
          },
          table({ children }) {
            return <table className="border-collapse table-auto w-full mb-2">{children}</table>;
          },
          th({ children }) {
            return <th className="border border-gray-300 px-4 py-2 bg-gray-100">{children}</th>;
          },
          td({ children }) {
            return <td className="border border-gray-300 px-4 py-2">{children}</td>;
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
};
