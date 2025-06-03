import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as RechartsTooltip } from 'recharts';
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui/tooltip';

interface SourceDisplayData {
  name: string;
  value: number; // Corresponds to $ amount in image
  displayPercentage: number; // Percentage shown in the legend
  color: string; // Hex color for chart and legend
}

const chartDataForSources: SourceDisplayData[] = [
    { name: 'Clutch', value: 3000, displayPercentage: 50, color: '#EF4444' }, // approx red-500
    { name: 'Behance', value: 1000, displayPercentage: 40, color: '#FBBF24' }, // approx amber-400
    { name: 'Instagram', value: 1000, displayPercentage: 10, color: '#2DD4BF' }, // approx teal-400
    { name: 'Dribbble', value: 1000, displayPercentage: 10, color: '#A3E635' }, // approx lime-400
];

type ActiveButton = 'leadsCame' | 'leadsConverted' | 'totalDealsSize';

const buttonConfigs: {label: string, value: ActiveButton}[] = [
  { label: 'Leads came', value: 'leadsCame' },
  { label: 'Leads Converted', value: 'leadsConverted' },
  { label: 'Total deals size', value: 'totalDealsSize' },
];

interface SourceChartCardProps {
  className?: string;
}

const SourceChartCard: React.FC<SourceChartCardProps> = ({ className }) => {
  const [activeButton, setActiveButton] = React.useState<ActiveButton>('leadsConverted');

  const pieChartInputData = chartDataForSources.map(item => ({ name: item.name, value: item.value }));

  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Sources</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-1 mb-6">
          {buttonConfigs.map((config) => (
            <Button
              key={config.value}
              variant={activeButton === config.value ? 'secondary' : 'ghost'}
              size="sm"
              className={cn(
                "text-xs px-3 py-1 h-auto font-medium rounded-md",
                activeButton === config.value ? "bg-primary text-primary-foreground hover:bg-primary/90" : "text-muted-foreground hover:bg-accent hover:text-accent-foreground"
              )}
              onClick={() => setActiveButton(config.value)}
            >
              {config.label}
            </Button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          <div className="w-full h-[180px] md:h-[200px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={pieChartInputData}
                  cx="50%"
                  cy="50%"
                  innerRadius={50}
                  outerRadius={80}
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                >
                  {pieChartInputData.map((_entry, index) => (
                    <Cell key={`cell-${index}`} fill={chartDataForSources[index].color} stroke={chartDataForSources[index].color} />
                  ))}
                </Pie>
                <RechartsTooltip
                  formatter={(value: number, name: string) => [`$${value.toLocaleString()}`, name]}
                  contentStyle={{ backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))', boxShadow: 'var(--shadow-md)' }}
                  itemStyle={{ color: 'hsl(var(--popover-foreground))'}}
                  labelStyle={{ fontWeight: '600', color: 'hsl(var(--popover-foreground))' }}
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-3">
            {chartDataForSources.map((source) => (
              <div key={source.name} className="flex items-center justify-between text-sm">
                <div className="flex items-center">
                  <span className="w-2.5 h-2.5 rounded-sm mr-2.5 shrink-0" style={{ backgroundColor: source.color }}></span>
                  <span className="text-foreground truncate">{source.name}</span>
                </div>
                <div className="flex items-center space-x-3 shrink-0">
                  <span className="text-muted-foreground tabular-nums w-[60px] text-right">${source.value.toLocaleString()}</span>
                  <span className="text-foreground font-medium w-10 text-right tabular-nums">
                    {source.name === 'Dribbble' ? (
                      <TooltipProvider>
                        <Tooltip delayDuration={100}>
                          <TooltipTrigger asChild>
                            <span className="cursor-default">{source.displayPercentage}%</span>
                          </TooltipTrigger>
                          <TooltipContent side="top" className="text-xs">
                            <p>from leads total</p>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ) : (
                      `${source.displayPercentage}%`
                    )}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default SourceChartCard;
