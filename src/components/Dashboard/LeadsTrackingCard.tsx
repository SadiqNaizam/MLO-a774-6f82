import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CalendarDays } from 'lucide-react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer } from 'recharts';

interface LeadsTrackingDataPoint {
  month: string;
  closedWon: number;
  closedLost: number;
}

const leadsTrackingData: LeadsTrackingDataPoint[] = [
  { month: 'March', closedWon: 85, closedLost: 65 },
  { month: 'April', closedWon: 30, closedLost: 40 },
  { month: 'May', closedWon: 65, closedLost: 90 },
  { month: 'June', closedWon: 75, closedLost: 10 },
  { month: 'July', closedWon: 50, closedLost: 45 },
  { month: 'August', closedWon: 100, closedLost: 60 },
];

interface LeadsTrackingCardProps {
  className?: string;
}

const LeadsTrackingCard: React.FC<LeadsTrackingCardProps> = ({ className }) => {
  return (
    <Card className={cn("w-full", className)}>
      <CardHeader>
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
          <div>
            <CardTitle className="text-lg font-semibold">Leads tracking</CardTitle>
            <div className="mt-1 flex items-baseline space-x-1 sm:space-x-3">
              <span className="text-2xl font-bold text-foreground">680</span>
              <span className="text-xs text-muted-foreground">total closed</span>
              <span className="text-2xl font-bold text-foreground">70</span>
              <span className="text-xs text-muted-foreground">total lost</span>
            </div>
          </div>
          <Button variant="outline" size="sm" className="mt-2 sm:mt-0 text-xs text-muted-foreground hover:text-foreground whitespace-nowrap">
            <CalendarDays className="mr-1.5 h-3.5 w-3.5" />
            Last 6 months
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="w-full h-[280px] sm:h-[300px] mb-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={leadsTrackingData} margin={{ top: 5, right: 5, left: -25, bottom: 5 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" vertical={false} />
              <XAxis 
                dataKey="month" 
                tickLine={false} 
                axisLine={{stroke: 'hsl(var(--border))'}}
                dy={10}
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }} 
              />
              <YAxis 
                ticks={[0, 20, 40, 60, 80, 100]}
                tickLine={false} 
                axisLine={false} 
                tick={{ fontSize: 12, fill: 'hsl(var(--muted-foreground))' }}
                dx={0}
              />
              <RechartsTooltip
                contentStyle={{ backgroundColor: 'hsl(var(--popover))', color: 'hsl(var(--popover-foreground))', borderRadius: 'var(--radius)', border: '1px solid hsl(var(--border))', boxShadow: 'var(--shadow-md)' }}
                labelStyle={{ fontWeight: '600', color: 'hsl(var(--popover-foreground))' }}
                itemStyle={{ color: 'hsl(var(--popover-foreground))' }}
                formatter={(value: number, name: string) => {
                  const displayName = name === 'closedWon' ? 'Closed Won' : 'Closed Lost';
                  return [value, displayName];
                }}
              />
              <Line
                type="monotone"
                dataKey="closedWon"
                stroke="#2DD4BF" // Teal-like
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#2DD4BF', strokeWidth:0 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--background))', strokeWidth: 2, fill: '#2DD4BF' }}
              />
              <Line
                type="monotone"
                dataKey="closedLost"
                stroke="#F43F5E" // Red-like
                strokeWidth={2.5}
                dot={{ r: 4, fill: '#F43F5E', strokeWidth:0 }}
                activeDot={{ r: 6, stroke: 'hsl(var(--background))', strokeWidth: 2, fill: '#F43F5E' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
        <div className="flex justify-center items-center space-x-6 text-sm">
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-sm mr-2 bg-[#2DD4BF]"></span>
            <span className="text-muted-foreground">Closed won</span>
          </div>
          <div className="flex items-center">
            <span className="w-2.5 h-2.5 rounded-sm mr-2 bg-[#F43F5E]"></span>
            <span className="text-muted-foreground">Closed lost</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default LeadsTrackingCard;
