import React, { useState, useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { AdminSidebar } from './AdminSidebar';
import { AdminErrorBoundary } from './AdminErrorBoundary';
import { AdminHeader } from './AdminHeader';
import { AdminFooter } from './AdminFooter';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';

const SIDEBAR_COLLAPSED_KEY = 'admin-sidebar-collapsed';

export function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(() => {
    const stored = localStorage.getItem(SIDEBAR_COLLAPSED_KEY);
    return stored === 'true';
  });

  useEffect(() => {
    localStorage.setItem(SIDEBAR_COLLAPSED_KEY, String(sidebarCollapsed));
  }, [sidebarCollapsed]);

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/60 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* Sidebar - fixed on desktop so it stays visible when scrolling */}
      <div
        className={`fixed inset-y-0 left-0 z-50 transform transition-[transform,width] duration-200 ease-in-out lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <AdminSidebar
          collapsed={sidebarCollapsed}
          onToggleCollapse={() => setSidebarCollapsed((c) => !c)}
          onCloseMobile={() => setSidebarOpen(false)}
        />
      </div>

      {/* Main content - offset by sidebar width on desktop */}
      <div
        className={`flex flex-col min-w-0 min-h-screen transition-[margin-left] duration-200 ease-in-out ${sidebarCollapsed ? 'lg:ml-[4.5rem]' : 'lg:ml-64'}`}
      >
        <div className="sticky top-0 z-30 flex items-center justify-between gap-2 border-b-2 border-[hsl(var(--border))] bg-[hsl(var(--card))] px-4 py-3 shrink-0">
          <div className="flex items-center gap-2">
            <Button variant="ghost" size="icon" className="lg:hidden" onClick={() => setSidebarOpen(true)}>
              <Menu className="h-5 w-5" />
            </Button>
            <h1 className="text-base lg:text-lg font-semibold text-white">MrDGN Group Admin Panel</h1>
          </div>
          <AdminHeader />
        </div>
        <main className="flex-1 px-4 sm:px-6 lg:px-8 py-6 overflow-auto bg-background text-foreground">
          <div className="max-w-7xl mx-auto">
            <AdminErrorBoundary>
              <Outlet />
            </AdminErrorBoundary>
          </div>
        </main>
        <AdminFooter />
      </div>
    </div>
  );
}