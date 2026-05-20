export type Message = {
    role: "user" | "assistant";
    content: string;
    sources?: {
      document: string;
      chunk: number;
    }[];
  };