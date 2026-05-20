import { ScrollArea } from "@/components/ui/scroll-area";
import { Card } from "@/components/ui/card";

import MessageBubble from "./MessageBubble";

type Message = {
  role: "user" | "assistant";
  content: string;
};

type Props = {
  messages: Message[];
  loading: boolean;
};

export default function ChatWindow({
  messages,
  loading,
}: Props) {
  return (
    <Card
      className="
        h-[70vh]
        bg-[#c5c6c7]
        border-none
        rounded-3xl
        shadow-2xl
        p-4
      "
    >
      <ScrollArea className="h-full pr-4">
        <div className="flex flex-col gap-4">
          {messages.map((message, index) => (
            <MessageBubble
              key={index}
              role={message.role}
              content={message.content}
            />
          ))}

          {loading && (
            <div className="text-sm text-[#0C0032] opacity-70">
              AI denkt nach...
            </div>
          )}
        </div>
      </ScrollArea>
    </Card>
  );
}