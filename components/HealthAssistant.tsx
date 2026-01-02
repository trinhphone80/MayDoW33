
import React, { useState, useRef, useEffect } from 'react';
import { getHealthAdvice } from '../services/geminiService';
import { ChatMessage } from '../types';

const HealthAssistant: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    { role: 'model', text: 'Chào bác ạ! Em là Phương Anh, trợ lý sức khỏe của Đức Phương. Bác cần em tư vấn gì về chương trình tặng máy AICARE W33 không ạ?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isTyping]);

  const handleSend = async () => {
    if (!input.trim()) return;
    const userMsg = input;
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsTyping(true);

    const advice = await getHealthAdvice(userMsg);
    setMessages(prev => [...prev, { role: 'model', text: advice }]);
    setIsTyping(false);
  };

  return (
    <div className="fixed bottom-28 right-6 md:bottom-10 md:right-10 z-[100]">
      {isOpen ? (
        <div className="bg-white w-[340px] md:w-[400px] h-[550px] shadow-[0_40px_80px_-20px_rgba(0,0,0,0.25)] rounded-[2.5rem] flex flex-col border border-gray-100 overflow-hidden animate-scaleUp">
          <div className="bg-premium-red p-6 text-white flex justify-between items-center">
            <div className="flex items-center gap-4">
              <div className="relative">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-lg">
                  👩‍⚕️
                </div>
                <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-premium-red rounded-full"></div>
              </div>
              <div>
                <span className="font-black text-sm block uppercase tracking-tight">Phương Anh (AI)</span>
                <span className="text-[10px] text-red-100 font-bold uppercase tracking-widest">Đang trực tuyến</span>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center rounded-xl hover:bg-white/10 transition text-2xl">✕</button>
          </div>
          
          <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50 custom-scrollbar">
            {messages.map((m, i) => (
              <div key={i} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[85%] p-4 rounded-3xl text-sm font-medium leading-relaxed ${
                  m.role === 'user' ? 'bg-premium-red text-white rounded-tr-none shadow-xl shadow-red-100' : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-tl-none'
                }`}>
                  {m.text}
                </div>
              </div>
            ))}
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-white p-4 rounded-3xl shadow-sm border border-gray-100 flex gap-1.5">
                  <span className="w-2 h-2 bg-premium-red/30 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-premium-red/30 rounded-full animate-bounce delay-100"></span>
                  <span className="w-2 h-2 bg-premium-red/30 rounded-full animate-bounce delay-200"></span>
                </div>
              </div>
            )}
          </div>

          <div className="p-6 bg-white border-t border-gray-100 flex gap-3">
            <input 
              type="text" 
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === 'Enter' && handleSend()}
              placeholder="Hỏi em về máy W33 hoặc ưu đãi 0đ..."
              className="flex-1 bg-gray-50 border-none rounded-2xl px-5 py-4 text-sm font-bold focus:ring-2 focus:ring-premium-red focus:bg-white transition-all outline-none"
            />
            <button 
              onClick={handleSend}
              className="bg-premium-red text-white w-12 h-12 rounded-2xl flex items-center justify-center hover:bg-red-700 transition shadow-lg shadow-red-100 active:scale-90"
            >
              ➔
            </button>
          </div>
        </div>
      ) : (
        <button 
          onClick={() => setIsOpen(true)}
          className="group relative"
        >
          <div className="absolute inset-0 bg-premium-red rounded-3xl blur-2xl opacity-40 group-hover:opacity-60 transition-opacity"></div>
          <div className="relative bg-premium-red text-white w-16 h-16 md:w-20 md:h-20 rounded-[2rem] shadow-2xl flex items-center justify-center text-3xl hover:scale-110 transition-transform duration-500 animate-bounce">
            👩‍⚕️
          </div>
          <div className="absolute -top-2 -right-2 bg-yellow-400 text-gray-900 text-[10px] font-black px-2 py-1 rounded-full shadow-lg uppercase tracking-tighter">1</div>
        </button>
      )}
    </div>
  );
};

export default HealthAssistant;
