import React from 'react';
import { Button } from "@/components/ui/button";
import { ChevronDown, ChevronUp } from "lucide-react";

interface VersionControlProps {
  showVersionHistory: boolean;
  toggleVersionHistory: () => void;
  versionsCount: number;
}

export const VersionControl: React.FC<VersionControlProps> = ({
  showVersionHistory,
  toggleVersionHistory,
  versionsCount
}) => (
  <Button
    variant="ghost"
    size="sm"
    onClick={toggleVersionHistory}
    className="text-xs text-muted-foreground"
  >
    {showVersionHistory ? (
      <>
        <ChevronUp className="mr-1 h-4 w-4" />
        Hide version history
      </>
    ) : (
      <>
        <ChevronDown className="mr-1 h-4 w-4" />
        Show version history ({versionsCount})
      </>
    )}
  </Button>
);