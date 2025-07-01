
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface WeightInputCardProps {
  weight: number;
  useKg: boolean;
  onWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onToggleUnit: () => void;
}

const WeightInputCard: React.FC<WeightInputCardProps> = ({
  weight,
  useKg,
  onWeightChange,
  onToggleUnit
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Weight</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="flex items-center">
            <Input
              type="number"
              value={weight}
              onChange={onWeightChange}
              min="0.1"
              step="0.1"
              className="text-lg"
            />
            <span className="ml-2 text-lg font-medium">{useKg ? 'kg' : 'lbs'}</span>
          </div>
          
          <div className="flex items-center space-x-2">
            <Label htmlFor="unit-toggle" className={cn(useKg ? "font-bold" : "")}>KG</Label>
            <Switch id="unit-toggle" checked={!useKg} onCheckedChange={onToggleUnit} />
            <Label htmlFor="unit-toggle" className={cn(!useKg ? "font-bold" : "")}>LBS</Label>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WeightInputCard;
