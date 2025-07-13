import React from 'react';
import { X, User, Weight, Car, Smartphone, Bike, WashingMachine, Star, ArrowLeft, ArrowRight, Cat, Dog, Fish, Bird, TreePine, Mountain, Plane, Bus, Train, Truck, Home, Sofa, Piano, Crown, Trophy, Dumbbell, Apple, Zap, Sparkles } from 'lucide-react';
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
      // Animals - specific icons
      case 'elephant':
        return <span className="text-lg">🐘</span>;
      case 'wolf':
        return <span className="text-lg">🐺</span>;
      case 'penguin':
        return <span className="text-lg">🐧</span>;
      case 'lion':
        return <span className="text-lg">🦁</span>;
      case 'cat':
        return <Cat size={20} className="text-primary" />;
      case 'polar-bear':
        return <span className="text-lg">🐻‍❄️</span>;
      case 'giraffe':
        return <span className="text-lg">🦒</span>;
      case 'gorilla':
        return <span className="text-lg">🦍</span>;
      case 'kangaroo':
        return <span className="text-lg">🦘</span>;
      case 'squirrel':
        return <span className="text-lg">🐿️</span>;
      case 'rabbit':
        return <span className="text-lg">🐰</span>;
      case 'rhinoceros':
        return <span className="text-lg">🦏</span>;
      case 'hippopotamus':
        return <span className="text-lg">🦛</span>;
      case 'orca':
      case 'blue-whale':
        return <span className="text-lg">🐋</span>;
      case 'grizzly-bear':
        return <span className="text-lg">🐻</span>;
      case 'anaconda':
        return <span className="text-lg">🐍</span>;
      case 'ostrich':
        return <span className="text-lg">🦆</span>;
      case 'mammoth':
        return <span className="text-lg">🦣</span>;
      
      // Dinosaurs
      case 'tyrannosaurus-rex':
      case 't-rex':
        return <span className="text-lg">🦖</span>;
      case 'triceratops':
      case 'stegosaurus':
      case 'brachiosaurus':
      case 'ankylosaurus':
      case 'spinosaurus':
      case 'allosaurus':
      case 'diplodocus':
      case 'parasaurolophus':
      case 'iguanodon':
        return <span className="text-lg">🦕</span>;
      case 'velociraptor':
        return <span className="text-lg">🦖</span>;
      case 'saber-toothed-cat':
        return <span className="text-lg">🐅</span>;
      
      // Vehicles
      case 'average-car':
      case 'car':
        return <Car size={20} className="text-primary" />;
      case 'motorcycle':
        return <span className="text-lg">🏍️</span>;
      case 'suv':
        return <Truck size={20} className="text-primary" />;
      case 'city-bus':
        return <Bus size={20} className="text-primary" />;
      case 'airplane-boeing747':
        return <Plane size={20} className="text-primary" />;
      case 'train-wagon':
        return <Train size={20} className="text-primary" />;
      case 'tank':
        return <span className="text-lg">🚗</span>;
      case 'bicycle':
        return <Bike size={20} className="text-primary" />;
      
      // Objects
      case 'washing-machine':
        return <WashingMachine size={20} className="text-primary" />;
      case 'smartphone':
        return <Smartphone size={20} className="text-primary" />;
      case 'bowling-ball':
        return <span className="text-lg">🎳</span>;
      case 'refrigerator':
        return <span className="text-lg">❄️</span>;
      case 'king-size-bed':
        return <span className="text-lg">🛏️</span>;
      case 'grand-piano':
        return <Piano size={20} className="text-primary" />;
      case 'sofa-3-seater':
        return <Sofa size={20} className="text-primary" />;
      case 'bag-of-cement':
        return <span className="text-lg">🏗️</span>;
      case 'gold-bar':
        return <span className="text-lg">🟨</span>;
      case 'brick':
        return <span className="text-lg">🧱</span>;
      
      // Celebrities
      case 'dwayne-johnson':
      case 'lebron-james':
      case 'arnold-schwarzenegger':
      case 'cristiano-ronaldo':
        return <Dumbbell size={20} className="text-primary" />;
      case 'ariana-grande':
      case 'taylor-swift':
      case 'billie-eilish':
      case 'adele':
        return <span className="text-lg">🎤</span>;
      case 'tom-cruise':
      case 'kevin-hart':
        return <Star size={20} className="text-primary" />;
      case 'queen-elizabeth':
        return <Crown size={20} className="text-primary" />;
      
      // Food items
      case 'apple':
        return <Apple size={20} className="text-primary" />;
      
      // Default by category
      default:
        if (item.category === 'animals') {
          return <span className="text-lg">🐾</span>;
        } else if (item.category === 'dinosaurs') {
          return <span className="text-lg">🦕</span>;
        } else if (item.category === 'vehicles') {
          return <Car size={20} className="text-primary" />;
        } else if (item.category === 'celebrities') {
          return <Star size={20} className="text-primary" />;
        } else if (item.category === 'food') {
          return <Apple size={20} className="text-primary" />;
        } else if (item.category === 'custom') {
          return <Sparkles size={20} className="text-primary" />;
        }
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