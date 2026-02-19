import { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import './App.css'
import { ChatInput } from './component/ChatInput';
import axios from 'axios';
import { MessageList } from './component/MessageList';
import {addMessage, clearChat} from './store/ChatSlice'

function App() {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  
// OLD: const chat = useSelector(state => state.chat.value);
// NEW: 
const messages = useSelector(state => state.chat.messages);
  const handleChat = async (userInput) => {
    setLoading(true);
    try {
      const res = await axios.post("http://localhost:5000/api/ai/chat", {
        prompt: userInput,
        role: "Senior AI Developer"
      });

      // 3. Dispatch AI response to Redux
      const aiMessage = { role: 'ai', text: res.data.data };
      dispatch(addMessage(aiMessage)); 
      
    } catch (error) {
      console.error("Chat Error:", error);
    } finally {
      setLoading(false);
    }
  };
  const handleClear = () => {
    dispatch(clearChat());
  };

  return (
    <div className="min-h-screen min-w-[1200px] bg-gray-900 text-white p-5">
      <div className="max-w-3xl mx-auto space-y-4 mb-20">
      
        {/* Now using messages from Redux */}
        <MessageList messages={messages} />
        {loading && <p className="text-blue-400 italic animate-pulse">Gemini is thinking...</p>}
      </div>

      <div className="fixed bottom-0 left-0 w-full p-5 bg-gray-900/80 backdrop-blur-md">
        <ChatInput 
          addMessageAction={addMessage} // Passing the action creator
          dispatch={dispatch} 
          onSendMessage={handleChat} 
        /> 
          <button 
          onClick={handleClear}
          className="bg-pink-500 text-xs p-2 rounded mb-2"
        >
          <p className='text-black font-bold'>Clear History</p>
      </button>
      </div>
    </div>
  );
}

export default App