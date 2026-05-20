type Props = {
    role: "user" | "assistant";
    content: string;
  };
  
  export default function MessageBubble({
    role,
    content,
  }: Props) {
    const isUser = role === "user";
  
    return (
      <div
        className={`flex ${
          isUser ? "justify-end" : "justify-start"
        }`}
      >
        <div
          className={`
            max-w-[80%]
            rounded-2xl
            px-4
            py-3
            text-sm
            whitespace-pre-wrap
            leading-relaxed
          `}
          style={{
            backgroundColor: isUser
              ? "#190061"
              : "#240090",
            color: "#FEF1D0",
          }}
        >
          {content}
        </div>
      </div>
    );
  }