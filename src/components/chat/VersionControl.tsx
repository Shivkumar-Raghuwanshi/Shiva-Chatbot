import React from 'react';
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface VersionControlProps {
  showAllVersions: boolean;
  setShowAllVersions: (show: boolean) => void;
  currentVersionIndex: number;
  setCurrentVersionIndex: (index: number) => void;
  versionsCount: number;
}

export const VersionControl: React.FC<VersionControlProps> = ({
  showAllVersions,
  setShowAllVersions,
  currentVersionIndex,
  setCurrentVersionIndex,
  versionsCount
}) => (
  <div className="flex justify-between items-center">
    <div className="flex items-center space-x-2">
      <span className="text-sm font-medium">Show all versions</span>
      <Switch
        checked={showAllVersions}
        onCheckedChange={setShowAllVersions}
      />
    </div>
    {!showAllVersions && (
      <div className="flex items-center space-x-2">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentVersionIndex(Math.max(0, currentVersionIndex - 1))}
          disabled={currentVersionIndex === 0}
          className="h-8 w-8 p-0"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <span className="text-sm text-muted-foreground">
          Version {currentVersionIndex + 1} of {versionsCount}
        </span>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => setCurrentVersionIndex(Math.min(versionsCount - 1, currentVersionIndex + 1))}
          disabled={currentVersionIndex === versionsCount - 1}
          className="h-8 w-8 p-0"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    )}
  </div>
);