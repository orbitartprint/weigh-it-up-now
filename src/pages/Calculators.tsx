import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Calculator, Scale, Weight, Mail, Info, Rocket } from "lucide-react";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import MobileNavigation from "@/components/MobileNavigation";
import { averageWeightMen, averageWeightWomen, getAllCountries } from "@/data/averageWeightData";
import { calculateWeightPercentile } from "@/utils/statistics";
import BmiEducationalContent from "@/components/BmiEducationalContent";

const Calculators = () => {
  // Shared state for weight and height across calculators
  const [sharedWeight, setSharedWeight] = useState("");
  const [sharedHeight, setSharedHeight] = useState("");
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
  const [age, setAge] = useState("");
  const [gender, setGender] = useState("");
  const [activityLevel, setActivityLevel] = useState([3]); // Default to moderately active
  const [weightGoal, setWeightGoal] = useState("");
  const [calorieResult, setCalorieResult] = useState<{
    bmr: number;
    tdee: number;
    advice?: string;
  } | null>(null);
  const [isLoadingAdvice, setIsLoadingAdvice] = useState(false);

  // Weight Percentile Calculator state
  const [percentileGender, setPercentileGender] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [percentileResult, setPercentileResult] = useState<{
    percentile: number;
    meanWeight: number;
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

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi <= 24.9) return "Normal Weight";
    if (bmi <= 29.9) return "Overweight";
    return "Obese";
  };

  const calculateBMI = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    const weightNum = parseFloat(sharedWeight);
    const heightNum = parseFloat(sharedHeight);

    if (!sharedWeight || !sharedHeight || isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive numbers for both weight and height.",
        variant: "destructive",
      });
      return;
    }

    let weightInKg = weightNum;
    if (sharedWeightUnit === "lbs") {
      weightInKg = weightNum * 0.453592;
    }

    let heightInM = heightNum;
    if (sharedHeightUnit === "cm") {
      heightInM = heightNum / 100;
    } else if (sharedHeightUnit === "in") {
      heightInM = (heightNum * 2.54) / 100;
    }

    const bmi = weightInKg / (heightInM * heightInM);
    const category = getBMICategory(bmi);

    setBmiResult({ value: bmi, category });

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

  const calculateCalories = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();
    }
    
    const ageNum = parseFloat(age);
    const weightNum = parseFloat(sharedWeight);
    const heightNum = parseFloat(sharedHeight);

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

    let weightInKg = weightNum;
    if (sharedWeightUnit === "lbs") {
      weightInKg = weightNum * 0.453592;
    }

    let heightInCm = heightNum;
    if (sharedHeightUnit === "in") {
      heightInCm = heightNum * 2.54;
    }

    let bmr: number;
    if (gender === "male") {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum) + 5;
    } else {
      bmr = (10 * weightInKg) + (6.25 * heightInCm) - (5 * ageNum) - 161;
    }

    const activityFactor = activityLevels[activityLevel[0] - 1].factor;
    const tdee = bmr * activityFactor;

    setCalorieResult({ bmr, tdee });

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

  const calculatePercentile = async (e?: React.FormEvent) => {
    if (e) {
      e.preventDefault();    
    }

    const weightNum = parseFloat(sharedWeight);

    if (!sharedWeight || !percentileGender || !selectedCountry || 
        isNaN(weightNum) || weightNum <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter a valid weight, select your gender, and choose a country.",
        variant: "destructive",
      });
      return;
    }

    let weightInKg = weightNum;
    if (sharedWeightUnit === "lbs") {
      weightInKg = weightNum * 0.453592;
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
      return;
    }

    const meanWeight = countryData.averageWeightKg;
    const standardDeviation = 15.4; // Fixed standard deviation in kg
    const percentile = calculateWeightPercentile(weightInKg, meanWeight, standardDeviation);

    setPercentileResult({ percentile, meanWeight });

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

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Scale className="h-8 w-8 text-blue-600" />
              <Link to="/" className="text-2xl font-bold text-blue-600">WeightVs.com</Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link 
                to="/calculators" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <Calculator className="h-4 w-4" />
                <span>Calculators</span>
              </Link>
              <Link 
                to="/weight-in-space" 
                className="flex items-center space-x-2 px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all duration-200"
              >
                <Rocket className="h-4 w-4" />
                <span>Weight in Space</span>
              </Link>
              <Link 
                to="/about" 
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <Info size={18} />
                About
              </Link>
              <Link 
                to="/contact" 
                className="flex items-center gap-2 px-3 py-2 rounded-lg text-gray-600 hover:text-blue-600 hover:bg-blue-50 transition-all duration-200"
              >
                <Mail size={18} />
                Contact
              </Link>
            </div>
            <MobileNavigation />
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
            Health & Weight Calculators
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore a range of health and weight-related calculators designed to help you understand your body and your goals better. Get personalized insights and science-based context!
          </p>

          <Tabs defaultValue="bmi" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
              <TabsTrigger value="calories">Daily Calorie Needs</TabsTrigger>
              <TabsTrigger value="percentile">Weight Percentile</TabsTrigger>
            </TabsList>

            <TabsContent value="bmi">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Body Mass Index (BMI) Calculator</CardTitle>
                  <CardDescription>
                    Calculate your Body Mass Index (BMI) to get an indicator of whether you have a healthy weight in relation to your height. Find out what your result means for you.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={calculateBMI} className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="weight" className="text-lg font-medium">Weight</Label>
                      <div className="flex gap-4 items-end">
                        <div className="flex-1">
                          <Input
                            id="weight"
                            type="number"
                            placeholder="Enter your weight"
                            value={sharedWeight}
                            onChange={(e) => setSharedWeight(e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <RadioGroup value={sharedWeightUnit} onValueChange={setSharedWeightUnit} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kg" id="kg" />
                            <Label htmlFor="kg">kg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lbs" id="lbs" />
                            <Label htmlFor="lbs">lbs</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="height" className="text-lg font-medium">Height</Label>
                      <div className="flex gap-4 items-end">
                        <div className="flex-1">
                          <Input
                            id="height"
                            type="number"
                            placeholder="Enter your height"
                            value={sharedHeight}
                            onChange={(e) => setSharedHeight(e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <RadioGroup value={sharedHeightUnit} onValueChange={setSharedHeightUnit} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cm" id="cm" />
                            <Label htmlFor="cm">cm</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in" id="in" />
                            <Label htmlFor="in">in</Label>
                          </div>
                        </RadioGroup>
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
                            <div 
                              className="absolute top-0 bottom-0 w-1 bg-gray-800 z-10"
                              style={{ left: `${getBMIPosition(bmiResult.value)}%` }}
                            />
                            <div 
                              className={`absolute top-0 bottom-0 w-2 ${getBMIColor(bmiResult.value)} z-20 rounded-full`}
                              style={{ left: `${getBMIPosition(bmiResult.value) - 0.5}%` }}
                            />
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

            <TabsContent value="calories">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Daily Calorie Needs Calculator (BMR & TDEE)</CardTitle>
                  <CardDescription>
                    Estimate your Basal Metabolic Rate (BMR) and Total Daily Energy Expenditure (TDEE) to understand your body's energy requirements. This can help you set realistic goals for weight maintenance, loss, or gain.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={calculateCalories} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="age" className="text-lg font-medium">Age (Years)</Label>
                      <Input
                        id="age"
                        type="number"
                        placeholder="Enter your age"
                        value={age}
                        onChange={(e) => setAge(e.target.value)}
                        className="text-lg"
                      />
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Gender</Label>
                      <RadioGroup value={gender} onValueChange={setGender} className="flex gap-6">
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
                      <Label htmlFor="calorie-weight" className="text-lg font-medium">Weight</Label>
                      <div className="flex gap-4 items-end">
                        <div className="flex-1">
                          <Input
                            id="calorie-weight"
                            type="number"
                            placeholder="Enter your weight"
                            value={sharedWeight}
                            onChange={(e) => setSharedWeight(e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <RadioGroup value={sharedWeightUnit} onValueChange={setSharedWeightUnit} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kg" id="cal-kg" />
                            <Label htmlFor="cal-kg">kg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lbs" id="cal-lbs" />
                            <Label htmlFor="cal-lbs">lbs</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label htmlFor="calorie-height" className="text-lg font-medium">Height</Label>
                      <div className="flex gap-4 items-end">
                        <div className="flex-1">
                          <Input
                            id="calorie-height"
                            type="number"
                            placeholder="Enter your height"
                            value={sharedHeight}
                            onChange={(e) => setSharedHeight(e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <RadioGroup value={sharedHeightUnit} onValueChange={setSharedHeightUnit} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="cm" id="cal-cm" />
                            <Label htmlFor="cal-cm">cm</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="in" id="cal-in" />
                            <Label htmlFor="cal-in">in</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Activity Level</Label>
                      <div className="space-y-4">
                        <Slider
                          value={activityLevel}
                          onValueChange={setActivityLevel}
                          max={5}
                          min={1}
                          step={1}
                          className="w-full"
                        />
                        <div className="text-center">
                          <p className="text-sm font-medium text-blue-600">
                            {activityLevels[activityLevel[0] - 1].label}
                          </p>
                        </div>
                        <div className="grid grid-cols-5 gap-1 text-xs text-gray-500">
                          {activityLevels.map((level, index) => (
                            <div key={index} className="text-center">
                              <div className="font-medium">Step {level.step}</div>
                              <div className="break-words">{level.label.split('(')[0].trim()}</div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">My Goal Is: (Optional)</Label>
                      <RadioGroup value={weightGoal} onValueChange={setWeightGoal} className="flex flex-col gap-3">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Maintain Weight" id="maintain" />
                          <Label htmlFor="maintain">Maintain Weight</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Lose Weight" id="lose" />
                          <Label htmlFor="lose">Lose Weight</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Gain Weight" id="gain" />
                          <Label htmlFor="gain">Gain Weight</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <Button type="submit" className="w-full text-lg py-6" size="lg">
                      Calculate Daily Calorie Needs
                    </Button>

                    {calorieResult && (
                      <div className="space-y-6 pt-6 border-t">
                        <div className="text-center space-y-4">
                          <h3 className="text-2xl font-bold">Your Basal Metabolic Rate (BMR): {Math.round(calorieResult.bmr)} Calories/day</h3>
                          <h3 className="text-2xl font-bold">Your Total Daily Energy Expenditure (TDEE): {Math.round(calorieResult.tdee)} Calories/day</h3>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">
                            Your BMR is the energy your body needs at rest. Your TDEE is the total energy your body burns daily, including activity. 
                            To maintain weight, consume around {Math.round(calorieResult.tdee)} calories. 
                            To lose weight, aim for a deficit (e.g., {Math.round(calorieResult.tdee - 400)}-{Math.round(calorieResult.tdee - 300)} calories). 
                            To gain weight, aim for a surplus (e.g., {Math.round(calorieResult.tdee + 300)}-{Math.round(calorieResult.tdee + 500)} calories).
                          </p>
                        </div>

                        <div className="bg-green-50 p-6 rounded-lg">
                          <h4 className="text-lg font-semibold mb-3">Personalized Recommendations</h4>
                          {isLoadingAdvice ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin w-4 h-4 border-2 border-green-500 border-t-transparent rounded-full"></div>
                              <span className="text-gray-600">Generating personalized tips...</span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-gray-700 leading-relaxed">{calorieResult.advice}</p>
                              <p className="text-xs text-gray-500 italic">
                                This advice is AI-generated and for general informational purposes only. It is not a substitute for professional medical, nutritional, or fitness advice. Always consult a qualified expert.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Please note:</strong> These calculations are estimates and do not account for individual metabolic rates, specific health conditions, or unique dietary needs. Consult a healthcare professional or registered dietitian for personalized advice.
                          </p>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="percentile">
              <Card className="w-full">
                <CardHeader>
                  <CardTitle className="text-2xl">Weight Percentile & Comparison</CardTitle>
                  <CardDescription>
                    Ever wondered how your weight compares to others in your country or region? This tool helps you see where you stand based on average data for men and women, assuming a normal distribution. Get a unique perspective on your weight journey.
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <form onSubmit={calculatePercentile} className="space-y-6">
                    <div className="space-y-4">
                      <Label htmlFor="percentile-weight" className="text-lg font-medium">Your Weight</Label>
                      <div className="flex gap-4 items-end">
                        <div className="flex-1">
                          <Input
                            id="percentile-weight"
                            type="number"
                            placeholder="Enter your weight"
                            value={sharedWeight}
                            onChange={(e) => setSharedWeight(e.target.value)}
                            className="text-lg"
                          />
                        </div>
                        <RadioGroup value={sharedWeightUnit} onValueChange={setSharedWeightUnit} className="flex gap-4">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="kg" id="perc-kg" />
                            <Label htmlFor="perc-kg">kg</Label>
                          </div>
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="lbs" id="perc-lbs" />
                            <Label htmlFor="perc-lbs">lbs</Label>
                          </div>
                        </RadioGroup>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Your Gender</Label>
                      <RadioGroup value={percentileGender} onValueChange={setPercentileGender} className="flex gap-6">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Male" id="perc-male" />
                          <Label htmlFor="perc-male">Male</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="Female" id="perc-female" />
                          <Label htmlFor="perc-female">Female</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div className="space-y-4">
                      <Label className="text-lg font-medium">Select Country/Region</Label>
                      <Select value={selectedCountry} onValueChange={setSelectedCountry}>
                        <SelectTrigger className="text-lg">
                          <SelectValue placeholder="Choose your country/region" />
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
                          <h3 className="text-2xl font-bold">
                            You are in the {percentileResult.percentile}th Percentile
                          </h3>
                          <p className="text-lg text-gray-600">
                            for a {percentileGender} in {selectedCountry}
                          </p>
                        </div>

                        <div className="bg-gray-50 p-6 rounded-lg">
                          <p className="text-gray-700 leading-relaxed">
                            This means your weight is equal to or greater than {percentileResult.percentile}% of {percentileGender.toLowerCase()}s in {selectedCountry} based on average data and a normal distribution (mean: {percentileResult.meanWeight.toFixed(1)} kg, std dev: 15.4 kg).
                          </p>
                        </div>

                        <div className="bg-purple-50 p-6 rounded-lg">
                          <h4 className="text-lg font-semibold mb-3">Your Personalized Insight</h4>
                          {isLoadingPercentileInsight ? (
                            <div className="flex items-center gap-2">
                              <div className="animate-spin w-4 h-4 border-2 border-purple-500 border-t-transparent rounded-full"></div>
                              <span className="text-gray-600">Generating personalized insight...</span>
                            </div>
                          ) : (
                            <div className="space-y-3">
                              <p className="text-gray-700 leading-relaxed">{percentileResult.insight}</p>
                              <p className="text-xs text-gray-500 italic">
                                This insight is generated by AI and is for informational purposes only. It is not medical advice or a comprehensive health assessment. Always consult a healthcare professional for personalized guidance.
                              </p>
                            </div>
                          )}
                        </div>

                        <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                          <p className="text-sm text-gray-700">
                            <strong>Please note:</strong> This calculation is based on average data and assumptions of a normal distribution and a fixed standard deviation. Individual factors like age, body composition, and specific health conditions are not considered. This tool is for informational purposes only and not medical advice.
                          </p>
                        </div>
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 WeightVs.com | For entertainment purposes only
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            All weights are approximate and based on averages
          </p>
          <div className="mt-3 space-x-4">
            <Link 
              to="/about" 
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              About
            </Link>
            <Link 
              to="/legal" 
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Legal
            </Link>
            <Link 
              to="/privacy" 
              className="text-xs text-muted-foreground hover:text-foreground underline"
            >
              Privacy Policy
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Calculators;
