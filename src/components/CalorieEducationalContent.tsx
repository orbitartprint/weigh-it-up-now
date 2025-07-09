
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const CalorieEducationalContent = () => {
  return (
    <div className="mt-12 bg-white rounded-lg shadow-sm border border-gray-100 p-8">
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        Optimizing Your Energy: Understanding Daily Calorie Needs
      </h2>
      
      <Accordion type="single" collapsible className="space-y-4">
        <AccordionItem value="bmr-tdee">
          <AccordionTrigger className="text-xl font-semibold text-left hover:text-blue-600">
            Decoding Your Metabolism: BMR vs. TDEE
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Your daily calorie needs are not a fixed number; they're dynamic and depend on how your body uses energy. Our calculator provides you with two crucial metrics to understand your metabolism and energy expenditure:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Basal Metabolic Rate (BMR):</h4>
                  <p className="text-gray-700">
                    This is the minimum number of calories your body needs to perform basic, life-sustaining functions at rest. Think of it as the energy required to breathe, circulate blood, regulate body temperature, and grow cells – even when you're sleeping. It's the engine running in neutral.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Total Daily Energy Expenditure (TDEE):</h4>
                  <p className="text-gray-700">
                    This represents the total number of calories your body burns in a 24-hour period. It includes your BMR plus the calories burned through all your daily activities, from walking to exercising, digesting food, and even thinking. It's your BMR plus your activity level.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                Understanding the difference between BMR and TDEE is fundamental for any weight management strategy, whether your goal is to lose, maintain, or gain weight. Your BMR is a baseline, while your TDEE reflects your actual daily energy needs based on your lifestyle.
              </p>
              
              <div className="mt-6">
                <img 
                  src="/lovable-uploads/Metabolism_Diagram.jpg" 
                  alt="Diagram illustrating Basal Metabolic Rate (BMR) as resting energy and Total Daily Energy Expenditure (TDEE) as BMR plus activity" 
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              
              <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Further Reading:</strong> For a deeper dive into how your body uses energy, check out our upcoming article: 
                  <a href="/blog/understanding-metabolism" className="text-blue-600 hover:text-blue-800 underline ml-1">
                    The Science of Metabolism: BMR, TDEE, and Beyond
                  </a>.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="factors">
          <AccordionTrigger className="text-xl font-semibold text-left hover:text-blue-600">
            Key Factors Influencing Your Calorie Needs
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Your daily calorie requirements are unique, shaped by a variety of individual characteristics and lifestyle choices. Our calculator takes these into account to provide a personalized estimate. Here are the primary factors that play a significant role:
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Age:</h4>
                  <p className="text-gray-700">
                    Metabolism tends to slow down with age. As you get older, your BMR typically decreases, meaning you need fewer calories to maintain your weight.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Gender:</h4>
                  <p className="text-gray-700">
                    Men generally have higher calorie needs than women due to a larger average body size and higher muscle mass, which burns more calories at rest.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Body Composition (Muscle Mass):</h4>
                  <p className="text-gray-700">
                    Muscle tissue is metabolically more active than fat tissue. Individuals with a higher percentage of muscle mass will burn more calories at rest, thus having a higher BMR and TDEE.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Activity Level:</h4>
                  <p className="text-gray-700">
                    This is one of the most significant variables. Someone with a sedentary lifestyle will have a much lower TDEE than an athlete training daily. The more physically active you are, the more calories you burn.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Height and Weight:</h4>
                  <p className="text-gray-700">
                    Taller and heavier individuals generally have a larger surface area and more tissue to maintain, leading to higher calorie needs.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Genetics & Hormones:</h4>
                  <p className="text-gray-700">
                    Individual genetic makeup can influence metabolic rate, while hormonal imbalances (e.g., thyroid issues) can also significantly impact how your body uses energy.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">Environmental Factors:</h4>
                  <p className="text-gray-700">
                    Even factors like climate (living in very cold or hot environments) can slightly alter calorie expenditure.
                  </p>
                </div>
              </div>
              
              <div className="mt-6">
                <img 
                  src="/lovable-uploads/Calorie_Factors_Infographic.jpg" 
                  alt="Infographic showing various factors influencing calorie needs: age, gender, body composition, activity level, height, genetics" 
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              
              <div className="mt-4 p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Further Reading:</strong> Want to know more about how your body burns calories? Read our detailed guide: 
                  <a href="/blog/factors-affecting-calorie-needs" className="text-blue-600 hover:text-blue-800 underline ml-1">
                    Beyond the Basics: What Truly Impacts Your Daily Calorie Burn?
                  </a>.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="calorie-balance">
          <AccordionTrigger className="text-xl font-semibold text-left hover:text-blue-600">
            Calorie Balance: The Foundation of Weight Management
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Once you know your Total Daily Energy Expenditure (TDEE), you can strategically adjust your calorie intake to achieve your weight goals. The principle is simple: energy balance.
              </p>
              
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Weight Loss (Calorie Deficit):</h4>
                  <p className="text-gray-700">
                    To lose weight, you need to consume fewer calories than your TDEE. This creates a calorie deficit, forcing your body to use stored energy (fat) for fuel. Aim for a moderate deficit (e.g., 500 calories per day) for sustainable and healthy weight loss (typically 1-2 pounds or 0.5-1 kg per week).
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Weight Maintenance (Calorie Balance):</h4>
                  <p className="text-gray-700">
                    To maintain your current weight, your daily calorie intake should roughly match your TDEE. This keeps your energy input and output in equilibrium.
                  </p>
                </div>
                
                <div>
                  <h4 className="font-semibold text-gray-900 mb-2">For Weight Gain (Calorie Surplus):</h4>
                  <p className="text-gray-700">
                    To gain weight, particularly muscle mass, you need to consume more calories than your TDEE. This calorie surplus provides the extra energy needed for tissue growth. This should ideally be combined with strength training.
                  </p>
                </div>
              </div>
              
              <p className="text-gray-700 leading-relaxed mt-4">
                Remember, the quality of your calories matters just as much as the quantity. Focus on nutrient-dense foods that provide essential vitamins, minerals, and macronutrients (proteins, carbohydrates, and fats) to fuel your body efficiently.
              </p>
              
              <div className="mt-6">
                <img 
                  src="/lovable-uploads/Calorie_Balance_Visual.jpg" 
                  alt="Simple graphic illustrating calorie deficit for weight loss, calorie balance for maintenance, and calorie surplus for weight gain" 
                  className="max-w-full h-auto rounded-lg shadow-sm"
                />
              </div>
              
              <div className="mt-4 p-4 bg-purple-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Further Reading:</strong> Learn more about creating a healthy calorie balance for your goals: 
                  <a href="/blog/healthy-weight-loss-vs-gain" className="text-blue-600 hover:text-blue-800 underline ml-1">
                    Calorie Deficit vs. Surplus: Your Guide to Healthy Weight Change
                  </a>.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="practical-tips">
          <AccordionTrigger className="text-xl font-semibold text-left hover:text-blue-600">
            Practical Tips for Managing Your Calories
          </AccordionTrigger>
          <AccordionContent className="pt-4 space-y-4">
            <div className="prose max-w-none">
              <p className="text-gray-700 leading-relaxed mb-4">
                Understanding your daily calorie needs is the first step; implementing this knowledge into your routine is the next. Here are some sustainable habits and practical tips for effective calorie management:
              </p>
              
              <ul className="space-y-3 text-gray-700">
                <li>
                  <strong>Prioritize Whole Foods:</strong> Opt for unprocessed foods like fruits, vegetables, lean proteins, and whole grains. They are typically more nutrient-dense and promote satiety.
                </li>
                <li>
                  <strong>Mindful Eating:</strong> Pay attention to your hunger and fullness cues. Eat slowly, savor your food, and avoid distractions. This can help you recognize when you've had enough.
                </li>
                <li>
                  <strong>Hydration is Key:</strong> Sometimes, thirst can be mistaken for hunger. Drink plenty of water throughout the day.
                </li>
                <li>
                  <strong>Understand Macronutrients:</strong> Learn about the roles of proteins, carbohydrates, and fats. Proteins are particularly important for satiety and muscle preservation, especially during weight loss.
                </li>
                <li>
                  <strong>Portion Control:</strong> Familiarize yourself with appropriate portion sizes. Using smaller plates or measuring cups can be helpful.
                </li>
                <li>
                  <strong>Cook at Home:</strong> Preparing your own meals gives you full control over ingredients and calorie content.
                </li>
                <li>
                  <strong>Plan Ahead:</strong> Meal prepping and planning snacks can prevent impulsive, unhealthy food choices.
                </li>
                <li>
                  <strong>Be Patient & Consistent:</strong> Sustainable weight management is a marathon, not a sprint. Focus on consistent healthy habits rather than quick fixes.
                </li>
              </ul>
              
              <div className="mt-6 p-4 bg-orange-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>Further Reading:</strong> For more in-depth strategies on healthy eating and portion control, check our blog: 
                  <a href="/blog/sustainable-calorie-tracking" className="text-blue-600 hover:text-blue-800 underline ml-1">
                    Sustainable Calorie Tracking: Tips for Success
                  </a>. Also, explore 
                  <a href="/blog/macronutrients-explained" className="text-blue-600 hover:text-blue-800 underline ml-1">
                    Mastering Macronutrients: Fueling Your Body Right
                  </a>.
                </p>
              </div>
              
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-gray-700">
                  <strong>External Resources:</strong> For science-backed dietary guidelines and healthy eating patterns, refer to resources from organizations like the U.S. Department of Agriculture (USDA) or national health authorities.
                </p>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default CalorieEducationalContent;
