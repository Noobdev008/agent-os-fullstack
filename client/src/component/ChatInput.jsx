import { useState } from "react";

export function ChatInput({ onSendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      onSendMessage(text); // Parent ko message bhejo
      setText(""); // Input khali karo
    }
  };

  return (
    <div className="chat-input">
      <input 
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type a message..."
      />
      <button onClick={handleSend}>Send</button>
    </div>
  );
}