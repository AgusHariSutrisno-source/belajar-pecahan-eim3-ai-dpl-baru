import React, { createContext, useContext, useEffect, useState } from "react";

interface Refleksi {
  belajar: string;
  suka: string;
  sulit: string;
  perasaan: string;
}

interface AppState {
  studentName: string;
  studentClass: string;
  completedSections: string[];
  im3Answers: Record<string, any>;
  practiceScore: number | null;
  practiceAnswers: Record<string, any>;
  sumatifScore: number | null;
  sumatifAnswers: Record<string, any>;
  refleksi: Refleksi | null;
  chatHistory: { sender: "student" | "bot"; text: string }[];
}

interface AppContextType {
  state: AppState;
  updateState: (updates: Partial<AppState>) => void;
  login: (name: string, studentClass: string) => void;
  logout: () => void;
  markSectionCompleted: (section: string) => void;
  isLoggedIn: boolean;
  progress: number;
}

const defaultState: AppState = {
  studentName: "",
  studentClass: "",
  completedSections: [],
  im3Answers: {},
  practiceScore: null,
  practiceAnswers: {},
  sumatifScore: null,
  sumatifAnswers: {},
  refleksi: null,
  chatHistory: [],
};

const AppContext = createContext<AppContextType | undefined>(undefined);

export function AppProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<AppState>(() => {
    try {
      const saved = localStorage.getItem("belajarPecahanState");
      if (saved) return { ...defaultState, ...JSON.parse(saved) };
    } catch (e) {
      console.error("Failed to load state", e);
    }
    return defaultState;
  });

  useEffect(() => {
    localStorage.setItem("belajarPecahanState", JSON.stringify(state));
  }, [state]);

  const updateState = (updates: Partial<AppState>) => {
    setState((prev) => ({ ...prev, ...updates }));
  };

  const login = (name: string, studentClass: string) => {
    updateState({ studentName: name, studentClass });
  };

  const logout = () => {
    setState(defaultState);
  };

  const markSectionCompleted = (section: string) => {
    setState((prev) => {
      if (prev.completedSections.includes(section)) return prev;
      return { ...prev, completedSections: [...prev.completedSections, section] };
    });
  };

  const isLoggedIn = !!state.studentName;
  const progress = (state.completedSections.length / 5) * 100;

  return (
    <AppContext.Provider
      value={{
        state,
        updateState,
        login,
        logout,
        markSectionCompleted,
        isLoggedIn,
        progress,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useAppContext() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppProvider");
  }
  return context;
}
