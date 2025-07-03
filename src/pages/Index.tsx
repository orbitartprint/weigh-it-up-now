import { Button } from "@/components/ui/button";
import WeightComparison from "@/components/WeightComparison";
import { Weight, Mail, Info } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
      <nav className="bg-white border-b border-gray-200 py-3">
        <div className="container mx-auto px-4">
          <div className="flex justify-end gap-2">
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
              Whether you're organizing a move and need to visualize furniture loads, planning a unique educational lesson, or simply enjoying some nerdy fun, WeightVs.com is your go-to destination. Our tool is designed to make <strong>weight comparison</strong> effortlessly visual and highly engaging. Imagine needing to understand the combined weight of a small car versus a group of gorillas, or how many smartphones equate to the weight of a professional athlete – it's all possible here!
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              Our powerful comparison engine automatically processes your inputs and a vast database of objects, animals, and more, providing immediate, scaled visual results. This means you don't have to struggle with abstract numbers or complex calculations. Just enter your chosen items, and watch them appear on our interactive scale or within our dynamic bar chart. You can easily compare multiple objects simultaneously, gaining a clearer perspective on relative weights.
            </p>
            
            <p className="text-muted-foreground leading-relaxed">
              WeightVs.com is dedicated to providing you with accurate, reliable, and continuously updated weight data. We aim to transform the way you perceive and interact with weight information, making it an enjoyable and insightful experience for everyone. Start exploring the fascinating world of mass and see how everything measures up!
            </p>
          </div>
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
