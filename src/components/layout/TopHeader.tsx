import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Menu, Plus, UserPlus, ListChecks, Contact2, ChevronDown } from 'lucide-react';

interface TopHeaderProps {
  sidebarOpen: boolean;
  onToggleSidebar: () => void;
  className?: string;
}

const TopHeader: React.FC<TopHeaderProps> = ({ sidebarOpen, onToggleSidebar, className }) => {
  return (
    <header
      className={cn(
        "fixed top-0 right-0 h-[64px] bg-card border-b border-border z-10 flex items-center justify-between px-6 transition-all duration-300 ease-in-out",
        sidebarOpen ? "left-60" : "left-16",
        className
      )}
    >
      <div className="flex items-center">
        <Button variant="ghost" size="icon" onClick={onToggleSidebar} className="mr-4 text-muted-foreground hover:text-foreground">
          <Menu className="h-5 w-5" />
        </Button>
        {/* Search bar can be added here later if needed */}
      </div>

      <div className="flex items-center space-x-4">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="default" className="bg-primary hover:bg-primary/90 text-primary-foreground">
              <Plus className="mr-2 h-4 w-4" />
              Create
              <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuItem>
              <UserPlus className="mr-2 h-4 w-4" />
              <span>New Lead</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <ListChecks className="mr-2 h-4 w-4" />
              <span>New Task</span>
            </DropdownMenuItem>
            <DropdownMenuItem>
              <Contact2 className="mr-2 h-4 w-4" />
              <span>New Contact</span>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>
              <span>Other Action...</span>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
        {/* User avatar/profile dropdown can be added here */}
      </div>
    </header>
  );
};

export default TopHeader;
