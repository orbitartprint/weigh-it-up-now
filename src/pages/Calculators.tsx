// src/pages/Calculators.tsx

import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import { Link, useSearchParams } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { cn } from "@/lib/utils";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";
import BmiEducationalContent from "@/components/BmiEducationalContent";
import CalorieEducationalContent from "@/components/CalorieEducationalContent";
import WeightPercentileEducationalContent from "@/components/WeightPercentileEducationalContent";
import WeightComparison from "@/components/WeightComparison";
import WeightComparisonContent from "@/components/WeightComparisonContent";
import ChildWeightPercentileEducationalContent from "@/components/ChildWeightPercentileEducationalContent"; // New import
import { WeightItem, weightItems, getItemsByCategory } from "@/data/weightItems";
import { averageWeightMen, averageWeightWomen, getAllCountries } from "@/data/averageWeights";

// Recharts imports for visual representation
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';


const Calculators = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialTab = searchParams.get("tab") || "bmi";
  const [activeTab, setActiveTab] = useState(initialTab);

  useEffect(() => {
    setSearchParams({ tab: activeTab });
  }, [activeTab, setSearchParams]);

  // BMI Calculator states
  const [heightCm, setHeightCm] = useState("");
  const [weightKg, setWeightKg] = useState("");
  const [bmiResult, setBmiResult] = useState<string | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string | null>(null);
  const [showBmiResults, setShowBmiResults] = useState(false);

  // Calorie Calculator states
  const [calorieGender, setCalorieGender] = useState("male");
  const [calorieAge, setCalorieAge] = useState("");
  const [calorieWeightKg, setCalorieWeightKg] = useState("");
  const [calorieHeightCm, setCalorieHeightCm] = useState("");
  const [activityLevel, setActivityLevel] = useState("sedentary");
  const [calorieNeedsResult, setCalorieNeedsResult] = useState<string | null>(null);
  const [showCalorieResults, setShowCalorieResults] = useState(false);

  // Weight Percentile Calculator (Adults) states
  const [percentileGender, setPercentileGender] = useState("male");
  const [percentileAge, setPercentileAge] = useState("");
  const [percentileWeightKg, setPercentileWeightKg] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("Germany");
  const [percentileResult, setPercentileResult] = useState<string | null>(null);
  const [showPercentileResults, setShowPercentileResults] = useState(false);


  // Child Weight Percentile Calculator states (NEW)
  const [childGender, setChildGender] = useState("male");
  const [childAgeMonths, setChildAgeMonths] = useState("");
  const [childWeightKg, setChildWeightKg] = useState("");
  const [childPercentileResult, setChildPercentileResult] = useState<string | null>(null);
  const [childPercentileCategory, setChildPercentileCategory] = useState<string | null>(null);
  const [showChildResults, setShowChildResults] = useState(false);

  // Placeholder WHO Percentile Data (simplified for demonstration)
  // In a real application, this data would be comprehensive and imported from a reliable source.
  const whoPercentileData = {
    male: [
      { ageMonths: 0, p3: 2.5, p50: 3.3, p97: 4.5 },
      { ageMonths: 6, p3: 6.0, p50: 7.9, p97: 10.0 },
      { ageMonths: 12, p3: 7.7, p50: 9.9, p97: 12.5 },
      { ageMonths: 24, p3: 9.5, p50: 12.0, p97: 15.0 },
      { ageMonths: 36, p3: 11.0, p50: 13.9, p97: 17.0 },
      { ageMonths: 48, p3: 12.5, p50: 15.5, p97: 19.0 },
      { ageMonths: 60, p3: 13.5, p50: 16.8, p97: 21.0 },
    ],
    female: [
      { ageMonths: 0, p3: 2.4, p50: 3.2, p97: 4.4 },
      { ageMonths: 6, p3: 5.5, p50: 7.3, p97: 9.5 },
      { ageMonths: 12, p3: 7.0, p50: 9.2, p97: 11.8 },
      { ageMonths: 24, p3: 9.0, p50: 11.5, p97: 14.5 },
      { ageMonths: 36, p3: 10.5, p50: 13.3, p97: 16.5 },
      { ageMonths: 48, p3: 11.8, p50: 14.8, p97: 18.2 },
      { ageMonths: 60, p3: 13.0, p50: 16.2, p97: 20.0 },
    ],
  };

  const calculateChildPercentile = () => {
    const age = parseInt(childAgeMonths);
    const weight = parseFloat(childWeightKg);

    if (isNaN(age) || isNaN(weight) || age < 0 || weight <= 0) {
      setChildPercentileResult("Please enter valid age and weight.");
      setChildPercentileCategory(null);
      setShowChildResults(true);
      return;
    }

    const dataForGender = whoPercentileData[childGender as keyof typeof whoPercentileData];
    if (!dataForGender || dataForGender.length === 0) {
      setChildPercentileResult("No data available for the selected gender.");
      setChildPercentileCategory(null);
      setShowChildResults(true);
      return;
    }

    // Find the closest age group in the data
    let lowerBound = dataForGender[0];
    let upperBound = dataForGender[dataForGender.length - 1];

    for (let i = 0; i < dataForGender.length - 1; i++) {
      if (age >= dataForGender[i].ageMonths && age <= dataForGender[i + 1].ageMonths) {
        lowerBound = dataForGender[i];
        upperBound = dataForGender[i + 1];
        break;
      }
    }

    // Simple linear interpolation (for demonstration purposes)
    const interpolate = (val: number, x1: number, y1: number, x2: number, y2: number) => {
      if (x1 === x2) return y1;
      return y1 + ((val - x1) * (y2 - y1)) / (x2 - x1);
    };

    const p3_interpolated = interpolate(age, lowerBound.ageMonths, lowerBound.p3, upperBound.ageMonths, upperBound.p3);
    const p50_interpolated = interpolate(age, lowerBound.ageMonths, lowerBound.p50, upperBound.ageMonths, upperBound.p50);
    const p97_interpolated = interpolate(age, lowerBound.ageMonths, lowerBound.p97, upperBound.ageMonths, upperBound.p97);

    let percentile: number;
    let category: string;

    if (weight <= p3_interpolated) {
      percentile = Math.round((weight / p3_interpolated) * 3);
      category = "Underweight";
    } else if (weight <= p50_interpolated) {
      percentile = Math.round(3 + ((weight - p3_interpolated) / (p50_interpolated - p3_interpolated)) * 47);
      category = "Normal Weight";
    } else if (weight <= p97_interpolated) {
      percentile = Math.round(50 + ((weight - p50_interpolated) / (p97_interpolated - p50_interpolated)) * 47);
      category = "At Risk of Overweight";
    } else {
      percentile = Math.round(97 + ((weight - p97_interpolated) / (p97_interpolated * 0.1)) * 3); // Simple extrapolation
      category = "Overweight";
    }

    // Cap percentile at 99.9 or 100 for display
    percentile = Math.min(Math.max(0, percentile), 100);

    setChildPercentileResult(`Your child's weight is at the ${percentile}th percentile.`);
    setChildPercentileCategory(category);
    setShowChildResults(true);
  };


  const calculateBmi = () => {
    const heightM = parseFloat(heightCm) / 100;
    const weight = parseFloat(weightKg);

    if (isNaN(heightM) || isNaN(weight) || heightM <= 0 || weight <= 0) {
      setBmiResult("Please enter valid height and weight.");
      setBmiCategory(null);
      setShowBmiResults(true);
      return;
    }

    const bmi = weight / (heightM * heightM);
    const calculatedBmi = bmi.toFixed(2);

    let category = "";
    if (bmi < 18.5) {
      category = "Underweight";
    } else if (bmi >= 18.5 && bmi < 24.9) {
      category = "Normal Weight";
    } else if (bmi >= 25 && bmi < 29.9) {
      category = "Overweight";
    } else {
      category = "Obesity";
    }

    setBmiResult(`Your BMI is ${calculatedBmi}`);
    setBmiCategory(category);
    setShowBmiResults(true);
  };

  const calculateCalorieNeeds = () => {
    const age = parseInt(calorieAge);
    const weight = parseFloat(calorieWeightKg);
    const height = parseFloat(calorieHeightCm);

    if (isNaN(age) || isNaN(weight) || isNaN(height) || age <= 0 || weight <= 0 || height <= 0) {
      setCalorieNeedsResult("Please enter valid age, weight, and height.");
      setShowCalorieResults(true);
      return;
    }

    let bmr;
    if (calorieGender === "male") {
      bmr = 88.362 + (13.397 * weight) + (4.799 * height) - (5.677 * age);
    } else {
      bmr = 447.593 + (9.247 * weight) + (3.098 * height) - (4.330 * age);
    }

    let tdee; // Total Daily Energy Expenditure
    switch (activityLevel) {
      case "sedentary":
        tdee = bmr * 1.2;
        break;
      case "lightly-active":
        tdee = bmr * 1.375;
        break;
      case "moderately-active":
        tdee = bmr * 1.55;
        break;
      case "very-active":
        tdee = bmr * 1.725;
        break;
      case "extra-active":
        tdee = bmr * 1.9;
        break;
      default:
        tdee = bmr * 1.2;
    }

    setCalorieNeedsResult(`Your estimated daily calorie needs are ${tdee.toFixed(0)} kcal.`);
    setShowCalorieResults(true);
  };

  const calculatePercentile = () => {
    const age = parseInt(percentileAge);
    const weight = parseFloat(percentileWeightKg);

    if (isNaN(age) || isNaN(weight) || age <= 0 || weight <= 0) {
      setPercentileResult("Please enter valid age and weight.");
      setShowPercentileResults(true);
      return;
    }

    const averageWeights = percentileGender === "male" ? averageWeightMen : averageWeightWomen;
    const countryData = averageWeights.find(data => data.country === selectedCountry);

    if (!countryData) {
      setPercentileResult("No average weight data available for the selected country.");
      setShowPercentileResults(true);
      return;
    }

    const ageGroup = countryData.age_groups.find(group => age >= group.min_age && age <= group.max_age);

    if (!ageGroup) {
      setPercentileResult("No average weight data for your age group in the selected country.");
      setShowPercentileResults(true);
      return;
    }

    const averageWeight = ageGroup.average_weight_kg;
    const stdDev = ageGroup.standard_deviation_kg;

    // A simplified percentile calculation (for demonstration, a full statistical model would be complex)
    let percentile;
    if (weight < averageWeight - stdDev) {
      percentile = "below 16th"; // Roughly 16th percentile for 1 standard deviation below mean
    } else if (weight >= averageWeight - stdDev && weight <= averageWeight + stdDev) {
      percentile = "between 16th and 84th"; // Roughly between 16th and 84th percentile
    } else {
      percentile = "above 84th"; // Roughly above 84th percentile
    }

    // For a more precise percentile, one would use a Z-score and normal distribution table.
    // This is a simplified example.
    const approximatePercentile = ((weight - averageWeight) / (2 * stdDev) * 40 + 50).toFixed(0);

    setPercentileResult(
      `For a ${age}-year-old ${percentileGender} in ${selectedCountry}, the average weight is ${averageWeight} kg (± ${stdDev} kg). ` +
      `Your weight of ${weight} kg is approximately at the ${approximatePercentile}th percentile for your group. ` +
      `This means you are ${percentile} percentile.`
    );
    setShowPercentileResults(true);
  };

  // Weight Comparison Calculator states
  const [userWeight, setUserWeight] = useState<number | ''>('');
  const [userUnit, setUserUnit] = useState<'kg' | 'lbs'>('kg');
  const [compareToItems, setCompareToItems] = useState<WeightItem[]>([]);
  const [selectedComparisonItems, setSelectedComparisonItems] = useState<WeightItem[]>([]);
  const [totalWeightLeft, setTotalWeightLeft] = useState(0);
  const [totalWeightRight, setTotalWeightRight] = useState(0);
  const [userWeightSide, setUserWeightSide] = useState<'left' | 'right'>('left');
  const [showScale, setShowScale] = useState(false);
  const [customObjects, setCustomObjects] = useState<{ name: string; weight: number; useKg: boolean }[]>([]);
  const [customObjectName, setCustomObjectName] = useState("");
  const [customObjectWeight, setCustomObjectWeight] = useState<string>("");
  const [customObjectUseKg, setCustomObjectUseKg] = useState(true);

  const { toast } = useToast();

  const handleBmiHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setHeightCm(value);
    }
  };

  const handleBmiWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setWeightKg(value);
    }
  };

  const handleCalorieAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === "") {
      setCalorieAge(value);
    }
  };

  const handleCalorieWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setCalorieWeightKg(value);
    }
  };

  const handleCalorieHeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setCalorieHeightCm(value);
    }
  };

  const handlePercentileAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*$/.test(value) || value === "") {
      setPercentileAge(value);
    }
  };

  const handlePercentileWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setPercentileWeightKg(value);
    }
  };

  // Child Weight Percentile Handlers (NEW)
  const handleChildAgeMonthsChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow only integers for months, from 0 to 60 (5 years) as a plausible range for WHO charts
    if (/^\d*$/.test(value) && parseInt(value) >= 0 && parseInt(value) <= 60 || value === "") {
      setChildAgeMonths(value);
    } else if (parseInt(value) > 60) {
      toast({
        title: "Input Error",
        description: "Age in months should not exceed 60 months (5 years) for this calculator.",
        variant: "destructive",
      });
    }
  };

  const handleChildWeightKgChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    // Allow positive numbers with decimals, setting a reasonable upper limit like 30kg for children up to 5 years
    if (/^\d*\.?\d*$/.test(value) && parseFloat(value) > 0 && parseFloat(value) <= 30 || value === "") {
      setChildWeightKg(value);
    } else if (parseFloat(value) > 30) {
      toast({
        title: "Input Error",
        description: "Weight in kg should not exceed 30 kg for this calculator.",
        variant: "destructive",
      });
    }
  };


  const handleTabChange = (value: string) => {
    setActiveTab(value);
    setShowBmiResults(false);
    setShowCalorieResults(false);
    setShowPercentileResults(false);
    setShowChildResults(false); // Reset child results on tab change
    // Reset Weight Comparison state when changing tabs
    setUserWeight('');
    setUserUnit('kg');
    setCompareToItems([]);
    setSelectedComparisonItems([]);
    setTotalWeightLeft(0);
    setTotalWeightRight(0);
    setUserWeightSide('left');
    setShowScale(false);
    setCustomObjects([]);
    setCustomObjectName('');
    setCustomObjectWeight('');
    setCustomObjectUseKg(true);
  };


  return (
    <>
      <Helmet>
        <title>Calculators - WeightVs.com</title>
        <meta name="description" content="Use our health calculators for BMI, daily calorie needs, weight percentiles, and fun weight comparisons." />
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <div className="flex-grow container mx-auto px-4 py-8">
          <h1 className="text-4xl font-bold text-center mb-8">Health Calculators & Tools</h1>

          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={handleTabChange} className="w-full">
              <TabsList className="grid w-full grid-cols-5 h-auto"> {/* Adjusted grid-cols to 5 */}
                <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
                <TabsTrigger value="calories">Calorie Calculator</TabsTrigger>
                <TabsTrigger value="percentile">Weight Percentile</TabsTrigger>
                <TabsTrigger value="comparison">Weight Comparison</TabsTrigger>
                <TabsTrigger value="child-weight-percentile">Child Weight Percentile</TabsTrigger> {/* New Tab */}
              </TabsList>

              <TabsContent value="bmi" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>BMI Calculator</CardTitle>
                    <CardDescription>
                      Calculate your Body Mass Index (BMI) to assess if you are in a healthy weight range.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="height">Height (cm)</Label>
                      <Input
                        id="height"
                        type="number"
                        placeholder="e.g., 175"
                        value={heightCm}
                        onChange={handleBmiHeightChange}
                        min="50"
                        max="250"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="weight">Weight (kg)</Label>
                      <Input
                        id="weight"
                        type="number"
                        placeholder="e.g., 70"
                        value={weightKg}
                        onChange={handleBmiWeightChange}
                        min="20"
                        max="300"
                      />
                    </div>
                    <Button onClick={calculateBmi}>Calculate BMI</Button>

                    {showBmiResults && bmiResult && (
                      <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold">{bmiResult}</h3>
                        {bmiCategory && <p className="text-sm text-gray-700 dark:text-gray-300">Category: {bmiCategory}</p>}
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          <h4 className="font-medium">AI Output:</h4>
                          <p>
                            Based on your BMI of {bmiResult}, which falls into the "{bmiCategory}" category,
                            it is important to understand what this means for your health.
                            BMI is a screening tool and does not diagnose body fatness or health.
                            Consult a healthcare professional for a comprehensive health assessment.
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <h4 className="font-medium">Disclaimer:</h4>
                          <p>
                            This BMI calculation is for informational purposes only and should not be used as a substitute for professional medical advice.
                            Individual health needs vary.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <BmiEducationalContent />
              </TabsContent>

              <TabsContent value="calories" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Calorie Needs Calculator</CardTitle>
                    <CardDescription>
                      Estimate your daily calorie needs based on your age, gender, weight, height, and activity level.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <RadioGroup value={calorieGender} onValueChange={setCalorieGender} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male-calorie" />
                          <Label htmlFor="male-calorie">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female-calorie" />
                          <Label htmlFor="female-calorie">Female</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calorie-age">Age (years)</Label>
                      <Input
                        id="calorie-age"
                        type="number"
                        placeholder="e.g., 30"
                        value={calorieAge}
                        onChange={handleCalorieAgeChange}
                        min="1"
                        max="120"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calorie-weight">Weight (kg)</Label>
                      <Input
                        id="calorie-weight"
                        type="number"
                        placeholder="e.g., 70"
                        value={calorieWeightKg}
                        onChange={handleCalorieWeightChange}
                        min="20"
                        max="300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="calorie-height">Height (cm)</Label>
                      <Input
                        id="calorie-height"
                        type="number"
                        placeholder="e.g., 175"
                        value={calorieHeightCm}
                        onChange={handleCalorieHeightChange}
                        min="50"
                        max="250"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="activity-level">Activity Level</Label>
                      <Select value={activityLevel} onValueChange={setActivityLevel}>
                        <SelectTrigger id="activity-level">
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="sedentary">Sedentary (little or no exercise)</SelectItem>
                          <SelectItem value="lightly-active">Lightly active (light exercise/sports 1-3 days/week)</SelectItem>
                          <SelectItem value="moderately-active">Moderately active (moderate exercise/sports 3-5 days/week)</SelectItem>
                          <SelectItem value="very-active">Very active (hard exercise/sports 6-7 days/week)</SelectItem>
                          <SelectItem value="extra-active">Extra active (very hard exercise/physical job)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateCalorieNeeds}>Calculate Calorie Needs</Button>

                    {showCalorieResults && calorieNeedsResult && (
                      <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold">{calorieNeedsResult}</h3>
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          <h4 className="font-medium">AI Output:</h4>
                          <p>
                            Understanding your daily calorie needs is crucial for weight management.
                            If your goal is weight loss, you might aim for a slight calorie deficit,
                            while for weight gain, a surplus is needed. For maintenance, consume close to your estimated needs.
                            Remember that these are estimates, and individual needs can vary.
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <h4 className="font-medium">Disclaimer:</h4>
                          <p>
                            This calorie needs estimation is for informational purposes only.
                            It should not replace personalized advice from a registered dietitian or healthcare professional.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <CalorieEducationalContent />
              </TabsContent>

              <TabsContent value="percentile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Adult Weight Percentile Calculator</CardTitle>
                    <CardDescription>
                      See how your weight compares to others in your age group and country.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Gender</Label>
                      <RadioGroup value={percentileGender} onValueChange={setPercentileGender} className="flex space-x-4">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="male" id="male-percentile" />
                          <Label htmlFor="male-percentile">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="female" id="female-percentile" />
                          <Label htmlFor="female-percentile">Female</Label>
                        </div>
                      </RadioGroup>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="percentile-age">Age (years)</Label>
                      <Input
                        id="percentile-age"
                        type="number"
                        placeholder="e.g., 30"
                        value={percentileAge}
                        onChange={handlePercentileAgeChange}
                        min="18"
                        max="100"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="percentile-weight">Weight (kg)</Label>
                      <Input
                        id="percentile-weight"
                        type="number"
                        placeholder="e.g., 70"
                        value={percentileWeightKg}
                        onChange={handlePercentileWeightChange}
                        min="20"
                        max="300"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country-select">Country</Label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger id="country-select">
                          <SelectValue placeholder="Select your country" />
                        </SelectTrigger>
                        <SelectContent>
                          {getAllCountries().map(country => (
                            <SelectItem key={country} value={country}>{country}</SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculatePercentile}>Calculate Percentile</Button>

                    {showPercentileResults && percentileResult && (
                      <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold">Your Percentile Result:</h3>
                        <p className="text-sm text-gray-700 dark:text-gray-300">{percentileResult}</p>
                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          <h4 className="font-medium">AI Output:</h4>
                          <p>
                            Understanding your weight percentile can offer insight into how your weight compares to your peers.
                            It's a statistical measure, not a direct health assessment.
                            For a complete picture of your health, consider other factors like body composition, lifestyle, and medical history.
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <h4 className="font-medium">Disclaimer:</h4>
                          <p>
                            This weight percentile calculation is based on generalized population data and is for informational purposes only.
                            It does not account for individual variations in body composition, genetics, or health conditions.
                            Consult a healthcare professional for personalized health advice.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <WeightPercentileEducationalContent />
              </TabsContent>

              <TabsContent value="comparison" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Weight Comparison Tool</CardTitle>
                    <CardDescription>
                      Compare your weight to everyday objects or combinations of items.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="pt-6">
                    <WeightComparison
                      userWeight={userWeight}
                      setUserWeight={setUserWeight}
                      userUnit={userUnit}
                      setUserUnit={setUserUnit}
                      compareToItems={compareToItems}
                      setCompareToItems={setCompareToItems}
                      selectedComparisonItems={selectedComparisonItems}
                      setSelectedComparisonItems={setSelectedComparisonItems}
                      totalWeightLeft={totalWeightLeft}
                      setTotalWeightLeft={setTotalWeightLeft}
                      totalWeightRight={totalWeightRight}
                      setTotalWeightRight={setTotalWeightRight}
                      userWeightSide={userWeightSide}
                      setUserWeightSide={setUserWeightSide}
                      showScale={showScale}
                      setShowScale={setShowScale}
                      customObjects={customObjects}
                      setCustomObjects={setCustomObjects}
                      customObjectName={customObjectName}
                      setCustomObjectName={setCustomObjectName}
                      customObjectWeight={customObjectWeight}
                      setCustomObjectWeight={setCustomObjectWeight}
                      customObjectUseKg={customObjectUseKg}
                      setCustomObjectUseKg={setCustomObjectUseKg}
                    />
                  </CardContent>
                </Card>
                <WeightComparisonContent />
              </TabsContent>

              {/* New Child Weight Percentile Tab Content */}
              <TabsContent value="child-weight-percentile" className="mt-6">
                <Card>
                  <CardHeader>
                    <CardTitle>Child Weight Percentile Calculator (WHO Data)</CardTitle>
                    <CardDescription>
                      Assess your child's growth by calculating their weight percentile based on WHO data.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="space-y-2">
                      <Label>Child's Gender</Label>
                      <RadioGroup value={childGender} onValueChange={setChildGender} className="flex space-x-4">
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
                    <div className="space-y-2">
                      <Label htmlFor="child-age-months">Child's Age (months, max 60)</Label>
                      <Input
                        id="child-age-months"
                        type="number"
                        placeholder="e.g., 24"
                        value={childAgeMonths}
                        onChange={handleChildAgeMonthsChange}
                        min="0"
                        max="60"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="child-weight-kg">Child's Weight (kg, max 30)</Label>
                      <Input
                        id="child-weight-kg"
                        type="number"
                        placeholder="e.g., 12.5"
                        value={childWeightKg}
                        onChange={handleChildWeightKgChange}
                        min="0.1"
                        max="30"
                      />
                    </div>
                    <Button onClick={calculateChildPercentile}>Calculate Child Percentile</Button>

                    {showChildResults && childPercentileResult && (
                      <div className="mt-4 p-4 border rounded-md bg-gray-50 dark:bg-gray-800">
                        <h3 className="text-lg font-semibold">{childPercentileResult}</h3>
                        {childPercentileCategory && <p className="text-sm text-gray-700 dark:text-gray-300">Category: {childPercentileCategory}</p>}

                        <div className="mt-6 h-64">
                          <h4 className="font-medium mb-2">Visual Representation:</h4>
                          <ResponsiveContainer width="100%" height="100%">
                            <LineChart
                              data={whoPercentileData[childGender as keyof typeof whoPercentileData]}
                              margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                            >
                              <CartesianGrid strokeDasharray="3 3" />
                              <XAxis dataKey="ageMonths" label={{ value: "Age (Months)", position: "insideBottom", offset: 0 }} />
                              <YAxis label={{ value: "Weight (kg)", angle: -90, position: "insideLeft" }} />
                              <Tooltip />
                              <Line type="monotone" dataKey="p3" stroke="#8884d8" name="3rd Percentile" dot={false} />
                              <Line type="monotone" dataKey="p50" stroke="#82ca9d" name="50th Percentile" dot={false} />
                              <Line type="monotone" dataKey="p97" stroke="#ffc658" name="97th Percentile" dot={false} />
                              {childAgeMonths && childWeightKg && (
                                <ReferenceLine
                                  x={parseInt(childAgeMonths)}
                                  y={parseFloat(childWeightKg)}
                                  label={{ value: "Your Child", position: "top" }}
                                  stroke="red"
                                  strokeDasharray="3 3"
                                  is
                                  segment={[{ x: parseInt(childAgeMonths), y: parseFloat(childWeightKg) }]}
                                />
                              )}
                               <Line dataKey="childWeight" stroke="red" dot={{ r: 8 }} activeDot={false} />
                            </LineChart>
                          </ResponsiveContainer>
                          {childAgeMonths && childWeightKg && (
                            <p className="text-center text-sm text-gray-600 dark:text-gray-400 mt-2">
                              Your child's weight (red dot) at {childAgeMonths} months and {childWeightKg} kg.
                            </p>
                          )}
                        </div>

                        <div className="mt-4 text-sm text-gray-600 dark:text-gray-400">
                          <h4 className="font-medium">AI Output:</h4>
                          <p>
                            The child weight percentile helps track a child's growth pattern relative to other children of the same age and gender.
                            Being within a certain percentile range is generally considered healthy, but significant deviations or sudden changes
                            should be discussed with a pediatrician. This tool uses simplified WHO growth chart data for illustration.
                          </p>
                        </div>
                        <div className="mt-2 text-xs text-gray-500 dark:text-gray-400">
                          <h4 className="font-medium">Disclaimer:</h4>
                          <p>
                            This Child Weight Percentile Calculator is for general informational purposes only and is based on simplified WHO growth data.
                            It is not a substitute for professional medical advice, diagnosis, or treatment.
                            Always consult with your pediatrician or another qualified healthcare provider regarding your child's growth and health.
                          </p>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
                <ChildWeightPercentileEducationalContent /> {/* New Educational Content */}
              </TabsContent>
            </Tabs>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default Calculators;
