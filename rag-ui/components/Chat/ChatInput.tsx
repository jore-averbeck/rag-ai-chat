"use client";

import { useEffect, useRef, useState } from "react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type Props = {
  onSend: (message: string) => void;
  onUpload: (file: File) => void;
  loading: boolean;
  selectedFile: File | null;
  setSelectedFile: (file: File | null) => void;
};

export default function ChatInput({
  onSend,
  onUpload,
  loading,
  selectedFile,
  setSelectedFile,
}: Props) {
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // =========================
  // DEBUG
  // =========================
  useEffect(() => {
    console.log("🧠 CHATINPUT MOUNTED");
  }, []);

  useEffect(() => {
    console.log("📦 INPUT STATE UPDATED:", input);
  }, [input]);

  // =========================
  // SEND
  // =========================
  function handleSend() {
    const trimmed = input.trim();

    console.log("🔥 SEND CLICKED (SHADCN INPUT):", trimmed);

    if (!trimmed && !selectedFile) {
      console.log("⚠️ NOTHING TO SEND");
      return;
    }

    onSend(trimmed);
    setInput("");
  }

  
  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];

    console.log("📄 FILE SELECTED:", file);

    if (!file) return;

    setSelectedFile(file);
    onUpload(file);

   
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  return (
    <div className="flex flex-col gap-2">

      {/* FILE BADGE */}
      {selectedFile && (
        <div className="text-sm bg-gray-100 text-black px-3 py-1 rounded-lg w-fit flex items-center gap-2">
          📄 {selectedFile.name}

          <button
            type="button"
            onClick={() => setSelectedFile(null)}
            className="text-red-600"
          >
            ✕
          </button>
        </div>
      )}

      {/* INPUT ROW */}
      <div className="flex gap-3">

        {/* HIDDEN FILE INPUT */}
        <input
          ref={fileInputRef}
          type="file"
          accept="application/pdf"
          className="hidden"
          onChange={handleFileChange}
        />

        {/* UPLOAD */}
        <Button
          type="button"
          variant="secondary"
          onClick={() => fileInputRef.current?.click()}
        >
          Upload PDF
        </Button>

        {/* SHADCN INPUT */}
        <Input
          value={input}
          placeholder="Stelle eine Frage..."
          onChange={(e) => {
            console.log("⌨️ INPUT:", e.target.value);
            setInput(e.target.value);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") handleSend();
          }}
          className="h-11"
        />

        {/* SEND */}
        <Button
          type="button"
          onClick={handleSend}
          disabled={loading}
        >
          Send
        </Button>

      </div>
    </div>
  );
}