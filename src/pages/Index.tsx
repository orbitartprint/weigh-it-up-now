
import { Button } from "@/components/ui/button";
import WeightComparison from "@/components/WeightComparison";
import { Weight } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <div className="min-h-screen">
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
