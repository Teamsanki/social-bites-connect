import { useState } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import SplashScreen from "./components/SplashScreen";
import AuthPage from "./components/AuthPage";
import MainLayout from "./components/MainLayout";

const queryClient = new QueryClient();

const App = () => {
  const [showSplash, setShowSplash] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  const handleAuth = (username: string, name: string) => {
    // Here we'll later integrate Firebase authentication
    console.log("Auth with:", username, name);
    setIsAuthenticated(true);
  };

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
};

export default App;