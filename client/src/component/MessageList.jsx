export function MessageList({ messages }) {
  return (
    <div>
      {messages.map((msg, index) => (
          <div key={index} className={`p-4 rounded-lg ${msg.role === 'user' ? 'bg-blue-900/50 ml-auto w-fit' : 'bg-gray-800 mr-auto w-fit max-w-[80%]'}`}>
            <strong className="block text-xs uppercase opacity-50 mb-1">
              {msg.role === 'user' ? 'You' : 'Gemini'}
            </strong>
            <p className="text-sm md:text-base">{msg.text}</p>
          </div>
        ))}
    </div>
  );
}