
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BarChart3, Scale, Share2, Twitter, Facebook, Mail, Copy } from "lucide-react";
import { WeightItem } from "@/data/weightItems";
import ScaleComparison from "./ScaleComparison";

interface ComparisonResultProps {
  selectedComparisonItems: (WeightItem & { side: 'left' | 'right' })[];
  totalWeightLeft: number;
  totalWeightRight: number;
  showScale: boolean;
  comparisonMessage: string;
  funFact: string | null;
  useKg: boolean;
  weight: string;
  userWeightSide: 'left' | 'right';
  onToggleScale: () => void;
  onSharePlatform: (platform: string) => void;
  onNativeShare: () => void;
  getUserWeight: () => number;
}

const ComparisonResult: React.FC<ComparisonResultProps> = ({
  selectedComparisonItems,
  totalWeightLeft,
  totalWeightRight,
  showScale,
  comparisonMessage,
  funFact,
  useKg,
  weight,
  userWeightSide,
  onToggleScale,
  onSharePlatform,
  onNativeShare,
  getUserWeight
}) => {
  return (
    <Card className="mb-8 scale-appear">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Comparison Result</CardTitle>
        <Button
          variant="outline"
          size="sm"
          onClick={onToggleScale}
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
            {comparisonMessage}
          </h3>
          {funFact && (
            <p className="text-center text-muted-foreground italic mb-2">
              Fun fact: {funFact}
            </p>
          )}
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
              message: comparisonMessage,
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
                    onClick={() => onSharePlatform('twitter')}
                    className="flex items-center gap-2"
                  >
                    <Twitter size={16} />
                    Twitter
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSharePlatform('facebook')}
                    className="flex items-center gap-2"
                  >
                    <Facebook size={16} />
                    Facebook
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSharePlatform('whatsapp')}
                    className="flex items-center gap-2"
                  >
                    <Share2 size={16} />
                    WhatsApp
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => onSharePlatform('email')}
                    className="flex items-center gap-2"
                  >
                    <Mail size={16} />
                    Email
                  </Button>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => onSharePlatform('copy')}
                  className="w-full flex items-center gap-2 mt-2"
                >
                  <Copy size={16} />
                  Copy Link
                </Button>
                {navigator.share && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onNativeShare}
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
  );
};

export default ComparisonResult;
