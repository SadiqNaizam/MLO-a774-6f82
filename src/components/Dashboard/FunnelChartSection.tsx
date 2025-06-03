import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface FunnelStage {
  id: string;
  name: string;
  count: number;
  value: number;
  time: string;
  color: string; // Tailwind color class e.g., bg-red-500
  tooltipText?: string;
}

const funnelDataFromImage: FunnelStage[] = [
  { id: 'discovery', name: 'Discovery', count: 200, value: 200, time: '2 days', color: 'bg-red-500' },
  { id: 'qualified', name: 'Qualified', count: 100, value: 100, time: '2 days', color: 'bg-yellow-400' },
  { id: 'inConversation', name: 'In conversation', count: 50, value: 100, time: '2 days', color: 'bg-slate-700', tooltipText: 'average time on this stage' },
  { id: 'negotiations', name: 'Negotiations', count: 20, value: 50, time: '8 days', color: 'bg-green-400' },
  { id: 'closedWon', name: 'Closed won', count: 20, value: 50, time: '10 days', color: 'bg-purple-500' },
];

interface FunnelChartSectionProps {
  className?: string;
}

const FunnelChartSection: React.FC<FunnelChartSectionProps> = ({ className }) => {
  const totalCountForBar = funnelDataFromImage.reduce((sum, stage) => sum + stage.count, 0);

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Funnel count</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4">
          <span className="text-4xl font-bold text-foreground">600</span>
          <span className="ml-2 text-sm text-muted-foreground">active leads</span>
        </div>
        
        <div className="w-full h-3 flex rounded-sm overflow-hidden mb-6 bg-muted">
          {funnelDataFromImage.map((stage) => (
            <TooltipProvider key={stage.id}>
              <Tooltip delayDuration={100}>
                <TooltipTrigger asChild>
                  <div
                    className={cn(stage.color, "h-full transition-all duration-300 ease-in-out hover:opacity-80")}
                    style={{ width: `${(stage.count / totalCountForBar) * 100}%` }}
                  />
                </TooltipTrigger>
                <TooltipContent>
                  <p>{stage.name}: {stage.count}</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          ))}
        </div>

        <div className="space-y-3">
          {funnelDataFromImage.map((stage) => (
            <div key={stage.id} className="grid grid-cols-[auto_1fr_auto_auto_auto] items-center gap-x-3 text-sm">
              <div className={cn("w-2.5 h-2.5 rounded-sm", stage.color)}></div>
              <div className="text-foreground truncate">{stage.name}</div>
              <div className="text-muted-foreground text-right tabular-nums">{stage.count}</div>
              <div className="text-muted-foreground text-right tabular-nums">${stage.value.toLocaleString()}</div>
              {stage.tooltipText ? (
                 <TooltipProvider>
                    <Tooltip delayDuration={100}>
                      <TooltipTrigger asChild>
                        <div className="text-muted-foreground text-right cursor-default tabular-nums">{stage.time}</div>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>{stage.tooltipText}</p>
                      </TooltipContent>
                    </Tooltip>
                  </TooltipProvider>
              ) : (
                <div className="text-muted-foreground text-right tabular-nums">{stage.time}</div>
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default FunnelChartSection;
