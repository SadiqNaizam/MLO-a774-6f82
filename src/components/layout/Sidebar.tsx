import React from 'react';
import { cn } from '@/lib/utils';
import {
  LayoutGrid,
  Users2,
  UserRound,
  FileText,
  FileCheck2,
  ShoppingCart,
  Mail,
  Archive,
  CalendarDays,
  HelpCircle,
  Settings as SettingsIcon, // Renamed to avoid conflict with Settings component if any
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";

interface NavItemProps {
  item: NavigationItemType;
  isActive: boolean;
  onClick: () => void;
  isSidebarOpen: boolean;
}

interface NavigationItemType {
  label: string;
  href: string;
  icon: React.ElementType;
  subItems?: NavigationItemType[];
}

const NavItem: React.FC<NavItemProps> = ({ item, isActive, onClick, isSidebarOpen }) => {
  const [isSubMenuOpen, setIsSubMenuOpen] = React.useState(false);

  const handleItemClick = () => {
    if (item.subItems) {
      setIsSubMenuOpen(!isSubMenuOpen);
    }
    onClick();
  };

  const itemContent = (
    <span
      className={cn(
        "flex items-center w-full py-2.5 rounded-md transition-colors duration-150 ease-in-out",
        isSidebarOpen ? "px-3" : "px-2.5 justify-center",
        isActive
          ? "bg-primary text-primary-foreground"
          : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
        !isSidebarOpen && isActive && "bg-primary text-primary-foreground"
      )}
    >
      <item.icon className={cn("h-5 w-5 shrink-0", isSidebarOpen && "mr-3")} />
      {isSidebarOpen && <span className="flex-grow text-sm font-medium truncate">{item.label}</span>}
      {isSidebarOpen && item.subItems && (
        isSubMenuOpen ? <ChevronUp className="h-4 w-4 shrink-0 ml-auto" /> : <ChevronDown className="h-4 w-4 shrink-0 ml-auto" />
      )}
    </span>
  );

  if (!isSidebarOpen) {
    return (
      <TooltipProvider delayDuration={100}>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="ghost"
              className={cn(
                "w-full justify-center h-auto py-2.5 px-0 mb-1",
                isActive ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
              )}
              onClick={handleItemClick}
            >
              <item.icon className="h-5 w-5" />
            </Button>
          </TooltipTrigger>
          <TooltipContent side="right">
            <p>{item.label}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    );
  }

  return (
    <Collapsible open={isSubMenuOpen} onOpenChange={item.subItems ? setIsSubMenuOpen : undefined} asChild>
      <>
        <CollapsibleTrigger asChild={!!item.subItems} className='w-full'>
          <Button
            variant="ghost"
            className={cn(
              "w-full justify-start h-auto mb-1",
               isActive && !item.subItems ? "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground" 
               : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground",
               isActive && item.subItems && "bg-sidebar-accent text-sidebar-accent-foreground"
            )}
            onClick={handleItemClick}
          >
            {itemContent}
          </Button>
        </CollapsibleTrigger>
        {isSidebarOpen && item.subItems && (
          <CollapsibleContent className="pl-7 py-1 space-y-1">
            {item.subItems.map((subItem) => (
              <NavItem
                key={subItem.label}
                item={subItem}
                isActive={false} // Determine active state for sub-items based on path or other logic
                onClick={() => { /* Handle sub-item click */ }}
                isSidebarOpen={isSidebarOpen}
              />
            ))}
          </CollapsibleContent>
        )}
      </>
    </Collapsible>
  );
};

const mainNavigationItems: NavigationItemType[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Leads", href: "/leads", icon: Users2 },
  { label: "Customers", href: "/customers", icon: UserRound },
  { label: "Proposals", href: "/proposals", icon: FileText },
  { label: "Invoices", href: "/invoices", icon: FileCheck2 },
  { label: "Items", href: "/items", icon: ShoppingCart },
  { label: "Mail", href: "/mail", icon: Mail },
  { label: "Shoebox", href: "/shoebox", icon: Archive },
  { label: "Calendar", href: "/calendar", icon: CalendarDays },
];

const bottomNavigationItems: NavigationItemType[] = [
  { label: "Help", href: "/help", icon: HelpCircle },
  { label: "Settings", href: "/settings", icon: SettingsIcon },
  { label: "Help", href: "/support", icon: HelpCircle }, // Second Help as in image
];

interface SidebarProps {
  isOpen: boolean;
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ isOpen, className }) => {
  const [activeItem, setActiveItem] = React.useState<string>("Dashboard");

  const handleNavItemClick = (label: string) => {
    setActiveItem(label);
    // Add navigation logic here, e.g., using react-router-dom
  };

  return (
    <aside
      className={cn(
        "fixed top-0 left-0 h-screen z-20 flex flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border transition-all duration-300 ease-in-out",
        isOpen ? "w-60" : "w-16",
        className
      )}
    >
      <div className={cn("flex items-center shrink-0", isOpen ? "h-[64px] px-4" : "h-[64px] justify-center")}>
        <div className={cn("flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground font-bold text-lg")}>
          DO
        </div>
        {isOpen && (
          <span className="ml-2 text-xl font-bold text-foreground">Dashboard</span>
        )}
      </div>

      <ScrollArea className="flex-grow mt-2 mb-2">
        <nav className={cn("flex flex-col", isOpen ? "p-2" : "p-2 items-center")}>
          {mainNavigationItems.map((item) => (
            <NavItem
              key={item.label}
              item={item}
              isActive={activeItem === item.label}
              onClick={() => handleNavItemClick(item.label)}
              isSidebarOpen={isOpen}
            />
          ))}
        </nav>
      </ScrollArea>

      <div className={cn("mt-auto border-t border-sidebar-border shrink-0", isOpen ? "p-2" : "p-2 flex flex-col items-center")}>
        {bottomNavigationItems.map((item) => (
           <NavItem
            key={item.label + item.href} // Ensure unique key for repeated labels
            item={item}
            isActive={activeItem === item.label && activeItem !== "Dashboard"} // Avoid conflict if help also called Dashboard
            onClick={() => handleNavItemClick(item.label)}
            isSidebarOpen={isOpen}
          />
        ))}
      </div>
    </aside>
  );
};

export default Sidebar;
