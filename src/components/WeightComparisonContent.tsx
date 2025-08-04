
import { Separator } from "@/components/ui/separator";
import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const WeightComparisonContent = () => {
  return (
    <div className="mt-12 max-w-4xl mx-auto">
      <br />
      <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
        How the Weight Comparison Tool works
      </h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        <div className="text-center p-4">
          <div className="bg-weightBlue-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <span className="font-bold text-weightBlue-dark">1</span>
          </div>
          <h3 className="font-bold mb-2">Enter Your Weight</h3>
          <p className="text-muted-foreground">Input your weight in kg or pounds</p>
        </div>
        
        <div className="text-center p-4">
          <div className="bg-weightBlue-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <span className="font-bold text-weightBlue-dark">2</span>
          </div>
          <h3 className="font-bold mb-2">Choose a Comparison</h3>
          <p className="text-muted-foreground">Select an animal, celebrity, or object to compare with</p>
        </div>
        
        <div className="text-center p-4">
          <div className="bg-weightBlue-light rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-3">
            <span className="font-bold text-weightBlue-dark">3</span>
          </div>
          <h3 className="font-bold mb-2">See the Comparison</h3>
          <p className="text-muted-foreground">Get a visual representation and fun facts</p>
        </div>
      </div>

      <Separator className="my-12" />
        <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">
          Frequently Asked Questions about the Weight Comparison Tool
        </h2>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="item-1" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
              How accurate are the weight comparisons?</AccordionTrigger>
            <AccordionContent>
              All weights in our database are based on average values and reliable sources. While we strive for accuracy, remember that actual weights can vary. For example, individual animals of the same species may have different weights, and celebrity weights are estimates. Our tool is designed for educational and entertainment purposes.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-2" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
              Can I compare my weight with multiple items at once?</AccordionTrigger>
            <AccordionContent>
              Yes! You can add up to 10 different comparison items simultaneously. Simply select multiple items from our categories or create custom objects. The tool will show all comparisons on the same scale, making it easy to understand relative weight differences.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-3" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
              What categories of items can I compare with?</AccordionTrigger>
            <AccordionContent>
              Our database includes animals (from insects to elephants), celebrities and historical figures, vehicles (cars, planes, ships), buildings and landmarks, everyday objects, sports equipment, food items, and much more. You can also create custom objects with specific weights for personalized comparisons.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-4" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
              Can I switch between kilograms and pounds?</AccordionTrigger>
            <AccordionContent>
              Absolutely! Our tool supports both metric (kg) and imperial (lbs) units. Simply use the unit toggle to switch between systems. All comparisons and calculations will automatically adjust to your preferred measurement system.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-5" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
              Is this tool suitable for educational purposes?</AccordionTrigger>
            <AccordionContent>
              Yes! WeightVs.com is perfect for educational use. It helps students and curious minds visualize abstract weight concepts, understand scale relationships, and learn about the physical world in an engaging way. Teachers often use it to make math and science lessons more interactive and memorable.
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="item-6" className="border rounded-lg px-6">
            <AccordionTrigger className="text-xl font-semibold text-left hover:no-underline">
              How do I create custom objects for comparison?</AccordionTrigger>
            <AccordionContent>
              When selecting items to compare, look for the "Create Custom Object" option. Enter a name for your custom item and specify its weight in either kg or lbs. This feature is perfect for comparing with specific objects that aren't in our database, like your pet, furniture, or project materials.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
  
    </div>
  );
};

export default WeightComparisonContent;


