"use client";

import ChatItem from "./ChatItem";

const chats = [
  { id: 1, title: "Was ist RAG?" },
  { id: 2, title: "Zine Analyse" },
  { id: 3, title: "Embeddings Erklärung" },
];

export function ChatList() {
  return (
    <div className="p-2 space-y-1">
      {chats.map((chat) => (
        <ChatItem key={chat.id} chat={chat} />
      ))}
    </div>
  );
}