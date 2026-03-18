import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import { ChatInput } from './component/ChatInput';
import axios from 'axios';
import { MessageList } from './component/MessageList';
import { addMessage, clearChat } from './store/ChatSlice'

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState("Senior Developer"); 

  const messages = useSelector(state => state.chat.messages);

  const handleChat = async (userInput) => {
    if (!userInput.trim()) return;

    setLoading(true);
    // Note: User ka message aksar ChatInput ke andar se hi dispatch ho jata hai, 
    // par agar nahi ho raha toh hum yahan handle karenge.

    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        prompt: userInput,
        role: role 
      });

      if (res.data && res.data.data) {
        // AI response dispatch
        dispatch(addMessage({ role: 'ai', text: res.data.data }));
      }
      
    } catch (error) {
      console.error("Chat Error:", error);
      dispatch(addMessage({ role: 'ai', text: "System Error: Connection failed!" }));
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    dispatch(clearChat());
  };

  return (
    <div className="min-h-screen bg-gray-950 text-white p-5 font-sans">
      <div className="max-w-3xl mx-auto mb-32">
        
        {/* --- PERSONA SELECTOR --- */}
        <div className="sticky top-0 z-10 py-4 bg-gray-950/90 backdrop-blur-md border-b border-gray-800 mb-6">
          <p className="text-[10px] uppercase tracking-[0.2em] text-gray-400 mb-3 font-black">Active Persona</p>
          <div className="flex p-1 bg-gray-900 rounded-xl border border-gray-800 shadow-2xl">
            {["Senior Developer", "Creative Writer", "Career Coach"].map((r) => (
              <button
                key={r}
                onClick={() => setRole(r)}
                className={`flex-1 py-2 px-3 rounded-lg text-xs font-bold transition-all duration-300 flex items-center justify-center gap-2 ${
                  role === r 
                    ? 'bg-blue-600 text-white shadow-lg' 
                    : 'text-gray-500 hover:text-gray-300 hover:bg-gray-800'
                }`}
              >
                <span>{r === "Senior Developer" ? "💻" : r === "Creative Writer" ? "✍️" : "🚀"}</span>
                <span className="hidden sm:inline">{r}</span>
              </button>
            ))}
          </div>
        </div>

        <MessageList messages={messages} />
        
        {loading && (
          <div className="flex items-center gap-3 text-blue-400 mt-6 px-4 py-2 bg-blue-500/5 rounded-full border border-blue-500/20 w-fit animate-pulse">
            <span className="text-xs font-bold uppercase tracking-tighter">Gemini Thinking...</span>
          </div>
        )}
      </div>

      {/* --- FIXED FOOTER --- */}
      <div className="fixed bottom-0 left-0 w-full p-6 bg-gradient-to-t from-gray-950 via-gray-950 to-transparent">
        <div className="max-w-3xl mx-auto flex flex-col items-end gap-3">
          <button 
            onClick={handleClear} 
            className="bg-gray-900 hover:bg-pink-900/30 border border-gray-800 px-3 py-1 rounded text-[10px] uppercase font-bold text-pink-500 transition-all"
          >
            Reset Terminal
          </button>
          
          <div className="w-full">
            {/* FIXED: Passing dispatch and addMessageAction correctly */}
            <ChatInput 
              onSendMessage={handleChat} 
              dispatch={dispatch} 
              addMessageAction={addMessage} 
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;