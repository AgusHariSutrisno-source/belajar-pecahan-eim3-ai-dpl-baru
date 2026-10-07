import React, { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { AlertCircle, CheckCircle2 } from "lucide-react";

interface EIM3FormProps {
  problemKey: string;
  problemText: string;
  illustration: string;
  correctAnswer: string;
  answerChoices?: { label: string; value: string }[];
  onComplete: (answers: any) => void;
  savedAnswers?: any;
}

export function EIM3Form({ 
  problemKey, 
  problemText, 
  illustration, 
  correctAnswer, 
  answerChoices = [], 
  onComplete,
  savedAnswers = {}
}: EIM3FormProps) {
  const [stage, setStage] = useState(savedAnswers.completed ? 5 : 1);
  const [diketahui, setDiketahui] = useState(savedAnswers.diketahui || "");
  const [ditanyakan, setDitanyakan] = useState(savedAnswers.ditanyakan || "");
  const [ide, setIde] = useState(savedAnswers.ide || "");
  const [isBenar, setIsBenar] = useState(savedAnswers.isBenar || "");
  const [alasan, setAlasan] = useState(savedAnswers.alasan || "");
  const [jawaban, setJawaban] = useState(savedAnswers.jawaban || "");
  const [error, setError] = useState("");

  const handleNextStage1 = () => {
    if (!diketahui.trim() || !ditanyakan.trim()) {
      setError("Silakan isi apa yang diketahui dan ditanyakan terlebih dahulu.");
      return;
    }
    setError("");
    setStage(2);
  };

  const handleNextStage2 = () => {
    if (!ide.trim()) {
      setError("Silakan tulis ide penyelesaianmu terlebih dahulu.");
      return;
    }
    setError("");
    setStage(3);
  };

  const handleNextStage3 = () => {
    if (!isBenar || !alasan.trim()) {
      setError("Silakan pilih benar/salah dan tulis alasanmu.");
      return;
    }
    setError("");
    setStage(4);
  };

  const handleComplete = () => {
    if (!jawaban) {
      setError("Silakan pilih jawaban terlebih dahulu.");
      return;
    }
    setError("");
    setStage(5);
    onComplete({
      diketahui,
      ditanyakan,
      ide,
      isBenar,
      alasan,
      jawaban,
      isCorrect: jawaban === correctAnswer,
      completed: true
    });
  };

  const StageHeader = ({ num, title, isActive, isDone }: any) => (
    <div className={`flex items-center gap-2 mb-4 ${isActive ? 'text-primary' : isDone ? 'text-green-600' : 'text-gray-400'}`}>
      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${isActive ? 'bg-primary' : isDone ? 'bg-green-500' : 'bg-gray-300'}`}>
        {isDone ? <CheckCircle2 className="w-5 h-5" /> : num}
      </div>
      <h3 className="font-bold text-lg">{title}</h3>
    </div>
  );

  return (
    <div className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-blue-100">
      <div className="flex gap-4 items-center bg-blue-50 p-4 rounded-xl mb-6">
        <span className="text-4xl">{illustration}</span>
        <p className="text-lg font-medium text-blue-900">{problemText}</p>
      </div>

      {error && (
        <div className="bg-red-50 text-red-600 p-3 rounded-lg flex items-center gap-2 text-sm font-medium">
          <AlertCircle className="w-4 h-4" />
          {error}
        </div>
      )}

      {/* Tahap 1: Identifikasi Masalah */}
      <div className={`transition-opacity ${stage >= 1 ? 'opacity-100' : 'hidden'}`}>
        <StageHeader num="1" title="Identifikasi Masalah" isActive={stage === 1} isDone={stage > 1} />
        {stage === 1 ? (
          <div className="space-y-4 pl-10 border-l-2 border-blue-200 ml-4 pb-4">
            <div>
              <Label className="text-base">Apa yang diketahui?</Label>
              <Textarea 
                value={diketahui} 
                onChange={(e) => setDiketahui(e.target.value)} 
                placeholder="Tuliskan apa yang kamu ketahui dari soal..."
                className="mt-2 text-base p-3"
                rows={3}
              />
            </div>
            <div>
              <Label className="text-base">Apa yang ditanyakan?</Label>
              <Textarea 
                value={ditanyakan} 
                onChange={(e) => setDitanyakan(e.target.value)} 
                placeholder="Tuliskan apa yang ditanyakan..."
                className="mt-2 text-base p-3"
                rows={3}
              />
            </div>
            <Button onClick={handleNextStage1} className="w-full text-lg h-12 mt-2">Lanjut ke Membangun Ide</Button>
          </div>
        ) : (
          <div className="pl-10 text-sm text-gray-600 mb-4 border-l-2 border-green-200 ml-4">
            <p><strong>Diketahui:</strong> {diketahui}</p>
            <p><strong>Ditanyakan:</strong> {ditanyakan}</p>
          </div>
        )}
      </div>

      {/* Tahap 2: Membangun Ide */}
      <div className={`transition-opacity ${stage >= 2 ? 'opacity-100' : 'hidden'}`}>
        <StageHeader num="2" title="Membangun Ide" isActive={stage === 2} isDone={stage > 2} />
        {stage === 2 ? (
          <div className="space-y-4 pl-10 border-l-2 border-blue-200 ml-4 pb-4">
            <div>
              <Label className="text-base">Bagaimana caramu menyelesaikannya?</Label>
              <Textarea 
                value={ide} 
                onChange={(e) => setIde(e.target.value)} 
                placeholder="Tuliskan ide penyelesaianmu di sini..."
                className="mt-2 text-base p-3"
                rows={4}
              />
            </div>
            <Button onClick={handleNextStage2} className="w-full text-lg h-12 mt-2">Lanjut ke Mengklarifikasi Ide</Button>
          </div>
        ) : stage > 2 ? (
          <div className="pl-10 text-sm text-gray-600 mb-4 border-l-2 border-green-200 ml-4">
            <p><strong>Ide:</strong> {ide}</p>
          </div>
        ) : null}
      </div>

      {/* Tahap 3: Mengklarifikasi Ide */}
      <div className={`transition-opacity ${stage >= 3 ? 'opacity-100' : 'hidden'}`}>
        <StageHeader num="3" title="Mengklarifikasi Ide" isActive={stage === 3} isDone={stage > 3} />
        {stage === 3 ? (
          <div className="space-y-4 pl-10 border-l-2 border-blue-200 ml-4 pb-4">
            <div>
              <Label className="text-base block mb-3">Apakah ide kamu benar dan bisa menyelesaikan masalah?</Label>
              <RadioGroup value={isBenar} onValueChange={setIsBenar} className="flex gap-6">
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200 w-32">
                  <RadioGroupItem value="ya" id="benar-ya" />
                  <Label htmlFor="benar-ya" className="text-lg cursor-pointer">Ya</Label>
                </div>
                <div className="flex items-center space-x-2 bg-gray-50 p-3 rounded-lg border border-gray-200 w-32">
                  <RadioGroupItem value="tidak" id="benar-tidak" />
                  <Label htmlFor="benar-tidak" className="text-lg cursor-pointer">Tidak</Label>
                </div>
              </RadioGroup>
            </div>
            <div>
              <Label className="text-base">Tuliskan alasanmu:</Label>
              <Textarea 
                value={alasan} 
                onChange={(e) => setAlasan(e.target.value)} 
                placeholder="Mengapa ide tersebut benar atau salah?"
                className="mt-2 text-base p-3"
                rows={3}
              />
            </div>
            <Button onClick={handleNextStage3} className="w-full text-lg h-12 mt-2">Lanjut ke Menilai Kewajaran</Button>
          </div>
        ) : stage > 3 ? (
          <div className="pl-10 text-sm text-gray-600 mb-4 border-l-2 border-green-200 ml-4">
            <p><strong>Yakin benar?</strong> {isBenar === 'ya' ? 'Ya' : 'Tidak'}</p>
            <p><strong>Alasan:</strong> {alasan}</p>
          </div>
        ) : null}
      </div>

      {/* Tahap 4: Menilai Kewajaran */}
      <div className={`transition-opacity ${stage >= 4 ? 'opacity-100' : 'hidden'}`}>
        <StageHeader num="4" title="Menilai Kewajaran Ide" isActive={stage === 4} isDone={stage > 4} />
        {stage === 4 ? (
          <div className="space-y-4 pl-10 border-l-2 border-blue-200 ml-4 pb-4">
            <Label className="text-base block mb-3">Pilih jawaban yang paling tepat berdasarkan idemu:</Label>
            <RadioGroup value={jawaban} onValueChange={setJawaban} className="grid grid-cols-2 gap-4">
              {answerChoices.map((choice) => (
                <div key={choice.value} className="flex items-center space-x-3 bg-blue-50 hover:bg-blue-100 transition-colors p-4 rounded-xl border border-blue-200">
                  <RadioGroupItem value={choice.value} id={`choice-${choice.value}`} />
                  <Label htmlFor={`choice-${choice.value}`} className="text-lg font-bold cursor-pointer w-full">{choice.label}</Label>
                </div>
              ))}
            </RadioGroup>
            <Button onClick={handleComplete} className="w-full text-lg h-14 mt-4 bg-green-500 hover:bg-green-600 text-white shadow-lg">Selesaikan Masalah</Button>
          </div>
        ) : stage > 4 ? (
          <div className="pl-10 text-sm text-gray-600 mb-4 border-l-2 border-green-200 ml-4">
            <p><strong>Jawaban akhir:</strong> <span className="font-bold text-lg text-blue-600">{jawaban}</span></p>
          </div>
        ) : null}
      </div>

      {/* Selesai */}
      {stage === 5 && (
        <div className="bg-green-100 border-2 border-green-400 p-4 rounded-xl mt-6 flex items-center justify-center gap-3">
          <span className="text-3xl">🎉</span>
          <p className="text-green-800 font-bold text-lg">Hebat! Kamu telah menyelesaikan masalah ini!</p>
        </div>
      )}
    </div>
  );
}
