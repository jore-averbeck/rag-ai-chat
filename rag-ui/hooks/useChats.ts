"use client";

import { useEffect, useState } from "react";
import { Chat, Message } from "@/types/Chat";

export function useChats() {
  const [chats, setChats] = useState<Chat[]>([]);
  const [activeChatId, setActiveChatId] = useState<string | null>(null);

  const activeChat =
    chats.find((c) => c.id === activeChatId) || null;

 
  useEffect(() => {
    const saved = localStorage.getItem("rag-chats");

    if (!saved) {
      const firstChat: Chat = {
        id: crypto.randomUUID(),
        title: "Neuer Chat",
        messages: [],
      };

      setChats([firstChat]);
      setActiveChatId(firstChat.id);
      return;
    }

    try {
      const parsed: Chat[] = JSON.parse(saved);
      setChats(parsed);

      if (parsed.length > 0) {
        setActiveChatId(parsed[0].id);
      }
    } catch (err) {
      console.error("Failed to parse chats:", err);

      const fallback: Chat = {
        id: crypto.randomUUID(),
        title: "Neuer Chat",
        messages: [],
      };

      setChats([fallback]);
      setActiveChatId(fallback.id);
    }
  }, []);

  
  useEffect(() => {
    localStorage.setItem("rag-chats", JSON.stringify(chats));
  }, [chats]);

  
  function createChat() {
    const chat: Chat = {
      id: crypto.randomUUID(),
      title: "Neuer Chat",
      messages: [],
    };

    setChats((prev) => [chat, ...prev]);
    setActiveChatId(chat.id);
  }

  function renameChat(id: string, title: string) {
    setChats((prev) =>
      prev.map((chat) =>
        chat.id === id
          ? { ...chat, title }
          : chat
      )
    );
  }


  function deleteChat(id: string) {
    setChats((prev) => {
      const filtered = prev.filter(
        (chat) => chat.id !== id
      );

      return filtered;
    });

    if (activeChatId === id) {
      setActiveChatId(null);
    }
  }

  
  function updateMessages(
    chatId: string,
    updater: (messages: Message[]) => Message[]
  ) {
    setChats((prev) =>
      prev.map((chat) => {
        if (chat.id !== chatId) return chat;

        return {
          ...chat,
          messages: updater(chat.messages),
        };
      })
    );
  }


  return {
    chats,
    activeChatId,
    setActiveChatId,
    activeChat,

    createChat,
    renameChat,
    deleteChat,
    updateMessages,
  };
}