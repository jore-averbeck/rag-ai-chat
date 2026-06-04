"use client";

import { Button } from "@/components/ui/button";

type Props = {
  onRename: () => void;
  onDelete: () => void;
};

export default function ChatActions({
  onRename,
  onDelete,
}: Props) {
  return (
    <div className="flex gap-2">
      <Button
        size="sm"
        variant="secondary"
        onClick={onRename}
      >
        ✏️
      </Button>

      <Button
        size="sm"
        variant="destructive"
        onClick={onDelete}
      >
        🗑
      </Button>
    </div>
  );
}