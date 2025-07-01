
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Plus, Box } from "lucide-react";
import { WeightItem } from "@/data/weightItems";
import CustomObjectCreator from "./CustomObjectCreator";

interface ItemSelectionCardProps {
  selectedCategory: string;
  compareToId: string;
  compareToItems: WeightItem[];
  selectedItemsCount: number;
  customObjects: WeightItem[];
  customObjectName: string;
  customObjectWeight: string;
  customObjectUseKg: boolean;
  onCategoryChange: (value: string) => void;
  onCompareToChange: (value: string) => void;
  onAddCustomItem: () => void;
  onCustomNameChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCustomWeightChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onCustomUnitToggle: () => void;
  onCreateCustomObject: () => void;
}

const ItemSelectionCard: React.FC<ItemSelectionCardProps> = ({
  selectedCategory,
  compareToId,
  compareToItems,
  selectedItemsCount,
  customObjects,
  customObjectName,
  customObjectWeight,
  customObjectUseKg,
  onCategoryChange,
  onCompareToChange,
  onAddCustomItem,
  onCustomNameChange,
  onCustomWeightChange,
  onCustomUnitToggle,
  onCreateCustomObject
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Items to Compare</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="category" className="block mb-2">Category</Label>
            <Select value={selectedCategory} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="Select a category" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectItem value="animals">Animals</SelectItem>
                  <SelectItem value="celebrities">Celebrities</SelectItem>
                  <SelectItem value="objects">Objects</SelectItem>
                  <SelectItem value="vehicles">Vehicles</SelectItem>
                  <SelectItem value="historical">Historical</SelectItem>
                  <SelectItem value="infrastructure">Infrastructure</SelectItem>
                  <SelectItem value="buildings">Buildings</SelectItem>
                  <SelectItem value="food">Food</SelectItem>
                  <SelectItem value="sports">Sports</SelectItem>
                  <SelectItem value="fictional">Fictional</SelectItem>
                  <SelectItem value="micro">Micro</SelectItem>
                  <SelectItem value="custom">Custom</SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>
          
          {selectedCategory === 'custom' ? (
            <>
              <CustomObjectCreator
                customObjectName={customObjectName}
                customObjectWeight={customObjectWeight}
                customObjectUseKg={customObjectUseKg}
                onNameChange={onCustomNameChange}
                onWeightChange={onCustomWeightChange}
                onUnitToggle={onCustomUnitToggle}
                onCreateObject={onCreateCustomObject}
                selectedItemsCount={selectedItemsCount}
              />
              
              {customObjects.length > 0 && (
                <>
                  <div>
                    <Label htmlFor="compareTo" className="block mb-2">Select Custom Object</Label>
                    <Select value={compareToId} onValueChange={onCompareToChange}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a custom object" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {customObjects.map(item => (
                            <SelectItem key={item.id} value={item.id}>
                              <div className="flex items-center gap-2">
                                <Box size={14} />
                                {item.name} ({item.weight.toFixed(1)} kg)
                              </div>
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                  
                  <Button 
                    onClick={onAddCustomItem} 
                    className="w-full"
                    disabled={selectedItemsCount >= 10 || !compareToId}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Custom Object ({selectedItemsCount}/10)
                  </Button>
                </>
              )}
            </>
          ) : (
            <>
              <div>
                <Label htmlFor="compareTo" className="block mb-2">Item</Label>
                <Select value={compareToId} onValueChange={onCompareToChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select an item" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      {compareToItems.map(item => (
                        <SelectItem key={item.id} value={item.id}>
                          {item.name} ({item.weight} kg)
                        </SelectItem>
                      ))}
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <Button 
                onClick={onAddCustomItem} 
                className="w-full"
                disabled={selectedItemsCount >= 10 || !compareToId}
              >
                <Plus size={16} className="mr-2" />
                Add Item ({selectedItemsCount}/10)
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ItemSelectionCard;
