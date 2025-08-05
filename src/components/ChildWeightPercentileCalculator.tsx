import { useState, useEffect } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { differenceInDays, startOfDay } from 'date-fns';
import ChildWeightPercentileEducationalContent from "@/components/ChildWeightPercentileEducationalContent";

interface ChildPercentileResult {
  ageInMonths: number;
  weightPercentile: number;
  heightPercentile: number;
  insight?: string;
}

const ChildWeightPercentileCalculator = () => {
  const [birthDate, setBirthDate] = useState("");
  const [gender, setGender] = useState("");
  const [weight, setWeight] = useState<number | "">("");
  const [height, setHeight] = useState<number | "">("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [result, setResult] = useState<ChildPercentileResult | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  const { toast } = useToast();

  // WHO growth data approximations (simplified for demonstration)
  // In a real application, you'd use official WHO growth tables
  const getWeightPercentile = (ageInMonths: number, weightKg: number, childGender: string): number => {
    // Simplified percentile calculation using representative WHO data points
    // This is a very basic approximation - real implementation would use official WHO tables
    
    let p50Weight: number; // 50th percentile weight for age
    
    if (childGender === "male") {
      if (ageInMonths <= 12) {
        p50Weight = 3.3 + (ageInMonths * 0.7); // Birth ~3.3kg, 12mo ~11.7kg
      } else if (ageInMonths <= 24) {
        p50Weight = 11.7 + ((ageInMonths - 12) * 0.25); // 24mo ~14.7kg
      } else {
        p50Weight = 14.7 + ((ageInMonths - 24) * 0.18); // Up to 60mo
      }
    } else {
      if (ageInMonths <= 12) {
        p50Weight = 3.2 + (ageInMonths * 0.65); // Birth ~3.2kg, 12mo ~11.0kg
      } else if (ageInMonths <= 24) {
        p50Weight = 11.0 + ((ageInMonths - 12) * 0.22); // 24mo ~13.6kg
      } else {
        p50Weight = 13.6 + ((ageInMonths - 24) * 0.17); // Up to 60mo
      }
    }

    // Simple standard deviation approximation
    const stdDev = p50Weight * 0.15;
    
    // Calculate Z-score and convert to percentile
    const zScore = (weightKg - p50Weight) / stdDev;
    const percentile = normalCDF(zScore) * 100;
    
    return Math.max(0.1, Math.min(99.9, percentile));
  };

  const getHeightPercentile = (ageInMonths: number, heightCm: number, childGender: string): number => {
    // Simplified height percentile calculation
    let p50Height: number; // 50th percentile height for age
    
    if (childGender === "male") {
      if (ageInMonths <= 12) {
        p50Height = 50 + (ageInMonths * 2.2); // Birth ~50cm, 12mo ~76.4cm
      } else if (ageInMonths <= 24) {
        p50Height = 76.4 + ((ageInMonths - 12) * 1.1); // 24mo ~89.6cm
      } else {
        p50Height = 89.6 + ((ageInMonths - 24) * 0.7); // Up to 60mo
      }
    } else {
      if (ageInMonths <= 12) {
        p50Height = 49.5 + (ageInMonths * 2.1); // Birth ~49.5cm, 12mo ~74.7cm
      } else if (ageInMonths <= 24) {
        p50Height = 74.7 + ((ageInMonths - 12) * 1.0); // 24mo ~86.7cm
      } else {
        p50Height = 86.7 + ((ageInMonths - 24) * 0.65); // Up to 60mo
      }
    }

    const stdDev = p50Height * 0.05;
    const zScore = (heightCm - p50Height) / stdDev;
    const percentile = normalCDF(zScore) * 100;
    
    return Math.max(0.1, Math.min(99.9, percentile));
  };

  // Approximation of cumulative distribution function for normal distribution
  const normalCDF = (x: number): number => {
    return 0.5 * (1 + erf(x / Math.sqrt(2)));
  };

  // Error function approximation
  const erf = (x: number): number => {
    const a1 =  0.254829592;
    const a2 = -0.284496736;
    const a3 =  1.421413741;
    const a4 = -1.453152027;
    const a5 =  1.061405429;
    const p  =  0.3275911;

    const sign = x >= 0 ? 1 : -1;
    x = Math.abs(x);

    const t = 1.0 / (1.0 + p * x);
    const y = 1.0 - (((((a5 * t + a4) * t) + a3) * t + a2) * t + a1) * t * Math.exp(-x * x);

    return sign * y;
  };

  // Generate growth chart data
  const generateGrowthChartData = () => {
    const data = [];
    const childWeight = result ? (weightUnit === "kg" ? Number(weight) : Number(weight) * 0.453592) : null;
    
    // Generate data points for every month from 0 to 60
    for (let months = 0; months <= 60; months++) {
      const dataPoint: any = {
        age: months,
        p10: getWeightAtPercentile(months, 10, gender),
        p30: getWeightAtPercentile(months, 30, gender),
        p50: getWeightAtPercentile(months, 50, gender),
        p70: getWeightAtPercentile(months, 70, gender),
        p90: getWeightAtPercentile(months, 90, gender),
      };
      
      // If this month matches the child's age (within 0.5 months), add their weight
      if (result && childWeight && Math.abs(months - result.ageInMonths) < 0.5) {
        dataPoint.currentWeight = childWeight;
      }
      
      data.push(dataPoint);
    }

    return data;
  };

  const getWeightAtPercentile = (ageInMonths: number, percentile: number, childGender: string): number => {
    let p50Weight: number;
    
    if (childGender === "male") {
      if (ageInMonths <= 12) {
        p50Weight = 3.3 + (ageInMonths * 0.7);
      } else if (ageInMonths <= 24) {
        p50Weight = 11.7 + ((ageInMonths - 12) * 0.25);
      } else {
        p50Weight = 14.7 + ((ageInMonths - 24) * 0.18);
      }
    } else {
      if (ageInMonths <= 12) {
        p50Weight = 3.2 + (ageInMonths * 0.65);
      } else if (ageInMonths <= 24) {
        p50Weight = 11.0 + ((ageInMonths - 12) * 0.22);
      } else {
        p50Weight = 13.6 + ((ageInMonths - 24) * 0.17);
      }
    }

    const stdDev = p50Weight * 0.15;
    const zScore = getZScoreFromPercentile(percentile);
    return p50Weight + (zScore * stdDev);
  };

  const getZScoreFromPercentile = (percentile: number): number => {
    // Inverse normal distribution approximation
    const p = percentile / 100;
    if (p === 0.5) return 0;
    
    // Simplified approximation
    if (p < 0.5) {
      return -Math.sqrt(-2 * Math.log(p));
    } else {
      return Math.sqrt(-2 * Math.log(1 - p));
    }
  };

  const calculateAgeInMonths = (birthDateStr: string): number => {
    const birth = new Date(birthDateStr);
    const today = new Date();
    const daysDiff = differenceInDays(startOfDay(today), startOfDay(birth));
    return Math.floor(daysDiff / 30.44); // Average days per month
  };

  const calculatePercentiles = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    // Input validation
    if (!birthDate || !gender || !weight || !height) {
      toast({
        title: "Missing Information",
        description: "Please fill in all fields: birth date, gender, weight, and height.",
        variant: "destructive",
      });
      return;
    }

    const weightNum = parseFloat(String(weight));
    const heightNum = parseFloat(String(height));

    if (isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive numbers for weight and height.",
        variant: "destructive",
      });
      return;
    }

    // Calculate age
    const ageInMonths = calculateAgeInMonths(birthDate);
    
    if (ageInMonths < 0) {
      toast({
        title: "Invalid Birth Date",
        description: "Birth date cannot be in the future.",
        variant: "destructive",
      });
      return;
    }

    if (ageInMonths > 60) {
      toast({
        title: "Age Out of Range",
        description: "This calculator is designed for children aged 0-5 years (60 months).",
        variant: "destructive",
      });
      return;
    }

    // Convert units to metric
    let weightInKg = weightNum;
    if (weightUnit === "lbs") {
      weightInKg = weightNum * 0.453592;
    }

    let heightInCm = heightNum;
    if (heightUnit === "in") {
      heightInCm = heightNum * 2.54;
    }

    // Validate ranges for children
    if (weightInKg < 1 || weightInKg > 50) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a weight between 1 kg (2.2 lbs) and 50 kg (110 lbs) for children.",
        variant: "destructive",
      });
      return;
    }

    if (heightInCm < 40 || heightInCm > 140) {
      toast({
        title: "Invalid Height",
        description: "Please enter a height between 40 cm (15.7 in) and 140 cm (55.1 in) for children.",
        variant: "destructive",
      });
      return;
    }

    // Calculate percentiles
    const weightPercentile = getWeightPercentile(ageInMonths, weightInKg, gender);
    const heightPercentile = getHeightPercentile(ageInMonths, heightInCm, gender);

    setResult({
      ageInMonths,
      weightPercentile,
      heightPercentile,
    });

    // Get AI insight
    setIsLoadingInsight(true);
    try {
      const { data, error } = await supabase.functions.invoke('child-weight-percentile-insight', {
        body: {
          ageInMonths,
          weightKg: weightInKg,
          heightCm: heightInCm,
          gender,
          weightPercentile,
          heightPercentile,
        },
      });

      if (error) {
        throw error;
      }

      if (data && data.insight) {
        setResult(prev => prev ? { ...prev, insight: data.insight } : null);
      }
    } catch (error) {
      console.error('Error getting child percentile insight:', error);
      setResult(prev => prev ? { 
        ...prev, 
        insight: "Your child's growth measurements have been recorded. For personalized guidance about your child's growth and development, please consult with your pediatrician." 
      } : null);
    } finally {
      setIsLoadingInsight(false);
    }
  };

  const formatAge = (months: number): string => {
    const years = Math.floor(months / 12);
    const remainingMonths = months % 12;
    
    if (years === 0) {
      return `${months} month${months !== 1 ? 's' : ''}`;
    } else if (remainingMonths === 0) {
      return `${years} year${years !== 1 ? 's' : ''}`;
    } else {
      return `${years} year${years !== 1 ? 's' : ''} and ${remainingMonths} month${remainingMonths !== 1 ? 's' : ''}`;
    }
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Child Weight Percentile Calculator (0-5 Years)</CardTitle>
          <CardDescription>
            Track your child's growth and see how their weight and height compare to standard growth curves from WHO data.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={calculatePercentiles} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="birth-date">Child's Birth Date</Label>
                <Input
                  id="birth-date"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                  max={new Date().toISOString().split('T')[0]}
                />
              </div>
              
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="child-male" />
                    <Label htmlFor="child-male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="child-female" />
                    <Label htmlFor="child-female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <Label htmlFor="child-weight" className="text-lg font-medium">Weight</Label>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                  <div className="flex-1">
                    <Input
                      id="child-weight"
                      type="number"
                      step="0.1"
                      placeholder="Enter child's weight"
                      value={weight}
                      onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="child-weight-unit" className={cn(weightUnit === "kg" ? "font-bold" : "")}>KG</Label>
                    <Switch 
                      id="child-weight-unit"
                      checked={weightUnit === "lbs"} 
                      onCheckedChange={(checked) => setWeightUnit(checked ? "lbs" : "kg")} 
                    />
                    <Label htmlFor="child-weight-unit" className={cn(weightUnit === "lbs" ? "font-bold" : "")}>LBS</Label>
                  </div>
                </div>
              </div>

              <div className="space-y-4">
                <Label htmlFor="child-height" className="text-lg font-medium">Height</Label>
                <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                  <div className="flex-1">
                    <Input
                      id="child-height"
                      type="number"
                      step="0.1"
                      placeholder="Enter child's height"
                      value={height}
                      onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
                      className="text-lg"
                    />
                  </div>
                  <div className="flex items-center space-x-2">
                    <Label htmlFor="child-height-unit" className={cn(heightUnit === "cm" ? "font-bold" : "")}>CM</Label>
                    <Switch 
                      id="child-height-unit"
                      checked={heightUnit === "in"} 
                      onCheckedChange={(checked) => setHeightUnit(checked ? "in" : "cm")} 
                    />
                    <Label htmlFor="child-height-unit" className={cn(heightUnit === "in" ? "font-bold" : "")}>IN</Label>
                  </div>
                </div>
              </div>
            </div>

            <Button type="submit" className="w-full text-lg py-6" size="lg">
              Calculate Child's Percentiles
            </Button>

            {result && (
              <div className="space-y-6 pt-6 border-t">
                <div className="text-center space-y-2">
                  <h3 className="text-2xl font-bold">Growth Results</h3>
                  <p className="text-lg text-gray-600">
                    Age: {formatAge(result.ageInMonths)}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                    <div className="bg-blue-50 p-4 rounded-lg">
                      <h4 className="font-semibold">Weight Percentile</h4>
                      <p className="text-xl font-bold text-blue-600">
                        {result.weightPercentile.toFixed(1)}%
                      </p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg">
                      <h4 className="font-semibold">Height Percentile</h4>
                      <p className="text-xl font-bold text-green-600">
                        {result.heightPercentile.toFixed(1)}%
                      </p>
                    </div>
                  </div>
                </div>

                {gender && (
                <div className="bg-gray-50 p-4 rounded-lg">
                    <h4 className="text-lg font-semibold mb-3">Growth Chart (Weight)</h4>
                    <div className="h-64">
                      <ResponsiveContainer width="100%" height="100%">
                        <LineChart 
                          data={generateGrowthChartData()}
                          margin={{ top: 20, right: 30, left: 20, bottom: 60 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="age" 
                            label={{ value: 'Age (months)', position: 'insideBottom', offset: -40 }}
                          />
                          <YAxis 
                            label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }}
                          />
                          <Tooltip 
                            formatter={(value: number, name: string) => [
                              value ? `${value.toFixed(1)} kg` : 'Current weight',
                              name === 'p10' ? '10th %ile' : name === 'p30' ? '30th %ile' : 
                              name === 'p50' ? '50th %ile' : name === 'p70' ? '70th %ile' : 
                              name === 'p90' ? '90th %ile' : 'Your child'
                            ]}
                            labelFormatter={(age) => `Age: ${age} months`}
                          />
                          <Line type="monotone" dataKey="p10" stroke="#e11d48" strokeWidth={2} dot={false} connectNulls />
                          <Line type="monotone" dataKey="p30" stroke="#f59e0b" strokeWidth={2} dot={false} connectNulls />
                          <Line type="monotone" dataKey="p50" stroke="#10b981" strokeWidth={3} dot={false} connectNulls />
                          <Line type="monotone" dataKey="p70" stroke="#f59e0b" strokeWidth={2} dot={false} connectNulls />
                          <Line type="monotone" dataKey="p90" stroke="#e11d48" strokeWidth={2} dot={false} connectNulls />
                          {/* Add the child's current weight as a single point */}
                          <Line 
                            type="monotone" 
                            dataKey="currentWeight"
                            stroke="#3b82f6" 
                            strokeWidth={0} 
                            dot={{ r: 6, fill: '#3b82f6', stroke: '#1e40af', strokeWidth: 2 }}
                            connectNulls={false}
                          />
                        </LineChart>
                      </ResponsiveContainer>
                    </div>
                    <div className="mt-2 text-sm text-gray-600">
                      <p>The blue dot represents your child's current measurement.</p>
                      <p>Lines show: 10th (red), 30th (orange), 50th (green), 70th (orange), 90th (red) percentiles</p>
                    </div>
                  </div>
                )}

                <div className="bg-blue-50 p-6 rounded-lg">
                  <h4 className="text-lg font-semibold mb-3">Growth Insight</h4>
                  {isLoadingInsight ? (
                    <div className="flex items-center gap-2">
                      <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                      <span className="text-gray-600">Generating personalized insight...</span>
                    </div>
                  ) : (
                    <div className="space-y-3">
                      <p className="text-gray-700 leading-relaxed">{result.insight}</p>
                      <p className="text-xs text-gray-500 italic">
                        This insight is generated by AI and is for informational purposes only. It is not medical advice. Always consult a healthcare professional for personalized guidance.
                      </p>
                    </div>
                  )}
                </div>

                <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-700">
                    <strong>Important:</strong> This calculator provides simplified estimates based on WHO growth standards. 
                    Growth patterns vary widely among healthy children. For comprehensive growth monitoring and personalized 
                    advice, always consult your child's pediatrician who can assess growth in context of your child's 
                    individual health history.
                  </p>
                </div>

                <div className="bg-gray-50 border border-gray-200 p-4 rounded-lg">
                  <p className="text-sm text-gray-600">
                    <strong>Data Source:</strong> This calculator uses simplified approximations inspired by World Health Organization (WHO) 
                    growth standards for children aged 0-5 years. For official growth charts and professional monitoring, 
                    consult: <a href="https://www.who.int/tools/child-growth-standards/standards" 
                    className="text-blue-600 underline hover:text-blue-800" target="_blank" rel="noopener noreferrer">
                    WHO Child Growth Standards</a>
                  </p>
                </div>
              </div>
            )}
          </form>
        </CardContent>
      </Card>
      <ChildWeightPercentileEducationalContent />
    </div>
  );
};

export default ChildWeightPercentileCalculator;
