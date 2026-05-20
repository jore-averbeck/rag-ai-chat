"use client";

import { useState } from "react";

import Sidebar from "@/components/Sidebar/Sidebar";
import Header from "@/components/Layout/Header";
import ChatWindow from "@/components/Chat/ChatWindow";
import ChatInput from "@/components/Chat/ChatInput";

import {
  streamChatMessage,
  uploadPDF,
} from "@/lib/api";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type KnowledgeState =
  | "idle"
  | "file_selected"
  | "processing"
  | "ready"
  | "error";

export default function Home() {

  // =====================================================
  // STATE
  // =====================================================
  const [messages, setMessages] = useState<Message[]>([]);

  const [loading, setLoading] = useState(false);

  const [selectedFile, setSelectedFile] =
    useState<File | null>(null);

  const [knowledgeState, setKnowledgeState] =
    useState<KnowledgeState>("idle");


  function handleUpload(file: File) {

    console.log("📄 FILE STORED:", file);

    setSelectedFile(file);

    setKnowledgeState("file_selected");
  }


  
  async function handleSend(message: string) {

    console.log("🔥 HANDLE SEND:", message);

    const hasText = message.trim().length > 0;

    const hasFile = !!selectedFile;

    
    if (!hasText && !hasFile) {

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "⚠️ Bitte lade ein Dokument hoch oder stelle eine Frage.",
        },
      ]);

      return;
    }

    setLoading(true);

    try {

      
      if (hasFile && knowledgeState !== "ready") {

        setKnowledgeState("processing");

        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content:
              "📄 Dokument wird verarbeitet...",
          },
        ]);

        console.log("📤 UPLOAD START");

        const result = await uploadPDF(selectedFile!);

        console.log("📤 UPLOAD DONE:", result);

        if (
          result?.status === "uploaded" ||
          result?.status === "done"
        ) {

          setKnowledgeState("ready");

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "🧠 Dokument verarbeitet. Deine Wissensdatenbank wurde erweitert. Du kannst mir jetzt Fragen zu diesem oder anderen Dokumenten stellen.",
            },
          ]);

          setSelectedFile(null);

        } else {

          setKnowledgeState("error");

          setMessages((prev) => [
            ...prev,
            {
              role: "assistant",
              content:
                "❌ Fehler beim Verarbeiten des Dokuments.",
            },
          ]);
        }
      }


      
      if (hasText) {

        
        setMessages((prev) => [
          ...prev,
          {
            role: "user",
            content: message,
          },
          {
            role: "assistant",
            content: "",
          },
        ]);

        console.log("💬 STREAM START");

        
        await streamChatMessage(
          message,
          (chunk) => {

            console.log("⚡ CHUNK:", chunk);

            setMessages((prev) => {

              const updated = [...prev];

              const lastIndex =
                updated.length - 1;

              updated[lastIndex] = {
                ...updated[lastIndex],
                content:
                  updated[lastIndex].content +
                  chunk.replace(/\n/g, "\n"),
              };

              return updated;
            });
          }
        );

        console.log("✅ STREAM DONE");
      }

    } catch (err) {

      console.error("❌ ERROR:", err);

      setKnowledgeState("error");

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content:
            "❌ Fehler im System bei der Verarbeitung.",
        },
      ]);

    } finally {

      setLoading(false);
    }
  }


  
  return (

    <div className="h-screen flex bg-background">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN */}
      <main className="flex-1 flex flex-col">

        <Header />

        <div className="flex-1 flex flex-col px-6 pt-6 gap-4">

          {/* CHAT */}
          <div className="flex-1 overflow-hidden rounded-xl">

            <ChatWindow
              messages={messages}
              loading={loading}
            />

          </div>


          {/* INPUT AREA */}
          <div className="pb-4 flex flex-col gap-2">

            {/* =====================================================
                KNOWLEDGE STATUS
            ===================================================== */}

            {knowledgeState === "file_selected" && (
              <div className="text-sm text-gray-500">
                📄 Dokument ausgewählt
              </div>
            )}

            {knowledgeState === "processing" && (
              <div className="text-sm text-blue-600">
                ⏳ Dokument wird verarbeitet...
              </div>
            )}

            {knowledgeState === "ready" && (
              <div className="text-sm text-green-600">
                🧠 Wissensdatenbank erweitert.
              </div>
            )}

            {knowledgeState === "error" && (
              <div className="text-sm text-red-600">
                ❌ Fehler beim Verarbeiten des Dokuments.
              </div>
            )}


            {/* =====================================================
                CHAT INPUT
            ===================================================== */}
            <ChatInput
              onSend={handleSend}
              onUpload={handleUpload}
              loading={loading}
              selectedFile={selectedFile}
              setSelectedFile={setSelectedFile}
            />

          </div>

        </div>

      </main>

    </div>
  );
}