import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import { AuthProvider } from "@/contexts/AuthContext";
import { ProtectedRoute } from "@/components/admin/ProtectedRoute";
import { AdminLayout } from "@/components/admin/AdminLayout";
import { RootRoute } from "@/components/RootRoute";
import Login from "@/pages/admin/Login";
import Dashboard from "@/pages/admin/Dashboard";
import Properties from "@/pages/admin/Properties";
import Testimonials from "@/pages/admin/Testimonials";
import Users from "@/pages/admin/Users";
import Settings from "@/pages/admin/Settings";
import Reports from "@/pages/admin/Reports";
import BlogList from "@/pages/admin/BlogList";
import BlogEdit from "@/pages/admin/BlogEdit";
import PortfolioList from "@/pages/admin/PortfolioList";
import PortfolioEdit from "@/pages/admin/PortfolioEdit";
import ProductsList from "@/pages/admin/ProductsList";
import ProductEdit from "@/pages/admin/ProductEdit";
import JobsList from "@/pages/admin/JobsList";
import JobEdit from "@/pages/admin/JobEdit";
import ContactSubmissions from "@/pages/admin/ContactSubmissions";
import Newsletter from "@/pages/admin/Newsletter";
import ConstructionProjectsList from "@/pages/admin/ConstructionProjectsList";
import ConstructionProjectEdit from "@/pages/admin/ConstructionProjectEdit";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <AuthProvider>
          <Routes>
            {/* Routes */}
            <Route path="/" element={<RootRoute />} />
            <Route path="/admin/login" element={<Login />} />
            <Route path="/admin" element={
              <ProtectedRoute>
                <AdminLayout />
              </ProtectedRoute>
            }>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="properties" element={<Properties />} />
              <Route path="testimonials" element={<Testimonials />} />
              <Route path="users" element={<Users />} />
              <Route path="reports" element={<Reports />} />
              <Route path="settings" element={<Settings />} />
              <Route path="blog" element={<BlogList />} />
              <Route path="blog/new" element={<BlogEdit />} />
              <Route path="blog/edit/:id" element={<BlogEdit />} />
              <Route path="portfolio" element={<PortfolioList />} />
              <Route path="portfolio/new" element={<PortfolioEdit />} />
              <Route path="portfolio/edit/:id" element={<PortfolioEdit />} />
              <Route path="products" element={<ProductsList />} />
              <Route path="products/new" element={<ProductEdit />} />
              <Route path="products/edit/:id" element={<ProductEdit />} />
              <Route path="construction-projects" element={<ConstructionProjectsList />} />
              <Route path="construction-projects/new" element={<ConstructionProjectEdit />} />
              <Route path="construction-projects/edit/:id" element={<ConstructionProjectEdit />} />
              <Route path="jobs" element={<JobsList />} />
              <Route path="jobs/new" element={<JobEdit />} />
              <Route path="jobs/edit/:id" element={<JobEdit />} />
              <Route path="contacts" element={<ContactSubmissions />} />
              <Route path="newsletter" element={<Newsletter />} />
            </Route>
            
            {/* Catch-all 404 route */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
