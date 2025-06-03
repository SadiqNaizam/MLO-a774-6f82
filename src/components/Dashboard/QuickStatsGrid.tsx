import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';
import { Info } from 'lucide-react';

interface QuickStat {
  id: string;
  value: string | number;
  label: string;
  hasInfo?: boolean;
  infoText?: string;
}

const quickStatsData: QuickStat[] = [
  { id: 'totalLeads', value: 900, label: 'total leads count' },
  { id: 'avgConversion', value: 12, label: 'days in average to convert lead' },
  { id: 'inactiveLeads', value: 30, label: 'inactive leads', hasInfo: true, infoText: 'Leads that have not shown activity in the last 30 days.' },
];

interface QuickStatsGridProps {
  className?: string;
}

const QuickStatsGrid: React.FC<QuickStatsGridProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Other data</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
        {quickStatsData.map((stat) => (
          <Card key={stat.id} className="bg-card text-card-foreground shadow-sm flex flex-col justify-center">
            <CardContent className="p-4 text-left">
              <p className="text-3xl font-bold text-foreground mb-1 tabular-nums">{stat.value}</p>
              <div className="flex items-center text-sm text-muted-foreground leading-tight">
                <span>{stat.label}</span>
                {stat.hasInfo && (
                  <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <Info className="ml-1.5 h-3.5 w-3.5 cursor-help text-muted-foreground hover:text-foreground shrink-0" />
                      </TooltipTrigger>
                      <TooltipContent side="top" className="text-xs max-w-xs">
                        <p>{stat.infoText || 'More information'}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default QuickStatsGrid;
