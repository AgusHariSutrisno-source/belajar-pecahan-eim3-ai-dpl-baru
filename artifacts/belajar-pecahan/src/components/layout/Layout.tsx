import React, { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { SchoolLogo } from "@/components/SchoolLogo";
import { Menu, X, LogOut, Send } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";

interface LayoutProps {
  children: React.ReactNode;
}

const NAV_ITEMS = [
  { path: "/beranda", label: "Beranda", icon: "🏠" },
  { path: "/materi", label: "Materi", icon: "📖" },
  { path: "/eim3", label: "Penyelesaian E-IM3", icon: "🧩" },
  { path: "/latihan", label: "Latihan Soal", icon: "✏️" },
  { path: "/sumatif", label: "Tes Evaluasi", icon: "📝" },
  { path: "/refleksi", label: "Refleksi", icon: "💭" },
  { path: "/nilai", label: "Nilai Saya", icon: "🏆" },
  { path: "/tutor", label: "Tanya Tutor", icon: "🤖" },
];

interface ChatMsg {
  from: "user" | "bot";
  text: string;
}

function getAutoReply(input: string): string {
  const q = input.toLowerCase();
  if (q.includes("pecahan") && !q.includes("membandingkan") && !q.includes("banding"))
    return "Pecahan adalah bagian dari keseluruhan. Misalnya, 1/4 artinya 1 bagian dari 4 bagian yang sama. Seperti memotong kue menjadi 4 bagian dan kamu mengambil 1 bagian! 🍰";
  if (q.includes("baca") || q.includes("membaca"))
    return "Cara membaca pecahan: 1/2 dibaca 'satu per dua' atau 'setengah'. 1/4 dibaca 'satu per empat' atau 'seperempat'. Angka atas = pembilang, angka bawah = penyebut. 📖";
  if (q.includes("1/2") || q.includes("setengah"))
    return "Setengah (1/2) artinya benda dibagi 2 bagian sama besar, lalu kita ambil 1 bagian. Contoh: pizza dipotong 2, kamu makan 1 potongan = 1/2 pizza! 🍕";
  if (q.includes("1/4") || q.includes("seperempat"))
    return "Seperempat (1/4) artinya benda dibagi 4 bagian sama besar, lalu kita ambil 1 bagian. Contoh: kue dipotong 4, kamu makan 1 potongan = 1/4 kue! 🍰";
  if (q.includes("1/3") || q.includes("sepertiga"))
    return "Sepertiga (1/3) artinya benda dibagi 3 bagian sama besar, lalu kita ambil 1 bagian. Contoh: cokelat dipotong 3, kamu makan 1 potongan = 1/3 cokelat! 🍫";
  if (q.includes("1/5") || q.includes("seperlima"))
    return "Seperlima (1/5) artinya benda dibagi 5 bagian sama besar, lalu kita ambil 1 bagian. Contoh: donat dibagi 5, kamu makan 1 bagian = 1/5 donat! 🍩";
  if (q.includes("1/6") || q.includes("seperenam"))
    return "Seperenam (1/6) artinya benda dibagi 6 bagian sama besar, lalu kita ambil 1 bagian. Contoh: semangka dipotong 6, kamu makan 1 potongan = 1/6 semangka! 🍉";
  if (q.includes("1/8") || q.includes("seperdelapan"))
    return "Seperdelapan (1/8) artinya benda dibagi 8 bagian sama besar, lalu kita ambil 1 bagian. Contoh: pizza dipotong 8, kamu makan 1 potongan = 1/8 pizza! 🍕";
  if (q.includes("banding") || q.includes("membandingkan") || q.includes("lebih besar") || q.includes("terbesar"))
    return "Untuk membandingkan pecahan pembilang 1: penyebut lebih kecil = nilai lebih BESAR. Jadi 1/2 > 1/3 > 1/4. Bayangkan pizza untuk 2 orang vs 8 orang — untuk 2 orang dapat bagian lebih besar! 🍕";
  if (q.includes("sehari") || q.includes("kehidupan") || q.includes("contoh"))
    return "Contoh pecahan sehari-hari: 🍕 Pizza dibagi 8 = tiap orang dapat 1/8. 🍰 Kue ulang tahun dibagi 4 = 1/4. 🍉 Semangka dibagi 6 = 1/6. Seru kan?";
  if (q.includes("e-im3") || q.includes("eim3") || q.includes("im3") || q.includes("tahap"))
    return "E-IM3 adalah model belajar dengan 4 tahap: 1️⃣ Identifikasi Masalah — apa yang diketahui dan ditanyakan? 2️⃣ Membangun Ide — bagaimana cara menyelesaikannya? 3️⃣ Mengklarifikasi Ide — apakah idemu benar? 4️⃣ Menilai Kewajaran — apakah jawabanmu masuk akal?";
  if (q.includes("pembilang") || q.includes("penyebut"))
    return "Pembilang adalah angka DI ATAS garis pecahan (menunjukkan berapa bagian yang diambil). Penyebut adalah angka DI BAWAH garis (menunjukkan total bagian). Contoh: 1/4 — pembilang=1, penyebut=4. 📚";
  return "Maaf, aku belum tahu jawabannya. Coba tanyakan tentang: pecahan, membaca 1/2, membandingkan pecahan, atau E-IM3 ya! 😊";
}

const QUICK_QUESTIONS = [
  "Apa itu pecahan?",
  "Cara membaca 1/2?",
  "Cara membandingkan pecahan?",
];

export function Layout({ children }: LayoutProps) {
  const { state, logout } = useAppContext();
  const [location, setLocation] = useLocation();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isTutorOpen, setIsTutorOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMsg[]>([
    { from: "bot", text: "Halo! Aku Tutor Pintar 🤖 Ada yang ingin kamu tanyakan tentang pecahan?" },
  ]);
  const [tutorInput, setTutorInput] = useState("");
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isTutorOpen && chatEndRef.current) {
      chatEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, isTutorOpen]);

  const handleSend = (text?: string) => {
    const msg = (text ?? tutorInput).trim();
    if (!msg) return;
    const newMessages: ChatMsg[] = [...messages, { from: "user", text: msg }];
    setMessages(newMessages);
    setTutorInput("");
    setTimeout(() => {
      setMessages((prev) => [...prev, { from: "bot", text: getAutoReply(msg) }]);
    }, 400);
  };

  const handleLogout = () => {
    logout();
    setLocation("/");
  };

  if (!state.studentName && location !== "/") {
    setLocation("/");
    return null;
  }

  if (location === "/") {
    return <>{children}</>;
  }

  const SidebarContent = () => (
    <div className="flex flex-col h-full text-white">
      <div className="p-5 flex-1 overflow-y-auto">
        {/* Logo area */}
        <div className="flex items-center gap-3 mb-6">
          <div className="bg-white rounded-full p-1 shadow-md flex-shrink-0">
            <SchoolLogo size={36} />
          </div>
          <div>
            <h1 className="text-lg font-extrabold leading-none">E-IM3</h1>
            <p className="text-xs text-blue-200 leading-none mt-0.5">Belajar Pecahan</p>
          </div>
        </div>

        {/* Student chip */}
        <div className="bg-white/20 backdrop-blur-md rounded-2xl p-4 mb-6">
          <div className="text-xs font-medium text-blue-200">Siswa:</div>
          <div className="text-xl font-bold leading-tight">{state.studentName}</div>
          <div className="text-sm mt-0.5 text-blue-200">Kelas {state.studentClass}</div>
        </div>

        <nav className="space-y-1.5">
          {NAV_ITEMS.map((item) => {
            const isActive = location === item.path;
            return (
              <Link key={item.path} href={item.path}>
                <div
                  data-testid={`nav-${item.path.replace("/", "")}`}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl cursor-pointer transition-all text-sm font-semibold ${
                    isActive
                      ? "bg-white text-blue-700 shadow-md"
                      : "hover:bg-white/15 text-white"
                  }`}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <span className="text-lg">{item.icon}</span>
                  <span>{item.label}</span>
                </div>
              </Link>
            );
          })}
        </nav>
      </div>

      <div className="p-5">
        <Button
          variant="secondary"
          className="w-full bg-white/20 text-white hover:bg-white/30 border-none font-semibold"
          onClick={handleLogout}
          data-testid="button-logout"
        >
          <LogOut className="w-4 h-4 mr-2" />
          Keluar
        </Button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background flex overflow-hidden">
      {/* Desktop Sidebar */}
      <aside
        className="hidden md:block w-72 flex-shrink-0 sticky top-0 h-screen"
        style={{ background: "linear-gradient(to bottom, hsl(220 85% 35%), hsl(213 90% 55%))" }}
      >
        <SidebarContent />
      </aside>

      {/* Mobile Header */}
      <div className="md:hidden fixed top-0 left-0 right-0 h-16 bg-blue-700 text-white flex items-center px-4 z-40 shadow-md gap-3">
        <Button variant="ghost" size="icon" className="text-white hover:bg-white/20 flex-shrink-0" onClick={() => setIsMobileMenuOpen(true)} aria-label="Buka menu" data-testid="button-hamburger">
          <Menu className="w-6 h-6" />
        </Button>
        <div className="flex items-center gap-2">
          <div className="bg-white rounded-full p-0.5">
            <SchoolLogo size={28} />
          </div>
          <span className="font-bold text-sm">E-IM3 Pecahan</span>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.3 }}
            className="fixed inset-0 z-50 md:hidden"
            style={{ background: "linear-gradient(to bottom, hsl(220 85% 35%), hsl(213 90% 55%))" }}
          >
            <div className="absolute top-4 right-4">
              <Button variant="ghost" size="icon" className="text-white hover:bg-white/20" onClick={() => setIsMobileMenuOpen(false)}>
                <X className="w-6 h-6" />
              </Button>
            </div>
            <SidebarContent />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto relative pt-16 md:pt-0">
        <div className="max-w-4xl mx-auto p-4 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={location}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
            >
              {children}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Floating AI Tutor Button */}
        <div className="fixed top-[4.5rem] md:top-6 right-4 md:right-8 z-40">
          <div className="relative">
            <button
              data-testid="button-floating-tutor"
              className="w-14 h-14 rounded-full shadow-xl border-4 border-white hover:scale-110 transition-transform flex items-center justify-center text-2xl"
              style={{ background: "linear-gradient(135deg, #fcd34d, #f59e0b)" }}
              onClick={() => setIsTutorOpen(!isTutorOpen)}
              aria-label="Buka Tanya Tutor"
            >
              🤖
            </button>

            <AnimatePresence>
              {isTutorOpen && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 8 }}
                  className="absolute top-16 right-0 w-80 mt-1"
                >
                  <Card className="border-2 border-yellow-300 shadow-2xl overflow-hidden rounded-2xl">
                    {/* Header */}
                    <div className="flex items-center justify-between px-4 py-3 border-b border-yellow-200"
                      style={{ background: "linear-gradient(135deg, #fcd34d, #f59e0b)" }}>
                      <div className="flex items-center gap-2">
                        <span className="text-xl">🤖</span>
                        <div>
                          <div className="font-extrabold text-yellow-900 text-sm leading-none">Tutor Pintar</div>
                          <div className="text-yellow-800 text-xs">Tanya tentang pecahan!</div>
                        </div>
                      </div>
                      <button onClick={() => setIsTutorOpen(false)} className="text-yellow-800 hover:text-yellow-900 transition-colors">
                        <X className="w-5 h-5" />
                      </button>
                    </div>

                    {/* Quick question chips */}
                    <div className="px-3 pt-2 pb-1 bg-yellow-50 flex flex-wrap gap-1.5">
                      {QUICK_QUESTIONS.map((q) => (
                        <button
                          key={q}
                          onClick={() => handleSend(q)}
                          className="text-xs bg-white border border-yellow-300 text-yellow-800 px-2.5 py-1 rounded-full hover:bg-yellow-100 transition-colors font-medium"
                        >
                          {q}
                        </button>
                      ))}
                    </div>

                    {/* Chat messages */}
                    <div className="h-52 overflow-y-auto px-3 py-2 space-y-2 bg-yellow-50">
                      {messages.map((msg, i) => (
                        <div key={i} className={`flex ${msg.from === "user" ? "justify-end" : "justify-start"}`}>
                          {msg.from === "bot" && (
                            <span className="text-lg mr-1.5 flex-shrink-0 mt-1">🤖</span>
                          )}
                          <div
                            className={`max-w-[85%] px-3 py-2 rounded-2xl text-sm leading-snug ${
                              msg.from === "user"
                                ? "bg-blue-500 text-white rounded-br-sm"
                                : "bg-white border border-yellow-200 text-gray-800 rounded-bl-sm shadow-sm"
                            }`}
                          >
                            {msg.text}
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {/* Input area */}
                    <div className="flex gap-2 px-3 py-3 border-t border-yellow-200 bg-white">
                      <Input
                        value={tutorInput}
                        onChange={(e) => setTutorInput(e.target.value)}
                        onKeyDown={(e) => e.key === "Enter" && handleSend()}
                        placeholder="Ketik pertanyaanmu..."
                        className="flex-1 h-9 rounded-xl border-yellow-300 text-sm focus-visible:ring-yellow-400"
                        data-testid="input-tutor-floating"
                      />
                      <Button
                        size="icon"
                        className="h-9 w-9 rounded-xl flex-shrink-0"
                        style={{ background: "linear-gradient(135deg, #fcd34d, #f59e0b)" }}
                        onClick={() => handleSend()}
                        data-testid="button-tutor-send"
                      >
                        <Send className="w-4 h-4 text-yellow-900" />
                      </Button>
                    </div>
                  </Card>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </main>
    </div>
  );
}
