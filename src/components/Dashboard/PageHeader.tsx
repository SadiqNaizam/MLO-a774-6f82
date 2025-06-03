import React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { CalendarDays } from 'lucide-react';

interface PageHeaderProps {
  className?: string;
}

const PageHeader: React.FC<PageHeaderProps> = ({ className }) => {
  const [activeTab, setActiveTab] = React.useState<string>('leads');

  return (
    <div className={cn("flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6 pb-4 border-b", className)}>
      <div className="mb-4 sm:mb-0">
        <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
      </div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full sm:w-auto">
          <TabsList className="grid w-full grid-cols-2 sm:w-auto bg-secondary">
            <TabsTrigger value="sales" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Sales</TabsTrigger>
            <TabsTrigger value="leads" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">Leads</TabsTrigger>
          </TabsList>
        </Tabs>
        <Button variant="outline" className="w-full sm:w-auto flex items-center justify-center sm:justify-start text-muted-foreground hover:text-foreground">
          <CalendarDays className="mr-2 h-4 w-4" />
          Last 6 months
        </Button>
      </div>
    </div>
  );
};

export default PageHeader;
