'use client';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';

export default function ChatBot() {
  const [openMenu,setOpenMenu] = useState(false)
  const chatbotRef = useRef(null)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (chatbotRef.current && !chatbotRef.current.contains(event.target)) {
        setTimeout(() => {
          setOpenMenu((prev)=>!prev);
        },100)
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  const [messages, setMessages] = useState([
    { text: "Hello! How can I assist you?", sender: "bot" }
  ]);
  const [input, setInput] = useState('');
  const bottomRef = useRef(null);

  const handleSend = () => {
    if (!input.trim()) return;

    const newMessage = { text: input, sender: "user" };
    setMessages(prev => [...prev, newMessage]);

    // Mock bot response
    setTimeout(() => {
      const botMessage = { text: "Thanks for your message.", sender: "bot" };
      setMessages(prev => [...prev, botMessage]);
    }, 600);

    setInput('');
  };

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <>
    <button  onClick={()=>setOpenMenu(!false)} className=' text-lg  flex flex-row   absolute bottom-7 right-3 cursor-pointer'><Image 
      src={'/images/chatbot.gif'}
      alt='chatbot'
      width={154}
      height={44}
      className=' hover:scale-110 transition duration-200'
    /><p className='-ml-10 text-center mt-14 text-cyan-400 font-bold'> How may I Assist you ?</p>
    </button>
    {openMenu &&
    (<div className="w-full max-w-sm h-[500px] mx-auto bg-white shadow-lg rounded-xl flex flex-col overflow-hidden border absolute right-3 bottom-30 text-black" ref={chatbotRef}>
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 text-lg font-semibold">
        Chat Assistant
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-2 bg-gray-50">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`px-4 py-2 rounded-lg max-w-[70%] ${
              msg.sender === 'user'
                ? 'bg-blue-600 text-white'
                : 'bg-orange-200 text-gray-900'
            }`}>
              {msg.text}
            </div>
          </div>
        ))}
        <div ref={bottomRef} />
      </div>

      {/* Input Field */}
      <div className="flex items-center gap-2 p-4 border-t bg-white">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSend()}
          className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSend}
          className="bg-blue-600 text-white cursor-pointer px-4 py-2 rounded-full hover:bg-blue-700 transition"
        >
          Send
        </button>
      </div>
    </div>)}
    </>
  );
}
