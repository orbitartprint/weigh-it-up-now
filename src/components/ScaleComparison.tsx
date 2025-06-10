
import React from 'react';
import { User, Weight } from 'lucide-react';
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
  // Berechnung des Rotationswinkels basierend auf Gewichtsdifferenz
  const calculateRotationAngle = () => {
    if (!comparison) return 0;
    
    const maxTiltAngle = 15; // Maximaler Neigungswinkel in Grad
    const weightRangeFactor = 200; // Referenzwert für Gewichtsskala
    const weightDifference = comparison.yourWeight - comparison.theirWeight;
    
    if (weightDifference === 0) return 0;
    
    const normalizedDifference = weightDifference / weightRangeFactor;
    let rotationAngle = normalizedDifference * maxTiltAngle;
    
    // CLAMP Funktion simulation
    if (rotationAngle > maxTiltAngle) rotationAngle = maxTiltAngle;
    if (rotationAngle < -maxTiltAngle) rotationAngle = -maxTiltAngle;
    
    return rotationAngle;
  };

  const rotationAngle = calculateRotationAngle();

  return (
    <div className="flex flex-col items-center justify-center py-8">
      {/* Waage Container */}
      <div className="relative w-80 h-60">
        {/* Waagen-Basis (Dreieck) */}
        <div className="absolute bottom-16 left-1/2 transform -translate-x-1/2">
          <div className="w-0 h-0 border-l-8 border-r-8 border-b-12 border-transparent border-b-gray-600"></div>
        </div>
        
        {/* Waagebalken mit Animation */}
        <div 
          className="absolute bottom-24 left-1/2 w-64 h-2 bg-gray-600 rounded transform -translate-x-1/2 transition-transform duration-800 ease-in-out"
          style={{ 
            transformOrigin: 'center center',
            transform: `translateX(-50%) rotate(${rotationAngle}deg)`
          }}
        >
          {/* Linke Waagschale */}
          <div className="absolute -left-6 -top-4 w-12 h-8 bg-gray-400 rounded-full border-2 border-gray-600 flex items-center justify-center">
            <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center">
              <User size={16} className="text-weightBlue-dark" />
            </div>
          </div>
          
          {/* Rechte Waagschale */}
          <div className="absolute -right-6 -top-4 w-12 h-8 bg-gray-400 rounded-full border-2 border-gray-600 flex items-center justify-center">
            <div className="w-8 h-6 bg-gray-300 rounded flex items-center justify-center">
              {compareItem?.category === 'animals' && <span className="text-xs">🐺</span>}
              {compareItem?.category === 'celebrities' && <span className="text-xs">⭐</span>}
              {compareItem?.category === 'objects' && <Weight size={16} className="text-primary" />}
            </div>
          </div>
        </div>
        
        {/* Gewichtsanzeigen */}
        <div className="absolute bottom-4 left-8 text-center">
          <div className="text-sm font-bold text-weightBlue-dark">Du</div>
          <div className="text-xs">{comparison?.yourWeight.toFixed(1)} kg</div>
        </div>
        
        <div className="absolute bottom-4 right-8 text-center">
          <div className="text-sm font-bold text-primary">{compareItem?.name}</div>
          <div className="text-xs">{comparison?.theirWeight.toFixed(1)} kg</div>
        </div>
      </div>
      
      {/* Status-Indikator */}
      <div className="mt-4 text-center">
        {rotationAngle > 2 && (
          <p className="text-sm text-weightBlue-dark font-medium">
            ⚖️ Du bist schwerer!
          </p>
        )}
        {rotationAngle < -2 && (
          <p className="text-sm text-primary font-medium">
            ⚖️ {compareItem?.name} ist schwerer!
          </p>
        )}
        {Math.abs(rotationAngle) <= 2 && (
          <p className="text-sm text-gray-600 font-medium">
            ⚖️ Ausgeglichen!
          </p>
        )}
      </div>
    </div>
  );
};

export default ScaleComparison;
