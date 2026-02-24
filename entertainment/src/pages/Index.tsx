import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Events from "@/components/Events";
import Blog from "@/components/Blog";
import Footer from "@/components/Footer";

const Index = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen page-enter">
      <Header />
      <Hero />
      <About />
      <Events />
      <Blog />
      <Footer />
    </div>
  );
};

export default Index;
