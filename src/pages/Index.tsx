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

  const organizationSchema = {
    "@context": "http://schema.org",
    "@type": "Organization",
    "name": "WeightVs.com",
    "url": "https://www.weightvs.com",
    "logo": "https://www.weightvs.com/logo.png", // Passe dies bei Bedarf an
    "sameAs": [
      // Optional: Links zu Social Media Profilen
      // "https://www.facebook.com/yourpage",
      // "https://www.twitter.com/yourpage"
    ]
  };

  return (
    <>
      <Helmet>
        <title>WeightVs.com - Health Calculators, Weight Tools & Expert Insights</title>
        <meta name="description" content="Free, accurate health calculators, weight management tools, and expert insights for your well-being. BMI, calorie needs, percentiles, and more." />
        <script type="application/ld+json">
          {JSON.stringify(organizationSchema)}
        </script>
      </Helmet>
      <div className="flex flex-col min-h-screen">
        <Navigation />
        <main className="flex-grow">

          {/* Hero Section - UPDATED */}
          <div className="relative w-full h-[450px] md:h-[550px] lg:h-[650px] overflow-hidden flex items-center justify-center">
            {/* Das Hintergrundbild */}
            <img
              src="/lovable-uploads/family-health-hero.webp" // Pfad zu deinem WEBP Bild
              alt="Diverse Familie lachend und aktiv in der Natur, symbolisiert Gesundheit und Wohlbefinden."
              className="absolute inset-0 w-full h-full object-cover"
            />

            {/* Das transparente Overlay für bessere Lesbarkeit des Textes */}
            <div className="absolute inset-0 bg-black bg-opacity-40"></div>

            {/* Der Container für den Inhalt (Text und Buttons) - sitzt ÜBER dem Bild und Overlay */}
            <div className="relative z-10 container mx-auto px-4 py-16 text-white">
              <div className="text-center max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-6xl font-bold mb-6 drop-shadow-md">
                  Your Path to a
                  <span className="text-weightBlue-light"> Healthier You</span>
                </h1>
                <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto drop-shadow-md">
                  Health calculators, weight management tools, and expert insights
                  for your well-being. Free, accurate, and science-based.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <Button size="lg" asChild className="text-lg px-8 py-3 bg-weightBlue text-white hover:bg-weightBlue-dark shadow-lg">
                    <Link to="/calculators">
                      <Calculator className="mr-2 h-5 w-5" />
                      Start Your Calculations
                    </Link>
                  </Button>
                  <Button size="lg" variant="outline" asChild className="text-lg px-8 py-3 border-2 border-white text-white hover:bg-white hover:text-weightBlue shadow-lg">
                    <Link to="/blog">
                      <BookOpen className="mr-2 h-5 w-5" />
                      Read Expert Insights
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
          {/* END Hero Section */}


          {/* Features Section */}
          <section className="container mx-auto px-4 py-16">
            <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
              Why Choose WeightVs.com?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="flex flex-col items-center text-center p-6">
                  <CardHeader>
                    <feature.icon className="h-12 w-12 text-blue-600 mb-4" />
                    <CardTitle className="text-xl font-semibold text-gray-900 mb-2">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="flex-grow">
                    <CardDescription className="text-gray-600 mb-4">
                      {feature.description}
                    </CardDescription>
                  </CardContent>
                  <Button variant="link" asChild>
                    <Link to={feature.link}>Learn More</Link>
                  </Button>
                </Card>
              ))}
            </div>
          </section>

          {/* Stats Section */}
          <section className="bg-gray-50 py-16">
            <div className="container mx-auto px-4">
              <h2 className="text-3xl md:text-4xl font-bold text-center text-gray-900 mb-12">
                Our Impact at a Glance
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 text-center">
                {stats.map((stat, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                    <stat.icon className="h-10 w-10 text-blue-600 mx-auto mb-3" />
                    <p className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</p>
                    <p className="text-gray-600">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* Call to Action for Weight Comparison */}
          <div className="container mx-auto px-4 py-16 text-center">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Ever Wondered "Weight Vs." What?
            </h2>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Compare your weight to everyday objects, animals, or even celestial bodies! It's fun, educational, and puts weight into perspective!
            </p>
            <Link to="/calculators?tab=comparison" className="block w-full max-w-lg mx-auto mb-8">
              <img
                src="/lovable-uploads/Scale-Human-vs-Bull.webp"
                alt="Weight Comparison Scale"
                className="w-full h-auto rounded-lg shadow-lg"
              />
            </Link>
            <Button size="lg" asChild className="text-lg px-8 py-3">
              <Link to="/calculators?tab=comparison">
                <Scale className="mr-2 h-5 w-5" />
                Explore Comparisons Now!
              </Link>
            </Button>
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

        </main>
        <Footer />
      </div>
    </>
  );
};

export default Index;
