
import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { WeightItem, weightItems, getItemsByCategory } from "@/data/weightItems";
import { ArrowLeft, ArrowRight, Weight, BarChart3, Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import ScaleComparison from "./ScaleComparison";

const WeightComparison = () => {
  const [weight, setWeight] = useState<number>(70);
  const [compareToId, setCompareToId] = useState<string>("wolf");
  const [useKg, setUseKg] = useState<boolean>(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("animals");
  const [compareToItems, setCompareToItems] = useState<WeightItem[]>([]);
  const [comparison, setComparison] = useState<{
    ratio: number;
    message: string;
    yourWeight: number;
    theirWeight: number;
  } | null>(null);
  const [compareItem, setCompareItem] = useState<WeightItem | null>(null);
  
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

  useEffect(() => {
    if (compareToId) {
      // Find the selected comparison item
      const item = weightItems.find(item => item.id === compareToId);
      setCompareItem(item || null);
      
      if (item) {
        calculateComparison(weight, item);
      }
    }
  }, [compareToId, weight, useKg]);

  const calculateComparison = (userWeight: number, item: WeightItem) => {
    // Convert weight to kg if needed
    const weightInKg = useKg ? userWeight : userWeight * 0.453592;
    const ratio = weightInKg / item.weight;
    
    let message = "";
    if (ratio < 0.1) {
      message = `You weigh less than 1/10 of a ${item.name.toLowerCase()}!`;
    } else if (ratio < 1) {
      message = `You weigh ${(ratio * 100).toFixed(1)}% of a ${item.name.toLowerCase()}!`;
    } else if (ratio === 1) {
      message = `You weigh exactly the same as a ${item.name.toLowerCase()}!`;
    } else {
      const wholeNumber = Math.floor(ratio);
      const decimal = ratio - wholeNumber;
      
      if (decimal < 0.1) {
        message = `You weigh about ${wholeNumber} times more than a ${item.name.toLowerCase()}!`;
      } else {
        message = `You weigh ${ratio.toFixed(2)} times more than a ${item.name.toLowerCase()}!`;
      }
    }

    setComparison({
      ratio,
      message,
      yourWeight: weightInKg,
      theirWeight: item.weight
    });
  };

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

  const handleShare = () => {
    if (comparison && compareItem) {
      const text = `I just compared my weight with a ${compareItem.name} on WeightComparison.com! ${comparison.message}`;
      
      if (navigator.share) {
        navigator.share({
          title: 'WeightComparison.com',
          text: text,
          url: window.location.href,
        })
        .catch(() => {
          // Fallback if Web Share API fails
          navigator.clipboard.writeText(text + ' ' + window.location.href)
            .then(() => toast.success("Link copied to clipboard!"))
            .catch(() => toast.error("Failed to copy link."));
        });
      } else {
        // Fallback for browsers that don't support Web Share API
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
            <CardTitle>Compare To</CardTitle>
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
            </div>
          </CardContent>
        </Card>
      </div>

      {comparison && compareItem && (
        <Card className="mb-8 scale-appear">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Comparison Result</CardTitle>
            {/* Toggle Button for Views */}
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
                {comparison.message}
              </h3>
              {compareItem.fact && (
                <p className="text-muted-foreground text-center">
                  Fun fact: {compareItem.fact}
                </p>
              )}
            </div>

            {/* Bar Chart Container (visible by default) */}
            {!showScale && (
              <div className="comparison-container mt-8 mb-12">
                <div
                  className="weight-bar bg-blue-500"
                  style={{
                    height: `${Math.min(300, comparison.yourWeight * (300 / Math.max(comparison.yourWeight, comparison.theirWeight)))}px`,
                    width: '40%',
                    left: '10%'
                  }}
                >
                  <div className="bar-label">
                    <span className="font-bold">You</span>
                    <br />
                    {comparison.yourWeight.toFixed(1)} kg
                    {!useKg && ` (${(comparison.yourWeight * 2.20462).toFixed(1)} lbs)`}
                  </div>
                </div>
                <div
                  className="weight-bar bg-primary/70"
                  style={{
                    height: `${Math.min(300, comparison.theirWeight * (300 / Math.max(comparison.yourWeight, comparison.theirWeight)))}px`,
                    width: '40%',
                    right: '10%'
                  }}
                >
                  <div className="bar-label">
                    <span className="font-bold">{compareItem.name}</span>
                    <br />
                    {comparison.theirWeight.toFixed(1)} kg
                    {!useKg && ` (${(comparison.theirWeight * 2.20462).toFixed(1)} lbs)`}
                  </div>
                </div>
              </div>
            )}

            {/* Scale Container (hidden by default) */}
            {showScale && (
              <ScaleComparison 
                userWeight={weight}
                compareItem={compareItem}
                comparison={comparison}
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
