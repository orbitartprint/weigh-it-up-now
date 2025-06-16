import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { WeightItem, weightItems, getItemsByCategory } from "@/data/weightItems";
import { ArrowLeft, ArrowRight, Weight, BarChart3, Scale, Plus, Share2, Facebook, Twitter, Mail, Copy, Box } from "lucide-react";
import { cn } from "@/lib/utils";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
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
  
  // State for custom objects
  const [customObjects, setCustomObjects] = useState<WeightItem[]>([]);
  const [customObjectName, setCustomObjectName] = useState<string>("");
  const [customObjectWeight, setCustomObjectWeight] = useState<string>("");
  const [customObjectUseKg, setCustomObjectUseKg] = useState<boolean>(true);

  useEffect(() => {
    // Set initial comparison items based on the selected category
    if (selectedCategory === 'custom') {
      setCompareToItems(customObjects);
    } else {
      const items = getItemsByCategory(selectedCategory);
      setCompareToItems(items);
    }
    
    // Set initial comparison item if there are items available
    if (compareToItems.length > 0 && !compareToId) {
      setCompareToId(compareToItems[0].id);
    }
  }, [selectedCategory, customObjects]);

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
    setCompareToId("");
    
    if (value === 'custom') {
      setCompareToItems(customObjects);
    } else {
      const items = getItemsByCategory(value);
      setCompareToItems(items);
      if (items.length > 0) {
        setCompareToId(items[0].id);
      }
    }
  };

  const handleCreateCustomObject = () => {
    if (!customObjectName.trim()) {
      toast.error("Please enter an object name!");
      return;
    }
    
    const weightValue = parseFloat(customObjectWeight);
    if (isNaN(weightValue) || weightValue <= 0) {
      toast.error("Please enter a valid weight!");
      return;
    }

    const weightInKg = customObjectUseKg ? weightValue : weightValue * 0.453592;
    
    const newCustomObject: WeightItem = {
      id: `custom-${Date.now()}`,
      name: customObjectName.trim(),
      weight: weightInKg,
      category: 'custom',
      fact: 'Custom object'
    };

    setCustomObjects(prev => [...prev, newCustomObject]);
    setCustomObjectName("");
    setCustomObjectWeight("");
    toast.success(`${newCustomObject.name} created successfully!`);
  };

  const handleCustomWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Allow empty string or valid positive numbers
    if (value === "" || (/^\d*\.?\d*$/.test(value) && parseFloat(value) >= 0)) {
      setCustomObjectWeight(value);
    }
  };

  const handleAddCustomItem = () => {
    if (selectedComparisonItems.length >= 10) {
      toast.error("Maximum 10 items can be selected for comparison!");
      return;
    }

    const item = [...weightItems, ...customObjects].find(item => item.id === compareToId);
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
    const totalItemsWeight = selectedComparisonItems.reduce((sum, item) => sum + item.weight, 0);
    
    const ratio = userWeightKg / totalItemsWeight;
    const itemsText = selectedComparisonItems.length === 1 
      ? selectedComparisonItems[0].name.toLowerCase()
      : `${selectedComparisonItems.length} selected items combined`;
    
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

  const getShareData = () => {
    if (selectedComparisonItems.length === 0) return null;
    
    const userWeightKg = getUserWeight();
    const itemCount = selectedComparisonItems.length;
    const totalItemsWeight = selectedComparisonItems.reduce((sum, item) => sum + item.weight, 0);
    
    const comparisonText = itemCount === 1 
      ? `${selectedComparisonItems[0].name} (${totalItemsWeight.toFixed(1)} kg)`
      : `${itemCount} items weighing ${totalItemsWeight.toFixed(1)} kg combined`;
    
    const shareText = `🎯 I just compared my weight (${userWeightKg.toFixed(1)} kg) with ${comparisonText} on this cool weight comparison tool! ${getComparisonMessage()} #WeightComparison #HowMuchDoIWeigh #WeightVs`;
    const shareUrl = window.location.href;
    
    return {
      text: shareText,
      url: shareUrl,
      encodedText: encodeURIComponent(shareText),
      encodedUrl: encodeURIComponent(shareUrl)
    };
  };

  const handleSharePlatform = (platform: string) => {
    const shareData = getShareData();
    if (!shareData) return;

    const { encodedText, encodedUrl, text, url } = shareData;

    switch (platform) {
      case 'twitter':
        window.open(`https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`, '_blank', 'width=600,height=400');
        toast.success("Twitter share window opened!");
        break;
      case 'facebook':
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`, '_blank', 'width=600,height=400');
        toast.success("Facebook share window opened!");
        break;
      case 'whatsapp':
        window.open(`https://wa.me/?text=${encodedText}%20${encodedUrl}`, '_blank');
        toast.success("WhatsApp share window opened!");
        break;
      case 'email':
        window.location.href = `mailto:?subject=${encodeURIComponent('My Weight Comparison Results!')}&body=${encodedText}%0A%0A${encodedUrl}`;
        toast.success("Email client opened!");
        break;
      case 'copy':
        navigator.clipboard.writeText(`${text} ${url}`)
          .then(() => toast.success("Share text copied to clipboard!"))
          .catch(() => toast.error("Failed to copy. Please try again."));
        break;
    }
  };

  const handleNativeShare = () => {
    const shareData = getShareData();
    if (!shareData) return;

    if (navigator.share) {
      navigator.share({
        title: 'WeightVs: Amazing Weight Comparison Results!',
        text: shareData.text,
        url: shareData.url,
      }).catch(() => {
        // Fallback handled by popover
      });
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
                       <SelectItem value="custom">Custom</SelectItem>
                     </SelectGroup>
                  </SelectContent>
                </Select>
              </div>
              
{selectedCategory === 'custom' ? (
                <>
                  {/* Custom Object Creation Form */}
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
                        onChange={(e) => setCustomObjectName(e.target.value)}
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
                          onChange={handleCustomWeightChange}
                        />
                        <span className="text-sm font-medium">{customObjectUseKg ? 'kg' : 'lbs'}</span>
                      </div>
                      
                      <div className="flex items-center space-x-2 mt-2">
                        <Label htmlFor="custom-unit-toggle" className={cn(customObjectUseKg ? "font-bold" : "")}>KG</Label>
                        <Switch 
                          id="custom-unit-toggle" 
                          checked={!customObjectUseKg} 
                          onCheckedChange={() => setCustomObjectUseKg(!customObjectUseKg)} 
                        />
                        <Label htmlFor="custom-unit-toggle" className={cn(!customObjectUseKg ? "font-bold" : "")}>LBS</Label>
                      </div>
                    </div>
                    
                    <Button 
                      onClick={handleCreateCustomObject} 
                      className="w-full"
                    >
                      <Plus size={16} className="mr-2" />
                      Create Object
                    </Button>
                  </div>
                  
                  {/* Custom Objects List */}
                  {customObjects.length > 0 && (
                    <>
                      <div>
                        <Label htmlFor="compareTo" className="block mb-2">Select Custom Object</Label>
                        <Select value={compareToId} onValueChange={setCompareToId}>
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
                        onClick={handleAddCustomItem} 
                        className="w-full"
                        disabled={selectedComparisonItems.length >= 10 || !compareToId}
                      >
                        <Plus size={16} className="mr-2" />
                        Add Custom Object ({selectedComparisonItems.length}/10)
                      </Button>
                    </>
                  )}
                </>
              ) : (
                <>
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
                    onClick={handleAddCustomItem} 
                    className="w-full"
                    disabled={selectedComparisonItems.length >= 10 || !compareToId}
                  >
                    <Plus size={16} className="mr-2" />
                    Add Item ({selectedComparisonItems.length}/10)
                  </Button>
                </>
              )}
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
                Left side: {totalWeightLeft.toFixed(1)} kg vs Right side: {totalWeightRight.toFixed(1)} kg
              </p>
            </div>

            {/* Bar Chart Container (visible by default) */}
            {!showScale && (
              <div className="comparison-container mt-8 mb-12">
                <div
                  className="weight-bar bg-blue-500"
                  style={{
                    height: `${Math.min(300, totalWeightLeft * (300 / Math.max(totalWeightLeft, totalWeightRight)))}px`,
                    width: '40%',
                    left: '10%'
                  }}
                >
                  <div className="bar-label">
                    <span className="font-bold">Left Side</span>
                    <br />
                    {totalWeightLeft.toFixed(1)} kg
                    {!useKg && ` (${(totalWeightLeft * 2.20462).toFixed(1)} lbs)`}
                  </div>
                </div>
                <div
                  className="weight-bar bg-primary/70"
                  style={{
                    height: `${Math.min(300, totalWeightRight * (300 / Math.max(totalWeightLeft, totalWeightRight)))}px`,
                    width: '40%',
                    right: '10%'
                  }}
                >
                  <div className="bar-label">
                    <span className="font-bold">Right Side</span>
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
              <Popover>
                <PopoverTrigger asChild>
                  <Button className="mt-4">
                    <Share2 size={16} className="mr-2" />
                    Share This Comparison
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-56">
                  <div className="space-y-2">
                    <h4 className="font-medium text-sm mb-3">Share on:</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSharePlatform('twitter')}
                        className="flex items-center gap-2"
                      >
                        <Twitter size={16} />
                        Twitter
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSharePlatform('facebook')}
                        className="flex items-center gap-2"
                      >
                        <Facebook size={16} />
                        Facebook
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSharePlatform('whatsapp')}
                        className="flex items-center gap-2"
                      >
                        <Share2 size={16} />
                        WhatsApp
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleSharePlatform('email')}
                        className="flex items-center gap-2"
                      >
                        <Mail size={16} />
                        Email
                      </Button>
                    </div>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleSharePlatform('copy')}
                      className="w-full flex items-center gap-2 mt-2"
                    >
                      <Copy size={16} />
                      Copy Link
                    </Button>
                    {navigator.share && (
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={handleNativeShare}
                        className="w-full flex items-center gap-2"
                      >
                        <Share2 size={16} />
                        Native Share
                      </Button>
                    )}
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default WeightComparison;
