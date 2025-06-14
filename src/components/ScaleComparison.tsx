import React from 'react';
import { User, Weight, Car, Smartphone, Bike, WashingMachine, Star } from 'lucide-react';
import { WeightItem } from '@/data/weightItems';
import { cn } from '@/lib/utils';

interface ScaleComparisonProps {
  userWeight: number;
  compareItem: WeightItem | null;
  comparison: {
    ratio: number;
    message: string;
    yourWeight: number;
    theirWeight: number;
    leftWeight: number;
    rightWeight: number;
  } | null;
  selectedItems?: (WeightItem & { side: 'left' | 'right' })[];
  userWeightSide?: 'left' | 'right';
}

const ScaleComparison: React.FC<ScaleComparisonProps> = ({
  userWeight,
  compareItem,
  comparison,
  selectedItems,
  userWeightSide = 'left'
}) => {
  // Calculate rotation angle based on weight difference
  const calculateRotationAngle = () => {
    if (!comparison) return 0;
    
    const maxTiltAngle = 15; // Maximum tilt angle in degrees
    const weightRangeFactor = 200; // Reference value for weight scale
    const weightDifference = comparison.leftWeight - comparison.rightWeight;
    
    if (weightDifference === 0) return 0;
    
    const normalizedDifference = weightDifference / weightRangeFactor;
    // Invert the rotation so heavier side goes down
    let rotationAngle = -normalizedDifference * maxTiltAngle;
    
    // CLAMP function simulation
    if (rotationAngle > maxTiltAngle) rotationAngle = maxTiltAngle;
    if (rotationAngle < -maxTiltAngle) rotationAngle = -maxTiltAngle;
    
    return rotationAngle;
  };

  // Get specific icon for an item
  const getItemIcon = (item: WeightItem) => {
    switch (item.id) {
      // Animals
      case 'elephant':
        return <span className="text-xs">🐘</span>;
      case 'wolf':
        return <span className="text-xs">🐺</span>;
      case 'penguin':
        return <span className="text-xs">🐧</span>;
      case 'lion':
        return <span className="text-xs">🦁</span>;
      case 'cat':
        return <span className="text-xs">🐱</span>;
      
      // Objects
      case 'washing-machine':
        return <WashingMachine size={12} className="text-primary" />;
      case 'car':
        return <Car size={12} className="text-primary" />;
      case 'smartphone':
        return <Smartphone size={12} className="text-primary" />;
      case 'bowling-ball':
        return <span className="text-xs">🎳</span>;
      case 'bicycle':
        return <Bike size={12} className="text-primary" />;
      
      // Celebrities
      case 'dwayne-johnson':
      case 'ariana-grande':
      case 'lebron-james':
      case 'taylor-swift':
      case 'tom-cruise':
        return <Star size={12} className="text-primary" />;
      
      default:
        return <Weight size={12} className="text-primary" />;
    }
  };

  // Get icons for left scale pan
  const getLeftSideIcons = () => {
    const leftItems = selectedItems?.filter(item => item.side === 'left') || [];
    const hasUserOnLeft = userWeightSide === 'left';
    
    if (leftItems.length === 0 && !hasUserOnLeft) {
      return <Weight size={12} className="text-muted-foreground" />;
    }
    
    const visibleItems = leftItems.slice(0, hasUserOnLeft ? 4 : 5);
    return (
      <div className="flex flex-wrap justify-center items-center gap-0.5">
        {hasUserOnLeft && (
          <User size={12} className="text-blue-600" />
        )}
        {visibleItems.map((item, index) => (
          <div key={item.id} className="flex-shrink-0">
            {getItemIcon(item)}
          </div>
        ))}
        {leftItems.length > (hasUserOnLeft ? 4 : 5) && (
          <span className="text-xs text-primary">+{leftItems.length - (hasUserOnLeft ? 4 : 5)}</span>
        )}
      </div>
    );
  };

  // Get icons for right scale pan
  const getRightSideIcons = () => {
    const rightItems = selectedItems?.filter(item => item.side === 'right') || [];
    const hasUserOnRight = userWeightSide === 'right';
    
    if (rightItems.length === 0 && !hasUserOnRight) {
      return <Weight size={12} className="text-muted-foreground" />;
    }
    
    const visibleItems = rightItems.slice(0, hasUserOnRight ? 4 : 5);
    return (
      <div className="flex flex-wrap justify-center items-center gap-0.5">
        {hasUserOnRight && (
          <User size={12} className="text-blue-600" />
        )}
        {visibleItems.map((item, index) => (
          <div key={item.id} className="flex-shrink-0">
            {getItemIcon(item)}
          </div>
        ))}
        {rightItems.length > (hasUserOnRight ? 4 : 5) && (
          <span className="text-xs text-primary">+{rightItems.length - (hasUserOnRight ? 4 : 5)}</span>
        )}
      </div>
    );
  };

  const getDisplayName = () => {
    if (selectedItems && selectedItems.length > 0) {
      return selectedItems.length === 1 ? selectedItems[0].name : `${selectedItems.length} Items`;
    }
    return compareItem?.name || "Items";
  };

  const rotationAngle = calculateRotationAngle();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Scale Container */}
      <div className="relative w-80 h-60">
        {/* Scale Base (Triangle) */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-transparent border-b-gray-600"></div>
        </div>
        
        {/* Scale Bar with Animation */}
        <div 
          className="absolute bottom-24 left-1/2 w-64 h-2 bg-gray-600 rounded transform -translate-x-1/2 transition-transform duration-800 ease-in-out"
          style={{ 
            transformOrigin: 'center center',
            transform: `translateX(-50%) rotate(${rotationAngle}deg)`
          }}
        >
          {/* Triangle Pivot Point in the middle of the bar */}
          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2">
            <div className="w-0 h-0 border-l-3 border-r-3 border-t-4 border-transparent border-t-gray-700"></div>
          </div>
          
          {/* Left Scale Pan */}
          <div className="absolute -left-6 -top-4 w-12 h-8 bg-gray-400 rounded-full border-2 border-gray-600 flex items-center justify-center">
            <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center">
              {getLeftSideIcons()}
            </div>
          </div>
          
          {/* Right Scale Pan */}
          <div className="absolute -right-6 -top-4 w-12 h-8 bg-gray-400 rounded-full border-2 border-gray-600 flex items-center justify-center">
            <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center">
              {getRightSideIcons()}
            </div>
          </div>
        </div>
        
        {/* Weight Displays */}
        <div className="absolute bottom-4 left-8 text-center">
          <div className="text-sm font-bold text-blue-600">You</div>
          <div className="text-xs">{comparison?.yourWeight.toFixed(1)} kg</div>
        </div>
        
        <div className="absolute bottom-4 right-8 text-center">
          <div className="text-sm font-bold text-primary">{getDisplayName()}</div>
          <div className="text-xs">{comparison?.theirWeight.toFixed(1)} kg</div>
        </div>
      </div>
      
      {/* Status Indicator */}
      <div className="mt-4 text-center">
        {rotationAngle < -2 && (
          <p className="text-sm text-blue-600 font-medium">
            ⚖️ You are heavier!
          </p>
        )}
        {rotationAngle > 2 && (
          <p className="text-sm text-primary font-medium">
            ⚖️ {getDisplayName()} {selectedItems && selectedItems.length > 1 ? 'are' : 'is'} heavier!
          </p>
        )}
        {Math.abs(rotationAngle) <= 2 && (
          <p className="text-sm text-gray-600 font-medium">
            ⚖️ Balanced!
          </p>
        )}
      </div>
    </div>
  );
};

export default ScaleComparison;
