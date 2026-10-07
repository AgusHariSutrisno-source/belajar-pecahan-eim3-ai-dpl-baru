import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { EIM3Form } from "@/components/EIM3Form";
import { useToast } from "@/hooks/use-toast";

const MC_QUESTIONS = [
  {
    id: "l1",
    level: "KNOWING",
    q: "Pizza dibagi menjadi 4 bagian sama besar. Ibu mengambil 1 bagian. Pecahan yang menunjukkan bagian pizza ibu adalah...",
    choices: [
      { id: "a", label: "1/2", value: "1/2" },
      { id: "b", label: "1/3", value: "1/3" },
      { id: "c", label: "1/4", value: "1/4" },
      { id: "d", label: "1/5", value: "1/5" }
    ],
    answer: "1/4"
  },
  {
    id: "l2",
    level: "APPLYING",
    q: "Kue A dibagi menjadi 3 bagian dan kue B dibagi menjadi 6 bagian sama besar. Jika Andi mengambil 1 bagian dari masing-masing kue, bagian kue mana yang lebih besar?",
    choices: [
      { id: "a", label: "1/3", value: "1/3" },
      { id: "b", label: "1/6", value: "1/6" },
      { id: "c", label: "Keduanya sama", value: "sama" },
      { id: "d", label: "Tidak dapat dibandingkan", value: "tidak" }
    ],
    answer: "1/3"
  },
  {
    id: "l3",
    level: "REASONING",
    q: "Urutkan pecahan berikut dari terbesar ke terkecil: 1/2, 1/5, dan 1/8.",
    choices: [
      { id: "a", label: "1/2 > 1/5 > 1/8", value: "1/2 > 1/5 > 1/8" },
      { id: "b", label: "1/8 > 1/5 > 1/2", value: "1/8 > 1/5 > 1/2" },
      { id: "c", label: "1/5 > 1/2 > 1/8", value: "1/5 > 1/2 > 1/8" },
      { id: "d", label: "1/2 > 1/8 > 1/5", value: "1/2 > 1/8 > 1/5" }
    ],
    answer: "1/2 > 1/5 > 1/8"
  }
];

const EIM3_QUESTIONS = [
  {
    id: "l4",
    level: "KNOWING",
    text: "Roti dibagi 3 bagian sama besar. Deni memakan 1 bagian. Pecahan apa yang menunjukkan bagian roti yang dimakan Deni?",
    emoji: "🍞",
    answer: "1/3",
    choices: [
      { label: "1/2", value: "1/2" },
      { label: "1/3", value: "1/3" },
      { label: "1/4", value: "1/4" },
      { label: "1/5", value: "1/5" }
    ]
  },
  {
    id: "l5",
    level: "REASONING",
    text: "Tiga semangka berukuran sama dibagi menjadi 2, 4, dan 8 bagian sama besar. Jika Nina mengambil 1 bagian dari setiap semangka, urutkan pecahan dari terbesar ke terkecil.",
    emoji: "🍉",
    answer: "1/2 > 1/4 > 1/8",
    choices: [
      { label: "1/2 > 1/4 > 1/8", value: "1/2 > 1/4 > 1/8" },
      { label: "1/8 > 1/4 > 1/2", value: "1/8 > 1/4 > 1/2" },
      { label: "1/4 > 1/2 > 1/8", value: "1/4 > 1/2 > 1/8" },
      { label: "1/2 > 1/8 > 1/4", value: "1/2 > 1/8 > 1/4" }
    ]
  }
];

export default function LatihanPage() {
  const { state, updateState, markSectionCompleted } = useAppContext();
  const [, setLocation] = useLocation();
  const { toast } = useToast();
  
  const [answers, setAnswers] = useState<Record<string, any>>(state.practiceAnswers || {});

  const handleMcChange = (qId: string, val: string) => {
    setAnswers(prev => ({ ...prev, [qId]: val }));
  };

  const handleEim3Complete = (qId: string, ans: any) => {
    setAnswers(prev => ({ ...prev, [qId]: ans }));
  };

  const handleFinish = () => {
    const mcDone = MC_QUESTIONS.every(q => answers[q.id]);
    const eim3Done = EIM3_QUESTIONS.every(q => answers[q.id]?.completed);

    if (!mcDone || !eim3Done) {
      toast({
        title: "Belum selesai",
        description: "Silakan selesaikan semua soal terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }

    let score = 0;
    MC_QUESTIONS.forEach(q => {
      if (answers[q.id] === q.answer) score++;
    });

    updateState({ practiceAnswers: answers, practiceScore: score });
    markSectionCompleted("latihan");

    toast({
      title: "Latihan Selesai!",
      description: `Kamu menjawab ${score} dari ${MC_QUESTIONS.length} soal pilihan ganda dengan benar.`,
      className: "bg-green-100 border-green-400 text-green-800",
    });

    setLocation("/sumatif");
  };

  return (
    <div className="space-y-8 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 text-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Latihan Soal</h1>
        <p className="text-lg text-blue-700">Uji pemahamanmu tentang pecahan pembilang 1!</p>
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-900">A. Pilihan Ganda</h2>
        {MC_QUESTIONS.map((q, idx) => (
          <Card key={q.id} className="border-2 border-blue-100 shadow-sm rounded-3xl overflow-hidden">
            <CardContent className="p-6">
              <div className="flex items-center justify-between gap-3 mb-4">
                <span className="text-xs font-extrabold tracking-wide text-blue-700 bg-blue-100 px-3 py-1 rounded-full">{q.level}</span>
                <span className="text-sm font-bold text-gray-400">Soal {idx + 1}</span>
              </div>
              <p className="text-xl font-medium text-gray-800 mb-6">{q.q}</p>
              <RadioGroup value={answers[q.id] || ""} onValueChange={(v) => handleMcChange(q.id, v)} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {q.choices.map(c => (
                  <div key={c.id} className="flex items-center space-x-3 bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-xl border border-blue-200">
                    <RadioGroupItem value={c.value} id={`${q.id}-${c.id}`} />
                    <Label htmlFor={`${q.id}-${c.id}`} className="text-lg font-bold cursor-pointer w-full">{c.label}</Label>
                  </div>
                ))}
              </RadioGroup>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-blue-900 mt-8">B. Penyelesaian E-IM3</h2>
        {EIM3_QUESTIONS.map((q, idx) => (
          <div key={q.id} className="bg-white p-2 rounded-3xl shadow-sm border-2 border-purple-100 overflow-hidden">
            <div className="bg-purple-50 text-purple-900 font-bold p-4 rounded-t-2xl text-lg">
              <span>Soal {idx + 4}</span>
              <span className="ml-2 text-xs bg-purple-200 text-purple-800 px-3 py-1 rounded-full">{q.level}</span>
            </div>
            <EIM3Form 
              problemKey={q.id}
              problemText={q.text}
              illustration={q.emoji}
              correctAnswer={q.answer}
              answerChoices={q.choices}
              onComplete={(ans) => handleEim3Complete(q.id, ans)}
              savedAnswers={answers[q.id] || {}}
            />
          </div>
        ))}
      </div>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => setLocation("/eim3")} 
          className="h-14 px-8 text-lg font-bold rounded-2xl border-2 hover:bg-gray-50"
        >
          Kembali
        </Button>
        <Button 
          onClick={handleFinish} 
          className="h-14 px-8 text-lg font-bold rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg"
        >
          Kumpulkan Latihan
        </Button>
      </div>
    </div>
  );
}
