import { Link, useLocation } from "react-router-dom";
import { BookOpen, Calculator, Rocket, Info, Mail } from "lucide-react";
import MobileNavigation from "./MobileNavigation";

const Navigation = () => {
  const location = useLocation();

  const navItems = [
    { to: "/calculators", label: "Calculators", icon: Calculator },
    { to: "/weight-in-space", label: "Weight in Space", icon: Rocket },
    { to: "/blog", label: "Insights", icon: BookOpen },
    { to: "/about", label: "About", icon: Info },
    { to: "/contact", label: "Contact", icon: Mail },
  ];

  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50"> {/* Hier wurden sticky, top-0 und z-50 hinzugefügt */}
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">W</span>
            </div>
            <span className="text-xl font-bold text-gray-900">WeightVs</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-2 lg:space-x-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to || 
                (item.to === "/blog" && location.pathname.startsWith("/blog"));
              
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`flex items-center space-x-1 lg:space-x-2 px-2 lg:px-3 py-2 rounded-lg transition-colors text-sm lg:text-base ${
                    isActive
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                  }`}
                >
                  <item.icon className="h-4 w-4 flex-shrink-0" />
                  <span className="font-medium whitespace-nowrap">{item.label}</span>
                </Link>
              );
            })}
          </div>

          {/* Mobile Navigation */}
          <div className="md:hidden">
            <MobileNavigation />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
