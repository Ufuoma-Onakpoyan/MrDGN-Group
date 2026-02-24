import React from 'react';

export function AdminFooter() {
  return (
    <footer className="bg-[hsl(var(--card))] border-t-2 border-[hsl(var(--border))] mt-auto shrink-0">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex justify-between items-center">
          <div className="text-sm text-muted-foreground">
            © 2024 MrDGN Group Admin Panel. All rights reserved.
          </div>
          
          <div className="flex items-center space-x-4">
            <a 
              href="http://localhost:5173" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              View Group Site →
            </a>
            <span className="text-xs text-muted-foreground">
              Admin Panel v1.0
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}