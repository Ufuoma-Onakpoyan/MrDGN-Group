import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { DuerentsVideoProvider } from "@/components/DuerentsVideoModal";
import { RouteSEO } from "@/components/RouteSEO";
import Index from "./pages/Index";
import About from "./pages/About";
import Businesses from "./pages/Businesses";
import Media from "./pages/Media";
import BlogPost from "./pages/BlogPost";
import Careers from "./pages/Careers";
import Contact from "./pages/Contact";
import Investors from "./pages/Investors";
import FAQ from "./pages/FAQ";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

function PageTransition({ children }: { children: React.ReactNode }) {
  return <div className="page-transition min-h-screen">{children}</div>;
}

const AppRoutes = () => {
  const location = useLocation();
  return (
    <Routes location={location} key={location.pathname}>
      <Route path="/" element={<PageTransition><Index /></PageTransition>} />
      <Route path="/about" element={<PageTransition><About /></PageTransition>} />
      <Route path="/businesses" element={<PageTransition><Businesses /></PageTransition>} />
      <Route path="/media" element={<PageTransition><Media /></PageTransition>} />
      <Route path="/blog/:slug" element={<PageTransition><BlogPost /></PageTransition>} />
      <Route path="/careers" element={<PageTransition><Careers /></PageTransition>} />
      <Route path="/contact" element={<PageTransition><Contact /></PageTransition>} />
      <Route path="/investors" element={<PageTransition><Investors /></PageTransition>} />
      <Route path="/faq" element={<PageTransition><FAQ /></PageTransition>} />
      <Route path="*" element={<PageTransition><NotFound /></PageTransition>} />
    </Routes>
  );
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <DuerentsVideoProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <RouteSEO />
          <AppRoutes />
        </BrowserRouter>
      </DuerentsVideoProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
