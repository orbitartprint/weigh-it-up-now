
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WeightPercentileEducationalContent = () => {
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Your Weight in Perspective: Understanding Percentiles
      </h2>
      
      <Accordion type="single" collapsible className="w-full space-y-4">
        <AccordionItem value="understanding-percentile" className="border rounded-lg px-6">
          <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
            Understanding Your Weight Percentile
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                The weight percentile is a statistical measure that tells you how your weight compares to that of others in a specific population group (e.g., people of the same age, gender, or nationality). It's a powerful tool for context, providing a snapshot of where you stand within a larger distribution.
              </p>
              
              <div className="space-y-3">
                <p><strong>What a Percentile Means:</strong> If your weight is at the 50th percentile, it means you weigh more than 50% of the people in the reference group, and less than the other 50%. This is considered the median or average.</p>
                
                <p><strong>Below the Average (e.g., 10th percentile):</strong> A lower percentile indicates you are lighter than most of the comparison group. For instance, the 10th percentile means you weigh more than 10% of the group, and less than 90%.</p>
                
                <p><strong>Above the Average (e.g., 90th percentile):</strong> A higher percentile suggests you are heavier than most. The 90th percentile means you weigh more than 90% of the group, and less than 10%.</p>
              </div>
              
              <p>
                It's important to remember that the percentile itself is a descriptive statistic and not a direct health assessment. It simply places your weight on a scale relative to others.
              </p>
              
              <img 
                src="/lovable-uploads/percentile-curve.jpg" 
                alt="A bell curve diagram illustrating percentile distribution, marking 10th, 50th, and 90th percentiles for weight" 
                className="w-full max-w-2xl mx-auto mt-6 rounded-lg shadow-md"
              />
              
              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <p className="text-blue-800">
                  <strong>Further Reading: </strong>
                  Curious about the statistics? Learn more in our blog article: 
                  <a href="/blog/weight-percentiles-explained" className="text-blue-600 underline hover:text-blue-800 ml-1">
                    What are Percentiles and How Do We Use Them in Health?
                  </a>
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="global-differences" className="border rounded-lg px-6">
          <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
            Why Average Weights Differ Globally
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                When looking at weight percentiles, it's fascinating to observe that average weights can vary significantly across different countries and regions. This isn't just random; it's influenced by a complex interplay of various factors that shape a population's overall body weight data.
              </p>
              
              <div className="space-y-3">
                <p><strong>Dietary Habits:</strong> National cuisines, access to nutritious food, and prevalence of processed foods play a huge role. Countries with diets rich in whole foods and less processed items often have lower average weights.</p>
                
                <p><strong>Lifestyle & Physical Activity:</strong> The level of daily physical activity ingrained in a culture – walking, cycling, active jobs, or leisure pursuits – directly impacts energy expenditure and average weight.</p>
                
                <p><strong>Socioeconomic Factors:</strong> Economic development, urbanization, income levels, and access to education can influence dietary choices, activity levels, and healthcare, all impacting population weight.</p>
                
                <p><strong>Genetics & Ethnicity:</strong> While less significant than lifestyle, genetic predispositions within certain ethnic groups can subtly influence average body compositions and metabolic rates.</p>
                
                <p><strong>Cultural Norms & Perceptions:</strong> Societal views on ideal body size can also play a subtle role, impacting individual and collective health behaviors.</p>
              </div>
              
              <p>
                Understanding these differences helps put your personal percentile into a broader, more informed global weight trends context.
              </p>
              
              <img 
                src="/lovable-uploads/Global-Weight-Map.jpg" 
                alt="Bar chart showing average weight differences across various countries, with icons representing influencing factors like diet and activity" 
                className="w-full max-w-3xl mx-auto mt-6 rounded-lg shadow-md"
              />
              
              <div className="mt-6 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800">
                  <strong>Further Reading: </strong>
                  Explore fascinating insights into how global lifestyles impact body weight in our article: 
                  <a href="/blog/the-world-on-the-scale" className="text-green-600 underline hover:text-green-800 ml-1">
                    The World on the Scale: Average Weights Across Countries
                  </a>
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="comparison-not-judgment" className="border rounded-lg px-6">
          <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
            Weight Percentile: A Comparison, Not a Judgment
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Your weight percentile is a point of comparison within a statistical distribution, not an ultimate judgment of your health or worth. It's crucial to separate the numerical value from personal well-being.
              </p>
              
              <div className="space-y-3">
                <p><strong>Average Doesn't Always Mean Healthy:</strong> Being at the 50th percentile for weight doesn't automatically mean you are perfectly healthy, just as being at the 90th percentile doesn't automatically mean you are unhealthy. A sedentary lifestyle coupled with a poor diet can lead to health issues even at an "average" weight.</p>
                
                <p><strong>Beyond the Number:</strong> True health encompasses much more than just a single weight statistic. Consider your energy levels, physical fitness, dietary habits, sleep quality, mental well-being, and clinical markers (like blood pressure and cholesterol).</p>
                
                <p><strong>Focus on Healthy Habits:</strong> Instead of striving for a specific percentile, focus on building sustainable, healthy habits that support your overall physical and mental well-being. This proactive approach leads to lasting health benefits, regardless of where you fall on a percentile chart.</p>
              </div>
              
              <p>
                Your weight percentile offers a valuable piece of information, but it's essential to integrate it into a broader understanding of your individual health journey.
              </p>
              
              <img 
                src="/lovable-uploads/weight-vs-health-diagram.jpg" 
                alt="Diagram showing a distinction between weight as one metric and holistic health encompassing multiple factors like diet, exercise, sleep, and mental well-being" 
                className="w-full max-w-3xl mx-auto mt-6 rounded-lg shadow-md"
              />
              
              <div className="mt-6 p-4 bg-purple-50 rounded-lg">
                <p className="text-purple-800">
                  <strong>Further Reading: </strong>
                  Discover why putting too much emphasis on just one number can be misleading: 
                  <a href="/blog/holistic-health-beyond-weight" className="text-purple-600 underline hover:text-purple-800 ml-1">
                    Weight is Just a Number: Why Your Health is More Than a Percentile
                  </a>.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="health-journey" className="border rounded-lg px-6">
          <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
            Navigating Your Personal Health Journey
          </AccordionTrigger>
          <AccordionContent className="pt-4 pb-6">
            <div className="space-y-4 text-gray-700 leading-relaxed">
              <p>
                Using a weight percentile calculator can be a great starting point for self-reflection, but your personal health journey should be guided by comprehensive insights and professional advice.
              </p>
              
              <div className="space-y-3">
                <p><strong>Listen to Your Body:</strong> Pay attention to how you feel, your energy levels, and your overall physical capabilities. These are often better indicators of well-being than a single statistical comparison.</p>
                
                <p><strong>Consult Professionals:</strong> If you have concerns about your weight or health, or if your percentile indicates a significant deviation from typical ranges, consult a healthcare provider, a registered dietitian, or a certified fitness professional. They can provide personalized assessments and guidance.</p>
                
                <p><strong>Embrace Sustainable Changes:</strong> Focus on gradual, consistent improvements in your diet, physical activity, sleep patterns, and stress management. Small, positive changes accumulate into significant long-term benefits.</p>
                
                <p><strong>Educate Yourself:</strong> Continue learning about nutrition, exercise, and well-being. Our website's blog will be a continuous resource for reliable information to support you.</p>
              </div>
              
              <p>
                Your weight percentile is a data point; your proactive engagement with your health is what truly matters.
              </p>
              
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-orange-800">
                  <strong>External Resources: </strong>
                  For further information on population health and statistics, consider resources from global health organizations such as the World Health Organization (WHO) or national statistical agencies for comprehensive data and research.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default WeightPercentileEducationalContent;
