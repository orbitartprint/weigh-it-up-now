import { useState } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import WeightInputCard from "@/components/WeightInputCard";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Separator } from "@/components/ui/separator";

const WeightInSpace = () => {
  const [weight, setWeight] = useState<number | "">("");
  const [useKg, setUseKg] = useState<boolean>(true);

  const celestialBodies = [
    { name: "Moon", gravity: 0.166, image: "/lovable-uploads/moon.png" },
    { name: "Mars", gravity: 0.378, image: "/lovable-uploads/mars.png" },
    { name: "Venus", gravity: 0.907, image: "/lovable-uploads/venus.png" },
    { name: "Mercury", gravity: 0.378, image: "/lovable-uploads/mercury.png" },
    { name: "Jupiter", gravity: 2.36, image: "/lovable-uploads/jupiter.png" },
    { name: "Saturn", gravity: 0.916, image: "/lovable-uploads/saturn.png" },
    { name: "Uranus", gravity: 0.889, image: "/lovable-uploads/uranus.png" },
    { name: "Neptune", gravity: 1.13, image: "/lovable-uploads/neptune.png" },
    { name: "Pluto", gravity: 0.071, image: "/lovable-uploads/pluto.png" },
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
                          src="/lovable-uploads/earth.png" 
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
            
            <Separator className="my-12 bg-blue-700" />

            {/* Blog Articles Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">
                    Explore the Universe of Gravity
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-100 space-y-4">
                  <p className="text-center mb-8">
                    Dive deeper into the fascinating concepts behind weight and gravity in our solar system and beyond.
                  </p>
                  
                  <Accordion type="single" collapsible className="w-full space-y-4">
                    <AccordionItem value="gravity-basics" className="border border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-left hover:no-underline text-white">
                        <span className="text-lg font-semibold">Understanding Gravity: The Force That Shapes Your Weight</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-100 text-base space-y-4 pt-2">
                        <p>
                          Your weight is a direct result of gravity, the invisible force that pulls objects towards each other. 
                          The more massive a planet, the stronger its gravitational pull, and thus, the more you would weigh on its surface.
                        </p>
                        
                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-white">Mass vs. Weight: A Crucial Distinction</h4>
                          <p>
                            While your weight changes from planet to planet, your <strong>mass</strong> remains constant throughout the universe. 
                            Mass is the amount of matter in your body, whereas weight is the force of gravity acting on that mass.
                          </p>
                        </div>
      
                        <div>
                          <h4 className="font-semibold text-lg mb-2 text-white">Factors Influencing Gravity</h4>
                          <ul className="list-disc pl-6 space-y-1">
                            <li><strong>Mass of the Celestial Body:</strong> Larger planets have stronger gravitational fields.</li>
                            <li><strong>Distance from the Center:</strong> Gravity weakens with distance, so a planet's size and your position on it matter.</li>
                          </ul>
                        </div>
      
                        <p>
                          Gravity isn't just about your weight; it's the fundamental force holding galaxies together, 
                          keeping planets in orbit, and shaping the very structure of the cosmos.
                        </p>
                      </AccordionContent>
                    </AccordionItem>
      
                    <AccordionItem value="solar-system-exploration" className="border border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-left hover:no-underline text-white">
                        <span className="text-lg font-semibold">Journey Through the Solar System: Gravity's Effects on Exploration</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-100 text-base space-y-4 pt-2">
                        <p>
                          The varying gravity across our solar system presents unique challenges and opportunities 
                          for space exploration and future human habitation.
                        </p>
                        
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <strong>Astronaut Training:</strong> To prepare for microgravity (like on the ISS) or lower gravity (Moon, Mars), 
                            astronauts undergo specialized training, including parabolic flights and underwater simulations.
                          </li>
                          <li>
                            <strong>Landing Challenges:</strong> The gravity of a celestial body directly impacts how spacecraft need to be designed for landing. 
                            On Mars, parachutes and skycranes are vital due to its gravity, while on the Moon, direct engine braking suffices.
                          </li>
                          <li>
                            <strong>Movement on Other Worlds:</strong> Imagine walking on the Moon, where you feel significantly lighter, 
                            allowing for long, bounding strides. On Mars, you'd feel more grounded but still considerably lighter than on Earth.
                          </li>
                          <li>
                            <strong>Long-Term Habitation:</strong> Scientists are studying the long-term effects of reduced gravity on the human body, 
                            such as bone density loss and muscle atrophy, which are crucial considerations for future space colonies.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
      
                    <AccordionItem value="extreme-gravity" className="border border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-left hover:no-underline text-white">
                        <span className="text-lg font-semibold">Extreme Gravity: Beyond Our Solar System</span>
                      </AccordionTrigger>
                      <AccordionContent className="text-blue-100 text-base space-y-4 pt-2">
                        <p>
                          While our solar system offers a fascinating range of gravitational experiences, 
                          the universe holds even more extreme phenomena that stretch our understanding of weight and mass.
                        </p>
                        
                        <ul className="list-disc pl-6 space-y-2">
                          <li>
                            <strong>Neutron Stars:</strong> The remnants of massive stars, neutron stars are incredibly dense. 
                            A teaspoon of neutron star material would weigh billions of tons on Earth, and their surface gravity 
                            is trillions of times stronger than ours.
                          </li>
                          <li>
                            <strong>Black Holes:</strong> These cosmic enigmas represent the ultimate gravitational pull. 
                            Their gravity is so immense that nothing, not even light, can escape their grasp beyond a point called the event horizon.
                          </li>
                          <li>
                            <strong>Exoplanets:</strong> Beyond our sun, scientists are discovering countless exoplanets. 
                            Some are 'super-Earths' with gravities many times higher than ours, while others might be gas giants 
                            with no solid surface to stand on, or tiny worlds with almost no pull at all.
                          </li>
                        </ul>
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
            
            <Separator className="my-12 bg-blue-700" />

            {/* FAQ Section */}
            <div className="mt-16 max-w-4xl mx-auto">
              <Card className="bg-white/10 backdrop-blur border-white/20">
                <CardHeader>
                  <CardTitle className="text-white text-2xl text-center">
                    Frequently Asked Questions about Weight in Space
                  </CardTitle>
                </CardHeader>
                <CardContent className="text-blue-100 space-y-4">
                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="item-1" className="border border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-white">Why is my weight different on other planets?</AccordionTrigger>
                      <AccordionContent className="text-blue-100">
                        Your weight is the force with which you are attracted by a celestial body. This gravitational pull depends on the body's mass and your distance from its center. Your mass (the amount of matter in your body) remains the same, but your weight changes based on the gravitational field strength of each planet or moon.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-2" className="border border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-white">Is my mass also different on other planets?</AccordionTrigger>
                      <AccordionContent className="text-blue-100">
                        No, your mass remains constant throughout the universe. It's a measure of your body's inertia and the amount of matter you're made of. Only your weight, which depends on the gravitational force acting on your mass, changes from planet to planet.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-3" className="border border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-white">How accurate are these calculations?</AccordionTrigger>
                      <AccordionContent className="text-blue-100">
                        The calculations are based on the average surface gravities of the celestial bodies, which have been scientifically determined through careful observation and measurement. They provide a very good estimate of your weight on the surface for comparative and illustrative purposes. Keep in mind that actual gravity can vary slightly across different locations on each planet's surface.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-4" className="border border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-white">Could I actually survive on these planets?</AccordionTrigger>
                      <AccordionContent className="text-blue-100">
                        Most planets in our solar system have conditions that would be lethal to humans without proper protection. Factors like atmospheric composition, temperature, pressure, and radiation levels make them uninhabitable. This calculator is purely for educational purposes to understand gravitational differences, not to suggest actual habitability.
                      </AccordionContent>
                    </AccordionItem>

                    <AccordionItem value="item-5" className="border border-gray-700 rounded-lg px-6">
                      <AccordionTrigger className="text-white">Why is Pluto included if it's not a planet anymore?</AccordionTrigger>
                      <AccordionContent className="text-blue-100">
                        While Pluto was reclassified as a "dwarf planet" in 2006, it remains a fascinating celestial body in our solar system. Its extremely low gravity (about 6% of Earth's) makes it an interesting comparison point for understanding how different gravitational forces would affect your weight. It's included here for educational value and completeness.
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default WeightInSpace;
