import { Button } from "@/components/ui/button";
import { Weight, Mail, ArrowLeft, Info } from "lucide-react";
import { Link } from "react-router-dom";

const About = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="bg-white/80 backdrop-blur-sm border-b border-blue-100 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Link to="/" className="text-2xl font-bold text-blue-600">WeightVs.com</Link>
            </div>
            <div className="hidden md:flex items-center space-x-6">
              <Link to="/calculators" className="text-gray-600 hover:text-blue-600 transition-colors">Calculators</Link>
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact</Link>
            </div>
          </div>
        </div>
      </nav>

      <header className="bg-gradient-to-r from-weightBlue-light to-weightBlue-dark py-8 mb-8">
        <div className="container mx-auto text-center">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Weight size={36} className="text-white" />
            <h1 className="text-3xl md:text-4xl font-bold text-white">
              About WeightVs.com
            </h1>
          </div>
          <p className="text-xl text-white opacity-90">
            Your Ultimate Weight Comparison Tool
          </p>
        </div>
      </header>

      <main className="container mx-auto max-w-4xl px-4 pb-16">
        <div className="bg-white rounded-lg shadow-sm p-8 mb-8">
          <p className="text-lg mb-6">
            Welcome to <strong>WeightVs.com</strong>, the leading online platform designed to make understanding and comparing weights incredibly easy and engaging. Ever wondered how your weight stacks up against an African Elephant, a celebrity, or even a specific building? Our intuitive tool brings these fascinating comparisons to life, transforming abstract numbers into vivid, visual insights, **using carefully compiled estimated and average weights.**
          </p>

          <p className="text-lg mb-6">
            At WeightVs.com, we believe that learning about the world's diverse masses should be fun and accessible. Whether you're a curious mind looking for entertaining facts, a student seeking a better grasp of real-world measurements, or simply a weight enthusiast, our platform is built for you. We provide a vast database of carefully researched weights across various categories, including:
          </p>

          <ul className="list-disc list-inside space-y-2 mb-6 text-lg">
            <li><strong>Animals:</strong> From tiny hummingbirds to colossal blue whales.</li>
            <li><strong>Celebrities:</strong> See how you compare to your favorite stars.</li>
            <li><strong>Everyday Objects & Vehicles:</strong> From smartphones to massive trucks.</li>
            <li><strong>Historical Figures & Structures:</strong> Discover the weight of ancient artifacts or legendary figures.</li>
            <li><strong>Micro-Objects:</strong> Explore the incredibly light world of viruses and atoms.</li>
            <li><strong>Buildings & Infrastructure:</strong> Grasp the immense scale of famous landmarks.</li>
          </ul>

          <p className="text-lg mb-6">
            Our unique visualization tools, including an interactive scale and dynamic bar charts, provide an unparalleled user experience. Forget tedious calculations – simply enter your weight and select any items from our comprehensive database. Watch instantly as your weight is compared, offering surprising perspectives and shareable moments.
          </p>

          <p className="text-lg mb-8">
            WeightVs.com is more than just a comparison site; it's a gateway to discovery. We're continuously expanding our collection of intriguing weights and facts to ensure you always find something new and surprising. Get ready to explore the fascinating world of weight in a whole new dimension – it's simple, insightful, and incredibly fun!
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-8">
          <h2 className="text-2xl font-bold mb-6">How to Use This Tool</h2>
          
          <p className="text-lg mb-6">
            Getting started with WeightVs.com is simple and intuitive. Follow these steps to discover amazing weight comparisons:
          </p>

          <ul className="list-disc list-inside space-y-3 text-lg">
            <li><strong>Enter your weight:</strong> Use the input field on the main page to enter your weight in either kilograms or pounds. Toggle between units using the KG/LBS switch.</li>
            <li><strong>Choose your position:</strong> Click the toggle button to place your weight on either the left or right side of the comparison scale.</li>
            <li><strong>Select comparison categories:</strong> Browse through our extensive categories including Animals, Celebrities, Objects, Vehicles, Historical figures, and more using the category dropdown.</li>
            <li><strong>Add items to compare:</strong> Select specific items from your chosen category and click "Add Item" to include them in your comparison. You can add up to 10 items at once!</li>
            <li><strong>Create custom objects:</strong> Switch to the "Custom" category to create your own comparison objects. Enter a name and weight for any item you want to compare against.</li>
            <li><strong>Arrange items on the scale:</strong> Use the left/right arrow buttons on each item to move them between the left and right sides of the scale for balanced comparisons.</li>
            <li><strong>Switch between views:</strong> Toggle between the dynamic bar chart and interactive scale visualization to see your comparisons from different perspectives.</li>
            <li><strong>Remove items:</strong> Use the 'X' button on any item to remove it from your current comparison.</li>
            <li><strong>Share your discoveries:</strong> Click the "Share This Comparison" button to share your amazing weight discoveries on social media, via email, or by copying the link.</li>
          </ul>

          <div className="mt-8 p-4 bg-blue-50 rounded-lg">
            <p className="text-lg">
              <strong>Pro Tip:</strong> Try combining multiple small objects on one side to see how many it takes to match a single large item on the other side. You might be surprised by the results!
            </p>
          </div>

          <div className="mt-8 text-center">
            <Link to="/">
              <Button size="lg" className="gap-2">
                <Weight size={20} />
                Start Comparing Now
              </Button>
            </Link>
          </div>
        </div>
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

export default About;
