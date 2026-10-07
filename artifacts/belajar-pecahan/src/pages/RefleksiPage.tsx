import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";

const MOODS = [
  { id: "Sangat Senang", emoji: "🤩" },
  { id: "Senang", emoji: "😊" },
  { id: "Biasa", emoji: "😐" },
  { id: "Kurang Senang", emoji: "😕" },
  { id: "Sedih", emoji: "😢" },
];

export default function RefleksiPage() {
  const { state, updateState, markSectionCompleted } = useAppContext();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [belajar, setBelajar] = useState(state.refleksi?.belajar || "");
  const [suka, setSuka] = useState(state.refleksi?.suka || "");
  const [sulit, setSulit] = useState(state.refleksi?.sulit || "");
  const [perasaan, setPerasaan] = useState(state.refleksi?.perasaan || "");

  const handleSave = () => {
    if (!belajar || !suka || !sulit || !perasaan) {
      toast({ description: "Silakan isi semua bagian refleksi ya!", variant: "destructive" });
      return;
    }

    updateState({
      refleksi: { belajar, suka, sulit, perasaan }
    });
    markSectionCompleted("refleksi");
    
    toast({
      title: "Tersimpan! ✨",
      description: "Terima kasih sudah berbagi pengalaman belajarmu.",
      className: "bg-green-100 border-green-400 text-green-800",
    });

    setLocation("/nilai");
  };

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-yellow-100 text-center bg-gradient-to-b from-yellow-50 to-white">
        <span className="text-5xl mb-4 block">💭</span>
        <h1 className="text-3xl font-extrabold text-yellow-900 mb-2">Refleksi Belajar</h1>
        <p className="text-lg text-yellow-700">Ceritakan pengalamanmu belajar pecahan hari ini!</p>
      </div>

      <Card className="border-4 border-yellow-200 shadow-md rounded-3xl overflow-hidden bg-white">
        <CardContent className="p-8 space-y-8">
          
          <div className="space-y-3">
            <Label className="text-xl font-bold text-gray-800">1. Hal yang saya pelajari hari ini:</Label>
            <Textarea 
              value={belajar} 
              onChange={e => setBelajar(e.target.value)} 
              placeholder="Hari ini saya belajar tentang..."
              className="h-32 text-lg p-4 rounded-xl border-2 focus-visible:ring-yellow-400"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-xl font-bold text-gray-800">2. Yang paling saya sukai:</Label>
            <Textarea 
              value={suka} 
              onChange={e => setSuka(e.target.value)} 
              placeholder="Saya paling suka ketika..."
              className="h-32 text-lg p-4 rounded-xl border-2 focus-visible:ring-yellow-400"
            />
          </div>

          <div className="space-y-3">
            <Label className="text-xl font-bold text-gray-800">3. Yang masih sulit saya pahami:</Label>
            <Textarea 
              value={sulit} 
              onChange={e => setSulit(e.target.value)} 
              placeholder="Saya masih bingung tentang..."
              className="h-32 text-lg p-4 rounded-xl border-2 focus-visible:ring-yellow-400"
            />
          </div>

          <div className="space-y-4">
            <Label className="text-xl font-bold text-gray-800">4. Bagaimana perasaanmu belajar hari ini?</Label>
            <div className="flex flex-wrap justify-between gap-4">
              {MOODS.map(m => (
                <button
                  key={m.id}
                  onClick={() => setPerasaan(m.id)}
                  className={`flex flex-col items-center gap-2 p-4 rounded-2xl transition-all border-4 w-[18%] min-w-[100px] ${
                    perasaan === m.id 
                      ? "bg-yellow-100 border-yellow-400 scale-110 shadow-md" 
                      : "bg-gray-50 border-transparent hover:bg-gray-100 opacity-70 hover:opacity-100"
                  }`}
                >
                  <span className="text-5xl">{m.emoji}</span>
                  <span className="text-sm font-bold text-gray-700 whitespace-nowrap">{m.id}</span>
                </button>
              ))}
            </div>
          </div>

          <Button 
            onClick={handleSave} 
            className="w-full h-16 text-xl font-bold rounded-2xl bg-yellow-500 hover:bg-yellow-600 text-white shadow-lg mt-8"
          >
            Simpan Refleksi ✨
          </Button>

        </CardContent>
      </Card>
    </div>
  );
}
