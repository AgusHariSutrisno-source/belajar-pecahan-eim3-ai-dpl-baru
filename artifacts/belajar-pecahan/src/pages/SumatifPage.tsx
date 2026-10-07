import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, XCircle } from "lucide-react";

const QUESTIONS = [
  { type: "mc", level: "KNOWING", q: "Kue dibagi 4 bagian sama besar. Budi makan 1 bagian. Pecahan yang menunjukkan bagian Budi adalah...", a: "1/4", choices: ["1/2", "1/4", "1/3", "1/5"], explain: "1 bagian dari 4 keseluruhan adalah 1/4." },
  { type: "mc", level: "KNOWING", q: "Donat dibagi 6 bagian sama besar. Rina mengambil 1 bagian. Pecahannya adalah...", a: "1/6", choices: ["1/4", "1/5", "1/6", "1/8"], explain: "1 bagian dari 6 keseluruhan adalah 1/6." },
  { type: "mc", level: "APPLYING", q: "Kue A dibagi 3 bagian dan kue B dibagi 6 bagian sama besar. Jika masing-masing diambil 1 bagian, bagian kue mana yang lebih besar?", a: "1/3", choices: ["1/3", "1/6", "Keduanya sama", "Tidak dapat dibandingkan"], explain: "Karena pembilangnya sama-sama 1, penyebut yang lebih kecil menunjukkan bagian yang lebih besar. Jadi 1/3 lebih besar daripada 1/6." },
  { type: "mc", level: "APPLYING", q: "Mana pecahan yang paling besar di antara berikut ini?", a: "1/2", choices: ["1/8", "1/6", "1/3", "1/2"], explain: "Semakin kecil angka penyebutnya, semakin besar nilai pecahan berpembilang 1. Jadi 1/2 adalah yang terbesar." },
  { type: "mc", level: "REASONING", q: "Urutkan pecahan berikut dari terbesar ke terkecil: 1/2, 1/4, dan 1/8.", a: "1/2 > 1/4 > 1/8", choices: ["1/2 > 1/4 > 1/8", "1/8 > 1/4 > 1/2", "1/4 > 1/2 > 1/8", "1/2 > 1/8 > 1/4"], explain: "Semua pembilangnya 1. Penyebut 2 paling kecil sehingga 1/2 paling besar, lalu 1/4, kemudian 1/8." },
  { type: "input", level: "KNOWING", q: "Puding dibagi 5 bagian sama besar. Andi makan 1 bagian. Tuliskan pecahannya dalam format x/y.", a: "1/5", explain: "1 dari 5 bagian adalah 1/5." },
  { type: "input", level: "APPLYING", q: "Pizza A dibagi 4 bagian dan pizza B dibagi 8 bagian sama besar. Jika masing-masing diambil 1 bagian, pecahan bagian pizza yang lebih besar adalah...", a: "1/4", explain: "1/4 lebih besar daripada 1/8 karena penyebut 4 lebih kecil daripada 8." },
  { type: "input", level: "REASONING", q: "Urutkan pecahan 1/3, 1/6, dan 1/9 dari terbesar ke terkecil.", a: "1/3 > 1/6 > 1/9", explain: "Dengan pembilang sama-sama 1, penyebut yang lebih kecil berarti nilai pecahannya lebih besar." },
  { type: "input", level: "REASONING", q: "Urutkan pecahan 1/2, 1/4, dan 1/8 dari terkecil ke terbesar.", a: "1/8 < 1/4 < 1/2", explain: "Urutan dari terkecil ke terbesar adalah kebalikan urutan penyebut dari kecil ke besar: 1/8, 1/4, lalu 1/2." },
  { type: "input", level: "APPLYING", q: "Siti mendapat 1/3 kue dan Deni mendapat 1/7 kue. Pecahan bagian siapa yang lebih besar? Tuliskan pecahannya.", a: "1/3", explain: "1/3 lebih besar daripada 1/7 karena kue yang dibagi menjadi 3 bagian menghasilkan potongan lebih besar." },
];

export default function SumatifPage() {
  const { state, updateState, markSectionCompleted } = useAppContext();
  const [, setLocation] = useLocation();
  const { toast } = useToast();

  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentAnswer, setCurrentAnswer] = useState("");
  const [feedback, setFeedback] = useState<{isCorrect: boolean, show: boolean} | null>(null);
  const [answers, setAnswers] = useState<string[]>([]);
  const [isFinished, setIsFinished] = useState(false);

  const question = QUESTIONS[currentIndex];

  const handleCheck = () => {
    if (!currentAnswer.trim()) {
      toast({ description: "Silakan isi jawaban terlebih dahulu.", variant: "destructive" });
      return;
    }
    const isCorrect = currentAnswer.trim() === question.a;
    setFeedback({ isCorrect, show: true });
  };

  const handleNext = () => {
    const newAnswers = [...answers, currentAnswer.trim()];
    setAnswers(newAnswers);
    setFeedback(null);
    setCurrentAnswer("");

    if (currentIndex < QUESTIONS.length - 1) {
      setCurrentIndex(i => i + 1);
    } else {
      finishTest(newAnswers);
    }
  };

  const finishTest = (finalAnswers: string[]) => {
    let score = 0;
    finalAnswers.forEach((ans, idx) => {
      if (ans === QUESTIONS[idx].a) score += 10;
    });

    updateState({ 
      sumatifScore: score, 
      sumatifAnswers: finalAnswers 
    });
    markSectionCompleted("sumatif");
    setIsFinished(true);
  };

  if (isFinished || state.sumatifScore !== null) {
    const score = state.sumatifScore || 0;
    const correctCount = score / 10;
    const wrongCount = 10 - correctCount;
    
    let badge = "";
    let stars = "";
    if (score >= 90) { badge = "Luar Biasa"; stars = "⭐⭐⭐"; }
    else if (score >= 70) { badge = "Bagus"; stars = "⭐⭐"; }
    else if (score >= 50) { badge = "Cukup"; stars = "⭐"; }
    else { badge = "Perlu Belajar Lagi"; stars = "🌱"; }

    return (
      <div className="space-y-6 text-center max-w-2xl mx-auto py-12">
        <Card className="border-4 border-blue-200 shadow-xl rounded-3xl overflow-hidden bg-gradient-to-b from-blue-50 to-white">
          <CardContent className="p-12">
            <h1 className="text-4xl font-extrabold text-blue-900 mb-2">Tes Evaluasi Selesai! 🎉</h1>
            <div className="text-6xl mb-6">{stars}</div>
            
            <div className="bg-white rounded-2xl p-6 shadow-sm border-2 border-blue-100 mb-8 inline-block min-w-[200px]">
              <p className="text-gray-500 font-bold mb-1">SKOR AKHIR</p>
              <p className="text-6xl font-black text-blue-600">{score}</p>
              <p className="text-xl font-bold text-blue-800 mt-2">{badge}</p>
            </div>

            <div className="flex justify-center gap-8 mb-8 text-lg">
              <div className="text-green-600 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-6 h-6" /> Benar: {correctCount}
              </div>
              <div className="text-red-500 font-bold flex items-center gap-2">
                <XCircle className="w-6 h-6" /> Salah: {wrongCount}
              </div>
            </div>

            <p className="text-lg text-gray-700 font-medium mb-8">
              Teruslah belajar dan berlatih! Pecahan itu menyenangkan jika kita sudah memahaminya.
            </p>

            <Button 
              onClick={() => setLocation("/refleksi")} 
              className="h-16 px-8 w-full text-xl font-bold rounded-2xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
            >
              Lanjut ke Refleksi 💭
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12 max-w-3xl mx-auto">
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
        <div>
          <h1 className="text-2xl font-bold text-blue-900">Tes Evaluasi</h1>
          <span className="text-xs font-extrabold tracking-wide text-blue-700">{question.level}</span>
        </div>
        <div className="text-sm font-bold text-blue-600 bg-blue-100 py-1 px-4 rounded-full">
          Soal {currentIndex + 1} dari {QUESTIONS.length}
        </div>
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={currentIndex}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          <Card className="border-4 border-blue-200 shadow-md rounded-3xl overflow-hidden min-h-[300px]">
            <CardContent className="p-8">
              <p className="text-2xl font-medium text-gray-800 mb-8 leading-relaxed">
                {question.q}
              </p>

              <div className="mb-8">
                {question.type === "mc" ? (
                  <RadioGroup value={currentAnswer} onValueChange={setCurrentAnswer} disabled={feedback?.show} className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {question.choices?.map(c => (
                      <div key={c} className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-colors ${
                        feedback?.show && c === question.a ? "bg-green-100 border-green-400" :
                        feedback?.show && c === currentAnswer && !feedback.isCorrect ? "bg-red-100 border-red-400" :
                        "bg-blue-50 hover:bg-blue-100 border-blue-200"
                      }`}>
                        <RadioGroupItem value={c} id={`choice-${c}`} disabled={feedback?.show} />
                        <Label htmlFor={`choice-${c}`} className="text-lg font-bold cursor-pointer w-full">{c}</Label>
                      </div>
                    ))}
                  </RadioGroup>
                ) : (
                  <Input 
                    value={currentAnswer} 
                    onChange={e => setCurrentAnswer(e.target.value)} 
                    disabled={feedback?.show}
                    placeholder="Contoh: 1/4"
                    className="h-16 text-2xl font-bold text-center border-2 border-blue-200 rounded-xl"
                  />
                )}
              </div>

              {feedback?.show && (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`p-6 rounded-2xl border-2 flex items-start gap-4 mb-8 ${feedback.isCorrect ? "bg-green-50 border-green-200 text-green-800" : "bg-red-50 border-red-200 text-red-800"}`}
                >
                  {feedback.isCorrect ? <CheckCircle2 className="w-8 h-8 shrink-0 text-green-500" /> : <XCircle className="w-8 h-8 shrink-0 text-red-500" />}
                  <div>
                    <h3 className="font-bold text-xl mb-1">{feedback.isCorrect ? "Benar Sekali! 🎉" : "Kurang Tepat 😢"}</h3>
                    <p className="text-lg opacity-90">{!feedback.isCorrect && <span>Jawaban yang benar adalah <strong>{question.a}</strong>. </span>}{question.explain}</p>
                  </div>
                </motion.div>
              )}

              <div className="flex justify-end">
                {!feedback?.show ? (
                  <Button onClick={handleCheck} className="h-14 px-8 text-lg font-bold rounded-xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg">
                    Cek Jawaban
                  </Button>
                ) : (
                  <Button onClick={handleNext} className="h-14 px-8 text-lg font-bold rounded-xl bg-blue-600 hover:bg-blue-700 text-white shadow-lg">
                    Lanjut Soal Berikutnya
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
