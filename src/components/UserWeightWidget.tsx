
import React from 'react';
import { ArrowLeft, ArrowRight, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface UserWeightWidgetProps {
  weight: string;
  useKg: boolean;
  side: 'left' | 'right';
  onToggleSide: () => void;
}

const UserWeightWidget: React.FC<UserWeightWidgetProps> = ({
  weight,
  useKg,
  side,
  onToggleSide
}) => {
  // Weight is already in the correct unit from the parent component
  const weightValue = parseFloat(weight) || 0;
  const unit = useKg ? 'kg' : 'lbs';

  return (
    <Card className="flex items-center gap-3 p-3 relative bg-blue-50 border-blue-200">
      <div className="flex items-center justify-center w-8 h-8">
        <User size={20} className="text-blue-600" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm text-blue-700">Your Weight</div>
        <div className="text-xs text-blue-600">
          {weightValue.toFixed(1)} {unit}
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="sm"
        onClick={onToggleSide}
        className="h-6 w-6 p-0 text-blue-600 hover:text-blue-800 hover:bg-blue-100"
        title={`Move to ${side === 'left' ? 'right' : 'left'} side`}
      >
        {side === 'left' ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
      </Button>
    </Card>
  );
};

export default UserWeightWidget;
