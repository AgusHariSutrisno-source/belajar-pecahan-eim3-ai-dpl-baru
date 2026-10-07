import React from "react";
import { Link } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { SchoolLogo } from "@/components/SchoolLogo";
import { motion } from "framer-motion";

const MENUS = [
  {
    path: "/materi",
    title: "Materi",
    desc: "Pelajari konsep pecahan pembilang 1",
    icon: "📖",
    bg: "from-blue-400 to-blue-600",
    border: "border-blue-300",
    badge: "bg-blue-100 text-blue-700",
    shadow: "shadow-blue-200",
  },
  {
    path: "/eim3",
    title: "Penyelesaian Masalah E-IM3",
    desc: "Selesaikan masalah dengan 4 tahap E-IM3",
    icon: "🧩",
    bg: "from-purple-400 to-purple-600",
    border: "border-purple-300",
    badge: "bg-purple-100 text-purple-700",
    shadow: "shadow-purple-200",
  },
  {
    path: "/latihan",
    title: "Latihan Soal",
    desc: "Uji pemahamanmu dengan soal latihan",
    icon: "✏️",
    bg: "from-green-400 to-green-600",
    border: "border-green-300",
    badge: "bg-green-100 text-green-700",
    shadow: "shadow-green-200",
  },
  {
    path: "/sumatif",
    title: "Tes Evaluasi",
    desc: "Kuis akhir pembelajaran pecahan",
    icon: "📝",
    bg: "from-red-400 to-red-500",
    border: "border-red-300",
    badge: "bg-red-100 text-red-700",
    shadow: "shadow-red-200",
  },
  {
    path: "/refleksi",
    title: "Refleksi",
    desc: "Ceritakan pengalaman belajarmu",
    icon: "💭",
    bg: "from-yellow-400 to-orange-400",
    border: "border-yellow-300",
    badge: "bg-yellow-100 text-yellow-700",
    shadow: "shadow-yellow-200",
  },
  {
    path: "/nilai",
    title: "Nilai Saya",
    desc: "Lihat skor dan pencapaianmu",
    icon: "🏆",
    bg: "from-orange-400 to-amber-500",
    border: "border-orange-300",
    badge: "bg-orange-100 text-orange-700",
    shadow: "shadow-orange-200",
  },
  {
    path: "/tutor",
    title: "Tanya Tutor",
    desc: "Butuh bantuan? Tanya Tutor Pintar!",
    icon: "🤖",
    bg: "from-teal-400 to-cyan-500",
    border: "border-teal-300",
    badge: "bg-teal-100 text-teal-700",
    shadow: "shadow-teal-200",
  },
];

const FOOD_FACTS = [
  { emoji: "🍕", label: "Pizza", fraction: "1/8", desc: "Dipotong 8 bagian" },
  { emoji: "🍰", label: "Kue", fraction: "1/4", desc: "Dipotong 4 bagian" },
  { emoji: "🍫", label: "Cokelat", fraction: "1/3", desc: "Dipotong 3 bagian" },
  { emoji: "🍉", label: "Semangka", fraction: "1/6", desc: "Dipotong 6 bagian" },
];

export default function BerandaPage() {
  const { state, progress } = useAppContext();

  const container = {
    hidden: { opacity: 0 },
    show: { opacity: 1, transition: { staggerChildren: 0.08 } },
  };
  const item = { hidden: { opacity: 0, y: 24 }, show: { opacity: 1, y: 0 } };

  return (
    <div className="space-y-8 pb-16">
      {/* Welcome Hero Card */}
      <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
        <Card className="border-0 shadow-xl overflow-hidden rounded-3xl" style={{ background: "linear-gradient(135deg, #1d4ed8 0%, #3b82f6 50%, #60a5fa 100%)" }}>
          <CardContent className="p-0">
            <div className="flex flex-col md:flex-row items-center justify-between gap-0">
              {/* Text area */}
              <div className="p-6 md:p-8 flex-1">
                <div className="flex items-center gap-3 mb-3">
                  <div className="bg-white/20 rounded-full p-1">
                    <SchoolLogo size={36} />
                  </div>
                  <span className="text-white/80 text-sm font-semibold">Belajar Pecahan E-IM3</span>
                </div>
                <h1 className="text-3xl md:text-4xl font-extrabold text-white mb-2 drop-shadow-sm">
                  Halo, {state.studentName}! 👋
                </h1>
                <p className="text-blue-100 text-lg font-medium mb-4">
                  Kelas {state.studentClass} — Siap belajar pecahan hari ini?
                </p>
                <div className="bg-white/20 backdrop-blur-sm rounded-2xl p-4">
                  <div className="flex justify-between mb-2">
                    <span className="text-white font-bold text-sm">📊 Progres Belajar</span>
                    <span className="text-white font-extrabold text-sm">{Math.round(progress)}%</span>
                  </div>
                  <Progress value={progress} className="h-4 bg-white/30 [&>div]:bg-yellow-400 [&>div]:rounded-full" />
                  <p className="text-blue-100 text-xs mt-2">
                    {state.completedSections.length} dari 5 modul selesai
                  </p>
                </div>
              </div>

              {/* Decoration right side */}
              <div className="hidden md:flex flex-col items-center justify-center p-8 gap-4 min-w-[180px]">
                <div className="text-7xl animate-bounce" style={{ animationDuration: "2.5s" }}>🎓</div>
                <div className="flex gap-2 text-3xl">
                  <span>🍕</span><span>🍰</span><span>🍩</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Food fraction mini cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
        {FOOD_FACTS.map((f, i) => (
          <motion.div
            key={f.label}
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: i * 0.08 + 0.2 }}
          >
            <div className="bg-white rounded-2xl border-2 border-blue-100 shadow-sm p-3 flex items-center gap-3 hover:shadow-md transition-shadow">
              <span className="text-3xl">{f.emoji}</span>
              <div>
                <div className="font-extrabold text-blue-700 text-lg leading-none">{f.fraction}</div>
                <div className="text-gray-500 text-xs mt-0.5">{f.desc}</div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Learning outcomes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="border-2 border-blue-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-blue-50 px-5 py-3 border-b-2 border-blue-100">
            <h2 className="font-extrabold text-blue-900">Capaian Pembelajaran (CP)</h2>
          </div>
          <CardContent className="p-5">
            <p className="text-sm leading-relaxed text-gray-700">
              Peserta didik mampu melakukan perbandingan dan pengurutan pecahan dengan pembilang satu serta memahami konsep pecahan dalam kehidupan sehari-hari.
            </p>
          </CardContent>
        </Card>
        <Card className="border-2 border-purple-200 rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-purple-50 px-5 py-3 border-b-2 border-purple-100">
            <h2 className="font-extrabold text-purple-900">Tujuan Pembelajaran (TP)</h2>
          </div>
          <CardContent className="p-5">
            <p className="text-sm leading-relaxed text-gray-700">
              1. Murid mampu membandingkan dua pecahan dengan pembilang satu.
              <br />
              2. Murid mampu mengurutkan beberapa pecahan dengan pembilang satu dari terbesar ke terkecil atau sebaliknya.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Section title */}
      <div className="flex items-center gap-3">
        <div className="h-1 flex-1 rounded-full bg-blue-200" />
        <h2 className="text-xl font-extrabold text-blue-900 whitespace-nowrap">🗺️ Menu Belajar</h2>
        <div className="h-1 flex-1 rounded-full bg-blue-200" />
      </div>

      {/* Menu cards grid */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5"
      >
        {MENUS.map((menu) => {
          const key = menu.path.replace("/", "");
          const isDone = state.completedSections.includes(key);

          return (
            <motion.div variants={item} key={menu.path}>
              <Link href={menu.path}>
                <Card className={`h-full cursor-pointer transition-all hover:scale-[1.03] hover:shadow-2xl border-2 ${menu.border} rounded-3xl overflow-hidden shadow-lg ${menu.shadow} ${isDone ? "ring-4 ring-green-400 ring-offset-2" : ""}`}>
                  <CardContent className="p-0">
                    {/* Colored header strip */}
                    <div className={`bg-gradient-to-r ${menu.bg} p-4 flex items-center justify-between`}>
                      <span className="text-5xl drop-shadow-lg">{menu.icon}</span>
                      {isDone && (
                        <span className="bg-white/90 text-green-700 text-xs font-extrabold px-3 py-1.5 rounded-full shadow-sm flex items-center gap-1">
                          ✅ Selesai
                        </span>
                      )}
                    </div>
                    {/* Text body */}
                    <div className="p-4 bg-white">
                      <h3 className="text-lg font-extrabold text-gray-800 mb-1">{menu.title}</h3>
                      <p className="text-sm text-gray-500 font-medium">{menu.desc}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </motion.div>
          );
        })}
      </motion.div>

      {/* Motivational banner */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="rounded-3xl p-6 text-center shadow-sm border-2 border-yellow-200"
        style={{ background: "linear-gradient(135deg, #fef9c3, #fef3c7)" }}
      >
        <div className="text-3xl mb-2">🌟</div>
        <p className="text-lg font-bold text-yellow-800">
          "Semakin rajin belajar, semakin pintar kamu!"
        </p>
        <p className="text-yellow-600 text-sm mt-1 font-medium">
          Yuk selesaikan semua modul dan raih bintang belajarmu! ⭐
        </p>
      </motion.div>
    </div>
  );
}
