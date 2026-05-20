"use client";

import { cn } from "@/lib/utils";

export default function ChatItem({
  chat,
}: {
  chat: { id: number; title: string };
}) {
  return (
    <button
      className={cn(
        "w-full text-left px-3 py-2 rounded-md text-sm",
        "hover:bg-muted transition"
      )}
    >
      {chat.title}
    </button>
  );
}