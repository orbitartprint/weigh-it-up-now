import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { WeightItem, weightItems, getItemsByCategory } from "@/data/weightItems";
import { User } from "lucide-react";
import WeightInputCard from "./WeightInputCard";
import ItemSelectionCard from "./ItemSelectionCard";
import ComparisonResult from "./ComparisonResult";
import ComparisonItemWidget from "./ComparisonItemWidget";
import UserWeightWidget from "./UserWeightWidget";

interface WeightComparisonProps {
  weight: string;
  setWeight: (weight: string) => void;
  useKg: boolean;
  setUseKg: (useKg: boolean) => void;
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
  compareToId: string;
  setCompareToId: (id: string) => void;
  compareToItems: WeightItem[];
  setCompareToItems: (items: WeightItem[]) => void;
  selectedComparisonItems: (WeightItem & { side: 'left' | 'right' })[];
  setSelectedComparisonItems: React.Dispatch<React.SetStateAction<(WeightItem & { side: 'left' | 'right' })[]>>;
  totalWeightLeft: number;
  setTotalWeightLeft: (weight: number) => void;
  totalWeightRight: number;
  setTotalWeightRight: (weight: number) => void;
  userWeightSide: 'left' | 'right';
  setUserWeightSide: React.Dispatch<React.SetStateAction<'left' | 'right'>>;
  showScale: boolean;
  setShowScale: (show: boolean) => void;
  customObjects: WeightItem[];
  setCustomObjects: React.Dispatch<React.SetStateAction<WeightItem[]>>;
  customObjectName: string;
  setCustomObjectName: (name: string) => void;
  customObjectWeight: string;
  setCustomObjectWeight: (weight: string) => void;
  customObjectUseKg: boolean;
  setCustomObjectUseKg: (useKg: boolean) => void;
}

const WeightComparison: React.FC<WeightComparisonProps> = ({
  weight,
  setWeight,
  useKg,
  setUseKg,
  selectedCategory,
  setSelectedCategory,
  compareToId,
  setCompareToId,
  compareToItems,
  setCompareToItems,
  selectedComparisonItems,
  setSelectedComparisonItems,
  totalWeightLeft,
  setTotalWeightLeft,
  totalWeightRight,
  setTotalWeightRight,
  userWeightSide,
  setUserWeightSide,
  showScale,
  setShowScale,
  customObjects,
  setCustomObjects,
  customObjectName,
  setCustomObjectName,
  customObjectWeight,
  setCustomObjectWeight,
  customObjectUseKg,
  setCustomObjectUseKg
}) => {

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
  }, [selectedCategory, customObjects, compareToItems.length, compareToId, setCompareToItems, setCompareToId]);

  /// Calculate total weight for both sides (always in kg internally)
  useEffect(() => {
    const leftItems = selectedComparisonItems.filter(item => item.side === 'left');
    const rightItems = selectedComparisonItems.filter(item => item.side === 'right');
    
    // Get user weight in kg for internal calculations
    const userWeightInKg = getUserWeightInKg();
    const leftTotal = leftItems.reduce((sum, item) => sum + item.weight, 0) + (userWeightSide === 'left' ? userWeightInKg : 0);
    const rightTotal = rightItems.reduce((sum, item) => sum + item.weight, 0) + (userWeightSide === 'right' ? userWeightInKg : 0);
    
    setTotalWeightLeft(leftTotal);
    setTotalWeightRight(rightTotal);
  }, [selectedComparisonItems, userWeightSide, weight, useKg]);

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    // Erlaubt einen leeren String oder Zahlen (mit optionalem Dezimalpunkt)
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
        setWeight(value);
    }
  };

  const handleToggleUnit = () => {
    const currentWeight = parseFloat(weight) || 0;
    if (useKg) {
      // Convert kg to lbs
      setWeight((currentWeight * 2.20462).toFixed(1));
    } else {
      // Convert lbs to kg
      setWeight((currentWeight / 2.20462).toFixed(1));
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

    if (selectedComparisonItems.length >= 10) {
      toast.error("Maximum 10 items can be selected for comparison!");
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
    
    // Automatically add the new custom object to the comparison on the right side
    setSelectedComparisonItems(prev => [...prev, { ...newCustomObject, side: 'right' }]);
    
    setCustomObjectName("");
    setCustomObjectWeight("");
    toast.success(`${newCustomObject.name} created and added to comparison!`);
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

  // Get user weight in kg for internal calculations
  const getUserWeightInKg = () => {
    const parsedWeight = parseFloat(weight);
    if (isNaN(parsedWeight)) return 0;
    
    // Convert to kg if currently in lbs
    return useKg ? parsedWeight : parsedWeight * 0.453592;
  };

  const getUserWeight = () => {
    const parsedWeight = parseFloat(weight);
    return isNaN(parsedWeight) ? 0 : parsedWeight;
  };

  const formatSmallPercentage = (percentage: number): string => {
    // Start with 2 decimal places
    let decimals = 2;
    let formatted = percentage.toFixed(decimals);
    
    // If it shows 0.00, increase decimal places until we get a non-zero value
    while (parseFloat(formatted) === 0 && decimals <= 8 && percentage > 0) {
      decimals++;
      formatted = percentage.toFixed(decimals);
    }
    
    // If still 0 after 8 decimal places, use exponential notation
    if (parseFloat(formatted) === 0 && percentage > 0) {
      return percentage.toExponential(2);
    }
    
    return formatted;
  };

  const getComparisonMessage = () => {
    if (selectedComparisonItems.length === 0) return "";
    
    // Always use left side as reference
    const ratio = totalWeightLeft / totalWeightRight;
    
    if (Math.abs(ratio - 1) < 0.01) {
      return `Both sides weigh exactly the same!`;
    } else if (ratio > 1) {
      // Left side is heavier
      const wholeNumber = Math.floor(ratio);
      const decimal = ratio - wholeNumber;
      
      if (decimal < 0.1) {
        return `Left side weighs about ${wholeNumber} times more than the right side!`;
      } else {
        return `Left side weighs ${ratio.toFixed(2)} times more than the right side!`;
      }
    } else {
      // Left side is lighter (ratio < 1)
      const percentage = ratio * 100;
      const formattedPercentage = formatSmallPercentage(percentage);
      return `Left side weighs ${formattedPercentage}% of the right side!`;
    }
  };

  const getFunFact = () => {
    if (selectedComparisonItems.length === 1) {
      return selectedComparisonItems[0].fact;
    }
    return null;
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

  // Helper function to convert kg to display unit
  const convertWeight = (weightInKg: number) => {
    return useKg ? weightInKg : weightInKg * 2.20462;
  };

  const getWeightUnit = () => useKg ? 'kg' : 'lbs';

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <WeightInputCard
          weight={weight}
          useKg={useKg}
          onWeightChange={handleWeightChange}
          onToggleUnit={handleToggleUnit}
          title="Your weight"
        />

        <ItemSelectionCard
          selectedCategory={selectedCategory}
          compareToId={compareToId}
          compareToItems={compareToItems}
          selectedItemsCount={selectedComparisonItems.length}
          customObjects={customObjects}
          customObjectName={customObjectName}
          customObjectWeight={customObjectWeight}
          customObjectUseKg={customObjectUseKg}
          onCategoryChange={handleCategoryChange}
          onCompareToChange={setCompareToId}
          onAddCustomItem={handleAddCustomItem}
          onCustomNameChange={(e) => setCustomObjectName(e.target.value)}
          onCustomWeightChange={handleCustomWeightChange}
          onCustomUnitToggle={() => setCustomObjectUseKg(!customObjectUseKg)}
          onCreateCustomObject={handleCreateCustomObject}
        />
      </div>

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
                  Left Side ({convertWeight(totalWeightLeft).toFixed(1)} {getWeightUnit()})
                </h4>
                <div className="space-y-2 min-h-[100px] p-4 bg-blue-50 rounded-lg">
                  {userWeightSide === 'left' && (
                    <UserWeightWidget
                      weight={weight}
                      useKg={useKg}
                      side="left"
                      onToggleSide={handleToggleUserSide}
                    />
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
                  Right Side ({convertWeight(totalWeightRight).toFixed(1)} {getWeightUnit()})
                </h4>
                <div className="space-y-2 min-h-[100px] p-4 bg-green-50 rounded-lg">
                  {userWeightSide === 'right' && (
                  <UserWeightWidget
                    weight={weight}
                    useKg={useKg}
                    side="right"
                    onToggleSide={handleToggleUserSide}
                  />
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
        <ComparisonResult
          selectedComparisonItems={selectedComparisonItems}
          totalWeightLeft={totalWeightLeft}
          totalWeightRight={totalWeightRight}
          showScale={showScale}
          comparisonMessage={getComparisonMessage()}
          funFact={getFunFact()}
          useKg={useKg}
          weight={weight}
          userWeightSide={userWeightSide}
          onToggleScale={() => setShowScale(!showScale)}
          onSharePlatform={handleSharePlatform}
          onNativeShare={handleNativeShare}
          getUserWeight={getUserWeightInKg}
        />
      )}
    </div>
  );
};

export default WeightComparison;
