
import React from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Plus, Box } from "lucide-react";
import { cn } from "@/lib/utils";

interface CustomObjectCreatorProps {
  customObjectName: string;
  customObjectWeight: string;
  customObjectUseKg: boolean;
  onNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onUnitToggle: () => void;
  onCreateObject: () => void;
  selectedItemsCount: number;
}

const CustomObjectCreator: React.FC<CustomObjectCreatorProps> = ({
  customObjectName,
  customObjectWeight,
  customObjectUseKg,
  onNameChange,
  onWeightChange,
  onUnitToggle,
  onCreateObject,
  selectedItemsCount
}) => {
  return (
    <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
      <h4 className="font-medium flex items-center gap-2">
        <Box size={16} />
        Create Custom Object
      </h4>
      
      <div>
        <Label htmlFor="customName" className="block mb-1">Object Name</Label>
        <Input
          id="customName"
          type="text"
          placeholder="Enter object name"
          value={customObjectName}
          onChange={onNameChange}
        />
      </div>
      
      <div>
        <Label htmlFor="customWeight" className="block mb-1">Weight</Label>
        <div className="flex items-center gap-2">
          <Input
            id="customWeight"
            type="text"
            placeholder="Enter weight"
            value={customObjectWeight}
            onChange={onWeightChange}
          />
          <span className="text-sm font-medium">{customObjectUseKg ? 'kg' : 'lbs'}</span>
        </div>
        
        <div className="flex items-center space-x-2 mt-2">
          <Label htmlFor="custom-unit-toggle" className={cn(customObjectUseKg ? "font-bold" : "")}>KG</Label>
          <Switch 
            id="custom-unit-toggle" 
            checked={!customObjectUseKg} 
            onCheckedChange={onUnitToggle} 
          />
          <Label htmlFor="custom-unit-toggle" className={cn(!customObjectUseKg ? "font-bold" : "")}>LBS</Label>
        </div>
      </div>
      
      <Button 
        onClick={onCreateObject} 
        className="w-full"
        disabled={selectedItemsCount >= 10}
      >
        <Plus size={16} className="mr-2" />
        Create Object
      </Button>
    </div>
  );
};

export default CustomObjectCreator;
