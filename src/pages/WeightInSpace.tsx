
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Info, Mail } from "lucide-react";
import { Link } from "react-router-dom";

interface PlanetData {
  id: string;
  name: string;
  gravity_factor: number;
  fact: string;
  image_asset: string;
}

const planetData: PlanetData[] = [
  { id: "earth", name: "Earth", gravity_factor: 1.00, fact: "Our home planet – here, gravity provides our 'normal' weight.", image_asset: "/lovable-uploads/c0c45558-c90b-4d29-b9d8-3efa6407a20f.png" },
  { id: "moon", name: "Moon", gravity_factor: 0.165, fact: "On the Moon, you'd be only about 1/6th of your Earth weight! Astronauts can jump much higher there.", image_asset: "/lovable-uploads/4e6f3479-51f6-4fd2-adcc-8ede73316c86.png" },
  { id: "mercury", name: "Mercury", gravity_factor: 0.38, fact: "The smallest planet has extreme temperature swings and lower gravity.", image_asset: "/lovable-uploads/6673f647-22f2-4470-b31e-357bd9227b13.png" },
  { id: "venus", name: "Venus", gravity_factor: 0.91, fact: "Although similar in size to Earth, its dense atmosphere creates a strong greenhouse effect.", image_asset: "/lovable-uploads/c3d929e4-7fa0-4b81-a118-3fae2eb7168e.png" },
  { id: "mars", name: "Mars", gravity_factor: 0.38, fact: "The Red Planet has only about one-third of Earth's gravity. A walk there would feel very light!", image_asset: "/lovable-uploads/e1f815eb-9090-46cd-a66a-72407b8b91ac.png" },
  { id: "jupiter", name: "Jupiter", gravity_factor: 2.53, fact: "The largest planet in our solar system pulls you over 2.5 times stronger than Earth – you'd be a heavyweight there!", image_asset: "/lovable-uploads/f305fb1a-6879-4344-9a31-a254d18c2628.png" },
  { id: "saturn", name: "Saturn", gravity_factor: 1.07, fact: "Known for its impressive rings, Saturn has a surface gravity similar to Earth's.", image_asset: "/lovable-uploads/5c7cbac5-6b90-4354-9994-c6c5b36c9f61.png" },
  { id: "uranus", name: "Uranus", gravity_factor: 0.92, fact: "This ice giant rotates on its side and has slightly less gravity than Earth.", image_asset: "/lovable-uploads/cc614c5e-0278-416c-9f17-dc439eac14d0.png" },
  { id: "neptune", name: "Neptune", gravity_factor: 1.14, fact: "The windiest planet in our solar system pulls you slightly stronger than Earth.", image_asset: "/lovable-uploads/f8510da6-fa1d-4f7f-ad52-cd376e07d710.png" },
  { id: "pluto", name: "Pluto", gravity_factor: 0.06, fact: "As a dwarf planet, Pluto's gravity is extremely low – you would weigh almost nothing there!", image_asset: "/lovable-uploads/6e92bb2e-5db1-47e6-b91c-e81777b0be37.png" }
];

const WeightInSpace = () => {
  const [earthWeight, setEarthWeight] = useState<string>("");
  const [selectedUnit, setSelectedUnit] = useState<string>("lbs");
  const [selectedPlanetId, setSelectedPlanetId] = useState<string>("earth");
  const [calculatedWeight, setCalculatedWeight] = useState<number | null>(null);
  const [currentPlanet, setCurrentPlanet] = useState<PlanetData | null>(null);
  const [weightDifference, setWeightDifference] = useState<number>(0);
  const [earthWeightDisplay, setEarthWeightDisplay] = useState<number>(0);
  const [inputError, setInputError] = useState<string>("");

  const convertWeight = (value: number, fromUnit: string, toUnit: string): number => {
    if (fromUnit === toUnit) return value;
    if (fromUnit === "kg" && toUnit === "lbs") return value * 2.20462;
    if (fromUnit === "lbs" && toUnit === "kg") return value * 0.453592;
    return value;
  };

  const calculateWeight = () => {
    // Input validation
    const earthWeightRaw = parseFloat(earthWeight);
    if (!earthWeight || isNaN(earthWeightRaw) || earthWeightRaw <= 0) {
      setInputError("Please enter a valid weight.");
      return;
    }
    setInputError("");

    // Convert to KG for internal calculation
    const earthWeightKg = convertWeight(earthWeightRaw, selectedUnit, "kg");
    
    // Get selected planet data
    const planet = planetData.find(p => p.id === selectedPlanetId);
    if (!planet) return;

    // Calculate planet weight
    const calculatedWeightKg = earthWeightKg * planet.gravity_factor;
    
    // Convert back to display unit
    const displayWeight = convertWeight(calculatedWeightKg, "kg", selectedUnit);
    
    // Calculate difference
    const weightDiff = Math.abs(displayWeight - earthWeightRaw);

    // Update state
    setCalculatedWeight(displayWeight);
    setCurrentPlanet(planet);
    setWeightDifference(weightDiff);
    setEarthWeightDisplay(earthWeightRaw);
  };

  // Auto-calculate when planet selection changes
  const handlePlanetSelection = (planetId: string) => {
    setSelectedPlanetId(planetId);
    // Auto-calculate if weight is already entered
    if (earthWeight && !isNaN(parseFloat(earthWeight)) && parseFloat(earthWeight) > 0) {
      setTimeout(() => {
        calculateWeight();
      }, 0);
    }
  };

  // Handle enter key press in weight input
  const handleWeightInputKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      calculateWeight();
    }
  };

  // Auto-calculate when weight input changes (with debounce)
  const handleWeightChange = (value: string) => {
    setEarthWeight(value);
    // Auto-calculate if valid weight and planet is selected
    const weightValue = parseFloat(value);
    if (value && !isNaN(weightValue) && weightValue > 0 && selectedPlanetId) {
      setTimeout(() => {
        calculateWeight();
      }, 500); // Small delay to avoid too frequent calculations
    }
  };

  const formatWeight = (weight: number): string => {
    return weight.toFixed(1);
  };

  const getWeightDifferenceText = (): string => {
    if (!calculatedWeight || !currentPlanet) return "";
    
    if (calculatedWeight < earthWeightDisplay - 0.01) {
      return `That's ${formatWeight(weightDifference)} ${selectedUnit} less than on Earth!`;
    } else if (calculatedWeight > earthWeightDisplay + 0.01) {
      return `That's ${formatWeight(weightDifference)} ${selectedUnit} more than on Earth!`;
    } else {
      return "This is your weight on Earth.";
    }
  };

  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center">
            <Link to="/">
              <Button variant="outline" size="sm" className="gap-2">
                <ArrowLeft size={16} />
                Back to Home
              </Button>
            </Link>
            <div className="flex gap-2">
              <Link to="/about">
                <Button variant="outline" size="sm" className="gap-2">
                  <Info size={16} />
                  About
                </Button>
              </Link>
              <Link to="/contact">
                <Button variant="outline" size="sm" className="gap-2">
                  <Mail size={16} />
                  Contact
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-gradient-to-r from-weightBlue-light to-weightBlue-dark py-8 mb-8">
        <div className="container mx-auto text-center">
          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            How Much Do You Weigh in Space?
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold text-white mb-3">
            Your Weight on Other Planets!
          </h2>
          <p className="text-lg text-white opacity-90 max-w-4xl mx-auto">
            Have you ever wondered what it would feel like to stand on Mars or float on Jupiter? Your weight isn't the same everywhere! Discover how much you would weigh on the celestial bodies of our solar system – a fascinating insight into the universe's gravitational forces.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 pb-16">
        <div className="max-w-6xl mx-auto">
          {/* Input Section */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Calculate Your Space Weight</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Weight Input */}
              <div className="space-y-2">
                <Label htmlFor="userEarthWeightInput">Enter your weight on Earth:</Label>
                <Input
                  id="userEarthWeightInput"
                  type="number"
                  placeholder="e.g., 150"
                  value={earthWeight}
                  onChange={(e) => handleWeightChange(e.target.value)}
                  onKeyPress={handleWeightInputKeyPress}
                  className={inputError ? "border-red-500" : ""}
                />
                {inputError && (
                  <p className="text-red-500 text-sm">{inputError}</p>
                )}
              </div>

              {/* Unit Selector */}
              <div className="space-y-3">
                <Label>Select unit:</Label>
                <RadioGroup
                  id="weightUnitSelector"
                  value={selectedUnit}
                  onValueChange={setSelectedUnit}
                  className="flex gap-6"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="lbs" id="lbs" />
                    <Label htmlFor="lbs">Pounds (lbs)</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="kg" id="kg" />
                    <Label htmlFor="kg">Kilograms (kg)</Label>
                  </div>
                </RadioGroup>
              </div>

              {/* Planet Selection */}
              <div className="space-y-3">
                <Label>Select a celestial body:</Label>
                <div id="planetSelector" className="grid grid-cols-2 md:grid-cols-5 gap-3">
                  {planetData.map((planet) => (
                    <Button
                      key={planet.id}
                      variant={selectedPlanetId === planet.id ? "default" : "outline"}
                      onClick={() => handlePlanetSelection(planet.id)}
                      className="h-auto p-3 flex flex-col items-center gap-2"
                    >
                      <img
                        src={planet.image_asset}
                        alt={planet.name}
                        className="w-12 h-12 object-cover rounded-full"
                      />
                      <span className="text-xs">{planet.name}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Calculate Button */}
              <div className="text-center">
                <Button
                  id="calculateWeightButton"
                  onClick={calculateWeight}
                  size="lg"
                  className="px-8"
                >
                  Calculate Weight
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Results Section */}
          {calculatedWeight !== null && currentPlanet && (
            <Card className="mb-8">
              <CardContent className="pt-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                  {/* Left side - Results */}
                  <div className="space-y-4">
                    <div className="text-center lg:text-left">
                      <h3 id="calculatedWeightDisplay" className="text-2xl md:text-3xl font-bold text-primary mb-2">
                        On <span className="text-weightBlue-dark">{currentPlanet.name}</span> you would weigh{" "}
                        <span className="text-weightBlue-dark">{formatWeight(calculatedWeight)} {selectedUnit}</span>
                      </h3>
                      <p id="weightDifferenceText" className="text-lg text-muted-foreground mb-4">
                        {getWeightDifferenceText()}
                      </p>
                      <p id="planetFactDisplay" className="text-sm text-muted-foreground italic">
                        {currentPlanet.fact}
                      </p>
                    </div>

                    {/* Weight Comparison Bars */}
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium w-16">Earth:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                          <div 
                            className="bg-blue-500 h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((earthWeightDisplay / Math.max(earthWeightDisplay, calculatedWeight)) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm w-20 text-right">{formatWeight(earthWeightDisplay)} {selectedUnit}</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <span className="text-sm font-medium w-16">{currentPlanet.name}:</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-4 relative overflow-hidden">
                          <div 
                            className="bg-weightBlue-dark h-full rounded-full transition-all duration-500"
                            style={{ width: `${Math.min((calculatedWeight / Math.max(earthWeightDisplay, calculatedWeight)) * 100, 100)}%` }}
                          />
                        </div>
                        <span className="text-sm w-20 text-right">{formatWeight(calculatedWeight)} {selectedUnit}</span>
                      </div>
                    </div>
                  </div>

                  {/* Right side - Visual */}
                  <div className="text-center space-y-4">
                    <div className="relative inline-block">
                      <img
                        id="planetImageDisplay"
                        src={currentPlanet.image_asset}
                        alt={currentPlanet.name}
                        className="w-48 h-48 md:w-64 md:h-64 object-contain rounded-full mx-auto shadow-lg"
                      />
                      {/* Woman image */}
                      <div className="absolute bottom-4 right-4 w-16 h-20 bg-white rounded-full flex items-center justify-center shadow-md overflow-hidden">
                        <img
                          src="/lovable-uploads/4f1a216f-c8ca-45d8-b431-b901a35c66ae.png"
                          alt="Person silhouette"
                          className="w-12 h-12 object-contain"
                        />
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">You on {currentPlanet.name}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          <Separator className="my-12" />

          {/* FAQ Section */}
          <section className="max-w-4xl mx-auto">
            <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions about Weight in Space</h2>
            <Accordion type="single" collapsible className="w-full">
              <AccordionItem value="item-1">
                <AccordionTrigger>Why is my weight different on other planets?</AccordionTrigger>
                <AccordionContent>
                  Your weight is the force with which you are attracted by a celestial body. This gravitational pull depends on the body's mass and your distance from its center. Your mass (the amount of matter in your body) remains the same, but your weight changes based on the gravitational field strength of each planet or moon.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-2">
                <AccordionTrigger>Is my mass also different on other planets?</AccordionTrigger>
                <AccordionContent>
                  No, your mass remains constant throughout the universe. It's a measure of your body's inertia and the amount of matter you're made of. Only your weight, which depends on the gravitational force acting on your mass, changes from planet to planet.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-3">
                <AccordionTrigger>How accurate are these calculations?</AccordionTrigger>
                <AccordionContent>
                  The calculations are based on the average surface gravities of the celestial bodies, which have been scientifically determined through careful observation and measurement. They provide a very good estimate of your weight on the surface for comparative and illustrative purposes. Keep in mind that actual gravity can vary slightly across different locations on each planet's surface.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-4">
                <AccordionTrigger>Could I actually survive on these planets?</AccordionTrigger>
                <AccordionContent>
                  Most planets in our solar system have conditions that would be lethal to humans without proper protection. Factors like atmospheric composition, temperature, pressure, and radiation levels make them uninhabitable. This calculator is purely for educational purposes to understand gravitational differences, not to suggest actual habitability.
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="item-5">
                <AccordionTrigger>Why is Pluto included if it's not a planet anymore?</AccordionTrigger>
                <AccordionContent>
                  While Pluto was reclassified as a "dwarf planet" in 2006, it remains a fascinating celestial body in our solar system. Its extremely low gravity (about 6% of Earth's) makes it an interesting comparison point for understanding how different gravitational forces would affect your weight. It's included here for educational value and completeness.
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </section>
        </div>
      </main>

      <footer className="bg-gray-100 py-8">
        <div className="container mx-auto text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 WeightVs.com | For entertainment and educational purposes only
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Gravitational calculations are based on scientific data and provide estimates for comparison
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

export default WeightInSpace;
