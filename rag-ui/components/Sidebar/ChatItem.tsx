"use client";

import { useState, useEffect } from "react";

type Props = {
  chat: { id: string; title: string };
  isActive: boolean;
  onSelect: () => void;
  onRename: (title: string) => void;
  onDelete: () => void;
};

export default function ChatItem({
  chat,
  isActive,
  onSelect,
  onRename,
  onDelete,
}: Props) {
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState<string>(chat.title ?? "");


  useEffect(() => {
    setValue(chat.title ?? "");
  }, [chat.title]);

  return (
    <div
      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm transition ${
        isActive ? "bg-muted" : "hover:bg-muted/50"
      }`}
    >
      {editing ? (
        <input
          value={value ?? ""}
          onChange={(e) => setValue(e.target.value)}
          onBlur={() => {
            onRename(value.trim() || "Unbenannter Chat");
            setEditing(false);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              onRename(value.trim() || "Unbenannter Chat");
              setEditing(false);
            }

            if (e.key === "Escape") {
              setValue(chat.title);
              setEditing(false);
            }
          }}
          className="bg-transparent outline-none w-full text-sm"
          autoFocus
        />
      ) : (
        <button onClick={onSelect} className="flex-1 text-left truncate">
          {chat.title}
        </button>
      )}

      <div className="flex gap-2 ml-2">
        <button
          onClick={() => setEditing(true)}
          className="text-xs opacity-70 hover:opacity-100"
        >
          ✏️
        </button>

        <button
          onClick={onDelete}
          className="text-xs opacity-70 hover:opacity-100 text-red-500"
        >
          🗑️
        </button>
      </div>
    </div>
  );
}