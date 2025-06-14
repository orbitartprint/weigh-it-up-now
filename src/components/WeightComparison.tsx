import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { WeightItem, weightItems, getItemsByCategory } from "@/data/weightItems";
import { ArrowLeft, ArrowRight, Weight, BarChart3, Scale, Plus } from "lucide-react";
import { cn } from "@/lib/utils";
import ScaleComparison from "./ScaleComparison";
import ComparisonItemWidget from "./ComparisonItemWidget";
import UserWeightWidget from "./UserWeightWidget";

const WeightComparison = () => {
  const [weight, setWeight] = useState<number>(70);
  const [compareToId, setCompareToId] = useState<string>("wolf");
  const [useKg, setUseKg] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("animals");
  const [compareToItems, setCompareToItems] = useState<WeightItem[]>([]);
  
  // New state for multiple selected items with side tracking
  const [selectedComparisonItems, setSelectedComparisonItems] = useState<(WeightItem & { side: 'left' | 'right' })[]>([]);
  const [totalWeightLeft, setTotalWeightLeft] = useState<number>(0);
  const [totalWeightRight, setTotalWeightRight] = useState<number>(0);
  const [userWeightSide, setUserWeightSide] = useState<'left' | 'right'>('left');
  
  // State for view switching
  const [showScale, setShowScale] = useState<boolean>(false);

  useEffect(() => {
    // Set initial comparison items based on the selected category
    const items = getItemsByCategory(selectedCategory);
    setCompareToItems(items);
    
    // Set initial comparison item if there are items available
    if (items.length > 0 && !compareToId) {
      setCompareToId(items[0].id);
    }
  }, [selectedCategory]);

  // Calculate total weight for both sides
  useEffect(() => {
    const leftItems = selectedComparisonItems.filter(item => item.side === 'left');
    const rightItems = selectedComparisonItems.filter(item => item.side === 'right');
    
    const leftTotal = leftItems.reduce((sum, item) => sum + item.weight, 0) + (userWeightSide === 'left' ? getUserWeight() : 0);
    const rightTotal = rightItems.reduce((sum, item) => sum + item.weight, 0) + (userWeightSide === 'right' ? getUserWeight() : 0);
    
    setTotalWeightLeft(leftTotal);
    setTotalWeightRight(rightTotal);
  }, [selectedComparisonItems, userWeightSide, weight, useKg]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseFloat(e.target.value);
    if (!isNaN(value) && value > 0) {
      setWeight(value);
    }
  };

  const handleToggleUnit = () => {
    if (useKg) {
      // Convert kg to lbs
      setWeight(parseFloat((weight * 2.20462).toFixed(1)));
    } else {
      // Convert lbs to kg
      setWeight(parseFloat((weight / 2.20462).toFixed(1)));
    }
    setUseKg(!useKg);
  };

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value);
    const items = getItemsByCategory(value);
    setCompareToItems(items);
    
    if (items.length > 0) {
      setCompareToId(items[0].id);
    }
  };

  const handleAddItem = () => {
    if (selectedComparisonItems.length >= 10) {
      toast.error("Maximum 10 items can be selected for comparison!");
      return;
    }

    const item = weightItems.find(item => item.id === compareToId);
    if (item) {
      // Check if item is already selected
      if (selectedComparisonItems.find(selected => selected.id === item.id)) {
        toast.error("This item is already selected!");
        return;
      }

      setSelectedComparisonItems(prev => [...prev, { ...item, side: 'right' }]);
      toast.success(`${item.name} added to comparison!`);
    }
  };

  const handleToggleItemSide = (id: string) => {
    setSelectedComparisonItems(prev => 
      prev.map(item => 
        item.id === id 
          ? { ...item, side: item.side === 'left' ? 'right' : 'left' }
          : item
      )
    );
  };

  const handleToggleUserSide = () => {
    setUserWeightSide(prev => prev === 'left' ? 'right' : 'left');
  };

  const handleRemoveItem = (id: string) => {
    setSelectedComparisonItems(prev => prev.filter(item => item.id !== id));
    toast.success("Item removed from comparison!");
  };

  const getUserWeight = () => {
    return useKg ? weight : weight * 0.453592;
  };

  const getComparisonMessage = () => {
    if (selectedComparisonItems.length === 0) return "";
    
    const userWeightKg = getUserWeight();
    const itemsText = selectedComparisonItems.length === 1 
      ? selectedComparisonItems[0].name.toLowerCase()
      : `${selectedComparisonItems.length} selected items combined`;
    
    const ratio = userWeightKg / totalWeightRight;
    
    if (ratio < 0.1) {
      return `You weigh less than 1/10 of ${itemsText}!`;
    } else if (ratio < 1) {
      return `You weigh ${(ratio * 100).toFixed(1)}% of ${itemsText}!`;
    } else if (Math.abs(ratio - 1) < 0.01) {
      return `You weigh exactly the same as ${itemsText}!`;
    } else {
      const wholeNumber = Math.floor(ratio);
      const decimal = ratio - wholeNumber;
      
      if (decimal < 0.1) {
        return `You weigh about ${wholeNumber} times more than ${itemsText}!`;
      } else {
        return `You weigh ${ratio.toFixed(2)} times more than ${itemsText}!`;
      }
    }
  };

  const handleShare = () => {
    if (selectedComparisonItems.length > 0) {
      const message = getComparisonMessage();
      const text = `I just compared my weight with multiple items on WeightComparison.com! ${message}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'WeightComparison.com',
          text: text,
          url: window.location.href,
        })
        .catch(() => {
          navigator.clipboard.writeText(text + ' ' + window.location.href)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch(() => toast.error("Failed to copy link."));
        });
      } else {
        navigator.clipboard.writeText(text + ' ' + window.location.href)
          .then(() => toast.success("Link copied to clipboard!"))
          .catch(() => toast.error("Failed to copy link."));
      }
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
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
                  onChange={handleWeightChange}
                  min="0.1"
                  step="0.1"
                  className="text-lg"
                />
                <span className="ml-2 text-lg font-medium">{useKg ? 'kg' : 'lbs'}</span>
              </div>
              
              <div className="flex items-center space-x-2">
                <Label htmlFor="unit-toggle" className={cn(useKg ? "font-bold" : "")}>KG</Label>
                <Switch id="unit-toggle" checked={!useKg} onCheckedChange={handleToggleUnit} />
                <Label htmlFor="unit-toggle" className={cn(!useKg ? "font-bold" : "")}>LBS</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Add Items to Compare</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <Label htmlFor="category" className="block mb-2">Category</Label>
                <Select value={selectedCategory} onValueChange={handleCategoryChange}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="animals">Animals</SelectItem>
                      <SelectItem value="celebrities">Celebrities</SelectItem>
                      <SelectItem value="objects">Objects</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
              <div>
                <Label htmlFor="compareTo" className="block mb-2">Item</Label>
                <Select value={compareToId} onValueChange={setCompareToId}>
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
                onClick={handleAddItem} 
                className="w-full"
                disabled={selectedComparisonItems.length >= 10}
              >
                <Plus size={16} className="mr-2" />
                Add Item ({selectedComparisonItems.length}/10)
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* User Weight Widget - Always show */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Your Weight Position</CardTitle>
        </CardHeader>
        <CardContent>
          <UserWeightWidget
            weight={getUserWeight()}
            useKg={true}
            side={userWeightSide}
            onToggleSide={handleToggleUserSide}
          />
        </CardContent>
      </Card>

      {/* Selected Items Display by Side */}
      {selectedComparisonItems.length > 0 && (
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Scale Balance - Left vs Right</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Left Side */}
              <div>
                <h4 className="font-semibold mb-3 text-center">
                  Left Side ({totalWeightLeft.toFixed(1)} kg)
                </h4>
                <div className="space-y-2 min-h-[100px] p-4 bg-blue-50 rounded-lg">
                  {userWeightSide === 'left' && (
                    <div className="text-sm text-blue-600 text-center p-2 bg-blue-100 rounded">
                      Your weight is here
                    </div>
                  )}
                  {selectedComparisonItems
                    .filter(item => item.side === 'left')
                    .map(item => (
                      <ComparisonItemWidget
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                        onToggleSide={handleToggleItemSide}
                        useKg={useKg}
                      />
                    ))}
                  {selectedComparisonItems.filter(item => item.side === 'left').length === 0 && userWeightSide !== 'left' && (
                    <div className="text-center text-muted-foreground italic py-8">
                      No items on left side
                    </div>
                  )}
                </div>
              </div>

              {/* Right Side */}
              <div>
                <h4 className="font-semibold mb-3 text-center">
                  Right Side ({totalWeightRight.toFixed(1)} kg)
                </h4>
                <div className="space-y-2 min-h-[100px] p-4 bg-green-50 rounded-lg">
                  {userWeightSide === 'right' && (
                    <div className="text-sm text-green-600 text-center p-2 bg-green-100 rounded">
                      Your weight is here
                    </div>
                  )}
                  {selectedComparisonItems
                    .filter(item => item.side === 'right')
                    .map(item => (
                      <ComparisonItemWidget
                        key={item.id}
                        item={item}
                        onRemove={handleRemoveItem}
                        onToggleSide={handleToggleItemSide}
                        useKg={useKg}
                      />
                    ))}
                  {selectedComparisonItems.filter(item => item.side === 'right').length === 0 && userWeightSide !== 'right' && (
                    <div className="text-center text-muted-foreground italic py-8">
                      No items on right side
                    </div>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      )}

      {selectedComparisonItems.length > 0 && (
        <Card className="mb-8 scale-appear">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Comparison Result</CardTitle>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowScale(!showScale)}
              className="flex items-center gap-2"
            >
              {showScale ? (
                <>
                  <BarChart3 size={16} />
                  Chart
                </>
              ) : (
                <>
                  <Scale size={16} />
                  Scale
                </>
              )}
            </Button>
          </CardHeader>
          <CardContent>
            <div className="mb-6">
              <h3 className="text-xl font-bold text-center text-blue-600 mb-2">
                {getComparisonMessage()}
              </h3>
              <p className="text-muted-foreground text-center">
                Your weight: {getUserWeight().toFixed(1)} kg vs Combined weight: {totalWeightRight.toFixed(1)} kg
              </p>
            </div>

            {/* Bar Chart Container (visible by default) */}
            {!showScale && (
              <div className="comparison-container mt-8 mb-12">
                <div
                  className="weight-bar bg-blue-500"
                  style={{
                    height: `${Math.min(300, getUserWeight() * (300 / Math.max(getUserWeight(), totalWeightRight)))}px`,
                    width: '40%',
                    left: '10%'
                  }}
                >
                  <div className="bar-label">
                    <span className="font-bold">You</span>
                    <br />
                    {getUserWeight().toFixed(1)} kg
                    {!useKg && ` (${weight.toFixed(1)} lbs)`}
                  </div>
                </div>
                <div
                  className="weight-bar bg-primary/70"
                  style={{
                    height: `${Math.min(300, totalWeightRight * (300 / Math.max(getUserWeight(), totalWeightRight)))}px`,
                    width: '40%',
                    right: '10%'
                  }}
                >
                  <div className="bar-label">
                    <span className="font-bold">Selected Items</span>
                    <br />
                    {totalWeightRight.toFixed(1)} kg
                    {!useKg && ` (${(totalWeightRight * 2.20462).toFixed(1)} lbs)`}
                  </div>
                </div>
              </div>
            )}

            {/* Scale Container (hidden by default) */}
            {showScale && (
              <ScaleComparison 
                userWeight={weight}
                compareItem={null}
                comparison={{
                  ratio: totalWeightLeft / totalWeightRight,
                  message: getComparisonMessage(),
                  yourWeight: getUserWeight(),
                  theirWeight: totalWeightRight,
                  leftWeight: totalWeightLeft,
                  rightWeight: totalWeightRight
                }}
                selectedItems={selectedComparisonItems}
                userWeightSide={userWeightSide}
              />
            )}

            <div className="flex justify-center">
              <Button onClick={handleShare} className="mt-4">
                Share This Comparison
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeightComparison;