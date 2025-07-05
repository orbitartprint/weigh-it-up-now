import { Link } from "react-router-dom";
import { Calculator, Scale, Rocket } from "lucide-react";

const About = () => {
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
            About WeightVs.com
          </h1>
          <p className="text-lg text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Welcome to WeightVs.com, your go-to destination for fun and informative weight comparisons!
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Our Mission */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Our Mission</h2>
              <p className="text-gray-700 leading-relaxed">
                At WeightVs.com, our mission is to provide entertaining and educational weight comparisons. We aim to spark curiosity and offer insights into the relative weights of everyday objects and extraordinary things.
              </p>
            </div>

            {/* What We Offer */}
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">What We Offer</h2>
              <ul className="list-disc list-inside text-gray-700 leading-relaxed">
                <li>Fun and engaging weight comparison tools</li>
                <li>Informative articles about weight-related topics</li>
                <li>A user-friendly experience on all devices</li>
              </ul>
            </div>
          </div>

          {/* Our Team */}
          <div className="mt-12">
            <h2 className="text-3xl font-bold text-center text-gray-900 mb-6">Our Team</h2>
            <p className="text-lg text-gray-600 text-center mb-8 max-w-2xl mx-auto">
              WeightVs.com is created by a team of passionate developers and content creators dedicated to making learning about weight fun and accessible.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Team Member 1 */}
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="rounded-full w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">John Doe</h3>
                <p className="text-gray-600">Lead Developer</p>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="rounded-full w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">Jane Smith</h3>
                <p className="text-gray-600">Content Creator</p>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white rounded-lg shadow-md p-4 text-center">
                <img
                  src="https://via.placeholder.com/150"
                  alt="Team Member"
                  className="rounded-full w-24 h-24 mx-auto mb-4"
                />
                <h3 className="text-xl font-semibold text-gray-800">Mike Johnson</h3>
                <p className="text-gray-600">UI/UX Designer</p>
              </div>
            </div>
          </div>
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

export default About;
