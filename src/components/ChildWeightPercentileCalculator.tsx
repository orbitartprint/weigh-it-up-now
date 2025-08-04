import { useState, useEffect, useMemo } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';
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
    for (let months = 0; months <= 60; months += 6) {
      const p10Weight = getWeightAtPercentile(months, 10, gender);
      const p30Weight = getWeightAtPercentile(months, 30, gender);
      const p50Weight = getWeightAtPercentile(months, 50, gender);
      const p70Weight = getWeightAtPercentile(months, 70, gender);
      const p90Weight = getWeightAtPercentile(months, 90, gender);

      data.push({
        age: months,
        p10: p10Weight,
        p30: p30Weight,
        p50: p50Weight,
        p70: p70Weight,
        p90: p90Weight,
      });
    }

    // Add the child's current data point if we have results
    if (result) {
      const childWeight = weightUnit === "kg" ? Number(weight) : Number(weight) * 0.453592;
      data.push({
        age: result.ageInMonths,
        p10: null,
        p30: null,
        p50: null,
        p70: null,
        p90: null,
        currentWeight: childWeight,
      });
      
      // Sort by age to ensure proper order
      data.sort((a, b) => a.age - b.age);
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

  const chartData = useMemo(() => {
    if (!result || !DUMMY_PERCENTILE_DATA[gender]) return [];
    
    const baseData = DUMMY_PERCENTILE_DATA[gender].weight;
    const newDataPoint = { ageInMonths: result.ageInMonths, value: weightInKg, isUserPoint: true };
    
    // Sortiere alle Datenpunkte nach Alter, um eine durchgängige Linie zu gewährleisten
    const combinedData = [...baseData, newDataPoint].sort((a, b) => a.ageInMonths - b.ageInMonths);
    
    // Füge Lücken-Datenpunkte für die Graphen hinzu (z.B. p3, p15 etc.)
    return combinedData.map(d => ({
        ...d,
        p3: d.p3 || null,
        p15: d.p15 || null,
        p50: d.p50 || null,
        p85: d.p85 || null,
        p97: d.p97 || null,
        userWeight: d.isUserPoint ? weightInKg : null,
    }));

  return (
    <div className="container mx-auto px-4 py-12">
      <Card>
        <CardHeader>
          <CardTitle>Child Weight Percentile Calculator</CardTitle>
          <CardDescription>
            Calculate and track your child's weight percentile based on age and gender.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={(e) => { e.preventDefault(); calculatePercentiles(); }}>
            {/* ... Formularfelder wie gehabt ... */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="birthDate">Date of Birth</Label>
                <Input
                  id="birthDate"
                  type="date"
                  value={birthDate}
                  onChange={(e) => setBirthDate(e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label>Gender</Label>
                <RadioGroup onValueChange={setGender} value={gender} className="flex h-10 items-center justify-start gap-4">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="male" id="male" />
                    <Label htmlFor="male">Male</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="female" id="female" />
                    <Label htmlFor="female">Female</Label>
                  </div>
                </RadioGroup>
              </div>
              <div className="space-y-2">
                <Label htmlFor="weight">Weight</Label>
                <div className="flex gap-2">
                  <Input
                    id="weight"
                    type="number"
                    value={weight}
                    onChange={(e) => setWeight(e.target.value === "" ? "" : Number(e.target.value))}
                    className="flex-1"
                    placeholder="e.g., 8.5"
                  />
                  <Select onValueChange={setWeightUnit} value={weightUnit}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="kg">kg</SelectItem>
                      <SelectItem value="lbs">lbs</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="height">Height (Optional)</Label>
                <div className="flex gap-2">
                  <Input
                    id="height"
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value === "" ? "" : Number(e.target.value))}
                    className="flex-1"
                    placeholder="e.g., 72"
                  />
                  <Select onValueChange={setHeightUnit} value={heightUnit}>
                    <SelectTrigger className="w-[100px]">
                      <SelectValue placeholder="Unit" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="cm">cm</SelectItem>
                      <SelectItem value="in">in</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <Button type="submit" className="mt-4 w-full">
              Calculate Percentile
            </Button>
            
            {result && (
              <div className="mt-8 space-y-6">
                <Card className="bg-primary text-primary-foreground">
                  <CardContent className="p-6">
                    <h3 className="text-xl font-bold mb-2">Your Child's Percentile</h3>
                    <div className="flex justify-between items-center text-3xl font-extrabold">
                      <span>Weight:</span>
                      <span>{result.weightPercentile}%</span>
                    </div>
                    <p className="mt-4 text-sm opacity-80">
                      Your child's weight is at the {result.weightPercentile}th percentile, meaning they weigh more than {result.weightPercentile}% of children their age and gender.
                    </p>
                  </CardContent>
                </Card>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold">Weight Percentile Chart</h3>
                  <div className="w-full h-80">
                    <ResponsiveContainer>
                      <LineChart
                        data={chartData}
                        margin={{ top: 5, right: 20, left: 10, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="ageInMonths" label={{ value: 'Age (Months)', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Weight (kg)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip />
                        
                        {/* WICHTIG: Hier sind die Änderungen. Nur eine Line pro Perzentilkurve.
                           Die "Lücke" ist geschlossen, da der Nutzerwert jetzt ein Teil der Datenreihe ist. */}
                        <Line type="monotone" dataKey="p3" stroke="#ccc" dot={false} strokeWidth={1} name="3rd Percentile" />
                        <Line type="monotone" dataKey="p15" stroke="#ccc" dot={false} strokeWidth={1} name="15th Percentile" />
                        <Line type="monotone" dataKey="p50" stroke="#8884d8" dot={false} strokeWidth={2} name="50th Percentile" />
                        <Line type="monotone" dataKey="p85" stroke="#ccc" dot={false} strokeWidth={1} name="85th Percentile" />
                        <Line type="monotone" dataKey="p97" stroke="#ccc" dot={false} strokeWidth={1} name="97th Percentile" />
                        
                        {/* Die Linie für den eigenen Messwert wird nun durch eine separate Line-Komponente dargestellt.
                           Dies sorgt dafür, dass nur dieser eine Punkt sichtbar ist und nicht mit den Perzentilkurven kollidiert. */}
                        <Line
                          type="monotone"
                          dataKey="userWeight"
                          stroke="transparent" // Transparente Linie, da nur der Punkt wichtig ist
                          dot={{ r: 6, fill: '#007bff' }} // Blauer Punkt
                          activeDot={false}
                          name="Your Child"
                          strokeWidth={0}
                        />
                      </LineChart>
                    </ResponsiveContainer>
                  </div>
                </div>

                <div className="space-y-4 text-center">
                  {/* ... weitere Hinweise und Inhalt ... */}
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
