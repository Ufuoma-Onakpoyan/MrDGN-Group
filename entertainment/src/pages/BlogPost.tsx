import { useScrollReveal } from "@/hooks/useScrollReveal";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import BlogPost from "@/components/BlogPost";

const BlogPostPage = () => {
  useScrollReveal();

  return (
    <div className="min-h-screen">
      <Header />
      <div className="pt-20">
        <BlogPost />
      </div>
      <Footer />
    </div>
  );
};

export default BlogPostPage;