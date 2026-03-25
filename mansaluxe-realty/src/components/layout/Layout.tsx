import { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { RouteSEO } from "@/components/RouteSEO";

interface LayoutProps {
  children: ReactNode;
}

/** Fixed navbar does not consume layout flow; pt-16 on main creates a visible body-colored gap. Home hero should sit flush under the header (header overlays the video). */
const Layout = ({ children }: LayoutProps) => {
  const { pathname } = useLocation();
  const mainTop = pathname === "/" ? "pt-0" : "pt-16";

  return (
    <div className="min-h-screen flex flex-col">
      <RouteSEO />
      <Navbar />
      <main className={`flex-1 ${mainTop}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;