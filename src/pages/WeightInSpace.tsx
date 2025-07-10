import { useState } from "react";
import { Helmet } from "react-helmet";
import Navigation from "@/components/Navigation";
import WeightInputCard from "@/components/WeightInputCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const WeightInSpace = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [useKg, setUseKg] = useState<boolean>(true);

  const celestialBodies = [
    { name: "Moon", gravity: 0.166, image: "/lovable-uploads/moon.jpg" },
    { name: "Mars", gravity: 0.378, image: "/lovable-uploads/mars.jpg" },
    { name: "Venus", gravity: 0.907, image: "/lovable-uploads/venus.jpg" },
    { name: "Mercury", gravity: 0.378, image: "/lovable-uploads/mecury.jpg" },
    { name: "Jupiter", gravity: 2.36, image: "/lovable-uploads/jupiter.jpg" },
    { name: "Saturn", gravity: 0.916, image: "/lovable-uploads/saturn.jpg" },
    { name: "Uranus", gravity: 0.889, image: "/lovable-uploads/uranus.jpg" },
    { name: "Neptune", gravity: 1.13, image: "/lovable-uploads/neptune.jpg" },
    { name: "Pluto", gravity: 0.071, image: "/lovable-uploads/pluto.jpg" },
  ];

  const handleWeightChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWeight(e.target.value === "" ? "" : Number(e.target.value));
  };

  const handleUnitToggle = () => {
    if (weight !== "") {
      const currentWeight = Number(weight);
      if (useKg) {
        // Converting from kg to lbs
        setWeight(Number((currentWeight * 2.20462).toFixed(1)));
      } else {
        // Converting from lbs to kg
        setWeight(Number((currentWeight / 2.20462).toFixed(1)));
      }
    }
    setUseKg(!useKg);
  };

  const calculateSpaceWeight = (earthWeight: number, gravity: number) => {
    return (earthWeight * gravity).toFixed(1);
  };

  return (
    <>
      <Helmet>
        <title>Weight in Space Calculator - See Your Weight on Different Planets | WeightVs.com</title>
        <meta
          name="description"
          content="Discover how much you would weigh on different planets and celestial bodies. Fun, educational space weight calculator with accurate gravity calculations."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900">
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Your Weight in Space
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl mx-auto">
              Ever wondered how much you'd weigh on other planets? Enter your weight and discover 
              how gravity affects your mass across our solar system.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-4 gap-8">
              {/* Weight Input */}
              <div className="lg:col-span-1">
                <WeightInputCard
                  weight={weight}
                  useKg={useKg}
                  onWeightChange={handleWeightChange}
                  onToggleUnit={handleUnitToggle}
                />
              </div>

              {/* Results Grid */}
              <div className="lg:col-span-3">
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* Earth Reference */}
                  <Card className="bg-white/10 backdrop-blur border-white/20">
                    <CardHeader className="text-center">
                      <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                        <img 
                          src="/lovable-uploads/earth.jpg" 
                          alt="Earth"
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardTitle className="text-white">Earth</CardTitle>
                      <CardDescription className="text-blue-100">
                        Your reference weight
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="text-center">
                      <div className="text-3xl font-bold text-white">
                        {weight || "0"} {useKg ? "kg" : "lbs"}
                      </div>
                    </CardContent>
                  </Card>

                  {/* Other Celestial Bodies */}
                  {celestialBodies.map((body) => (
                    <Card key={body.name} className="bg-white/10 backdrop-blur border-white/20">
                      <CardHeader className="text-center">
                        <div className="w-24 h-24 mx-auto rounded-full overflow-hidden mb-4">
                          <img 
                            src={body.image} 
                            alt={body.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardTitle className="text-white">{body.name}</CardTitle>
                        <CardDescription className="text-blue-100">
                          Gravity: {body.gravity}x Earth
                        </CardDescription>
                      </CardHeader>
                      <CardContent className="text-center">
                        <div className="text-3xl font-bold text-white">
                          {weight 
                            ? calculateSpaceWeight(Number(weight), body.gravity)
                            : "0"
                          } {useKg ? "kg" : "lbs"}
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            </div>

            {/* Educational Content */}
            <div className="mt-16 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">
                    Understanding Weight vs. Mass in Space
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-100 space-y-4">
                  <p>
                    <strong className="text-white">Important Note:</strong> What we commonly call "weight" 
                    is actually the force of gravity acting on your mass. Your mass (the amount of matter 
                    in your body) remains the same everywhere in the universe, but your weight changes 
                    based on the gravitational pull of the celestial body you're on.
                  </p>
                  
                  <div className="grid md:grid-cols-2 gap-6 mt-6">
                    <div>
                      <h3 className="text-white font-semibold mb-2">Lightest Weights:</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Pluto: You'd weigh only 7.1% of your Earth weight</li>
                        <li>• Moon: You'd weigh 16.6% of your Earth weight</li>
                        <li>• Mars: You'd weigh 37.8% of your Earth weight</li>
                      </ul>
                    </div>
                    
                    <div>
                      <h3 className="text-white font-semibold mb-2">Heaviest Weights:</h3>
                      <ul className="space-y-1 text-sm">
                        <li>• Jupiter: You'd weigh 236% of your Earth weight</li>
                        <li>• Neptune: You'd weigh 113% of your Earth weight</li>
                        <li>• Saturn: You'd weigh 91.6% of your Earth weight</li>
                      </ul>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WeightInSpace;
