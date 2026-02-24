import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, Navigate } from "react-router-dom";
import { useEffect } from "react";
import { AuthProvider } from "@/contexts/AuthContext";
import Layout from "./components/layout/Layout";
import Home from "./pages/Home";
import About from "./pages/About";
import Properties from "./pages/Properties";
import PropertyDetail from "./pages/PropertyDetail";
import Services from "./pages/Services";
import Testimonials from "./pages/Testimonials";
import Contact from "./pages/Contact";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogPostPage from "./pages/BlogPostPage";
import Auth from "./pages/Auth";
import PrivacyPolicy from "./pages/PrivacyPolicy";
import TermsOfService from "./pages/TermsOfService";
import FAQ from "./pages/FAQ";
import BuyingGuide from "./pages/BuyingGuide";
import SellingGuide from "./pages/SellingGuide";
import NotFound from "./pages/NotFound";
import { ErrorBoundary } from "./components/ErrorBoundary";

const queryClient = new QueryClient();

const ScrollToTop = () => {
  const location = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location.pathname]);
  
  return null;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <ErrorBoundary>
            <ScrollToTop />
            <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout><Home /></Layout>} />
            <Route path="/about" element={<Layout><About /></Layout>} />
            <Route path="/properties" element={<Layout><Properties /></Layout>} />
            <Route path="/properties/:id" element={<Layout><PropertyDetail /></Layout>} />
            <Route path="/services" element={<Layout><Services /></Layout>} />
            <Route path="/testimonials" element={<Layout><Testimonials /></Layout>} />
            <Route path="/contact" element={<Layout><Contact /></Layout>} />
            <Route path="/careers" element={<Layout><Careers /></Layout>} />
            <Route path="/blog" element={<Layout><Blog /></Layout>} />
            <Route path="/blog/:slug" element={<Layout><BlogPostPage /></Layout>} />
            <Route path="/lifestyle" element={<Navigate to="/blog" replace />} />
            <Route path="/buying" element={<Layout><BuyingGuide /></Layout>} />
            <Route path="/selling" element={<Layout><SellingGuide /></Layout>} />
            <Route path="/privacy" element={<Layout><PrivacyPolicy /></Layout>} />
            <Route path="/terms" element={<Layout><TermsOfService /></Layout>} />
            <Route path="/faq" element={<Layout><FAQ /></Layout>} />
            
            {/* Auth Route */}
            <Route path="/auth" element={<Auth />} />
            
            {/* Admin Routes - TODO: Implement admin panel */}
            <Route path="/admin/*" element={<div className="min-h-screen flex items-center justify-center bg-background"><div className="text-center"><h1 className="text-4xl font-bold mb-4 text-primary">Admin Panel</h1><p className="text-muted-foreground">Coming Soon - Admin functionality will be implemented here</p></div></div>} />
            
            {/* 404 Route */}
            <Route path="*" element={<Layout><NotFound /></Layout>} />
            </Routes>
          </ErrorBoundary>
        </BrowserRouter>
      </TooltipProvider>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
