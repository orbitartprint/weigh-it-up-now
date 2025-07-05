
import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

const Calculators = () => {
  const [weight, setWeight] = useState("");
  const [height, setHeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [heightUnit, setHeightUnit] = useState("cm");
  const [bmiResult, setBmiResult] = useState<{
    value: number;
    category: string;
    insight?: string;
  } | null>(null);
  const [isLoadingInsight, setIsLoadingInsight] = useState(false);
  const { toast } = useToast();

  const getBMICategory = (bmi: number): string => {
    if (bmi < 18.5) return "Underweight";
    if (bmi <= 24.9) return "Normal Weight";
    if (bmi <= 29.9) return "Overweight";
    return "Obese";
  };

  const calculateBMI = async () => {
    // Validate inputs
    const weightNum = parseFloat(weight);
    const heightNum = parseFloat(height);

    if (!weight || !height || isNaN(weightNum) || isNaN(heightNum) || weightNum <= 0 || heightNum <= 0) {
      toast({
        title: "Invalid Input",
        description: "Please enter valid positive numbers for both weight and height.",
        variant: "destructive",
      });
      return;
    }

    // Convert to metric units
    let weightInKg = weightNum;
    if (weightUnit === "lbs") {
      weightInKg = weightNum * 0.453592;
    }

    let heightInM = heightNum;
    if (heightUnit === "cm") {
      heightInM = heightNum / 100;
    } else if (heightUnit === "in") {
      heightInM = (heightNum * 2.54) / 100;
    }

    // Calculate BMI
    const bmi = weightInKg / (heightInM * heightInM);
    const category = getBMICategory(bmi);

    setBmiResult({ value: bmi, category });

    // Get personalized insight
    setIsLoadingInsight(true);
    try {
      const response = await fetch('/api/bmi-insight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          bmiValue: bmi,
          bmiCategory: category,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setBmiResult(prev => prev ? { ...prev, insight: data.insight } : null);
      } else {
        throw new Error('Failed to get insight');
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

  const getBMIColor = (bmi: number): string => {
    if (bmi < 18.5) return "bg-blue-400";
    if (bmi <= 24.9) return "bg-green-400";
    if (bmi <= 29.9) return "bg-yellow-400";
    return "bg-red-400";
  };

  const getBMIPosition = (bmi: number): number => {
    // Position on scale from 0 to 100%
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
          </div>
        </div>
      </nav>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center text-gray-900 mb-6">
            Health & Weight Calculators
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Explore a range of health and weight-related calculators designed to help you understand your body and your goals better. Get personalized insights and fun comparisons!
          </p>

          <Tabs defaultValue="bmi" className="w-full">
            <TabsList className="grid w-full grid-cols-3 mb-8">
              <TabsTrigger value="bmi">BMI Calculator</TabsTrigger>
              <TabsTrigger value="calories" disabled>Daily Calorie Needs</TabsTrigger>
              <TabsTrigger value="percentile" disabled>Weight Percentile</TabsTrigger>
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
                  {/* Weight Input */}
                  <div className="space-y-4">
                    <Label htmlFor="weight" className="text-lg font-medium">Weight</Label>
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Input
                          id="weight"
                          type="number"
                          placeholder="Enter your weight"
                          value={weight}
                          onChange={(e) => setWeight(e.target.value)}
                          className="text-lg"
                        />
                      </div>
                      <RadioGroup value={weightUnit} onValueChange={setWeightUnit} className="flex gap-4">
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

                  {/* Height Input */}
                  <div className="space-y-4">
                    <Label htmlFor="height" className="text-lg font-medium">Height</Label>
                    <div className="flex gap-4 items-end">
                      <div className="flex-1">
                        <Input
                          id="height"
                          type="number"
                          placeholder="Enter your height"
                          value={height}
                          onChange={(e) => setHeight(e.target.value)}
                          className="text-lg"
                        />
                      </div>
                      <RadioGroup value={heightUnit} onValueChange={setHeightUnit} className="flex gap-4">
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

                  <Button onClick={calculateBMI} className="w-full text-lg py-6" size="lg">
                    Calculate BMI
                  </Button>

                  {/* Results */}
                  {bmiResult && (
                    <div className="space-y-6 pt-6 border-t">
                      <div className="text-center space-y-2">
                        <h3 className="text-2xl font-bold">Your BMI: {bmiResult.value.toFixed(1)}</h3>
                        <p className="text-lg text-gray-600">Category: {bmiResult.category}</p>
                      </div>

                      {/* Visual Scale */}
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

                      {/* Personalized Insight */}
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

                      {/* Static Disclaimer */}
                      <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg">
                        <p className="text-sm text-gray-700">
                          <strong>Please note:</strong> BMI is a general indicator and does not account for muscle mass, body composition, or individual health conditions. It should not be used as a sole diagnostic tool for health status. Always consult a healthcare professional for personalized advice.
                        </p>
                      </div>
                    </div>
                  )}
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
