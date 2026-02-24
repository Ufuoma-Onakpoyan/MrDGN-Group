import { useState } from "react";
import { NavLink } from "react-router-dom";
import { Menu, X, Info, Building, Briefcase, MessageSquare, Phone, User, LogOut, UserPlus, FileText, ShoppingBag, TrendingUp } from "lucide-react";
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, signOut, isAdmin } = useAuth();

  const navItems = [
    { to: "/properties", label: "Properties", icon: Building },
    { to: "/buying", label: "Buying", icon: ShoppingBag },
    { to: "/selling", label: "Selling", icon: TrendingUp },
    { to: "/services", label: "Services", icon: Briefcase },
    { to: "/blog", label: "Blog & Lifestyle", icon: FileText },
    { to: "/about", label: "About", icon: Info },
    { to: "/careers", label: "Careers", icon: UserPlus },
    { to: "/testimonials", label: "Testimonials", icon: MessageSquare },
    { to: "/contact", label: "Contact", icon: Phone },
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 navbar-glass">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <NavLink to="/" className="flex items-center space-x-3">
            <img 
              src="/assets/logo-mansaluxe.png" 
              alt="Mansa Luxe Realty Limited"
              className="h-11 md:h-12 w-auto object-contain drop-shadow-md"
              style={{ minHeight: '44px', maxHeight: '48px' }}
            />
          </NavLink>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 xl:space-x-4">
            {navItems.map((item) => (
              item.to === "/contact" ? (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `flex items-center space-x-1 px-4 xl:px-5 py-2 rounded-lg transition-all duration-300 text-sm xl:text-base font-semibold ${
                      isActive
                        ? "bg-primary text-primary-foreground"
                        : "bg-primary text-primary-foreground hover:bg-primary/90 hover:scale-105 shadow-md"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs xl:text-sm">{item.label}</span>
                </NavLink>
              ) : (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) =>
                    `nav-link flex items-center space-x-1 px-2 xl:px-3 py-2 rounded-lg transition-all duration-300 text-sm xl:text-base ${
                      isActive
                        ? "bg-primary/20 text-primary font-semibold"
                        : "text-foreground/80 hover:text-primary hover:bg-primary/10"
                    }`
                  }
                >
                  <item.icon className="w-4 h-4" />
                  <span className="text-xs xl:text-sm">{item.label}</span>
                </NavLink>
              )
            ))}
            
            {/* Auth Section - Only show for admins */}
            {user && isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="flex items-center space-x-2">
                    <User className="w-4 h-4" />
                    <span className="text-xs xl:text-sm">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <NavLink to="/admin">Admin Dashboard</NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut}>
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2 text-primary"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-t border-primary/20 shadow-md">
            <div className="container mx-auto px-4 py-4">
              {navItems.map((item) => (
                item.to === "/contact" ? (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 font-semibold ${
                        isActive
                          ? "bg-primary text-primary-foreground"
                          : "bg-primary text-primary-foreground"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                ) : (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={({ isActive }) =>
                      `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-300 ${
                        isActive
                          ? "bg-primary/20 text-primary font-semibold"
                          : "text-primary/80 hover:text-primary hover:bg-primary/10"
                      }`
                    }
                    onClick={() => setIsOpen(false)}
                  >
                    <item.icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </NavLink>
                )
              ))}
              
              {/* Mobile Auth Section - Only show for admins */}
              {user && isAdmin && (
                <div className="border-t border-primary/20 mt-4 pt-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-3 px-4 py-2 text-primary/80">
                      <User className="w-5 h-5" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                    <NavLink
                      to="/admin"
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-primary/80 hover:text-primary hover:bg-primary/10 transition-all duration-300"
                      onClick={() => setIsOpen(false)}
                    >
                      <Building className="w-5 h-5" />
                      <span>Admin Dashboard</span>
                    </NavLink>
                    <button
                      onClick={() => {
                        signOut();
                        setIsOpen(false);
                      }}
                      className="flex items-center space-x-3 px-4 py-3 rounded-lg text-primary/80 hover:text-primary hover:bg-primary/10 transition-all duration-300 w-full text-left"
                    >
                      <LogOut className="w-5 h-5" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;