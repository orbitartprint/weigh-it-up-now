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
