
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
  
    </div>
  );
};

export default WeightComparisonContent;
