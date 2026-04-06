import { useState } from 'react';
import MessageItem from './MessageItem';
import ChatInput from './ChatInput';

export default function ChatLayout() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = (text) => {
    // Add user message immediately
    const newMessage = {
      id: Date.now(),
      problem: text,
      solution_1: "Loading...",
      solution_2: "Loading...",
      judge: null,
      isLoading: true
    };
    
    setMessages((prev) => [...prev, newMessage]);

    // Simulate backend response
    setTimeout(() => {
      setMessages((prev) => 
        prev.map(msg => {
          if (msg.id === newMessage.id) {
            return {
              ...msg,
              isLoading: false,
              solution_1: "Here is a clean implementation using `fetch`:\n\n```js\nfetch('https://api.example.com/data')\n  .then(res => res.json())\n  .then(data => console.log(data));\n```",
              solution_2: "You can use `async/await` for better readability:\n\n```javascript\nasync function getData() {\n  const res = await fetch('https://api.example.com/data');\n  const data = await res.json();\n  console.log(data);\n}\n```",
              judge: {
                solution_1_score: 8,
                solution_2_score: 10,
                solution_1_reasoning: "Good basic solution but uses older Promise `.then` syntax.",
                solution_2_reasoning: "Excellent readability using modern async/await."
              }
            };
          }
          return msg;
        })
      );
    }, 1500);
  };

  return (
    <div className="flex flex-col h-screen text-slate-100 font-sans">
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
          {messages.length === 0 ? (
            <div className="flex items-center justify-center h-full min-h-[50vh] text-slate-500">
              <h1 className="text-3xl font-medium tracking-tight">How can I help you today?</h1>
            </div>
          ) : (
            messages.map((msg) => (
              <MessageItem key={msg.id} message={msg} />
            ))
          )}
        </div>
      </main>
      <div className="w-full bg-linear-to-t from-slate-950 via-slate-900 pb-8 pt-4 z-10 sticky bottom-0">
         <div className="max-w-4xl mx-auto px-4">
           <ChatInput onSend={handleSendMessage} />
         </div>
      </div>
    </div>
  );
}
