import React from 'react';
import { cn } from '@/lib/utils';
import { Card, CardContent } from '@/components/ui/card';

interface ReasonLost {
  id: string;
  percentage: number;
  description: string;
}

const reasonsLostData: ReasonLost[] = [
  { id: 'unclearProposal1', percentage: 40, description: 'The proposal is unclear' },
  { id: 'venturePursuit', percentage: 20, description: 'However venture pursuit' },
  { id: 'other', percentage: 10, description: 'Other' },
  { id: 'unclearProposal2', percentage: 30, description: 'The proposal is unclear' }, 
];

interface ReasonsLostSectionProps {
  className?: string;
}

const ReasonsLostSection: React.FC<ReasonsLostSectionProps> = ({ className }) => {
  return (
    <div className={cn(className)}>
      <h3 className="text-lg font-semibold text-foreground mb-4">Reasons of leads lost</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {reasonsLostData.map((reason) => (
          <Card key={reason.id} className="bg-card text-card-foreground shadow-sm flex flex-col justify-center">
            <CardContent className="p-4 text-left">
              <p className="text-3xl font-bold text-foreground mb-1 tabular-nums">{reason.percentage}%</p>
              <p className="text-sm text-muted-foreground leading-tight">{reason.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ReasonsLostSection;
