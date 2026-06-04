"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Layout/Header";
import ChatWindow from "@/components/Chat/ChatWindow";
import ChatInput from "@/components/Chat/ChatInput";

import { streamChatMessage, uploadPDF } from "@/lib/api";

import { useChats } from "@/hooks/useChats";

type KnowledgeState =
  | "idle"
  | "file_selected"
  | "processing"
  | "ready"
  | "error";

export default function Home() {
  const {
    chats,
    activeChat,
    activeChatId,
    createChat,
    renameChat,
    deleteChat,
    updateMessages,
    setActiveChatId,
  } = useChats();

  const [loading, setLoading] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const [knowledge, setKnowledge] = useState<{
    state: KnowledgeState;
    fileName: string | null;
  }>({
    state: "idle",
    fileName: null,
  });

  
  function handleUpload(file: File) {
    setSelectedFile(file);

    setKnowledge({
      state: "file_selected",
      fileName: file.name,
    });
  }

 
  async function handleSend(message: string) {
    if (!activeChat) return;

    const hasText = message.trim().length > 0;
    const hasFile = !!selectedFile;

    if (!hasText && !hasFile) return;

    setLoading(true);

    try {
      // PDF
      if (hasFile && knowledge.state !== "ready") {
        setKnowledge({
          state: "processing",
          fileName: selectedFile!.name,
        });

        const result = await uploadPDF(selectedFile!);

        if (result?.status === "uploaded") {
          setKnowledge({
            state: "ready",
            fileName: selectedFile!.name,
          });

          setSelectedFile(null);
        } else {
          setKnowledge({
            state: "error",
            fileName: selectedFile?.name ?? null,
          });
        }
      }

   
      if (hasText) {
        const isFirst = activeChat.messages.length === 0;

        updateMessages(activeChat.id, (msgs) => [
          ...msgs,
          { role: "user", content: message },
          { role: "assistant", content: "" },
        ]);

        if (isFirst) {
          renameChat(activeChat.id, message.slice(0, 30));
        }

        await streamChatMessage(message, (chunk) => {
          updateMessages(activeChat.id, (msgs) => {
            const copy = [...msgs];
            const last = copy.length - 1;

            copy[last] = {
              ...copy[last],
              content: copy[last].content + chunk,
            };

            return copy;
          });
        });
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="h-screen flex bg-background">

      <Sidebar
        chats={chats}
        activeChatId={activeChatId}
        onNewChat={createChat}
        onSelectChat={setActiveChatId}
        onRenameChat={renameChat}
        onDeleteChat={deleteChat}
      />

      <main className="flex-1 flex flex-col">

        <Header />

        <div className="flex-1 flex flex-col px-6 pt-6 gap-4">

          <ChatWindow
            messages={activeChat?.messages || []}
            loading={loading}
          />

          <ChatInput
            onSend={handleSend}
            onUpload={handleUpload}
            loading={loading}
            selectedFile={selectedFile}
            setSelectedFile={setSelectedFile}
          />

          <div className="text-sm text-gray-500">
            {knowledge.state === "file_selected" &&
              `📄 ${knowledge.fileName} ausgewählt`}

            {knowledge.state === "processing" &&
              `⏳ ${knowledge.fileName} wird verarbeitet`}

            {knowledge.state === "ready" &&
              `🧠 ${knowledge.fileName} fertig`}
          </div>

        </div>
      </main>
    </div>
  );
}