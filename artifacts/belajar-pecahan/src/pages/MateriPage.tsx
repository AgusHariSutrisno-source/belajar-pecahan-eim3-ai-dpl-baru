import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FractionVisual } from "@/components/FractionVisual";
import { useToast } from "@/hooks/use-toast";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { motion, AnimatePresence } from "framer-motion";

const TOPICS = [
  {
    id: 1,
    title: "Mengenal Pecahan Pembilang 1",
    content: "Pecahan pembilang 1 adalah pecahan yang angka di bagian atasnya (pembilang) adalah angka 1. Angka di bagian bawah (penyebut) menunjukkan menjadi berapa bagian keseluruhan itu dibagi.",
    extra: null,
  },
  {
    id: 2,
    title: "Membaca 1/2",
    content: "Pizza dibagi menjadi 2 bagian sama besar. Satu bagian pizza adalah 1/2 (satu per dua atau setengah).",
    visual: { d: 2, n: 1, emoji: "🍕", color: "hsl(35 95% 55%)" },
    extra: null,
  },
  {
    id: 3,
    title: "Membaca 1/3",
    content: "Cokelat dibagi menjadi 3 bagian sama besar. Satu bagian cokelat adalah 1/3 (satu per tiga).",
    visual: { d: 3, n: 1, emoji: "🍫", color: "hsl(25 80% 40%)" },
    extra: null,
  },
  {
    id: 4,
    title: "Membaca 1/4",
    content: "Kue dibagi menjadi 4 bagian sama besar. Satu bagian kue adalah 1/4 (satu per empat atau seperempat).",
    visual: { d: 4, n: 1, emoji: "🍰", color: "hsl(335 85% 65%)" },
    extra: null,
  },
  {
    id: 5,
    title: "Membaca 1/5",
    content: "Donat dibagi menjadi 5 bagian sama besar. Satu bagian donat adalah 1/5 (satu per lima).",
    visual: { d: 5, n: 1, emoji: "🍩", color: "hsl(25 90% 70%)" },
    extra: null,
  },
  {
    id: 6,
    title: "Membaca 1/6",
    content: "Semangka dibagi menjadi 6 bagian sama besar. Satu bagian semangka adalah 1/6 (satu per enam).",
    visual: { d: 6, n: 1, emoji: "🍉", color: "hsl(150 80% 45%)" },
    extra: null,
  },
  {
    id: 7,
    title: "Membaca 1/8",
    content: "Pizza dibagi menjadi 8 bagian sama besar. Satu potong pizza adalah 1/8 (satu per delapan).",
    visual: { d: 8, n: 1, emoji: "🍕", color: "hsl(0 84% 60%)" },
    extra: null,
  },
  {
    id: 8,
    title: "Menentukan Bagian Gambar",
    content: "Jika sebuah gambar dibagi menjadi 4 bagian dan 1 bagian diwarnai, maka bagian yang diwarnai adalah 1/4. Mari perhatikan gambar di bawah ini!",
    visual: null,
    extra: "grid4",
  },
  {
    id: 9,
    title: "Membandingkan Pecahan Pembilang 1",
    content: "Semakin besar penyebutnya, semakin kecil nilainya! Jadi 1/2 > 1/4. Bayangkan: pizza untuk 2 orang vs 4 orang — untuk 2 orang dapat potongan yang lebih besar!",
    visual: null,
    extra: "compare",
  },
  {
    id: 10,
    title: "Pecahan di Sekitar Kita",
    content: "Kita sering menggunakan pecahan setiap hari! Saat memotong kue ulang tahun, berbagi apel dengan teman, atau membagi kertas untuk menggambar.",
    visual: null,
    extra: "everyday",
  },
];

const EXAMPLES = [
  {
    title: "KNOWING",
    q: "Roti dibagi 2 bagian sama besar. Ani memakan 1 bagian. Pecahan apa yang menunjukkan bagian roti yang dimakan Ani?",
    emoji: "🍞",
    visual: { d: 2, n: 1, color: "hsl(35 95% 65%)" },
    a1: "Diketahui: Roti dibagi 2 bagian sama besar. Ani memakan 1 bagian.\nDitanyakan: Pecahan bagian roti yang dimakan Ani.",
    a2: "1 bagian dari 2 bagian sama besar dapat ditulis sebagai pecahan 1/2.",
    a3: "Benar. Karena 1 dari 2 bagian adalah definisi dari 1/2 (satu per dua).",
    a4: "1/2 — Ani memakan setengah bagian roti.",
  },
  {
    title: "APPLYING",
    q: "Donat A dibagi 3 bagian sama besar dan donat B dibagi 5 bagian sama besar. Jika Budi mengambil 1 bagian dari masing-masing donat, bagian donat mana yang lebih besar?",
    emoji: "🍩",
    visual: { d: 5, n: 1, color: "hsl(25 90% 60%)" },
    a1: "Diketahui: Donat A = 1/3 dan donat B = 1/5.\nDitanyakan: Bagian donat mana yang lebih besar?",
    a2: "Bandingkan penyebutnya. Pada pecahan dengan pembilang 1, penyebut yang lebih kecil menunjukkan bagian yang lebih besar. Jadi 1/3 lebih besar daripada 1/5.",
    a3: "Benar. Donat yang dibagi menjadi 3 bagian menghasilkan potongan lebih besar daripada donat yang dibagi menjadi 5 bagian.",
    a4: "Donat A (1/3) lebih besar daripada donat B (1/5).",
  },
  {
    title: "REASONING",
    q: "Tiga kertas berukuran sama dibagi menjadi 2, 4, dan 8 bagian sama besar. Jika diambil 1 bagian dari setiap kertas, urutkan pecahan dari terbesar ke terkecil dan jelaskan alasanmu.",
    emoji: "📄",
    visual: { d: 8, n: 1, color: "hsl(260 80% 65%)" },
    a1: "Diketahui: Pecahan yang dibandingkan adalah 1/2, 1/4, dan 1/8.\nDitanyakan: Urutan pecahan dari terbesar ke terkecil.",
    a2: "Bandingkan penyebutnya. Karena semua pembilangnya 1, penyebut yang lebih kecil berarti bagian yang lebih besar. Urutannya adalah 1/2, 1/4, lalu 1/8.",
    a3: "Benar. Semakin banyak bagian keseluruhan dibagi, semakin kecil satu bagian yang diperoleh.",
    a4: "1/2 > 1/4 > 1/8.",
  },
];

function GridVisual() {
  return (
    <div className="mt-6 space-y-6">
      {[
        { label: "Dibagi 4 bagian, 1 bagian diwarnai = 1/4", filled: 1, total: 4, color: "#3b82f6" },
        { label: "Dibagi 6 bagian, 1 bagian diwarnai = 1/6", filled: 1, total: 6, color: "#10b981" },
        { label: "Dibagi 8 bagian, 1 bagian diwarnai = 1/8", filled: 1, total: 8, color: "#f59e0b" },
      ].map((item) => (
        <div key={item.total} className="bg-white rounded-2xl border-2 border-blue-100 p-4 shadow-sm">
          <p className="text-sm font-bold text-gray-600 mb-3">{item.label}</p>
          <div className="flex gap-2 flex-wrap">
            {Array.from({ length: item.total }).map((_, i) => (
              <div
                key={i}
                className="w-12 h-12 rounded-lg border-2 flex items-center justify-center text-white font-bold text-sm transition-all"
                style={{
                  background: i < item.filled ? item.color : "#f1f5f9",
                  borderColor: i < item.filled ? item.color : "#cbd5e1",
                }}
              >
                {i < item.filled ? "✓" : ""}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-gray-500">Bagian yang diwarnai: {item.filled}/{item.total}</p>
        </div>
      ))}
    </div>
  );
}

function CompareVisual() {
  const pairs = [
    { a: { d: 2, n: 1, label: "1/2", color: "hsl(213 90% 55%)" }, b: { d: 4, n: 1, label: "1/4", color: "hsl(335 85% 65%)" }, winner: "1/2" },
    { a: { d: 3, n: 1, label: "1/3", color: "hsl(25 80% 40%)" }, b: { d: 6, n: 1, label: "1/6", color: "hsl(150 80% 45%)" }, winner: "1/3" },
  ];
  return (
    <div className="mt-6 space-y-4">
      {pairs.map((p) => (
        <div key={p.a.label} className="bg-white rounded-2xl border-2 border-blue-100 p-4 shadow-sm">
          <div className="flex items-center justify-around gap-4">
            <div className="text-center">
              <FractionVisual denominator={p.a.d} numerator={p.a.n} color={p.a.color} />
              <div className="mt-2 text-xl font-extrabold" style={{ color: p.a.color }}>{p.a.label}</div>
            </div>
            <div className="text-3xl font-black text-gray-400 flex flex-col items-center">
              <span className="text-green-500 text-xl font-bold">{p.winner}</span>
              <span className="text-sm text-gray-400">lebih besar!</span>
              <span className="text-2xl">&gt;</span>
            </div>
            <div className="text-center">
              <FractionVisual denominator={p.b.d} numerator={p.b.n} color={p.b.color} />
              <div className="mt-2 text-xl font-extrabold" style={{ color: p.b.color }}>{p.b.label}</div>
            </div>
          </div>
        </div>
      ))}
      <p className="text-sm text-blue-700 font-semibold text-center bg-blue-50 rounded-xl p-3">
        💡 Ingat: Penyebut lebih kecil → Nilai pecahan lebih BESAR!
      </p>
    </div>
  );
}

function EverydayVisual() {
  const examples = [
    { emoji: "🍰", food: "Kue Ulang Tahun", scenario: "Dipotong 8 bagian untuk 8 teman", fraction: "1/8" },
    { emoji: "🍕", food: "Pizza", scenario: "Dipotong 4 bagian untuk keluarga", fraction: "1/4" },
    { emoji: "🍉", food: "Semangka", scenario: "Dipotong 6 bagian untuk makan siang", fraction: "1/6" },
    { emoji: "🍫", food: "Cokelat", scenario: "Dibagi 3 bagian untuk kakak dan adik", fraction: "1/3" },
  ];
  return (
    <div className="mt-6 grid grid-cols-2 gap-3">
      {examples.map((ex) => (
        <div key={ex.food} className="bg-white rounded-2xl border-2 border-blue-100 p-4 shadow-sm text-center hover:shadow-md transition-shadow">
          <div className="text-4xl mb-2">{ex.emoji}</div>
          <div className="font-extrabold text-blue-700 text-xl mb-1">{ex.fraction}</div>
          <div className="font-bold text-gray-700 text-sm">{ex.food}</div>
          <div className="text-gray-500 text-xs mt-1 leading-snug">{ex.scenario}</div>
        </div>
      ))}
    </div>
  );
}

export default function MateriPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const { markSectionCompleted } = useAppContext();
  const { toast } = useToast();
  const [, setLocation] = useLocation();

  const handleNext = () => {
    if (currentStep < TOPICS.length) {
      setCurrentStep((s) => s + 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handlePrev = () => {
    if (currentStep > 0) {
      setCurrentStep((s) => s - 1);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleFinish = () => {
    markSectionCompleted("materi");
    toast({
      title: "Hebat! 🎉",
      description: "Kamu telah menyelesaikan materi. Sekarang lanjut ke Penyelesaian Masalah E-IM3.",
      className: "bg-green-100 border-green-400 text-green-800",
    });
    setLocation("/eim3");
  };

  const isLastStep = currentStep === TOPICS.length;
  const topic = TOPICS[currentStep] as typeof TOPICS[0] & { visual?: { d: number; n: number; emoji: string; color: string } | null; extra?: string | null };

  return (
    <div className="space-y-6 pb-16">
      {/* Header */}
      <div className="flex justify-between items-center bg-white p-4 rounded-2xl shadow-sm border border-blue-100">
        <h1 className="text-2xl font-bold text-blue-900">📖 Materi Pecahan</h1>
        <div className="text-sm font-bold text-blue-600 bg-blue-100 py-1.5 px-4 rounded-full">
          {currentStep === TOPICS.length ? "Contoh Soal" : `${currentStep + 1} / ${TOPICS.length}`}
        </div>
      </div>

      {/* Step progress dots */}
      {currentStep < TOPICS.length && (
        <div className="flex gap-1.5 justify-center flex-wrap">
          {TOPICS.map((_, i) => (
            <div
              key={i}
              className={`h-2 rounded-full transition-all ${i === currentStep ? "w-6 bg-blue-500" : i < currentStep ? "w-2 bg-blue-300" : "w-2 bg-gray-200"}`}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        <motion.div
          key={currentStep}
          initial={{ x: 20, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: -20, opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {currentStep < TOPICS.length ? (
            <Card className="border-4 border-blue-200 shadow-md rounded-3xl overflow-hidden min-h-[420px]">
              <CardContent className="p-8 flex flex-col items-center justify-start h-full">
                <h2 className="text-2xl md:text-3xl font-extrabold text-blue-800 mb-4 text-center">
                  {topic.title}
                </h2>
                <p className="text-xl text-gray-700 leading-relaxed max-w-2xl text-center">
                  {topic.content}
                </p>

                {/* Standard fraction visual (topics 2–7) */}
                {"visual" in topic && topic.visual && (
                  <div className="mt-8 flex flex-col items-center gap-3">
                    <div className="relative">
                      <FractionVisual
                        denominator={topic.visual.d}
                        numerator={topic.visual.n}
                        color={topic.visual.color}
                      />
                      <div className="absolute -top-4 -right-4 text-4xl bg-white rounded-full shadow-md p-1.5 border-2 border-blue-100">
                        {topic.visual.emoji}
                      </div>
                    </div>
                    <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl px-6 py-3 text-center">
                      <span className="text-4xl font-extrabold text-blue-600">
                        {topic.visual.n}/{topic.visual.d}
                      </span>
                      <p className="text-sm text-blue-500 font-semibold mt-1">
                        {topic.visual.n} bagian dari {topic.visual.d} bagian sama besar
                      </p>
                    </div>
                  </div>
                )}

                {/* Topic 8: Grid Visual */}
                {"extra" in topic && topic.extra === "grid4" && (
                  <div className="w-full max-w-lg">
                    <GridVisual />
                  </div>
                )}

                {/* Topic 9: Compare Visual */}
                {"extra" in topic && topic.extra === "compare" && (
                  <div className="w-full max-w-lg">
                    <CompareVisual />
                  </div>
                )}

                {/* Topic 10: Everyday Visual */}
                {"extra" in topic && topic.extra === "everyday" && (
                  <div className="w-full max-w-lg">
                    <EverydayVisual />
                  </div>
                )}
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-3 mb-2">
                <div className="h-1 flex-1 rounded-full bg-blue-200" />
                <h2 className="text-xl font-extrabold text-blue-900 whitespace-nowrap">🧩 Contoh Penyelesaian E-IM3</h2>
                <div className="h-1 flex-1 rounded-full bg-blue-200" />
              </div>

              {EXAMPLES.map((ex, idx) => (
                <Card key={idx} className="border-2 border-blue-200 rounded-2xl overflow-hidden shadow-sm">
                  {/* Problem header with emoji */}
                  <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-4 border-b border-blue-200">
                    <div className="flex items-start gap-4">
                      <div className="flex-shrink-0 bg-white rounded-2xl p-3 shadow-sm border-2 border-blue-100 flex flex-col items-center gap-1">
                        <span className="text-3xl">{ex.emoji}</span>
                        <FractionVisual denominator={ex.visual.d} numerator={ex.visual.n} color={ex.visual.color} size={80} />
                        <span className="font-extrabold text-sm" style={{ color: ex.visual.color }}>
                          {ex.visual.n}/{ex.visual.d}
                        </span>
                      </div>
                      <div>
                        <div className="inline-block bg-blue-500 text-white text-xs font-bold px-3 py-1 rounded-full mb-2">
                          Contoh {ex.title}
                        </div>
                        <p className="font-bold text-blue-900 text-base leading-snug">{ex.q}</p>
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-0">
                    <Accordion type="single" collapsible className="w-full">
                      <AccordionItem value="1" className="px-4">
                        <AccordionTrigger className="text-base font-bold text-blue-800">
                          📋 1. Identifikasi Masalah
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 whitespace-pre-line bg-blue-50 rounded-xl p-3 mb-2">
                          {ex.a1}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="2" className="px-4">
                        <AccordionTrigger className="text-base font-bold text-purple-800">
                          💡 2. Membangun Ide
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 bg-purple-50 rounded-xl p-3 mb-2">
                          {ex.a2}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="3" className="px-4">
                        <AccordionTrigger className="text-base font-bold text-green-800">
                          ✅ 3. Mengklarifikasi Ide
                        </AccordionTrigger>
                        <AccordionContent className="text-base text-gray-700 bg-green-50 rounded-xl p-3 mb-2">
                          {ex.a3}
                        </AccordionContent>
                      </AccordionItem>
                      <AccordionItem value="4" className="px-4 border-none">
                        <AccordionTrigger className="text-base font-bold text-orange-800">
                          ⚖️ 4. Menilai Kewajaran Ide
                        </AccordionTrigger>
                        <AccordionContent className="mb-2">
                          <div className="bg-green-50 border-2 border-green-300 text-green-800 p-4 rounded-xl font-bold text-base">
                            ✅ Jawaban: {ex.a4}
                          </div>
                        </AccordionContent>
                      </AccordionItem>
                    </Accordion>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      {/* Navigation */}
      <div className="flex justify-between mt-6">
        <Button
          variant="outline"
          onClick={handlePrev}
          disabled={currentStep === 0}
          className="h-14 px-8 text-lg font-bold rounded-2xl border-2 hover:bg-gray-50"
          data-testid="button-prev"
        >
          ← Sebelumnya
        </Button>
        {isLastStep ? (
          <Button
            onClick={handleFinish}
            className="h-14 px-8 text-lg font-bold rounded-2xl bg-green-500 hover:bg-green-600 text-white shadow-lg"
            data-testid="button-selesai-materi"
          >
            🎉 Selesai Materi
          </Button>
        ) : (
          <Button
            onClick={handleNext}
            className="h-14 px-8 text-lg font-bold rounded-2xl bg-blue-500 hover:bg-blue-600 text-white shadow-lg"
            data-testid="button-next"
          >
            Lanjut →
          </Button>
        )}
      </div>
    </div>
  );
}
