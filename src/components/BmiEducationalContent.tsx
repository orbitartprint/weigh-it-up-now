
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const BmiEducationalContent = () => {
  return (
    <div className="mt-12 space-y-6">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Understanding Your Weight: More Than Just BMI
      </h2>
      
      <Accordion type="multiple" className="w-full space-y-4">
        <AccordionItem value="understanding-score" className="border rounded-lg px-6">
          <AccordionTrigger className="text-lg font-semibold">
            Understanding Your BMI Score
          </AccordionTrigger>
          <AccordionContent className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Your Body Mass Index (BMI) is a simple numerical value that categorizes your weight relative to your height. 
              It's often the first step in assessing potential weight-related health risks. Here's a detailed look at what each BMI category generally indicates:
            </p>
            
            <div className="space-y-3">
              <div className="p-4 bg-blue-50 rounded-lg">
                <strong>Underweight (BMI &lt; 18.5):</strong> A BMI in this range suggests you might not be getting enough nutrients or that your body mass is too low for your height. This can lead to weakened immune function, bone density loss, and other health issues. It's crucial to consult a healthcare professional if you fall into this category.
              </div>
              
              <div className="p-4 bg-green-50 rounded-lg">
                <strong>Normal Weight (BMI 18.5 – 24.9):</strong> This range is typically associated with the lowest health risks. Maintaining a BMI within this range through a balanced diet and regular physical activity is often recommended for most adults.
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <strong>Overweight (BMI 25.0 – 29.9):</strong> Being in this category means you carry more weight than is generally considered healthy for your height. This can increase your risk of developing certain health conditions.
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <strong>Obesity Class I (BMI 30.0 – 34.9):</strong> This indicates a higher degree of excess body fat and is associated with a significantly increased risk of various health problems.
              </div>
              
              <div className="p-4 bg-orange-100 rounded-lg">
                <strong>Obesity Class II (BMI 35.0 – 39.9):</strong> Often referred to as severe obesity, this category carries substantial health risks.
              </div>
              
              <div className="p-4 bg-red-50 rounded-lg">
                <strong>Obesity Class III (BMI ≥ 40.0):</strong> Also known as morbid obesity, this is the highest BMI category and is linked to the most serious health complications, often requiring medical intervention.
              </div>
            </div>
            
            <div className="mt-6">
              <img 
                src="/lovable-uploads/bmi-categories.jpg" 
                alt="BMI Categories Chart showing underweight, normal, overweight, and obesity ranges with color-coded visual representations" 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
              />
            </div>
            
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm">
                <strong>Further Reading:</strong> For a deeper dive into the health implications of each category, 
                explore our comprehensive guide: <a href="/blog/understanding-your-bmi" className="text-blue-600 underline hover:text-blue-800">Understanding Your BMI: A Complete Guide to Body Mass Index</a>.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="limitations" className="border rounded-lg px-6">
          <AccordionTrigger className="text-lg font-semibold">
            Beyond the Numbers: Limitations of BMI
          </AccordionTrigger>
          <AccordionContent className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              While a useful screening tool, the Body Mass Index has significant limitations. It's crucial to remember that BMI is a general measure and doesn't tell the whole story about an individual's health or body composition. Factors like muscle mass, bone density, and fat distribution are not accounted for.
            </p>
            
            <div className="space-y-4">
              <div>
                <strong>Athletes & Muscular Individuals:</strong> Muscle weighs more than fat. Highly muscular individuals, such as bodybuilders or professional athletes, may have a BMI in the "overweight" or "obese" category despite having very little body fat and being in excellent health. Their BMI might misclassify them.
              </div>
              
              <div>
                <strong>Elderly Individuals:</strong> As people age, muscle mass naturally decreases, and body fat tends to increase. An older person might have a "normal" BMI, but a higher proportion of body fat, which can still pose health risks.
              </div>
              
              <div>
                <strong>Pregnant or Breastfeeding Women:</strong> BMI calculations are not applicable during pregnancy or breastfeeding, as weight changes are part of a natural physiological process.
              </div>
              
              <div>
                <strong>Different Body Types & Ethnicities:</strong> Research suggests that healthy BMI ranges may vary slightly among different ethnic groups due to inherent differences in body composition and fat distribution.
              </div>
              
              <div>
                <strong>Fat Distribution:</strong> BMI doesn't differentiate between fat stored around the waist (visceral fat), which is generally considered more harmful, and fat stored in other areas.
              </div>
            </div>
            
            <div className="mt-6">
              <img 
                src="/lovable-uploads/bmi-limitations.jpg" 
                alt="Infographic showing BMI limitations for athletes with high muscle mass, elderly individuals, pregnant women, fat distribution types, and different ethnicities" 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
              />
            </div>
            
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm">
                <strong>Further Reading:</strong> Curious about how BMI can be misleading? Read our comprehensive article: 
                <a href="/blog/understanding-your-bmi" className="text-blue-600 underline hover:text-blue-800"> Understanding Your BMI: A Complete Guide to Body Mass Index</a>.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="holistic-view" className="border rounded-lg px-6">
          <AccordionTrigger className="text-lg font-semibold">
            A Holistic View: What Else Matters for Your Health?
          </AccordionTrigger>
          <AccordionContent className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Beyond the Body Mass Index, a comprehensive understanding of your health involves several other crucial factors. 
              Focusing on a holistic view of health provides a more accurate picture and helps in effective weight management.
            </p>
            
            <div className="space-y-4">
              <div>
                <strong>Waist Circumference & Waist-to-Hip Ratio:</strong> These measurements are key indicators of abdominal (visceral) fat, which is metabolically active and poses higher risks for heart disease, type 2 diabetes, and stroke, even for individuals with a "healthy" BMI.
              </div>
              
              <div>
                <strong>Body Fat Percentage:</strong> This measures the proportion of fat in your body relative to fat-free mass (muscle, bone, water). It's a more direct indicator of body composition than BMI.
              </div>
              
              <div>
                <strong>Muscle Mass:</strong> Higher muscle mass is generally associated with a healthier metabolism, stronger bones, and better overall physical function.
              </div>
              
              <div>
                <strong>Blood Pressure, Cholesterol & Blood Sugar:</strong> These clinical markers provide direct insights into your cardiovascular and metabolic health. Regular check-ups are essential.
              </div>
              
              <div>
                <strong>Fitness Level & Physical Activity:</strong> Your cardiorespiratory fitness, strength, and flexibility are vital health components, irrespective of your weight.
              </div>
              
              <div>
                <strong>Diet Quality & Nutritional Intake:</strong> What you eat matters more than just calorie count. A diet rich in whole foods, fruits, vegetables, and lean proteins supports overall well-being.
              </div>
              
              <div>
                <strong>Lifestyle Factors:</strong> Sleep quality, stress levels, and smoking habits significantly impact your health and weight.
              </div>
            </div>
            
            <div className="mt-6">
              <img 
                src="/lovable-uploads/holistic-health.webp" 
                alt="Diagram illustrating interconnected factors for holistic health including body composition, nutrition, physical activity, mental well-being, clinical markers, lifestyle habits, and social relationships" 
                className="w-full max-w-2xl mx-auto rounded-lg shadow-md"
              />
            </div>
            
            <div className="mt-4 p-4 bg-blue-100 rounded-lg">
              <p className="text-sm">
                <strong>Further Reading:</strong> Discover why a holistic approach to your health is key in our blog: 
                <a href="/blog/holistic-health-beyond-weight" className="text-blue-600 underline hover:text-blue-800"> Holistic Health: Why Your Worth Isn't Measured by a Scale</a>.
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="next-steps" className="border rounded-lg px-6">
          <AccordionTrigger className="text-lg font-semibold">
            Next Steps for a Healthy Weight Journey
          </AccordionTrigger>
          <AccordionContent className="space-y-4 text-gray-700 leading-relaxed">
            <p>
              Regardless of your Body Mass Index, the journey to a healthy weight and improved well-being is about sustainable, positive changes. 
              Here are some actionable steps to consider:
            </p>
            
            <div className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg">
                <strong>Focus on Balanced Nutrition:</strong> Prioritize whole, unprocessed foods. Include plenty of fruits, vegetables, lean proteins, and healthy fats. Hydration is also crucial.
              </div>
              
              <div className="p-4 bg-blue-50 rounded-lg">
                <strong>Engage in Regular Physical Activity:</strong> Aim for a combination of cardiovascular exercise (walking, running, swimming) and strength training. Find activities you enjoy to ensure consistency.
              </div>
              
              <div className="p-4 bg-purple-50 rounded-lg">
                <strong>Prioritize Sleep:</strong> Adequate sleep is fundamental for hormone regulation, energy levels, and overall health, directly impacting weight management.
              </div>
              
              <div className="p-4 bg-yellow-50 rounded-lg">
                <strong>Manage Stress:</strong> Chronic stress can affect your metabolism and lead to unhealthy eating habits. Incorporate stress-reducing activities like meditation, yoga, or hobbies.
              </div>
              
              <div className="p-4 bg-orange-50 rounded-lg">
                <strong>Seek Professional Guidance:</strong> If you have concerns about your weight, BMI, or overall health, consult a healthcare professional, a registered dietitian, or a certified fitness trainer. They can provide personalized advice and support tailored to your unique needs.
              </div>
            </div>
            
            <div className="mt-6 space-y-4">
              <div className="p-4 bg-blue-100 rounded-lg">
                <p className="text-sm">
                  <strong>Further Reading:</strong> Ready to start? Get practical tips in our article: 
                  <a href="/blog/sustainable-weight-management-tips" className="text-blue-600 underline hover:text-blue-800"> Sustainable Weight Management: Evidence-Based Strategies That Work</a>.
                </p>
              </div>
              
              <div className="p-4 bg-gray-100 rounded-lg">
                <p className="text-sm">
                  <strong>External Resources:</strong> For more information on general health guidelines, consider visiting reputable health organizations like the 
                  <a href="https://www.who.int/health-topics/obesity" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800"> World Health Organization (WHO)</a> or the 
                  <a href="https://www.cdc.gov/healthyweight/" target="_blank" rel="noopener noreferrer" className="text-blue-600 underline hover:text-blue-800"> Centers for Disease Control and Prevention (CDC)</a>.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default BmiEducationalContent;
