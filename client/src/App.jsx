import { useState } from 'react'
import './App.css'
import { ChatInput } from './component/ChatInput';
import axios from 'axios';
import { MessageList } from './component/MessageList';

function App() {
  // 1. Isse Array banayein taaki chat history store ho sake
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleChat = async (userInput) => { // User input parameter mein aayega
    if (!userInput) return;

    // 2. User ka message turant list mein add karein
    const userMessage = { role: 'user', text: userInput };
    setMessages((prev) => [...prev, userMessage]);
    
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        prompt: userInput, // Static string ki jagah actual input bhejein
        role: "Senior AI Developer"
      });

      // 3. AI ka message list mein add karein
      const aiMessage = { role: 'ai', text: res.data.data };
      setMessages((prev) => [...prev, aiMessage]);
      
    } catch (error) {
      console.error("Chat Error:", error);
      alert("AI ne reply nahi diya. Check console!");
    } finally {
      setLoading(false);
    }
  };

  return (<>
{/* <div className='bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl'> */}
      <h1 className="bg-agentDark text-blue-400 p-6 text-4xl font-extrabold text-center rounded-xl shadow-lg ">
        Agent-OS Environment Active!
      </h1>
    <div className="min-h-screen bg-gray-900 text-white p-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl shadow-2xl">

      {/* 4. Chat History Display */}
      <div className="max-w-3xl mx-auto space-y-4 mb-20">
       <MessageList messages={messages}/>
        {loading && <p className="text-gray-500 italic animate-pulse">Gemini is thinking...</p>}
      </div>

      {/* 5. Input Box */}
      <div className="fixed bottom-0 left-0 w-full p-5 bg-gray-900/80 backdrop-blur-md">
        <ChatInput onSendMessage={handleChat} /> 
      </div>
    </div>
    {/* </div> */}
      </>
  )
}

export default App