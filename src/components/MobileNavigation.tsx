
import { useState } from "react";
import { Menu, X, Calculator, Rocket, Info, Mail, Home } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const MobileNavigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const navItems = [
    {
      to: "/",
      icon: Home,
      label: "Home"
    },
    {
      to: "/calculators",
      icon: Calculator,
      label: "Calculators"
    },
    {
      to: "/weight-in-space",
      icon: Rocket,
      label: "Weight in Space"
    },
    {
      to: "/about",
      icon: Info,
      label: "About"
    },
    {
      to: "/contact",
      icon: Mail,
      label: "Contact"
    }
  ];

  const handleLinkClick = () => {
    setIsOpen(false);
  };

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <button className="p-2 hover:bg-blue-50 rounded-lg transition-colors">
            <Menu className="h-6 w-6 text-gray-600" />
          </button>
        </SheetTrigger>
        <SheetContent side="right" className="w-64">
          <div className="flex flex-col space-y-4 mt-8">
            {navItems.map((item) => {
              const isActive = location.pathname === item.to;
              return (
                <Link
                  key={item.to}
                  to={item.to}
                  onClick={handleLinkClick}
                  className={`flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                    isActive
                      ? "bg-blue-600 text-white"
                      : "text-gray-600 hover:text-blue-600 hover:bg-blue-50"
                  }`}
                >
                  <item.icon className="h-5 w-5" />
                  <span className="font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
};

export default MobileNavigation;
