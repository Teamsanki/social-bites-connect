import React, { useState, useEffect } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import SplashScreen from "./components/SplashScreen";
import AuthPage from "./components/AuthPage";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuthenticated(!!user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleAuth = (username: string, name: string) => {
    console.log("Auth with:", username, name);
  };

  if (loading && !showSplash) {
    return <div>Loading...</div>;
  }

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {showSplash ? (
          <SplashScreen onComplete={handleSplashComplete} />
        ) : !isAuthenticated ? (
          <AuthPage onAuth={handleAuth} />
        ) : (
          <MainLayout />
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;