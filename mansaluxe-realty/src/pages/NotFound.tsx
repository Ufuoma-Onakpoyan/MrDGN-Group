import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="text-center">
        <div className="mb-8">
          <h1 className="text-8xl font-serif font-bold text-primary mb-4">404</h1>
          <h2 className="text-3xl font-serif font-semibold mb-4">Page Not Found</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            The luxury property you're looking for seems to have moved to a more exclusive location.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/" className="btn-luxury inline-flex items-center space-x-2">
            <Home className="w-5 h-5" />
            <span>Return Home</span>
          </Link>
          <button 
            onClick={() => window.history.back()} 
            className="btn-outline-luxury inline-flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Go Back</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
