import React from 'react';
import { cn } from '@/lib/utils';
import Sidebar from './Sidebar';
import TopHeader from './TopHeader';

interface MainAppLayoutProps {
  children: React.ReactNode;
  className?: string;
}

const MainAppLayout: React.FC<MainAppLayoutProps> = ({ children, className }) => {
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(true);

  const toggleSidebar = React.useCallback(() => {
    setSidebarOpen(prev => !prev);
  }, []);

  return (
    <div className={cn("min-h-screen bg-background", className)}>
      <Sidebar isOpen={sidebarOpen} />
      <div
        className={cn(
          "transition-all duration-300 ease-in-out",
          sidebarOpen ? "ml-60" : "ml-16"
        )}
      >
        <TopHeader sidebarOpen={sidebarOpen} onToggleSidebar={toggleSidebar} />
        <main className="p-6 mt-[64px] min-w-0 overflow-y-auto">
          {children}
        </main>
      </div>
    </div>
  );
};

export default MainAppLayout;
