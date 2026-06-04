"use client";

import { Button } from "@/components/ui/button";
import ChatItem from "./ChatItem";

type Chat = {
  id: string;
  title: string;
};

type Props = {
  chats: Chat[];
  activeChatId: string | null;
  onNewChat: () => void;
  onSelectChat: (id: string) => void;
  onRenameChat: (id: string, title: string) => void;
  onDeleteChat: (id: string) => void;
};

export default function Sidebar({
  chats,
  activeChatId,
  onNewChat,
  onSelectChat,
  onRenameChat,
  onDeleteChat,
}: Props) {
  return (
    <aside className="h-full w-72 border-r bg-muted/30 flex flex-col">

      {/* HEADER */}
      <div className="p-4 border-b">
        <h2 className="font-semibold text-lg">
          RAG Chat
        </h2>

        <p className="text-xs text-muted-foreground">
          Deine Chat Sessions
        </p>
      </div>

      {/* NEW CHAT */}
      <div className="p-3">
        <Button
          className="w-full"
          onClick={onNewChat}
        >
          + Neuer Chat
        </Button>
      </div>

      {/* CHAT LIST */}
      <div className="flex-1 overflow-y-auto p-2 space-y-1">
        {chats.map((chat) => (
          <ChatItem
            key={chat.id}
            chat={chat}
            isActive={chat.id === activeChatId}
            onSelect={() => onSelectChat(chat.id)}
            onRename={(title) =>
              onRenameChat(chat.id, title)
            }
            onDelete={() =>
              onDeleteChat(chat.id)
            }
          />
        ))}
      </div>

    </aside>
  );
}