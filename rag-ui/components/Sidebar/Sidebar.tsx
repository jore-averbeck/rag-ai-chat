"use client";

import { ChatList } from "./ChatList";
import { Button } from "@/components/ui/button";

export default function Sidebar() {
  return (
    <aside className="h-full w-72 border-r bg-muted/30 flex flex-col">
      
      {/* HEADER */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">RAG Community</h2>
        <p className="text-xs text-muted-foreground">
          Deine Chats
        </p>
      </div>

      {/* NEW CHAT */}
      <div className="p-3">
        <Button className="w-full">
          + Neuer Chat
        </Button>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto">
        <ChatList />
      </div>

    </aside>
  );
}