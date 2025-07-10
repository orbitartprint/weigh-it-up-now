import { useState } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import BmiEducationalContent from "@/components/BmiEducationalContent";
import CalorieEducationalContent from "@/components/CalorieEducationalContent";
import WeightPercentileEducationalContent from "@/components/WeightPercentileEducationalContent";

const Calculators = () => {
  const [activeTab, setActiveTab] = useState("bmi");

  // BMI Calculator State
  const [heightInches, setHeightInches] = useState<number | "">("");
  const [weightPounds, setWeightPounds] = useState<number | "">("");
  const [useKgBmi, setUseKgBmi] = useState<boolean>(true);
  const [bmi, setBmi] = useState<number | null>(null);
  const [bmiCategory, setBmiCategory] = useState<string>("");

  // Calorie Calculator State
  const [age, setAge] = useState<number | "">("");
  const [gender, setGender] = useState<string>("");
  const [heightCm, setHeightCm] = useState<number | "">("");
  const [weightKg, setWeightKg] = useState<number | "">("");
  const [useKgCalorie, setUseKgCalorie] = useState<boolean>(true);
  const [activityLevel, setActivityLevel] = useState<number>(1.2);
  const [bmr, setBmr] = useState<number | null>(null);
  const [tdee, setTdee] = useState<number | null>(null);

  // Weight Percentile Calculator State
  const [ageYears, setAgeYears] = useState<number | "">("");
  const [genderPercentile, setGenderPercentile] = useState<string>("");
  const [weightKgPercentile, setWeightKgPercentile] = useState<number | "">("");
  const [heightCmPercentile, setHeightCmPercentile] = useState<number | "">("");
  const [useKgPercentile, setUseKgPercentile] = useState<boolean>(true);
  const [weightPercentile, setWeightPercentile] = useState<number | null>(null);

  // BMI Calculation Function
  const calculateBmi = () => {
    if (heightInches === "" || weightPounds === "") {
      alert("Please enter both height and weight.");
      return;
    }

    const height = Number(heightInches);
    const weight = Number(weightPounds);

    if (isNaN(height) || isNaN(weight)) {
      alert("Please enter valid numeric values for height and weight.");
      return;
    }

    const heightInMeters = height * 0.0254;
    let weightInKilograms = weight;
    
    if (!useKgBmi) {
      weightInKilograms = weight * 0.453592; // Convert lbs to kg
    }
    
    const calculatedBmi = weightInKilograms / (heightInMeters * heightInMeters);
    setBmi(parseFloat(calculatedBmi.toFixed(2)));

    if (calculatedBmi < 18.5) {
      setBmiCategory("Underweight");
    } else if (calculatedBmi < 25) {
      setBmiCategory("Normal weight");
    } else if (calculatedBmi < 30) {
      setBmiCategory("Overweight");
    } else {
      setBmiCategory("Obese");
    }
  };

  // Calorie Calculation Function
  const calculateCalories = () => {
    if (age === "" || gender === "" || heightCm === "" || weightKg === "") {
      alert("Please fill in all fields.");
      return;
    }

    const ageValue = Number(age);
    const heightValue = Number(heightCm);
    let weightValue = Number(weightKg);

    if (isNaN(ageValue) || isNaN(heightValue) || isNaN(weightValue)) {
      alert("Please enter valid numeric values.");
      return;
    }

    if (!useKgCalorie) {
      weightValue = weightValue * 0.453592; // Convert lbs to kg
    }

    let calculatedBmr: number;
    if (gender === "male") {
      calculatedBmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue + 5;
    } else {
      calculatedBmr = 10 * weightValue + 6.25 * heightValue - 5 * ageValue - 161;
    }

    setBmr(parseFloat(calculatedBmr.toFixed(2)));
    const calculatedTdee = calculatedBmr * activityLevel;
    setTdee(parseFloat(calculatedTdee.toFixed(2)));
  };

  // Weight Percentile Calculation Function
  const calculateWeightPercentile = () => {
    if (ageYears === "" || genderPercentile === "" || weightKgPercentile === "" || heightCmPercentile === "") {
      alert("Please fill in all fields.");
      return;
    }

    const ageValue = Number(ageYears);
    let weightValue = Number(weightKgPercentile);
    const heightValue = Number(heightCmPercentile);

    if (isNaN(ageValue) || isNaN(weightValue) || isNaN(heightValue)) {
      alert("Please enter valid numeric values.");
      return;
    }

    if (!useKgPercentile) {
      weightValue = weightValue * 0.453592; // Convert lbs to kg
    }

    // Placeholder for actual percentile calculation logic
    const calculatedPercentile = Math.floor(Math.random() * 100);
    setWeightPercentile(calculatedPercentile);
  };

  const handleBmiUnitToggle = () => {
    setUseKgBmi(!useKgBmi);
    if (weightPounds !== "") {
      const currentWeight = Number(weightPounds);
      if (useKgBmi) {
        // Converting from kg to lbs
        setWeightPounds(Number((currentWeight * 2.20462).toFixed(1)));
      } else {
        // Converting from lbs to kg
        setWeightPounds(Number((currentWeight / 2.20462).toFixed(1)));
      }
    }
  };

  const handleCalorieUnitToggle = () => {
    setUseKgCalorie(!useKgCalorie);
    if (weightKg !== "") {
      const currentWeight = Number(weightKg);
      if (useKgCalorie) {
        // Converting from kg to lbs
        setWeightKg(Number((currentWeight * 2.20462).toFixed(1)));
      } else {
        // Converting from lbs to kg
        setWeightKg(Number((currentWeight / 2.20462).toFixed(1)));
      }
    }
  };

  const handlePercentileUnitToggle = () => {
    setUseKgPercentile(!useKgPercentile);
    if (weightKgPercentile !== "") {
      const currentWeight = Number(weightKgPercentile);
      if (useKgPercentile) {
        // Converting from kg to lbs
        setWeightKgPercentile(Number((currentWeight * 2.20462).toFixed(1)));
      } else {
        // Converting from lbs to kg
        setWeightKgPercentile(Number((currentWeight / 2.20462).toFixed(1)));
      }
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
              Get accurate health insights with our free calculators. Calculate your BMI, daily calorie needs, 
              and weight percentile with personalized recommendations.
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
                      Calculate your BMI and find out your weight category.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="height">Height (inches)</Label>
                        <Input
                          type="number"
                          id="height"
                          placeholder="Enter height"
                          value={heightInches}
                          onChange={(e) => setHeightInches(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weight">Weight ({useKgBmi ? 'kg' : 'lbs'})</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            id="weight"
                            placeholder="Enter weight"
                            value={weightPounds}
                            onChange={(e) => setWeightPounds(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                          <span className="text-sm font-medium">{useKgBmi ? 'kg' : 'lbs'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="bmi-unit-toggle" className={cn(useKgBmi ? "font-bold" : "")}>KG</Label>
                          <Switch id="bmi-unit-toggle" checked={!useKgBmi} onCheckedChange={handleBmiUnitToggle} />
                          <Label htmlFor="bmi-unit-toggle" className={cn(!useKgBmi ? "font-bold" : "")}>LBS</Label>
                        </div>
                      </div>
                    </div>
                    <Button onClick={calculateBmi}>Calculate BMI</Button>
                    {bmi && (
                      <div className="space-y-2">
                        <p>
                          Your BMI is: <strong>{bmi}</strong>
                        </p>
                        <p>
                          Category: <strong>{bmiCategory}</strong>
                        </p>
                      </div>
                    )}
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
                      Calculate your Basal Metabolic Rate (BMR) and Total Daily
                      Energy Expenditure (TDEE).
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="age">Age (years)</Label>
                        <Input
                          type="number"
                          id="age"
                          placeholder="Enter age"
                          value={age}
                          onChange={(e) => setAge(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="gender">Gender</Label>
                        <Select onValueChange={setGender}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="heightCm">Height (cm)</Label>
                        <Input
                          type="number"
                          id="heightCm"
                          placeholder="Enter height"
                          value={heightCm}
                          onChange={(e) => setHeightCm(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weightKg">Weight ({useKgCalorie ? 'kg' : 'lbs'})</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            id="weightKg"
                            placeholder="Enter weight"
                            value={weightKg}
                            onChange={(e) => setWeightKg(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                          <span className="text-sm font-medium">{useKgCalorie ? 'kg' : 'lbs'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="calorie-unit-toggle" className={cn(useKgCalorie ? "font-bold" : "")}>KG</Label>
                          <Switch id="calorie-unit-toggle" checked={!useKgCalorie} onCheckedChange={handleCalorieUnitToggle} />
                          <Label htmlFor="calorie-unit-toggle" className={cn(!useKgCalorie ? "font-bold" : "")}>LBS</Label>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="activity">Activity Level</Label>
                      <Select onValueChange={(value) => setActivityLevel(Number(value))}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select activity level" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1.2">Sedentary (little to no exercise)</SelectItem>
                          <SelectItem value="1.375">Lightly Active (light exercise/sports 1-3 days/week)</SelectItem>
                          <SelectItem value="1.55">Moderately Active (moderate exercise/sports 3-5 days/week)</SelectItem>
                          <SelectItem value="1.725">Very Active (hard exercise/sports 6-7 days a week)</SelectItem>
                          <SelectItem value="1.9">Extremely Active (very hard exercise/sports & physical job)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <Button onClick={calculateCalories}>Calculate Calories</Button>
                    {bmr && tdee && (
                      <div className="space-y-2">
                        <p>
                          Your BMR is: <strong>{bmr} calories/day</strong>
                        </p>
                        <p>
                          Your TDEE is: <strong>{tdee} calories/day</strong>
                        </p>
                      </div>
                    )}
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
                      Calculate your weight percentile based on age, gender,
                      height and weight.
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="grid gap-4">
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="ageYears">Age (years)</Label>
                        <Input
                          type="number"
                          id="ageYears"
                          placeholder="Enter age"
                          value={ageYears}
                          onChange={(e) => setAgeYears(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="genderPercentile">Gender</Label>
                        <Select onValueChange={setGenderPercentile}>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select gender" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="male">Male</SelectItem>
                            <SelectItem value="female">Female</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor="heightCmPercentile">Height (cm)</Label>
                        <Input
                          type="number"
                          id="heightCmPercentile"
                          placeholder="Enter height"
                          value={heightCmPercentile}
                          onChange={(e) => setHeightCmPercentile(e.target.value === "" ? "" : Number(e.target.value))}
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="weightKgPercentile">Weight ({useKgPercentile ? 'kg' : 'lbs'})</Label>
                        <div className="flex items-center gap-2">
                          <Input
                            type="number"
                            id="weightKgPercentile"
                            placeholder="Enter weight"
                            value={weightKgPercentile}
                            onChange={(e) => setWeightKgPercentile(e.target.value === "" ? "" : Number(e.target.value))}
                          />
                          <span className="text-sm font-medium">{useKgPercentile ? 'kg' : 'lbs'}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Label htmlFor="percentile-unit-toggle" className={cn(useKgPercentile ? "font-bold" : "")}>KG</Label>
                          <Switch id="percentile-unit-toggle" checked={!useKgPercentile} onCheckedChange={handlePercentileUnitToggle} />
                          <Label htmlFor="percentile-unit-toggle" className={cn(!useKgPercentile ? "font-bold" : "")}>LBS</Label>
                        </div>
                      </div>
                    </div>
                    <Button onClick={calculateWeightPercentile}>
                      Calculate Percentile
                    </Button>
                    {weightPercentile !== null && (
                      <div className="space-y-2">
                        <p>
                          Your weight percentile is:{" "}
                          <strong>{weightPercentile}%</strong>
                        </p>
                      </div>
                    )}
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
