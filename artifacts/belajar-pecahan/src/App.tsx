import React from "react";
import { Link, Route, Switch } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppProvider } from "@/contexts/AppContext";
import { Layout } from "@/components/layout/Layout";

import LoginPage from "@/pages/LoginPage";
import BerandaPage from "@/pages/BerandaPage";
import MateriPage from "@/pages/MateriPage";
import EIM3Page from "@/pages/EIM3Page";
import LatihanPage from "@/pages/LatihanPage";
import SumatifPage from "@/pages/SumatifPage";
import RefleksiPage from "@/pages/RefleksiPage";
import NilaiPage from "@/pages/NilaiPage";
import TutorPage from "@/pages/TutorPage";

const queryClient = new QueryClient();

function Router() {
  return (
    <Switch>
      <Route path="/" component={LoginPage} />
      <Route>
        <Layout>
          <Switch>
            <Route path="/beranda" component={BerandaPage} />
            <Route path="/materi" component={MateriPage} />
            <Route path="/eim3" component={EIM3Page} />
            <Route path="/latihan" component={LatihanPage} />
            <Route path="/sumatif" component={SumatifPage} />
            <Route path="/refleksi" component={RefleksiPage} />
            <Route path="/nilai" component={NilaiPage} />
            <Route path="/tutor" component={TutorPage} />
            <Route>
              <div className="p-8 text-center bg-white rounded-3xl shadow-sm border-2 border-red-100">
                <h2 className="text-2xl font-bold text-red-600 mb-4">Halaman Tidak Ditemukan</h2>
              </div>
            </Route>
          </Switch>
        </Layout>
      </Route>
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppProvider>
        <TooltipProvider>
          <Router />
          <Toaster />
        </TooltipProvider>
      </AppProvider>
    </QueryClientProvider>
  );
}

export default App;
