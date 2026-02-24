import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
import ScrollToTop from "./components/ScrollToTop";
import Index from "./pages/Index";
import About from "./pages/About";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Contact from "./pages/Contact";
import Events from "./pages/Events";
import Careers from "./pages/Careers";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const PAGE_TITLES: Record<string, string> = {
  '/': "MrDGN Entertainment | Event Sponsorship",
  '/about': "About Us | MrDGN Entertainment",
  '/blog': "Blog | MrDGN Entertainment",
  '/events': "Events & Sponsorships | MrDGN Entertainment",
  '/contact': "Contact | MrDGN Entertainment",
  '/careers': "Careers | MrDGN Entertainment",
};

function AppTitleSetter() {
  const location = useLocation();
  useEffect(() => {
    const basePath = location.pathname === '/' ? '/' : '/' + location.pathname.split('/').filter(Boolean)[0];
    const title = PAGE_TITLES[location.pathname] ?? PAGE_TITLES[basePath] ?? "MrDGN Entertainment";
    document.title = title;
  }, [location.pathname]);
  return null;
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AppTitleSetter />
        <ScrollToTop />
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/blog" element={<Blog />} />
          <Route path="/blog/:slug" element={<BlogPost />} />
          <Route path="/events" element={<Events />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/careers" element={<Careers />} />
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
