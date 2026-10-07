import React, { useState, useEffect, useRef } from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send, Bot } from "lucide-react";
import { motion } from "framer-motion";

const CHIPS = [
  "Apa itu pecahan?",
  "Cara membaca 1/2?",
  "Membandingkan pecahan?"
];

export default function TutorPage() {
  const { state, updateState } = useAppContext();
  const [input, setInput] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  const messages = state.chatHistory.length > 0 ? state.chatHistory : [
    { sender: "bot" as const, text: `Halo ${state.studentName}! Aku Tutor Pintar 🤖. Ada yang ingin ditanyakan tentang pecahan?` }
  ];

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const newMsgs = [...messages, { sender: "student" as const, text }];
    
    // Simple bot logic
    const lower = text.toLowerCase();
    let botReply = "Maaf, aku belum tahu. Coba tanya tentang konsep pecahan, cara membaca, atau E-IM3 ya!";
    
    if (lower.includes("pecahan")) {
      botReply = "Pecahan adalah bagian dari keseluruhan. Seperti memotong 1 pizza menjadi beberapa bagian sama besar. Jika dibagi 4, setiap bagian disebut 1/4.";
    } else if (lower.includes("baca") || lower.includes("membaca") || lower.includes("1/2")) {
      botReply = "1/2 dibaca 'satu per dua' atau 'setengah'. Angka 1 (atas) adalah pembilang, angka 2 (bawah) adalah penyebut.";
    } else if (lower.includes("1/4") || lower.includes("seperempat")) {
      botReply = "1/4 dibaca 'satu per empat' atau 'seperempat'. Artinya 1 bagian dari benda yang dipotong 4 sama besar.";
    } else if (lower.includes("1/3") || lower.includes("sepertiga")) {
      botReply = "1/3 dibaca 'satu per tiga' atau 'sepertiga'. Artinya 1 bagian dari benda yang dipotong 3 sama besar.";
    } else if (lower.includes("banding") || lower.includes("membandingkan")) {
      botReply = "Makin besar angka penyebut (yang bawah), makin KECIL potongan pecahannya! Jadi 1/2 lebih besar dari 1/4.";
    } else if (lower.includes("sehari") || lower.includes("kehidupan")) {
      botReply = "Kita pakai pecahan saat: memotong roti, berbagi permen sama rata, atau membagi kertas lipat untuk tugas.";
    } else if (lower.includes("im3") || lower.includes("e-im3")) {
      botReply = "E-IM3 adalah cara pintar selesaikan soal: 1. Identifikasi, 2. Membangun Ide, 3. Mengklarifikasi, 4. Menilai Kewajaran.";
    }

    setTimeout(() => {
      updateState({ chatHistory: [...newMsgs, { sender: "bot", text: botReply }] });
    }, 500);
    
    updateState({ chatHistory: newMsgs });
    setInput("");
  };

  return (
    <div className="max-w-2xl mx-auto h-[calc(100vh-6rem)] flex flex-col pb-6">
      <div className="bg-white p-4 rounded-t-2xl shadow-sm border border-blue-100 flex items-center gap-3">
        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center text-2xl">🤖</div>
        <div>
          <h1 className="text-xl font-bold text-blue-900">Tutor Pintar</h1>
          <p className="text-sm text-green-600 font-medium">Online siap membantu</p>
        </div>
      </div>

      <div className="bg-blue-50/50 p-3 border-x border-blue-100 flex gap-2 overflow-x-auto whitespace-nowrap hide-scrollbar">
        {CHIPS.map(chip => (
          <button 
            key={chip}
            onClick={() => handleSend(chip)}
            className="bg-white border border-blue-200 text-blue-700 text-sm font-medium px-4 py-2 rounded-full hover:bg-blue-100 hover:border-blue-300 transition-colors shadow-sm"
          >
            {chip}
          </button>
        ))}
      </div>

      <ScrollArea className="flex-1 bg-gray-50 border-x border-blue-100 p-4" ref={scrollRef}>
        <div className="space-y-6">
          {messages.map((m, i) => (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              key={i} 
              className={`flex ${m.sender === 'student' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`flex gap-3 max-w-[80%] ${m.sender === 'student' ? 'flex-row-reverse' : ''}`}>
                <div className={`w-10 h-10 rounded-full flex shrink-0 items-center justify-center text-xl shadow-sm ${m.sender === 'student' ? 'bg-blue-200' : 'bg-yellow-200'}`}>
                  {m.sender === 'student' ? '👦' : '🤖'}
                </div>
                <div className={`p-4 rounded-2xl shadow-sm text-[15px] leading-relaxed ${
                  m.sender === 'student' 
                    ? 'bg-blue-500 text-white rounded-tr-sm' 
                    : 'bg-white border border-gray-200 text-gray-800 rounded-tl-sm'
                }`}>
                  {m.text}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </ScrollArea>

      <div className="bg-white p-4 rounded-b-2xl shadow-sm border border-blue-100 flex gap-2">
        <Input 
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && handleSend(input)}
          placeholder="Ketik pertanyaanmu di sini..."
          className="h-14 text-lg rounded-xl border-2 focus-visible:ring-blue-500"
        />
        <Button 
          onClick={() => handleSend(input)}
          className="h-14 w-14 rounded-xl shrink-0 bg-blue-500 hover:bg-blue-600 shadow-md"
        >
          <Send className="w-6 h-6 text-white" />
        </Button>
      </div>
    </div>
  );
}
