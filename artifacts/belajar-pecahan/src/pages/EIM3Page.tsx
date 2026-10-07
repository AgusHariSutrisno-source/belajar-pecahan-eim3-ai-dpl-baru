import React from "react";
import { useLocation } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { EIM3Form } from "@/components/EIM3Form";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { useToast } from "@/hooks/use-toast";

const PROBLEMS = [
  {
    id: "m1",
    title: "Masalah 1 (KNOWING)",
    text: "Kue dibagi menjadi 4 bagian sama besar. Rina memakan 1 bagian. Pecahan apa yang menunjukkan bagian kue yang dimakan Rina?",
    emoji: "🍰",
    answer: "1/4",
    choices: [
      { label: "1/2", value: "1/2" },
      { label: "1/4", value: "1/4" },
      { label: "1/3", value: "1/3" },
      { label: "1/8", value: "1/8" }
    ]
  },
  {
    id: "m2",
    title: "Masalah 2 (APPLYING)",
    text: "Cokelat A dibagi menjadi 3 bagian dan cokelat B dibagi menjadi 6 bagian sama besar. Jika Budi mengambil 1 bagian dari masing-masing cokelat, cokelat mana yang memberi bagian lebih besar?",
    emoji: "🍫",
    answer: "1/3",
    choices: [
      { label: "1/3", value: "1/3" },
      { label: "1/6", value: "1/6" },
      { label: "Keduanya sama", value: "sama" },
      { label: "Tidak dapat dibandingkan", value: "tidak" }
    ]
  },
  {
    id: "m3",
    title: "Masalah 3 (REASONING)",
    text: "Tiga semangka berukuran sama dibagi menjadi 2, 4, dan 8 bagian sama besar. Jika Siti mengambil 1 bagian dari setiap semangka, urutkan pecahan yang diperoleh dari terbesar ke terkecil.",
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

export default function EIM3Page() {
  const { state, updateState, markSectionCompleted } = useAppContext();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const handleComplete = (problemId: string, answers: any) => {
    const newAnswers = { ...state.im3Answers, [problemId]: answers };
    updateState({ im3Answers: newAnswers });
  };

  const handleFinish = () => {
    const allDone = PROBLEMS.every(p => state.im3Answers[p.id]?.completed);
    if (!allDone) {
      toast({
        title: "Belum selesai",
        description: "Silakan selesaikan semua masalah terlebih dahulu.",
        variant: "destructive"
      });
      return;
    }
    
    markSectionCompleted("eim3");
    toast({
      title: "Luar Biasa!",
      description: "Kamu telah menyelesaikan semua masalah E-IM3.",
      className: "bg-green-100 border-green-400 text-green-800",
    });
    setLocation("/latihan");
  };

  return (
    <div className="space-y-6 pb-12">
      <div className="bg-white p-6 rounded-2xl shadow-sm border border-blue-100 text-center">
        <h1 className="text-3xl font-extrabold text-blue-900 mb-2">Penyelesaian Masalah E-IM3</h1>
        <p className="text-lg text-blue-700">Ayo selesaikan masalah pecahan di bawah ini dengan 4 langkah E-IM3!</p>
      </div>

      <Accordion type="single" collapsible className="space-y-4">
        {PROBLEMS.map((prob) => {
          const isDone = state.im3Answers[prob.id]?.completed;
          return (
            <AccordionItem key={prob.id} value={prob.id} className="bg-white border-2 border-blue-100 rounded-3xl overflow-hidden shadow-sm">
              <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-blue-50 data-[state=open]:bg-blue-50">
                <div className="flex items-center gap-4 text-xl font-bold text-blue-900">
                  <span className="text-3xl">{prob.emoji}</span>
                  {prob.title}
                  {isDone && <span className="text-sm bg-green-500 text-white px-3 py-1 rounded-full ml-4 font-bold shadow-sm">Selesai ✓</span>}
                </div>
              </AccordionTrigger>
              <AccordionContent className="p-6 bg-gray-50 border-t border-blue-100">
                <EIM3Form 
                  problemKey={prob.id}
                  problemText={prob.text}
                  illustration={prob.emoji}
                  correctAnswer={prob.answer}
                  answerChoices={prob.choices}
                  onComplete={(ans) => handleComplete(prob.id, ans)}
                  savedAnswers={state.im3Answers[prob.id] || {}}
                />
              </AccordionContent>
            </AccordionItem>
          );
        })}
      </Accordion>

      <div className="flex justify-between mt-8">
        <Button 
          variant="outline" 
          onClick={() => setLocation("/materi")} 
          className="h-14 px-8 text-lg font-bold rounded-2xl border-2 hover:bg-gray-50"
        >
          Kembali ke Materi
        </Button>
        <Button 
          onClick={handleFinish} 
          className="h-14 px-8 text-lg font-bold rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg"
        >
          Selesai & Lanjut Latihan
        </Button>
      </div>
    </div>
  );
}
