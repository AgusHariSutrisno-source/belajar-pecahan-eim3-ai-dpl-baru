import React from "react";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { CheckCircle2, Trophy, Medal, Star, Camera } from "lucide-react";

export default function NilaiPage() {
  const { state, progress } = useAppContext();

  const isMateriDone = state.completedSections.includes("materi");
  const isEim3Done = state.completedSections.includes("eim3");
  const isLatihanDone = state.completedSections.includes("latihan");
  const isSumatifDone = state.completedSections.includes("sumatif");
  const isRefleksiDone = state.completedSections.includes("refleksi");

  const sumatifScore = state.sumatifScore || 0;
  const correctCount = sumatifScore / 10;
  const wrongCount = 10 - correctCount;

  let message = "Kamu hebat sudah belajar sampai sini! Terus tingkatkan!";
  if (sumatifScore >= 90) message = "Luar biasa! Kamu adalah Master Pecahan!";
  else if (sumatifScore >= 70) message = "Bagus sekali! Pemahamanmu tentang pecahan sudah mantap!";
  
  return (
    <div className="space-y-6 pb-12 max-w-4xl mx-auto">
      <Card id="report-card" className="border-4 border-blue-200 shadow-xl rounded-3xl overflow-hidden bg-white">
        
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-blue-600 p-8 text-white text-center relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-white to-transparent"></div>
          <div className="relative z-10">
            <div className="w-24 h-24 bg-white rounded-full mx-auto flex items-center justify-center text-5xl mb-4 border-4 border-blue-300 shadow-lg">
              🎓
            </div>
            <h1 className="text-3xl font-extrabold mb-1">Rapor Belajar</h1>
            <h2 className="text-2xl font-bold opacity-90">{state.studentName} - Kelas {state.studentClass}</h2>
          </div>
        </div>

        <CardContent className="p-8 space-y-10">
          
          {/* Progress */}
          <div className="bg-blue-50 p-6 rounded-2xl border-2 border-blue-100">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-bold text-xl text-blue-900 flex items-center gap-2">
                <Trophy className="text-yellow-500" /> Progres Keseluruhan
              </h3>
              <span className="text-2xl font-black text-blue-600">{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-4 bg-blue-200 [&>div]:bg-blue-500" />
            
            <div className="grid grid-cols-2 md:grid-cols-5 gap-3 mt-6">
              {[
                { n: "Materi", d: isMateriDone },
                { n: "E-IM3", d: isEim3Done },
                { n: "Latihan", d: isLatihanDone },
                { n: "Tes Evaluasi", d: isSumatifDone },
                { n: "Refleksi", d: isRefleksiDone },
              ].map(item => (
                <div key={item.n} className={`flex flex-col items-center justify-center p-3 rounded-xl border-2 text-center text-sm font-bold ${item.d ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-400'}`}>
                  {item.d ? <CheckCircle2 className="w-6 h-6 mb-1 text-green-500" /> : <div className="w-6 h-6 rounded-full border-2 border-gray-300 mb-1" />}
                  {item.n}
                </div>
              ))}
            </div>
          </div>

          {/* Scores */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gradient-to-b from-orange-50 to-orange-100 p-6 rounded-2xl border-2 border-orange-200 text-center">
              <h3 className="font-bold text-orange-900 mb-2">Skor Latihan</h3>
              <div className="text-5xl font-black text-orange-600">
                {state.practiceScore !== null ? `${state.practiceScore}/3` : "-"}
              </div>
            </div>
            <div className="bg-gradient-to-b from-purple-50 to-purple-100 p-6 rounded-2xl border-2 border-purple-200 text-center">
              <h3 className="font-bold text-purple-900 mb-2">Skor Tes Evaluasi</h3>
              <div className="text-5xl font-black text-purple-600">
                {state.sumatifScore !== null ? state.sumatifScore : "-"}
              </div>
            </div>
          </div>

          {state.sumatifScore !== null && (
            <div className="flex justify-center gap-8 text-lg bg-gray-50 p-4 rounded-xl border border-gray-200">
              <div className="text-green-600 font-bold flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5" /> Benar: {correctCount}
              </div>
              <div className="text-red-500 font-bold flex items-center gap-2">
                <span className="text-xl">✕</span> Salah: {wrongCount}
              </div>
            </div>
          )}

          {/* Badges */}
          <div>
            <h3 className="font-bold text-xl text-gray-800 mb-4 flex items-center gap-2">
              <Medal className="text-blue-500" /> Lencana Didapat
            </h3>
            <div className="flex flex-wrap gap-4">
              {progress === 100 && (
                <div className="flex items-center gap-3 bg-yellow-50 border-2 border-yellow-300 p-3 rounded-xl">
                  <span className="text-3xl">🌟</span>
                  <div className="font-bold text-yellow-800 text-sm">Penyelesai<br/>Misi</div>
                </div>
              )}
              {state.sumatifScore && state.sumatifScore >= 90 && (
                <div className="flex items-center gap-3 bg-blue-50 border-2 border-blue-300 p-3 rounded-xl">
                  <span className="text-3xl">👑</span>
                  <div className="font-bold text-blue-800 text-sm">Master<br/>Pecahan</div>
                </div>
              )}
              {(!state.sumatifScore || state.sumatifScore < 90) && progress < 100 && (
                <p className="text-gray-500 font-medium">Selesaikan semua tugas dan tes untuk mendapat lencana!</p>
              )}
            </div>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-200 text-center">
            <p className="text-green-800 font-bold text-lg">{message}</p>
          </div>

        </CardContent>
      </Card>

      <div className="text-center mt-8 space-y-4">
        <Button 
          onClick={() => alert("Gunakan fitur screenshot di HP/Komputer kamu ya!")}
          className="h-16 px-8 text-xl font-bold rounded-2xl bg-slate-800 hover:bg-slate-900 text-white shadow-lg"
        >
          <Camera className="w-6 h-6 mr-2" />
          Screenshot Nilai untuk Guru
        </Button>
        <p className="text-gray-600 font-medium">Silakan screenshot halaman ini lalu kirimkan kepada guru.</p>
      </div>
    </div>
  );
}
