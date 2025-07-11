import { useState, useEffect } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
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
import { averageWeightMen, averageWeightWomen, getAllCountries } from "@/data/averageWeightData";
import { calculateWeightPercentile } from "@/utils/statistics";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("bmi");

  // Shared state for weight and height across calculators
  const [sharedWeight, setSharedWeight] = useState<number | "">("");
  const [sharedHeight, setSharedHeight] = useState<number | "">("");
  const [sharedWeightUnit, setSharedWeightUnit] = useState("kg");
  const [sharedHeightUnit, setSharedHeightUnit] = useState("cm");

  // BMI Calculator state
  const [bmiResult, setBmiResult] = useState<{
    value: number;
    category: string;
    insight?: string;
  } | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);

  // Daily Calorie Calculator state
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("");
  const [activityLevel, setActivityLevel] = useState([3]);
  const [weightGoal, setWeightGoal] = useState("");
  const [calorieResult, setCalorieResult] = useState<{
    bmr: number;
    tdee: number;
    advice?: string;
  } | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

  // Weight Percentile Calculator state
  const [percentileGender, setPercentileGender] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [percentileResult, setPercentileResult] = useState<{
    percentile: number;
    meanWeight: number;
    // Added these to store the values used for the calculation, to ensure consistency in display
    calculatedGender: string;
    calculatedCountry: string;
    insight?: string;
  } | null>(null);
  const [isLoadingPercentileInsight, setIsLoadingPercentileInsight] = useState(false);

  const { toast } = useToast();

  // Activity level mapping
  const activityLevels = [
    { step: 1, label: "Sedentary (little to no exercise)", factor: 1.2 },
    { step: 2, label: "Lightly Active (light exercise 1-3 days/week)", factor: 1.375 },
    { step: 3, label: "Moderately Active (moderate exercise 3-5 days/week)", factor: 1.55 },
    { step: 4, label: "Very Active (hard exercise 6-7 days/week)", factor: 1.725 },
    { step: 5, label: "Extra Active (very hard exercise & physical job)", factor: 1.9 }
  ];

  // Helper function for BMI Category
  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi <= 24.9) return "Normal Weight";
    if (bmi <= 29.9) return "Overweight";
    return "Obese";
  };

  // Helper functions for BMI Scale display
  const getBMIColor = (bmi: number): string => {
    if (bmi < 18.5) return "bg-blue-400";
    if (bmi <= 24.9) return "bg-green-400";
    if (bmi <= 29.9) return "bg-yellow-400";
    return "bg-red-400";
  };

  const getBMIPosition = (bmi: number): number => {
    const minBMI = 15;
    const maxBMI = 40;
    return Math.min(Math.max(((bmi - minBMI) / (maxBMI - minBMI)) * 100, 0), 100);
  };

  // BMI Calculation Function
  const calculateBMI = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }

    const weightNum = parseFloat(String(sharedWeight));
    const heightNum = parseFloat(String(sharedHeight));

    // Input Validation
    if (!sharedWeight || !sharedHeight || isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive numbers for both weight and height.",
        variant: "destructive",
      });
      return;
    }

    // Plausible limits validation
    let weightInKg = weightNum;
    if (sharedWeightUnit === "lbs") {
      weightInKg = weightNum * 0.453592;
    }

    let heightInCm = heightNum;
    if (sharedHeightUnit === "in") {
      heightInCm = heightNum * 2.54;
    }
    
    if (weightInKg < 10 || weightInKg > 400) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a weight between 10 kg (22 lbs) and 400 kg (882 lbs).",
        variant: "destructive",
      });
      return;
    }

    if (heightInCm < 50 || heightInCm > 230) {
      toast({
        title: "Invalid Height",
        description: "Please enter a height between 50 cm (19.7 in) and 230 cm (90.5 in).",
        variant: "destructive",
      });
      return;
    }


    let heightInM = heightInCm / 100; // Convert cm to meters

    // BMI Calculation
    const bmi = weightInKg / (heightInM * heightInM);
    const category = getBMICategory(bmi);

    setBmiResult({ value: bmi, category });

    // API Call & AI Output
    setIsLoadingInsight(true);
    try {
      console.log('Calling BMI insight function...');
      const { data, error } = await supabase.functions.invoke('bmi-insight', {
        body: {
          bmiValue: bmi,
          bmiCategory: category,
        },
      });

      console.log('BMI insight response:', { data, error });

      if (error) {
        throw error;
      }

      if (data && data.insight) {
        setBmiResult(prev => prev ? { ...prev, insight: data.insight } : null);
      } else {
        throw new Error('No insight received');
      }
    } catch (error) {
      console.error('Error getting personalized insight:', error);
      setBmiResult(prev => prev ? { 
        ...prev, 
        insight: "Sorry, we couldn't generate a personalized insight at the moment. Please try again later." 
      } : null);
    } finally {
      setIsLoadingInsight(false);
    }
  };

  // Calorie Calculation Function
  const calculateCalories = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    const ageNum = parseFloat(String(age));
    const weightNum = parseFloat(String(sharedWeight));
    const heightNum = parseFloat(String(sharedHeight));

    // Input Validation
    if (!age || !gender || !sharedWeight || !sharedHeight || 
        isNaN(ageNum) || isNaN(weightNum) || isNaN(heightNum) || 
        ageNum <= 0 || weightNum <= 0 || heightNum <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please fill in all fields with valid positive numbers and select your gender.",
        variant: "destructive",
      });
      return;
    }

    // Plausible limits validation
    let weightInKg = weightNum;
    if (sharedWeightUnit === "lbs") {
      weightInKg = weightNum * 0.453592;
    }

    let heightInCm = heightNum;
    if (sharedHeightUnit === "in") {
      heightInCm = heightNum * 2.54;
    }

    if (ageNum < 1 || ageNum > 120) {
      toast({
        title: "Invalid Age",
        description: "Please enter an age between 1 and 120 years.",
        variant: "destructive",
      });
      return;
    }
    if (weightInKg < 10 || weightInKg > 400) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a weight between 10 kg (22 lbs) and 400 kg (882 lbs).",
        variant: "destructive",
      });
      return;
    }
    if (heightInCm < 50 || heightInCm > 230) {
      toast({
        title: "Invalid Height",
        description: "Please enter a height between 50 cm (19.7 in) and 230 cm (90.5 in).",
        variant: "destructive",
      });
      return;
    }

    // Calorie Calculation (Mifflin-St Jeor formula)
    let bmr: number;
    if (gender === "male") {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum) - 161;
    }

    const activityFactor = activityLevels[activityLevel[0] - 1].factor;
    const tdee = bmr * activityFactor;

    setCalorieResult({ bmr, tdee });

    // API Call & AI Output
    setIsLoadingAdvice(true);
    try {
      console.log('Calling calorie advice function...');
      const { data, error } = await supabase.functions.invoke('calorie-advice', {
        body: {
          age: ageNum,
          gender,
          tdeeValue: tdee,
          weightGoal: weightGoal || "Maintain Weight",
        },
      });

      console.log('Calorie advice response:', { data, error });

      if (error) {
        throw error;
      }

      if (data && data.advice) {
        setCalorieResult(prev => prev ? { ...prev, advice: data.advice } : null);
      } else {
        throw new Error('No advice received');
      }
    } catch (error) {
      console.error('Error getting personalized advice:', error);
      setCalorieResult(prev => prev ? { 
        ...prev, 
        advice: "Sorry, we couldn't generate personalized advice at the moment. Please try again later." 
      } : null);
    } finally {
      setIsLoadingAdvice(false);
    }
  };

  // Weight Percentile Calculation Function
  const calculatePercentile = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();    
    }

    const weightNum = parseFloat(String(sharedWeight));

    // Input Validation
    if (!sharedWeight || !percentileGender || !selectedCountry || 
        isNaN(weightNum) || weightNum <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid weight, select your gender, and choose a country.",
        variant: "destructive",
      });
      setPercentileResult(null); // Clear previous result if inputs are invalid
      return;
    }

    // Plausible limits validation
    let weightInKg = weightNum;
    if (sharedWeightUnit === "lbs") {
      weightInKg = weightNum * 0.453592;
    }

    if (weightInKg < 10 || weightInKg > 400) {
      toast({
        title: "Invalid Weight",
        description: "Please enter a weight between 10 kg (22 lbs) and 400 kg (882 lbs).",
        variant: "destructive",
      });
      setPercentileResult(null); // Clear previous result if inputs are invalid
      return;
    }

    // Get the appropriate average weight based on gender and country
    const weightData = percentileGender === "Male" ? averageWeightMen : averageWeightWomen;
    const countryData = weightData.find(data => data.country === selectedCountry);

    if (!countryData) {
      toast({
        title: "Data Not Found",
        description: "Average weight data for the selected country and gender is not available.",
        variant: "destructive",
      });
      setPercentileResult(null); // Clear previous result if data is missing
      return;
    }

    const meanWeight = countryData.averageWeightKg;
    const standardDeviation = 15.4; // Fixed standard deviation as discussed
    const percentile = calculateWeightPercentile(weightInKg, meanWeight, standardDeviation);

    // Store the calculated gender and country along with percentile and mean weight
    setPercentileResult({ 
      percentile, 
      meanWeight, 
      calculatedGender: percentileGender, 
      calculatedCountry: selectedCountry 
    });

    // Get AI insight
    setIsLoadingPercentileInsight(true);
    try {
      console.log('Calling weight percentile insight function...');
      const { data, error } = await supabase.functions.invoke('weight-percentile-insight', {
        body: {
          userWeightKg: weightInKg,
          gender: percentileGender,
          country: selectedCountry,
          percentile,
          meanWeightKg: meanWeight,
          stdDevKg: standardDeviation,
        },
      });

      console.log('Weight percentile insight response:', { data, error });

      if (error) {
        throw error;
      }

      if (data && data.insight) {
        setPercentileResult(prev => prev ? { ...prev, insight: data.insight } : null);
      } else {
        throw new Error('No insight received');
      }
    } catch (error) {
      console.error('Error getting personalized percentile insight:', error);
      setPercentileResult(prev => prev ? { 
        ...prev, 
        insight: "Sorry, we couldn't generate a personalized insight at the moment. Please try again later." 
      } : null);
    } finally {
      setIsLoadingPercentileInsight(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Free Health Calculators - BMI, Calorie Needs, Weight Percentile | WeightVs.com</title>
        <meta
          name="description"
          content="Free, accurate health calculators for BMI, daily calorie needs, and weight percentiles. Get personalized insights and educational content for better health decisions."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Health Calculators
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Get accurate health insights with our free calculators. Calculate your BMI, daily calorie needs, and weight percentile with personalized recommendations.
            </p>
          </div>
          <div className="max-w-4xl mx-auto">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="justify-center">
                <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
                <TabsTrigger value="calories">Calorie Calculator</TabsTrigger>
                <TabsTrigger value="percentile">Weight Percentile</TabsTrigger>
              </TabsList>

              {/* BMI Calculator */}
              <TabsContent value="bmi" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Body Mass Index (BMI) Calculator</CardTitle>
                    <CardDescription>
                      Calculate your Body Mass Index (BMI) to get an indicator of whether you have a healthy weight in relation to your height. Find out what your result means for you.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={calculateBMI} className="space-y-6">
                      <div className="space-y-4">
                        <Label htmlFor="weight" className="text-lg font-medium">Weight</Label>
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                          <div className="flex-1">
                            <Input
                              id="weight"
                              type="number"
                              placeholder="Enter your weight"
                              value={sharedWeight}
                              onChange={(e) => setSharedWeight(e.target.value === "" ? "" : Number(e.target.value))}
                              className="text-lg"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="weight-unit-toggle-bmi" className={cn(sharedWeightUnit === "kg" ? "font-bold" : "")}>KG</Label>
                            <Switch 
                              id="weight-unit-toggle-bmi" 
                              checked={sharedWeightUnit === "lbs"} 
                              onCheckedChange={(checked) => setSharedWeightUnit(checked ? "lbs" : "kg")} 
                            />
                            <Label htmlFor="weight-unit-toggle-bmi" className={cn(sharedWeightUnit === "lbs" ? "font-bold" : "")}>LBS</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="height" className="text-lg font-medium">Height</Label>
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                          <div className="flex-1">
                            <Input
                              id="height"
                              type="number"
                              placeholder="Enter your height"
                              value={sharedHeight}
                              onChange={(e) => setSharedHeight(e.target.value === "" ? "" : Number(e.target.value))}
                              className="text-lg"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="height-unit-toggle-bmi" className={cn(sharedHeightUnit === "cm" ? "font-bold" : "")}>CM</Label>
                            <Switch 
                              id="height-unit-toggle-bmi" 
                              checked={sharedHeightUnit === "in"} 
                              onCheckedChange={(checked) => setSharedHeightUnit(checked ? "in" : "cm")} 
                            />
                            <Label htmlFor="height-unit-toggle-bmi" className={cn(sharedHeightUnit === "in" ? "font-bold" : "")}>IN</Label>
                          </div>
                        </div>
                      </div>
                      <Button type="submit" className="w-full text-lg py-6" size="lg">
                        Calculate BMI
                      </Button>
                      {bmiResult && (
                        <div className="space-y-6 pt-6 border-t">
                          <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold">Your BMI: {bmiResult.value.toFixed(1)}</h3>
                            <p className="text-lg text-gray-600">Category: {bmiResult.category}</p>
                          </div>
                          <div className="space-y-2">
                            <div className="relative h-8 bg-gradient-to-r from-blue-200 via-green-200 via-yellow-200 to-red-200 rounded-lg overflow-hidden">
                              <div className="absolute top-0 bottom-0 w-1 bg-gray-800 z-10" style={{ left: `${getBMIPosition(bmiResult.value)}%` }} />
                              <div className={`absolute top-0 bottom-0 w-2 ${getBMIColor(bmiResult.value)} z-20 rounded-full`} style={{ left: `${getBMIPosition(bmiResult.value) - 0.5}%` }} />
                            </div>
                            <div className="flex justify-between text-xs text-gray-500">
                              <span>Underweight (&lt;18.5)</span>
                              <span>Normal (18.5-24.9)</span>
                              <span>Overweight (25-29.9)</span>
                              <span>Obese (≥30)</span>
                            </div>
                          </div>
                          <div className="bg-blue-50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold mb-3">Your Personalized Insight</h4>
                            {isLoadingInsight ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                <span className="text-gray-600">Generating personalized insight...</span>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <p className="text-gray-700 leading-relaxed">{bmiResult.insight}</p>
                                <p className="text-xs text-gray-500 italic">
                                  This insight is generated by AI and is for informational purposes only. It is not medical advice. Always consult a healthcare professional for personalized guidance.
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Please note:</strong> BMI is a general indicator and does not account for muscle mass, body composition, or individual health conditions. It should not be used as a sole diagnostic tool for health status. Always consult a healthcare professional for personalized advice.
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
                <BmiEducationalContent />
              </TabsContent>

              {/* Calorie Calculator */}
              <TabsContent value="calories" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Daily Calorie Needs Calculator</CardTitle>
                    <CardDescription>
                      Calculate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to understand your daily calorie needs for weight management.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={calculateCalories} className="space-y-6">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age</Label>
                        <Input
                          type="number"
                          id="age"
                          placeholder="Enter your age"
                          value={age}
                          onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup value={gender} onValueChange={setGender} className="flex gap-4">
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
                      <div className="space-y-4">
                        <Label htmlFor="weight-calorie" className="text-lg font-medium">Weight</Label>
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                          <div className="flex-1">
                            <Input
                              id="weight-calorie"
                              type="number"
                              placeholder="Enter your weight"
                              value={sharedWeight}
                              onChange={(e) => setSharedWeight(e.target.value === "" ? "" : Number(e.target.value))}
                              className="text-lg"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="weight-unit-toggle-calories" className={cn(sharedWeightUnit === "kg" ? "font-bold" : "")}>KG</Label>
                            <Switch 
                              id="weight-unit-toggle-calories" 
                              checked={sharedWeightUnit === "lbs"} 
                              onCheckedChange={(checked) => setSharedWeightUnit(checked ? "lbs" : "kg")} 
                            />
                            <Label htmlFor="weight-unit-toggle-calories" className={cn(sharedWeightUnit === "lbs" ? "font-bold" : "")}>LBS</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="height-calorie" className="text-lg font-medium">Height</Label>
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                          <div className="flex-1">
                            <Input
                              id="height-calorie"
                              type="number"
                              placeholder="Enter your height"
                              value={sharedHeight}
                              onChange={(e) => setSharedHeight(e.target.value === "" ? "" : Number(e.target.value))}
                              className="text-lg"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="height-unit-toggle-calories" className={cn(sharedHeightUnit === "cm" ? "font-bold" : "")}>CM</Label>
                            <Switch 
                              id="height-unit-toggle-calories" 
                              checked={sharedHeightUnit === "in"} 
                              onCheckedChange={(checked) => setSharedHeightUnit(checked ? "in" : "cm")} 
                            />
                            <Label htmlFor="height-unit-toggle-calories" className={cn(sharedHeightUnit === "in" ? "font-bold" : "")}>IN</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="activity-level">Activity Level</Label>
                        <Slider
                          id="activity-level"
                          min={1}
                          max={5}
                          step={1}
                          value={activityLevel}
                          onValueChange={setActivityLevel}
                          className="w-full"
                        />
                        <p className="text-sm text-muted-foreground">
                          {activityLevels.find(level => level.step === activityLevel[0])?.label}
                        </p>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight-goal">Weight Goal (Optional)</Label>
                        <Select value={weightGoal} onValueChange={setWeightGoal}>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a goal" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="Maintain Weight">Maintain Weight</SelectItem>
                            <SelectItem value="Mild Weight Loss">Mild Weight Loss (0.25 kg/week)</SelectItem>
                            <SelectItem value="Weight Loss">Weight Loss (0.5 kg/week)</SelectItem>
                            <SelectItem value="Extreme Weight Loss">Extreme Weight Loss (1 kg/week)</SelectItem>
                            <SelectItem value="Mild Weight Gain">Mild Weight Gain (0.25 kg/week)</SelectItem>
                            <SelectItem value="Weight Gain">Weight Gain (0.5 kg/week)</SelectItem>
                            <SelectItem value="Extreme Weight Gain">Extreme Weight Gain (1 kg/week)</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full text-lg py-6" size="lg">
                        Calculate Calories
                      </Button>
                      {calorieResult && (
                        <div className="space-y-6 pt-6 border-t">
                          <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold">Your Basal Metabolic Rate (BMR): {calorieResult.bmr.toFixed(0)} calories/day</h3>
                            <p className="text-lg text-gray-600">Your Total Daily Energy Expenditure (TDEE): {calorieResult.tdee.toFixed(0)} calories/day</p>
                          </div>
                          <div className="bg-gray-50 p-4 rounded-lg">
                            <p className="text-sm text-gray-700 leading-relaxed">
                              Your <strong>BMR (Basal Metabolic Rate)</strong> is the energy your body needs at rest to perform basic life-sustaining functions. Your <strong>TDEE (Total Daily Energy Expenditure)</strong> is the total energy your body burns daily, including your physical activity.
                              <br /><br />
                              Based on your TDEE of {calorieResult.tdee.toFixed(0)} calories:
                              <ul>
                                <li>To **maintain weight**, consume around {calorieResult.tdee.toFixed(0)} calories.</li>
                                <li>To **lose weight**, aim for a deficit (e.g., {Math.round(calorieResult.tdee - 500)}-{Math.round(calorieResult.tdee - 400)} calories).</li>
                                <li>To **gain weight**, aim for a surplus (e.g., {Math.round(calorieResult.tdee + 400)}-{Math.round(calorieResult.tdee + 500)} calories).</li>
                              </ul>
                              These are general guidelines; individual needs may vary.
                            </p>
                          </div>
                          <div className="bg-blue-50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold mb-3">Personalized Advice</h4>
                            {isLoadingAdvice ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                <span className="text-gray-600">Generating personalized advice...</span>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <p className="text-gray-700 leading-relaxed">{calorieResult.advice}</p>
                                <p className="text-xs text-gray-500 italic">
                                  This advice is generated by AI and is for informational purposes only. It is not medical advice. Always consult a healthcare professional for personalized guidance.
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Please note:</strong> These calculations are estimates. Individual calorie needs vary based on metabolism, genetics, and other factors. For personalized dietary advice, consult a registered dietitian or healthcare professional.
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
                <CalorieEducationalContent />
              </TabsContent>

              {/* Weight Percentile Calculator */}
              <TabsContent value="percentile" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Weight Percentile Calculator</CardTitle>
                    <CardDescription>
                      Compare your weight to the average weight of people in a selected country and gender.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <form onSubmit={calculatePercentile} className="space-y-6">
                      <div className="space-y-2">
                        <Label>Gender</Label>
                        <RadioGroup value={percentileGender} onValueChange={setPercentileGender} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Male" id="percentile-male" />
                            <Label htmlFor="percentile-male">Male</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="Female" id="percentile-female" />
                            <Label htmlFor="percentile-female">Female</Label>
                          </div>
                        </RadioGroup>
                      </div>
                      <div className="space-y-4">
                        <Label htmlFor="weight-percentile" className="text-lg font-medium">Weight</Label>
                        <div className="flex flex-col sm:flex-row gap-4 sm:items-end">
                          <div className="flex-1">
                            <Input
                              id="weight-percentile"
                              type="number"
                              placeholder="Enter your weight"
                              value={sharedWeight}
                              onChange={(e) => setSharedWeight(e.target.value === "" ? "" : Number(e.target.value))}
                              className="text-lg"
                            />
                          </div>
                          <div className="flex items-center space-x-2">
                            <Label htmlFor="weight-unit-toggle-percentile" className={cn(sharedWeightUnit === "kg" ? "font-bold" : "")}>KG</Label>
                            <Switch 
                              id="weight-unit-toggle-percentile" 
                              checked={sharedWeightUnit === "lbs"} 
                              onCheckedChange={(checked) => setSharedWeightUnit(checked ? "lbs" : "kg")} 
                            />
                            <Label htmlFor="weight-unit-toggle-percentile" className={cn(sharedWeightUnit === "lbs" ? "font-bold" : "")}>LBS</Label>
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="country-select">Country</Label>
                        <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                          <SelectTrigger id="country-select">
                            <SelectValue placeholder="Select a country" />
                          </SelectTrigger>
                          <SelectContent>
                            {getAllCountries().map((country) => (
                              <SelectItem key={country} value={country}>
                                {country}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <Button type="submit" className="w-full text-lg py-6" size="lg">
                        Calculate Percentile
                      </Button>
                      {percentileResult && (
                        <div className="space-y-6 pt-6 border-t">
                          <div className="text-center space-y-2">
                            <h3 className="text-2xl font-bold">Your Weight Percentile: {percentileResult.percentile.toFixed(1)}%</h3>
                            <p className="text-lg text-gray-600">
                              Based on average weight in **{percentileResult.calculatedCountry}** for **{percentileResult.calculatedGender === "Male" ? "men" : "women"}** (Average: {percentileResult.meanWeight.toFixed(1)} kg)
                            </p>
                          </div>
                          <div className="bg-blue-50 p-6 rounded-lg">
                            <h4 className="text-lg font-semibold mb-3">Personalized Insight</h4>
                            {isLoadingPercentileInsight ? (
                              <div className="flex items-center gap-2">
                                <div className="animate-spin w-4 h-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                                <span className="text-gray-600">Generating personalized insight...</span>
                              </div>
                            ) : (
                              <div className="space-y-3">
                                <p className="text-gray-700 leading-relaxed">{percentileResult.insight}</p>
                                <p className="text-xs text-gray-500 italic">
                                  This insight is generated by AI and is for informational purposes only. It is not medical advice. Always consult a healthcare professional for personalized guidance.
                                </p>
                              </div>
                            )}
                          </div>
                          <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                            <p className="text-sm text-gray-700">
                              <strong>Please note:</strong> Weight percentile is a statistical comparison and does not directly indicate health status. Individual body composition, muscle mass, and health conditions vary. Consult a healthcare professional for personalized health assessment.
                            </p>
                          </div>
                        </div>
                      )}
                    </form>
                  </CardContent>
                </Card>
                <WeightPercentileEducationalContent />
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </>
  );
};

export default Calculators;
