import { useState } from 'react';
import MessageItem from './MessageItem';
import ChatInput from './ChatInput';
import axios from 'axios'

export default function ChatLayout() {
  const [messages, setMessages] = useState([]);

  const handleSendMessage = async(text) => {
    // Add user message immediately
    const newMessage = {
      id: Date.now(),
      problem: text,
      solution_1: "Loading...",
      solution_2: "Loading...",
      judge: null,
      isLoading: true
    };

    // show the user message right away
    setMessages((prev) => [...prev, newMessage]);

    try {
      const response = await axios.post("http://localhost:3000/invoke", { input: text });
      const data = response.data;
      console.log(data);

      const result = data?.result || data;

      // update the message with real result
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === newMessage.id) {
            return {
              ...msg,
              isLoading: false,
              problem: result.problem ?? msg.problem,
              solution_1: result.solution_1 ?? msg.solution_1,
              solution_2: result.solution_2 ?? msg.solution_2,
              judge: result.judge ?? msg.judge
            };
          }
          return msg;
        })
      );
    } catch (err) {
      console.error(err);
      setMessages((prev) =>
        prev.map((msg) => {
          if (msg.id === newMessage.id) {
            return {
              ...msg,
              isLoading: false,
              solution_1: "Error: failed to get solution from server.",
              solution_2: "",
              judge: null
            };
          }
          return msg;
        })
      );
    }
  };

  return (
    <div className="flex flex-col h-screen text-slate-100 font-sans">
      <main className="flex-1 overflow-y-auto w-full">
        <div className="max-w-6xl mx-auto py-12 px-4 space-y-12">
          {messages.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full min-h-[50vh] text-slate-500">
              <h1 className="text-3xl font-medium tracking-tight">Welcome To Battle Arena</h1>
              <p className='text-sm font-medium text-gray-600'>Type Your Problem below to see two AI solution go ahed-to-start</p>
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
