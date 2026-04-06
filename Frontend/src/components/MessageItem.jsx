import ReactMarkdown from 'react-markdown';
import rehypeHighlight from 'rehype-highlight';
import 'highlight.js/styles/atom-one-dark.css'; // Add a good highlightjs theme
import { Bot, User, CheckCircle2, AlertCircle } from 'lucide-react';
import { clsx } from "clsx";
import { twMerge } from "tailwind-merge";

function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export default function MessageItem({ message }) {
  const { problem, solution_1, solution_2, judge, isLoading } = message;

  return (
    <div className="flex flex-col gap-8 mb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* User Problem */}
      <div className="flex gap-4 justify-end">
        <div className="mt-2 text-right">
          <h2 className="inline-block text-base font-medium text-slate-100 bg-slate-800/80 px-5 py-3 rounded-2xl rounded-tr-sm border border-slate-700/80 shadow-xs">{problem}</h2>
        </div>
        <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center shrink-0 border border-indigo-500 shadow-md">
          <User size={20} className="text-white" />
        </div>
      </div>

      {/* Solutions */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 ml-14">
        {/* Solution 1 */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex flex-col hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-blue-500/10 p-2 rounded-lg">
              <Bot size={18} className="text-blue-400" />
            </div>
            <h3 className="font-semibold text-slate-300">Model A</h3>
            {isLoading && <span className="ml-auto text-xs text-slate-500 animate-pulse">Thinking...</span>}
          </div>
          <div className="prose prose-invert prose-slate text-sm max-w-none flex-1">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {solution_1}
            </ReactMarkdown>
          </div>
        </div>

        {/* Solution 2 */}
        <div className="bg-slate-900/50 rounded-2xl border border-slate-800 p-6 flex flex-col hover:border-slate-700 transition-colors">
          <div className="flex items-center gap-3 mb-4">
            <div className="bg-emerald-500/10 p-2 rounded-lg">
              <Bot size={18} className="text-emerald-400" />
            </div>
            <h3 className="font-semibold text-slate-300">Model B</h3>
            {isLoading && <span className="ml-auto text-xs text-slate-500 animate-pulse">Thinking...</span>}
          </div>
          <div className="prose prose-invert prose-slate text-sm max-w-none flex-1">
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>
              {solution_2}
            </ReactMarkdown>
          </div>
        </div>
      </div>

      {/* Judge Section */}
      {judge && (
        <div className="ml-14 mt-2 bg-indigo-950/20 rounded-2xl border border-indigo-500/20 p-6">
          <h3 className="text-indigo-300 font-semibold mb-4 flex items-center gap-2">
            <CheckCircle2 size={18} /> Judge Evaluation
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className={cn("p-4 rounded-xl space-y-2 border", judge.solution_1_score > judge.solution_2_score ? "bg-indigo-900/30 border-indigo-500/30" : "bg-slate-900/30 border-slate-800")}>
              <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-slate-400">Model A Score</span>
                 <span className="text-lg font-bold text-indigo-400">{judge.solution_1_score}/10</span>
              </div>
              <p className="text-sm text-slate-300">{judge.solution_1_reasoning}</p>
            </div>
            <div className={cn("p-4 rounded-xl space-y-2 border", judge.solution_2_score > judge.solution_1_score ? "bg-indigo-900/30 border-indigo-500/30" : "bg-slate-900/30 border-slate-800")}>
               <div className="flex justify-between items-center">
                 <span className="text-sm font-medium text-slate-400">Model B Score</span>
                 <span className="text-lg font-bold text-indigo-400">{judge.solution_2_score}/10</span>
              </div>
              <p className="text-sm text-slate-300">{judge.solution_2_reasoning}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
