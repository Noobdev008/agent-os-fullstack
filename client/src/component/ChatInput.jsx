import { useState } from "react";

export function ChatInput({ addMessageAction, dispatch, onSendMessage }) {
  const [text, setText] = useState("");

  const handleSend = () => {
    if (text.trim()) {
      // 1. Update Redux Store
      dispatch(addMessageAction({ role: 'user', text: text }));
      
      // 2. Trigger the API call in Parent
      onSendMessage(text); 
      
      setText(""); 
    }
  };

  return (
    <div className="flex gap-2 p-4 bg-gray-800 rounded-lg">
      <input 
        className="flex-1 bg-transparent outline-none text-white"
        value={text} 
        onChange={(e) => setText(e.target.value)} 
        placeholder="Type a message..."
      />
      <button 
        className="bg-blue-600 px-4 py-2 rounded-md hover:bg-blue-500"
        onClick={handleSend}
      >
        <p  className='text-black font-bold'>Send</p>
      </button>
    </div>
  );
}