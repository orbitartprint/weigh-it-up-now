
import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";

const About = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scrollt die Seite zur obersten linken Ecke
  }, []);
  return (
    <>
      <Helmet>
        <title>About WeightVs.com - Your Trusted Health Calculator Platform</title>
        <meta
          name="description"
          content="Learn about WeightVs.com's mission to provide accurate, free health calculators and evidence-based insights for better weight management and wellness decisions."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
                About WeightVs.com
              </h1>
              <p className="text-xl text-gray-600 leading-relaxed">
                Your trusted companion for accurate health calculations and evidence-based wellness insights.
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
                <p className="text-gray-700 leading-relaxed mb-4">
                  At WeightVs.com, we believe that everyone deserves access to accurate, science-based health information. 
                  Our mission is to provide free, reliable health calculators and educational content that empowers 
                  individuals to make informed decisions about their wellness journey.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  We combine cutting-edge technology with evidence-based health science to deliver tools that are 
                  both accessible and trustworthy, helping you understand your health metrics in context.
                </p>
              </div>
              
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h3>
                <ul className="space-y-3 text-gray-700">
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Free BMI, calorie, and percentile calculators
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Evidence-based health insights and articles
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Interactive weight comparison tools
                  </li>
                  <li className="flex items-start">
                    <span className="text-blue-600 mr-2">✓</span>
                    Educational content for holistic health
                  </li>
                </ul>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Our Values</h2>
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center">
                  <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Accuracy</h3>
                  <p className="text-gray-600">
                    All our calculators are based on established medical formulas and regularly updated scientific research.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🌍</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Accessibility</h3>
                  <p className="text-gray-600">
                    We believe health tools should be free and accessible to everyone, regardless of background or location.
                  </p>
                </div>
                
                <div className="text-center">
                  <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">💡</span>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">Education</h3>
                  <p className="text-gray-600">
                    Beyond calculations, we provide context and education to help you understand what your results mean.
                  </p>
                </div>
              </div>
            </div>

            <div className="text-center">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Community</h2>
              <p className="text-xl text-gray-600 mb-8">
                Ready to take control of your health journey? Start with our free calculators and discover 
                insights that can help guide your wellness decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a
                  href="/calculators"
                  className="bg-blue-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-blue-700 transition-colors"
                >
                  Try Our Calculators
                </a>
                <a
                  href="/blog"
                  className="border-2 border-blue-600 text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
                >
                  Read Our Insights
                </a>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </>
  );
};

export default About;
