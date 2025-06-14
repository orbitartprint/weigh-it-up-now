import React from 'react';
import { X, User, Weight, Car, Smartphone, Bike, WashingMachine, Star, ArrowLeft, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { WeightItem } from '@/data/weightItems';
import { cn } from '@/lib/utils';

interface ComparisonItemWidgetProps {
  item: WeightItem & { side: 'left' | 'right' };
  onRemove: (id: string) => void;
  onToggleSide?: (id: string) => void;
  useKg: boolean;
}

const ComparisonItemWidget: React.FC<ComparisonItemWidgetProps> = ({
  item,
  onRemove,
  onToggleSide,
  useKg
}) => {
  const getItemIcon = () => {
    switch (item.id) {
      // Animals
      case 'elephant':
        return <span className="text-lg">🐘</span>;
      case 'wolf':
        return <span className="text-lg">🐺</span>;
      case 'penguin':
        return <span className="text-lg">🐧</span>;
      case 'lion':
        return <span className="text-lg">🦁</span>;
      case 'cat':
        return <span className="text-lg">🐱</span>;
      
      // Objects
      case 'washing-machine':
        return <WashingMachine size={20} className="text-primary" />;
      case 'car':
        return <Car size={20} className="text-primary" />;
      case 'smartphone':
        return <Smartphone size={20} className="text-primary" />;
      case 'bowling-ball':
        return <span className="text-lg">🎳</span>;
      case 'bicycle':
        return <Bike size={20} className="text-primary" />;
      
      // Celebrities
      case 'dwayne-johnson':
      case 'ariana-grande':
      case 'lebron-james':
      case 'taylor-swift':
      case 'tom-cruise':
        return <Star size={20} className="text-primary" />;
      
      default:
        return <Weight size={20} className="text-primary" />;
    }
  };

  const displayWeight = useKg ? item.weight : (item.weight * 2.20462);
  const unit = useKg ? 'kg' : 'lbs';

  return (
    <Card className="flex items-center gap-3 p-3 relative">
      <div className="flex items-center justify-center w-8 h-8">
        {getItemIcon()}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="font-medium text-sm truncate">{item.name}</div>
        <div className="text-xs text-muted-foreground">
          {displayWeight.toFixed(1)} {unit}
        </div>
      </div>
      
      <div className="flex gap-1">
        {onToggleSide && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => onToggleSide(item.id)}
            className="h-6 w-6 p-0 text-muted-foreground hover:text-primary"
            title={`Move to ${item.side === 'left' ? 'right' : 'left'} side`}
          >
            {item.side === 'left' ? <ArrowRight size={14} /> : <ArrowLeft size={14} />}
          </Button>
        )}
        
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(item.id)}
          className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
        >
          <X size={14} />
        </Button>
      </div>
    </Card>
  );
};

export default ComparisonItemWidget;