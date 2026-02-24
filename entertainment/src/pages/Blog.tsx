import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import Blog from "@/components/Blog";
import { LAYOUT } from "@/lib/layout";

const BlogPage = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Header />
      <main className={LAYOUT.pageTop}>
        <Blog />
      </main>
      <Footer />
    </div>
  );
};

export default BlogPage;