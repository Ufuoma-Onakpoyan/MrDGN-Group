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

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `relative py-2 text-sm font-medium transition-colors duration-200 ${
      isActive ? "text-primary" : "text-muted-foreground hover:text-foreground"
    }`;

  const linkClassDesktop = ({ isActive }: { isActive: boolean }) =>
    `${linkClass({ isActive })} nav-link px-3 xl:px-4`;

  return (
    <header className="fixed top-0 left-0 right-0 z-50 navbar-glass">
      <div className="container mx-auto">
        <div className="flex justify-between items-center min-h-[4.5rem]">
          {/* Logo + brand */}
          <NavLink to="/" className="flex items-center shrink-0" onClick={() => setIsOpen(false)} aria-label="Mansa Luxe Realty - Home">
            <img
              src="/assets/logo-mansaluxe.png"
              alt="Mansa Luxe Realty Limited"
              width="140"
              height="44"
              loading="eager"
              fetchPriority="high"
              className="h-10 md:h-11 w-auto object-contain"
              style={{ minHeight: '40px', maxHeight: '44px' }}
            />
          </NavLink>

          {/* Desktop: center nav */}
          <nav className="hidden lg:flex items-center justify-center flex-1 min-w-0" aria-label="Main navigation">
            <div className="flex flex-wrap items-center justify-center gap-x-1 xl:gap-x-2 gap-y-1">
              {navItems
                .filter((item) => item.to !== "/contact")
                .map((item) => (
                  <NavLink
                    key={item.to}
                    to={item.to}
                    end={item.to === "/"}
                    className={linkClassDesktop}
                  >
                    {item.label}
                  </NavLink>
                ))}
            </div>
          </nav>

          {/* Desktop: right – CTA + admin */}
          <div className="hidden lg:flex items-center gap-4 shrink-0">
            {user && isAdmin && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="text-muted-foreground hover:text-foreground gap-2">
                    <User className="w-4 h-4" />
                    <span className="text-sm max-w-[120px] truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="min-w-[180px]">
                  <DropdownMenuItem asChild>
                    <NavLink to="/admin" className="cursor-pointer">Admin Dashboard</NavLink>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={signOut} className="cursor-pointer">
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <NavLink to="/contact">
              <Button
                size="sm"
                className="bg-primary text-primary-foreground hover:bg-primary/90 font-semibold rounded-lg px-5 h-10 shadow-md hover:shadow-lg transition-all duration-200"
              >
                Contact
              </Button>
            </NavLink>
          </div>

          {/* Mobile: menu button */}
          <div className="flex items-center gap-2 lg:hidden">
            <NavLink to="/contact" className="sm:hidden">
              <Button size="sm" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-lg h-9 px-3">
                Contact
              </Button>
            </NavLink>
            <button
              type="button"
              className="p-2.5 min-w-[44px] min-h-[44px] rounded-lg text-foreground hover:bg-white/10 transition-colors"
              onClick={() => setIsOpen(!isOpen)}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Close menu" : "Open menu"}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div
          className="lg:hidden absolute top-full left-0 right-0 bg-background/98 backdrop-blur-xl border-t border-border shadow-xl"
          role="dialog"
          aria-label="Mobile menu"
        >
          <div className="container mx-auto px-4 py-4 max-h-[calc(100vh-5rem)] overflow-y-auto lg:px-6">
            <ul className="space-y-0.5">
              {navItems.map((item) => (
                <li key={item.to}>
                  {item.to === "/contact" ? (
                    <NavLink
                      to={item.to}
                      className="flex items-center gap-3 px-4 py-3.5 rounded-xl bg-primary text-primary-foreground font-semibold"
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 shrink-0" />
                      {item.label}
                    </NavLink>
                  ) : (
                    <NavLink
                      to={item.to}
                      end={item.to === "/"}
                      className={({ isActive }) =>
                        `flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${
                          isActive
                            ? "bg-primary/15 text-primary font-medium"
                            : "text-foreground/90 hover:bg-white/5 hover:text-foreground"
                        }`
                      }
                      onClick={() => setIsOpen(false)}
                    >
                      <item.icon className="w-5 h-5 shrink-0 text-muted-foreground" />
                      {item.label}
                    </NavLink>
                  )}
                </li>
              ))}
            </ul>
            {user && isAdmin && (
              <div className="mt-6 pt-4 border-t border-border space-y-1">
                <div className="flex items-center gap-3 px-4 py-2 text-muted-foreground text-sm">
                  <User className="w-5 h-5 shrink-0" />
                  <span className="truncate">{user.email}</span>
                </div>
                <NavLink
                  to="/admin"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-foreground/90 hover:bg-white/5"
                  onClick={() => setIsOpen(false)}
                >
                  <Building className="w-5 h-5 shrink-0" />
                  Admin Dashboard
                </NavLink>
                <button
                  type="button"
                  className="flex items-center gap-3 px-4 py-3.5 rounded-xl text-foreground/90 hover:bg-white/5 w-full text-left"
                  onClick={() => {
                    signOut();
                    setIsOpen(false);
                  }}
                >
                  <LogOut className="w-5 h-5 shrink-0" />
                  Sign Out
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Navbar;
