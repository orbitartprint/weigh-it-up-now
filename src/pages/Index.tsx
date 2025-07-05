
import { Button } from "@/components/ui/button";
import WeightComparison from "@/components/WeightComparison";
import { Calculator, Scale, Weight, Mail, Info, Rocket } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Link } from "react-router-dom";

const Index = () => {
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

      <header className="bg-gradient-to-r from-weightBlue-light to-weightBlue-dark py-8 mb-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Weight size={36} className="text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              WeightVs.com
            </h1>
          </div>
          <p className="text-xl text-white opacity-90">
            See how your weight stacks up!
          </p>
        </div>
      </header>

      <main className="container mx-auto">
        <WeightComparison />
        
        <Separator className="my-12" />
        
        <section className="max-w-3xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-4 text-center">How It Works</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
            <div className="text-center p-4">
              <div className="bg-weightBlue-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-weightBlue-dark">1</span>
              </div>
              <h3 className="font-bold mb-2">Enter Your Weight</h3>
              <p className="text-muted-foreground">Input your weight in kg or pounds</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-weightBlue-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-weightBlue-dark">2</span>
              </div>
              <h3 className="font-bold mb-2">Choose a Comparison</h3>
              <p className="text-muted-foreground">Select an animal, celebrity, or object to compare with</p>
            </div>
            
            <div className="text-center p-4">
              <div className="bg-weightBlue-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
                <span className="font-bold text-weightBlue-dark">3</span>
              </div>
              <h3 className="font-bold mb-2">See the Comparison</h3>
              <p className="text-muted-foreground">Get a visual representation and fun facts</p>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">How to Use Weight Comparison Tool?</h2>
          <div className="space-y-8">
            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-weightBlue-light rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-weightBlue-dark text-lg">1</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">Input Your Body Weight for Accurate Comparison</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Start by entering your current body weight in the weight input field. Our weight comparison calculator supports both metric (kilograms) and imperial (pounds) units. Simply toggle between kg and lbs using the unit switcher to match your preferred measurement system. The tool will automatically convert your weight for precise comparisons across all categories.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-weightBlue-light rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-weightBlue-dark text-lg">2</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">Select Items from Multiple Weight Categories</h3>
                <p className="text-muted-foreground leading-relaxed">
                  Browse through our extensive database of weight comparisons including animals, celebrities, everyday objects, vehicles, buildings, and more. Choose from over 10 different categories or create custom objects with specific weights. You can add up to 10 comparison items at once to see how your weight stacks up against multiple references simultaneously.
                </p>
              </div>
            </div>

            <div className="flex flex-col md:flex-row gap-6 items-start">
              <div className="bg-weightBlue-light rounded-full w-16 h-16 flex items-center justify-center flex-shrink-0">
                <span className="font-bold text-weightBlue-dark text-lg">3</span>
              </div>
              <div className="flex-1">
                <h3 className="text-xl font-bold mb-3">Analyze Visual Weight Comparisons and Scale Differences</h3>
                <p className="text-muted-foreground leading-relaxed">
                  View detailed weight comparison results with visual scale representations and precise mathematical calculations. The tool displays weight ratios, percentage differences, and provides an intuitive left-right balance visualization. Move items between sides to explore different comparison scenarios and understand weight relationships with accurate decimal precision.
                </p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Why Use This Weight Comparison Chart?</h2>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Are you looking to grasp the true scale of things, perhaps for a fun debate with friends, an educational project, or simply out of pure curiosity? Our intuitive <strong>Weight Comparison Chart</strong> at WeightVs.com is designed for exactly that! Forget abstract numbers – we transform weights into visually engaging comparisons that resonate. Whether you're curious about how your own weight compares to a specific animal, a well-known celebrity, or even an astonishing landmark, our tool makes it incredibly easy and insightful.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Beyond just entertaining, WeightVs.com serves a variety of scenarios:
            </p>
            
            <ul className="space-y-3 text-muted-foreground">
              <li className="flex items-start gap-3">
                <span className="bg-weightBlue-light rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                <div>
                  <strong>Satisfy Your Curiosity:</strong> Discover surprising facts about the masses of everyday objects, historical figures, or even micro-sized particles.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-weightBlue-light rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                <div>
                  <strong>Educational Insights:</strong> Perfect for students and curious minds to visualize complex weight differences and understand physical scales in a tangible way.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-weightBlue-light rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                <div>
                  <strong>Practical Planning:</strong> Need to estimate the combined weight for moving furniture, shipping large items, or understanding the load capacity of vehicles? Get a clearer picture here.
                </div>
              </li>
              <li className="flex items-start gap-3">
                <span className="bg-weightBlue-light rounded-full w-2 h-2 mt-2 flex-shrink-0"></span>
                <div>
                  <strong>Entertaining Debates:</strong> Settle friendly arguments by visually comparing anything from tiny insects to giant buildings.
                </div>
              </li>
            </ul>
            
            <p className="text-muted-foreground leading-relaxed">
              With WeightVs.com, visualizing <strong>weight differences</strong> has never been simpler or more engaging. Dive in and make your comparisons come alive!
            </p>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Comparing Weights</h2>
          <div className="space-y-6">
            <p className="text-muted-foreground leading-relaxed">
              Whether you're organizing a move and need to visualize furniture loads, planning a unique educational lesson, or simply enjoying some nerdy fun, WeightVs.com is your go-to destination. <br /><br />
              Our tool is designed to make <strong>weight comparison</strong> effortlessly visual and highly engaging. Imagine needing to understand the combined weight of a small car versus a group of gorillas, or how many smartphones equate to the weight of a professional athlete – it's all possible here!
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Our powerful comparison engine automatically processes your inputs and a vast database of objects, animals, and more, providing immediate, scaled visual results. This means you don't have to struggle with abstract numbers or complex calculations. Just enter your chosen items, and watch them appear on our interactive scale or within our dynamic bar chart. <br /><br />
              You can easily compare multiple objects simultaneously, gaining a clearer perspective on relative weights.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              WeightVs.com is dedicated to providing you with carefully compiled and continuously updated weight data, primarily consisting of estimated and average values. <br /><br />
              We aim to transform the way you perceive and interact with weight information, making it an enjoyable and insightful experience for everyone. <br /><br />
              Start exploring the fascinating world of mass and see how everything measures up!
            </p>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Key Features of Our Weight Comparison Tool</h2>
          <div className="space-y-4">
            <div className="flex items-start gap-4">
              <div className="bg-weightBlue-light rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-weightBlue-dark text-sm">1</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Dual Unit Support (kg & lbs)</h3>
                <p className="text-muted-foreground">Seamlessly switch between metric and imperial units for accurate weight comparisons worldwide.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-weightBlue-light rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-weightBlue-dark text-sm">2</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Extensive Database of Items</h3>
                <p className="text-muted-foreground">Compare with animals, celebrities, vehicles, buildings, and everyday objects from our comprehensive database.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-weightBlue-light rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-weightBlue-dark text-sm">3</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Interactive Visual Scale</h3>
                <p className="text-muted-foreground">See weight differences come to life with our dynamic balance scale and bar chart visualizations.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-weightBlue-light rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-weightBlue-dark text-sm">4</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Custom Object Creation</h3>
                <p className="text-muted-foreground">Add your own items with specific weights for personalized comparisons and unique scenarios.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-weightBlue-light rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-weightBlue-dark text-sm">5</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Multiple Item Comparison</h3>
                <p className="text-muted-foreground">Compare up to 10 different items simultaneously to understand complex weight relationships.</p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="bg-weightBlue-light rounded-full w-8 h-8 flex items-center justify-center flex-shrink-0 mt-1">
                <span className="font-bold text-weightBlue-dark text-sm">6</span>
              </div>
              <div>
                <h3 className="font-bold mb-2">Precise Mathematical Calculations</h3>
                <p className="text-muted-foreground">Get exact weight ratios, percentage differences, and detailed numerical breakdowns for every comparison.</p>
              </div>
            </div>
          </div>
        </section>

        <Separator className="my-12" />

        <section className="max-w-4xl mx-auto px-4 mb-16">
          <h2 className="text-2xl font-bold mb-6 text-center">Frequently Asked Questions</h2>
          <Accordion type="single" collapsible className="w-full">
            <AccordionItem value="item-1">
              <AccordionTrigger>How accurate are the weight comparisons?</AccordionTrigger>
              <AccordionContent>
                All weights in our database are based on average values and reliable sources. While we strive for accuracy, remember that actual weights can vary. For example, individual animals of the same species may have different weights, and celebrity weights are estimates. Our tool is designed for educational and entertainment purposes.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-2">
              <AccordionTrigger>Can I compare my weight with multiple items at once?</AccordionTrigger>
              <AccordionContent>
                Yes! You can add up to 10 different comparison items simultaneously. Simply select multiple items from our categories or create custom objects. The tool will show all comparisons on the same scale, making it easy to understand relative weight differences.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-3">
              <AccordionTrigger>What categories of items can I compare with?</AccordionTrigger>
              <AccordionContent>
                Our database includes animals (from insects to elephants), celebrities and historical figures, vehicles (cars, planes, ships), buildings and landmarks, everyday objects, sports equipment, food items, and much more. You can also create custom objects with specific weights for personalized comparisons.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-4">
              <AccordionTrigger>Can I switch between kilograms and pounds?</AccordionTrigger>
              <AccordionContent>
                Absolutely! Our tool supports both metric (kg) and imperial (lbs) units. Simply use the unit toggle to switch between systems. All comparisons and calculations will automatically adjust to your preferred measurement system.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-5">
              <AccordionTrigger>Is this tool suitable for educational purposes?</AccordionTrigger>
              <AccordionContent>
                Yes! WeightVs.com is perfect for educational use. It helps students and curious minds visualize abstract weight concepts, understand scale relationships, and learn about the physical world in an engaging way. Teachers often use it to make math and science lessons more interactive and memorable.
              </AccordionContent>
            </AccordionItem>

            <AccordionItem value="item-6">
              <AccordionTrigger>How do I create custom objects for comparison?</AccordionTrigger>
              <AccordionContent>
                When selecting items to compare, look for the "Create Custom Object" option. Enter a name for your custom item and specify its weight in either kg or lbs. This feature is perfect for comparing with specific objects that aren't in our database, like your pet, furniture, or project materials.
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        </section>
      </main>

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

export default Index;
