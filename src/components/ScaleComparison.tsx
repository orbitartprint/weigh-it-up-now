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
  } | null;
}

const ScaleComparison: React.FC<ScaleComparisonProps> = ({
  userWeight,
  compareItem,
  comparison
}) => {
  // Calculate rotation angle based on weight difference
  const calculateRotationAngle = () => {
    if (!comparison) return 0;
    
    const maxTiltAngle = 15; // Maximum tilt angle in degrees
    const weightRangeFactor = 200; // Reference value for weight scale
    const weightDifference = comparison.yourWeight - comparison.theirWeight;
    
    if (weightDifference === 0) return 0;
    
    const normalizedDifference = weightDifference / weightRangeFactor;
    // Invert the rotation so heavier side goes down
    let rotationAngle = -normalizedDifference * maxTiltAngle;
    
    // CLAMP function simulation
    if (rotationAngle > maxTiltAngle) rotationAngle = maxTiltAngle;
    if (rotationAngle < -maxTiltAngle) rotationAngle = -maxTiltAngle;
    
    return rotationAngle;
  };

  // Get specific icon for comparison item
  const getComparisonIcon = () => {
    if (!compareItem) return <Weight size={16} className="text-primary" />;
    
    switch (compareItem.id) {
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
        return <WashingMachine size={16} className="text-primary" />;
      case 'car':
        return <Car size={16} className="text-primary" />;
      case 'smartphone':
        return <Smartphone size={16} className="text-primary" />;
      case 'bowling-ball':
        return <span className="text-xs">🎳</span>;
      case 'bicycle':
        return <Bike size={16} className="text-primary" />;
      
      // Celebrities
      case 'dwayne-johnson':
      case 'ariana-grande':
      case 'lebron-james':
      case 'taylor-swift':
      case 'tom-cruise':
        return <Star size={16} className="text-primary" />;
      
      default:
        return <Weight size={16} className="text-primary" />;
    }
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
              <User size={16} className="text-blue-600" />
            </div>
          </div>
          
          {/* Right Scale Pan */}
          <div className="absolute -right-6 -top-4 w-12 h-8 bg-gray-400 rounded-full border-2 border-gray-600 flex items-center justify-center">
            <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center">
              {getComparisonIcon()}
            </div>
          </div>
        </div>
        
        {/* Weight Displays */}
        <div className="absolute bottom-4 left-8 text-center">
          <div className="text-sm font-bold text-blue-600">You</div>
          <div className="text-xs">{comparison?.yourWeight.toFixed(1)} kg</div>
        </div>
        
        <div className="absolute bottom-4 right-8 text-center">
          <div className="text-sm font-bold text-primary">{compareItem?.name}</div>
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
            ⚖️ {compareItem?.name} is heavier!
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
