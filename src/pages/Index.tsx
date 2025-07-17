
import { Link } from "react-router-dom";
import { Calculator, Rocket, BookOpen, TrendingUp, Users, Heart, Scale } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const Index = () => {
  const features = [
    {
      icon: Calculator,
      title: "Health Calculators",
      description: "BMI, daily calorie needs, and weight percentile calculators with detailed insights.",
      link: "/calculators"
    },
    {
      icon: Rocket,
      title: "Weight in Space",
      description: "Discover how much you'd weigh on different planets and celestial bodies.",
      link: "/weight-in-space"
    },
    {
      icon: BookOpen,
      title: "Expert Insights",
      description: "Evidence-based articles on health, nutrition, and sustainable weight management.",
      link: "/blog"
    }
  ];

  const stats = [
    { icon: TrendingUp, value: "1000+", label: "Calculations Daily" },
    { icon: Users, value: "50K+", label: "Happy Users" },
    { icon: Heart, value: "99%", label: "Satisfaction Rate" }
  ];

  return (
    <>
      <Helmet>
        <title>WeightVs.com - Your Health & Weight Management Companion</title>
        <meta
          name="description"
          content="Free health calculators, weight management tools, and expert insights. Calculate BMI, daily calorie needs, weight percentiles, and explore your weight on different planets."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        
        {/* Hero Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">
              Your Health Journey
              <span className="text-blue-600"> Starts Here</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Discover comprehensive health calculators, weight management tools, and expert insights 
              to support your wellness journey. Free, accurate, and science-based.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" asChild className="text-lg px-8 py-3">
                <Link to="/calculators">
                  <Calculator className="mr-2 h-5 w-5" />
                  Try Our Calculators
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3">
                <Link to="/blog">
                  <BookOpen className="mr-2 h-5 w-5" />
                  Read Expert Insights
                </Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Features Section */}
        <div className="container mx-auto px-4 py-16">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Everything You Need for Better Health
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              From calculators to educational content, we provide the tools and knowledge 
              you need to make informed health decisions.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-8 w-8 text-blue-600" />
                    </div>
                    <CardTitle className="text-xl">{feature.title}</CardTitle>
                    <CardDescription className="text-base">
                      {feature.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <Button asChild className="w-full">
                      <Link to={feature.link}>Explore</Link>
                    </Button>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <div className="bg-white/80 py-16">
          <div className="container mx-auto px-4">
            <div className="grid md:grid-cols-3 gap-8">
              {stats.map((stat, index) => {
                const Icon = stat.icon;
                return (
                  <div key={index} className="text-center">
                    <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                      <Icon className="h-6 w-6 text-blue-600" />
                    </div>
                    <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                    <div className="text-gray-600">{stat.label}</div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-12 max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
            Curious About Your Weight?
          </h2>
          <div className="flex flex-col items-center space-y-6"> {/* Flexbox für Zentrierung und Abstand */}
            <p className="text-lg text-center text-gray-700 max-w-2xl px-4">
              Ever wondered how your weight stacks up against an animal, a grain of sand or even a dinosaur? Our new Weight Comparison Tool, now available on the Calculators page, offers a fascinating and fun way to visualize your weight!
            </p>
            <Link to="/calculators?tab=comparison" className="block w-full max-w-lg"> {/* Bild als Link */}
              <img
                src="/lovable-uploads/Scale_Human_vs_Bull.jpg"
                alt="Weight Comparison Scale"
                className="w-full h-auto rounded-lg shadow-lg" // Responsive Bildgröße und Styling
              />
            </Link>
            <Button size="lg" asChild className="text-lg px-8 py-3">
              <Link to="/calculators">
                <Scale className="mr-2 h-5 w-5" />
                Explore Comparisons Now!
              </Link>
            </Button>
          </div>
        </div>

        {/* CTA Section */}
        <div className="container mx-auto px-4 py-16">
          <Card className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
            <CardContent className="text-center py-12">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">
                Ready to Start Your Health Journey?
              </h2>
              <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
                Join thousands of users who trust WeightVs.com for their health calculations and insights.
              </p>
              <Button size="lg" variant="secondary" asChild className="text-lg px-8 py-3">
                <Link to="/calculators">Get Started Free</Link>
              </Button>
            </CardContent>
          </Card>
        </div>

        <Footer />
      </div>
    </>
  );
};

export default Index;
