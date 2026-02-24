import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  LayoutDashboard,
  Building2,
  MessageSquareText,
  Package,
  FileText,
  Briefcase,
  Users,
  BarChart2,
  Settings,
  ChevronDown,
  ChevronRight,
  PanelLeftClose,
  ExternalLink,
  Mail,
  Newspaper,
} from 'lucide-react';
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from '@/components/ui/tooltip';

const SITE_LINKS = {
  mansaluxe: 'http://localhost:5175',
  group: 'http://localhost:5173',
  entertainment: 'http://localhost:5176',
  construction: 'http://localhost:5177',
};

const menuSections = [
  {
    title: 'Dashboard',
    items: [
      { name: 'Overview', href: '/admin/dashboard', icon: LayoutDashboard, desc: 'Stats, recent activity & quick actions' },
    ],
  },
  {
    title: 'MansaLuxe Realty',
    subtitle: 'Properties & testimonials',
    siteLink: SITE_LINKS.mansaluxe,
    items: [
      { name: 'Properties', href: '/admin/properties', icon: Building2, desc: 'Property listings' },
      { name: 'Testimonials', href: '/admin/testimonials', icon: MessageSquareText, desc: 'Client reviews' },
    ],
  },
  {
    title: 'Construction',
    subtitle: 'Products, projects & testimonials',
    siteLink: SITE_LINKS.construction,
    items: [
      { name: 'Products', href: '/admin/products', icon: Package, desc: 'Construction products' },
      { name: 'Projects', href: '/admin/construction-projects', icon: Building2, desc: 'Featured projects' },
      { name: 'Testimonials', href: '/admin/testimonials?source=construction', icon: MessageSquareText, desc: 'Construction testimonials' },
    ],
  },
  {
    title: 'Blog & Portfolio',
    subtitle: 'Articles & projects',
    siteLinks: [SITE_LINKS.group, SITE_LINKS.entertainment],
    items: [
      { name: 'Blog', href: '/admin/blog', icon: FileText, desc: 'Articles for all sites' },
      { name: 'Portfolio', href: '/admin/portfolio', icon: Briefcase, desc: 'Project showcase' },
    ],
  },
  {
    title: 'Careers',
    subtitle: 'Job postings',
    items: [
      { name: 'Jobs', href: '/admin/jobs', icon: Briefcase, desc: 'Careers for all sites' },
    ],
  },
  {
    title: 'Inquiries',
    subtitle: 'Contact forms & newsletter',
    items: [
      { name: 'Submissions', href: '/admin/contacts', icon: Mail, desc: 'Contact form leads' },
      { name: 'Newsletter', href: '/admin/newsletter', icon: Newspaper, desc: 'Newsletter subscribers' },
    ],
  },
  {
    title: 'System',
    items: [
      { name: 'Users', href: '/admin/users', icon: Users, desc: 'Admin accounts' },
      { name: 'Reports', href: '/admin/reports', icon: BarChart2, desc: 'Analytics' },
      { name: 'Settings', href: '/admin/settings', icon: Settings, desc: 'Configuration' },
    ],
  },
];

interface AdminSidebarProps {
  collapsed?: boolean;
  onToggleCollapse?: () => void;
  onCloseMobile?: () => void;
}

export function AdminSidebar({ collapsed = false, onToggleCollapse, onCloseMobile }: AdminSidebarProps) {
  const location = useLocation();
  const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({
    Dashboard: true,
    'MansaLuxe Realty': true,
    Construction: true,
    'Blog & Portfolio': true,
  });

  const toggleSection = (title: string) => {
    setExpandedSections((prev) => ({ ...prev, [title]: !prev[title] }));
  };

  return (
    <TooltipProvider delayDuration={0}>
      <aside
        className={`h-screen flex flex-col bg-[hsl(var(--sidebar-background))] border-r-2 border-[hsl(var(--border))] shrink-0 transition-[width] duration-200 ease-in-out w-64 ${
          collapsed ? 'lg:w-[4.5rem]' : ''
        }`}
      >
        {/* Logo & Brand */}
        <div className={`border-b border-[hsl(var(--border))] shrink-0 ${collapsed ? 'p-2' : 'p-4'}`}>
          <Link
            to="/admin/dashboard"
            onClick={onCloseMobile}
            className={`flex items-center ${collapsed ? 'justify-center' : 'gap-3'}`}
          >
            <img src="/logo.png" alt="MrDGN Group" className="h-10 w-10 object-contain shrink-0" />
            {!collapsed && (
              <div className="flex flex-col min-w-0">
                <span className="font-bold text-white text-sm leading-tight">MrDGN Group</span>
                <span className="text-xs text-[hsl(var(--muted-foreground))]">Admin Panel</span>
              </div>
            )}
          </Link>
        </div>

        {/* Collapse toggle - desktop only */}
        {onToggleCollapse && (
          <div className={`hidden lg:block px-2 py-2 border-b border-[hsl(var(--border))]`}>
            <button
              type="button"
              onClick={onToggleCollapse}
              className={`flex items-center gap-2 px-2 py-1.5 rounded-md text-sm text-[hsl(var(--muted-foreground))] hover:text-white hover:bg-[hsl(var(--sidebar-accent))] transition-colors ${collapsed ? 'w-full justify-center' : 'w-full'}`}
              aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            >
              {collapsed ? (
                <ChevronRight className="h-5 w-5" />
              ) : (
                <>
                  <PanelLeftClose className="h-4 w-4" />
                  <span className="text-xs">Collapse</span>
                </>
              )}
            </button>
          </div>
        )}

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto overflow-x-hidden p-3 space-y-4">
        {menuSections.map((section) => {
          const isExpanded = collapsed ? false : (expandedSections[section.title] ?? true);
          return (
            <div key={section.title} className="space-y-1">
              {!collapsed && (
                <button
                  type="button"
                  onClick={() => toggleSection(section.title)}
                  className="w-full flex items-center justify-between px-3 py-2 text-left text-xs font-semibold uppercase tracking-wider text-[hsl(var(--muted-foreground))] hover:text-white transition-colors"
                >
                  {section.title}
                  {isExpanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                </button>
              )}

              {(collapsed || isExpanded) && (
                <>
                  {!collapsed && (
                    <>
                      {section.subtitle && (
                        <p className="px-3 py-1 text-[10px] text-[hsl(var(--muted-foreground))] leading-relaxed">
                          {section.subtitle}
                        </p>
                      )}
                      {section.siteLink && (
                        <a
                          href={section.siteLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="flex items-center gap-2 px-3 py-1.5 text-[10px] text-[hsl(var(--primary))] hover:underline"
                        >
                          <ExternalLink className="h-3 w-3" />
                          View site
                        </a>
                      )}
                      {section.siteLinks && (
                        <div className="space-y-0.5 px-3">
                          <a
                            href={section.siteLinks[0]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 py-1 text-[10px] text-[hsl(var(--primary))] hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" /> Group site
                          </a>
                          <a
                            href={section.siteLinks[1]}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 py-1 text-[10px] text-[hsl(var(--primary))] hover:underline"
                          >
                            <ExternalLink className="h-3 w-3" /> Entertainment site
                          </a>
                        </div>
                      )}
                    </>
                  )}
                  <div className={`space-y-0.5 ${!collapsed ? 'mt-1' : ''}`}>
                    {section.items.map((item) => {
                      const isActive = location.pathname === item.href || location.pathname.startsWith(item.href + '/');
                      const Icon = item.icon;
                      const linkContent = (
                        <Link
                          to={item.href}
                          onClick={onCloseMobile}
                          className={`flex items-center rounded-md text-sm font-medium transition-colors ${
                            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
                          } ${
                            isActive
                              ? 'bg-[hsl(var(--primary))] text-white'
                              : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]'
                          }`}
                        >
                          <Icon className="h-4 w-4 shrink-0" />
                          {!collapsed && (
                            <div className="flex flex-col min-w-0">
                              <span>{item.name}</span>
                              <span className={`text-[10px] ${isActive ? 'text-white/80' : 'text-[hsl(var(--muted-foreground))]'}`}>
                                {item.desc}
                              </span>
                            </div>
                          )}
                        </Link>
                      );
                      return (
                        <div key={item.name}>
                          {collapsed ? (
                            <Tooltip>
                              <TooltipTrigger asChild>
                                <Link
                                  to={item.href}
                                  onClick={onCloseMobile}
                                  className={`flex justify-center p-2.5 rounded-md text-sm font-medium transition-colors ${
                                    isActive
                                      ? 'bg-[hsl(var(--primary))] text-white'
                                      : 'text-[hsl(var(--sidebar-foreground))] hover:bg-[hsl(var(--sidebar-accent))]'
                                  }`}
                                >
                                  <Icon className="h-4 w-4 shrink-0" />
                                </Link>
                              </TooltipTrigger>
                              <TooltipContent side="right" sideOffset={8} className="border border-[hsl(var(--border))]">
                                {item.name}
                              </TooltipContent>
                            </Tooltip>
                          ) : (
                            linkContent
                          )}
                        </div>
                      );
                    })}
                  </div>
                </>
              )}
            </div>
          );
        })}
      </nav>
      </aside>
    </TooltipProvider>
  );
}
