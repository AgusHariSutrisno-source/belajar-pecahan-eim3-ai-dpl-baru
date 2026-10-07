import React, { useState } from "react";
import { useLocation } from "wouter";
import { useAppContext } from "@/contexts/AppContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { SchoolLogo } from "@/components/SchoolLogo";
import { motion } from "framer-motion";

const CLASSES = ["1A", "1B", "2A", "2B", "3A", "3B", "4A", "4B", "5A", "5B", "6A", "6B"];

function ChildLeft() {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="60" cy="38" rx="22" ry="24" fill="#FDDCB5"/>
      <rect x="38" y="60" width="44" height="60" rx="10" fill="#60a5fa"/>
      <rect x="38" y="62" width="44" height="20" rx="6" fill="#3b82f6"/>
      <rect x="20" y="62" width="18" height="50" rx="8" fill="#60a5fa"/>
      <rect x="82" y="62" width="18" height="50" rx="8" fill="#60a5fa"/>
      <rect x="42" y="120" width="16" height="55" rx="8" fill="#1e3a8a"/>
      <rect x="62" y="120" width="16" height="55" rx="8" fill="#1e3a8a"/>
      <ellipse cx="42" cy="175" rx="12" ry="8" fill="#f59e0b"/>
      <ellipse cx="78" cy="175" rx="12" ry="8" fill="#f59e0b"/>
      <ellipse cx="60" cy="20" rx="22" ry="14" fill="#92400e"/>
      <circle cx="52" cy="38" r="3" fill="#7c3aed"/>
      <circle cx="68" cy="38" r="3" fill="#7c3aed"/>
      <path d="M54 48 Q60 54 66 48" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <rect x="68" y="80" width="28" height="38" rx="4" fill="#fef3c7"/>
      <rect x="70" y="82" width="24" height="34" rx="3" fill="white"/>
      <line x1="73" y1="88" x2="91" y2="88" stroke="#93c5fd" strokeWidth="2"/>
      <line x1="73" y1="94" x2="91" y2="94" stroke="#93c5fd" strokeWidth="2"/>
      <line x1="73" y1="100" x2="85" y2="100" stroke="#93c5fd" strokeWidth="2"/>
    </svg>
  );
}

function ChildRight() {
  return (
    <svg viewBox="0 0 120 200" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <ellipse cx="60" cy="38" rx="22" ry="24" fill="#FDDCB5"/>
      <rect x="38" y="60" width="44" height="60" rx="10" fill="#34d399"/>
      <rect x="38" y="62" width="44" height="20" rx="6" fill="#10b981"/>
      <rect x="20" y="62" width="18" height="50" rx="8" fill="#34d399"/>
      <rect x="82" y="62" width="18" height="50" rx="8" fill="#34d399"/>
      <rect x="42" y="120" width="16" height="55" rx="8" fill="#065f46"/>
      <rect x="62" y="120" width="16" height="55" rx="8" fill="#065f46"/>
      <ellipse cx="42" cy="175" rx="12" ry="8" fill="#f59e0b"/>
      <ellipse cx="78" cy="175" rx="12" ry="8" fill="#f59e0b"/>
      <ellipse cx="60" cy="18" rx="22" ry="12" fill="#92400e"/>
      <path d="M38 28 Q60 12 82 28" fill="#92400e"/>
      <circle cx="52" cy="38" r="3" fill="#1e3a8a"/>
      <circle cx="68" cy="38" r="3" fill="#1e3a8a"/>
      <path d="M54 48 Q60 54 66 48" stroke="#e11d48" strokeWidth="2" strokeLinecap="round" fill="none"/>
      <rect x="14" y="78" width="28" height="38" rx="4" fill="#ddd6fe"/>
      <rect x="16" y="80" width="24" height="34" rx="3" fill="white"/>
      <text x="28" y="92" textAnchor="middle" fill="#7c3aed" fontSize="10" fontWeight="bold">1/2</text>
      <text x="28" y="106" textAnchor="middle" fill="#10b981" fontSize="8">= setengah</text>
    </svg>
  );
}

export default function LoginPage() {
  const [name, setName] = useState("");
  const [studentClass, setStudentClass] = useState("");
  const [, setLocation] = useLocation();
  const { login } = useAppContext();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name.trim() && studentClass) {
      login(name.trim(), studentClass);
      setLocation("/beranda");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{ background: "linear-gradient(135deg, #e0f2fe 0%, #bae6fd 40%, #ddd6fe 100%)" }}
    >
      {/* Floating food emojis background */}
      <div className="absolute inset-0 pointer-events-none select-none">
        {[
          { emoji: "🍕", top: "8%", left: "5%", size: "3.5rem", rot: "-15deg", opacity: 0.25 },
          { emoji: "🍩", top: "5%", right: "6%", size: "3rem", rot: "20deg", opacity: 0.25 },
          { emoji: "🍉", bottom: "15%", left: "3%", size: "3.5rem", rot: "10deg", opacity: 0.25 },
          { emoji: "🍰", bottom: "8%", right: "4%", size: "3rem", rot: "-10deg", opacity: 0.25 },
          { emoji: "🍫", top: "50%", left: "1%", size: "2.5rem", rot: "5deg", opacity: 0.2 },
          { emoji: "🍪", top: "30%", right: "2%", size: "2.5rem", rot: "-8deg", opacity: 0.2 },
          { emoji: "🍭", top: "70%", right: "8%", size: "2rem", rot: "12deg", opacity: 0.2 },
          { emoji: "🥧", top: "15%", left: "40%", size: "2rem", rot: "-5deg", opacity: 0.15 },
        ].map((f, i) => (
          <div key={i} className="absolute" style={{ top: f.top, bottom: (f as any).bottom, left: (f as any).left, right: (f as any).right, fontSize: f.size, opacity: f.opacity, transform: `rotate(${f.rot})` }}>
            {f.emoji}
          </div>
        ))}
      </div>

      {/* Three-column layout */}
      <div className="w-full max-w-5xl z-10 grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4 md:gap-8">

        {/* Left child illustration */}
        <motion.div
          initial={{ x: -60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
          className="hidden md:flex justify-center"
        >
          <div className="w-40 h-64 drop-shadow-xl">
            <ChildLeft />
          </div>
        </motion.div>

        {/* Center: logo + form */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, type: "spring" }}
          className="w-full max-w-md mx-auto"
        >
          {/* School logo + title */}
          <div className="text-center mb-6">
            <div className="flex justify-center mb-3">
              <div className="bg-white rounded-full p-2 shadow-lg border-4 border-blue-300">
                <SchoolLogo size={72} />
              </div>
            </div>
            <h1 className="text-xl md:text-2xl font-bold text-blue-800 leading-snug">
              Belajar Pecahan Melalui
            </h1>
            <h2 className="text-2xl md:text-3xl font-extrabold text-blue-600 drop-shadow-sm leading-snug mt-1">
              Model E-IM3 berbasis AI-DPL
            </h2>
            <div className="flex justify-center gap-2 mt-2 text-2xl">
              🍕🍰🍩🍉🍫
            </div>
          </div>

          <Card className="border-4 border-blue-200 shadow-2xl rounded-3xl overflow-hidden bg-white/95 backdrop-blur-sm">
            <CardContent className="p-6 md:p-8">
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <Label htmlFor="name" className="text-lg font-bold text-gray-700">👤 Nama Siswa</Label>
                  <Input
                    id="name"
                    data-testid="input-nama"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ketik namamu di sini..."
                    required
                    className="h-14 text-lg rounded-xl border-2 focus-visible:ring-blue-500"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="class" className="text-lg font-bold text-gray-700">🏫 Kelas</Label>
                  <Select value={studentClass} onValueChange={setStudentClass} required>
                    <SelectTrigger data-testid="select-kelas" className="h-14 text-lg rounded-xl border-2 focus-visible:ring-blue-500">
                      <SelectValue placeholder="Pilih kelasmu" />
                    </SelectTrigger>
                    <SelectContent className="max-h-60 rounded-xl">
                      {CLASSES.map((c) => (
                        <SelectItem key={c} value={c} className="text-lg py-3">{c}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <Button
                  type="submit"
                  data-testid="button-masuk"
                  className="w-full h-16 text-xl font-extrabold rounded-2xl text-white shadow-xl transition-transform hover:scale-[1.03] active:scale-95"
                  style={{ background: "linear-gradient(135deg, #3b82f6, #1d4ed8)" }}
                  disabled={!name.trim() || !studentClass}
                >
                  🚀 Masuk Belajar
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>

        {/* Right child illustration */}
        <motion.div
          initial={{ x: 60, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.7, type: "spring" }}
          className="hidden md:flex justify-center"
        >
          <div className="w-40 h-64 drop-shadow-xl">
            <ChildRight />
          </div>
        </motion.div>
      </div>
    </div>
  );
}
