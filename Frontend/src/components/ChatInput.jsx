import { useState } from 'react';
import { Send } from 'lucide-react';

export default function ChatInput({ onSend }) {
  const [text, setText] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim()) {
      onSend(text.trim());
      setText('');
    }
  };

  return (
    <form 
      onSubmit={handleSubmit}
      className="relative flex items-center w-full bg-slate-900 border border-slate-700 rounded-2xl shadow-xl hover:border-slate-600 focus-within:border-indigo-500 focus-within:ring-1 focus-within:ring-indigo-500 transition-all"
    >
      <input
        type="text"
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Enter your problem here..."
        className="w-full bg-transparent text-slate-100 placeholder:text-slate-500 py-4 pl-6 pr-14 outline-none rounded-2xl text-base"
      />
      <button
        type="submit"
        disabled={!text.trim()}
        className="absolute right-3 p-2 bg-indigo-600 hover:bg-indigo-500 active:scale-95 disabled:bg-slate-800 disabled:text-slate-600 text-white rounded-xl transition-all cursor-pointer disabled:cursor-not-allowed"
      >
        <Send size={18} />
      </button>
    </form>
  );
}
