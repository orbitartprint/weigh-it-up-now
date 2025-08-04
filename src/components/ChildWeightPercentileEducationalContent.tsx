// src/components/ChildWeightPercentileEducationalContent.tsx (NEW FILE)

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const ChildWeightPercentileEducationalContent = () => {
  return (
    <div className="mt-8">
      <h2 className="text-2xl font-bold mb-6">Understanding Child Weight Percentiles & FAQs</h2>
      <div className="prose dark:prose-invert max-w-none space-y-6">
        <p>
          Child weight percentiles are crucial tools used by healthcare professionals to monitor a child's growth and development. They show how a child's weight compares to other children of the same age and gender, often based on data from organizations like the World Health Organization (WHO) or the Centers for Disease Control and Prevention (CDC).
        </p>
        <p>
          These charts help identify if a child is growing as expected, or if there might be concerns about being underweight, overweight, or obese. It's important to look at the trend of a child's growth over time rather than a single measurement.
        </p>

        <h3 className="text-xl font-semibold mt-6 mb-4">Frequently Asked Questions</h3>
        <Accordion type="single" collapsible className="w-full">
          <AccordionItem value="faq-1">
            <AccordionTrigger>What do the different percentile lines mean?</AccordionTrigger>
            <AccordionContent>
              The percentile lines on a growth chart (e.g., 3rd, 15th, 50th, 85th, 97th) represent the percentage of children who fall at or below a certain weight for their age and gender. For example, if your child is on the 50th percentile, it means 50% of children their age and gender weigh less than them, and 50% weigh more.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-2">
            <AccordionTrigger>Is a high or low percentile always a cause for concern?</AccordionTrigger>
            <AccordionContent>
              Not necessarily. A child can be perfectly healthy at various percentiles. What's most important is consistent growth along a percentile curve. A sudden drop or jump in percentile, or consistently being at extreme ends (e.g., below 3rd or above 97th percentile), might warrant further investigation by a pediatrician.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-3">
            <AccordionTrigger>How often should a child's weight percentile be checked?</AccordionTrigger>
            <AccordionContent>
              During well-child visits, especially in the first few years of life, pediatricians regularly measure and plot a child's weight, height, and head circumference on growth charts. The frequency decreases as the child gets older, but regular check-ups are still important.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-4">
            <AccordionTrigger>Does this calculator use specific WHO data?</AccordionTrigger>
            <AccordionContent>
              This calculator provides a simplified illustration of how child weight percentiles are determined, using representative data points inspired by WHO growth charts. For precise and official growth monitoring, always refer to the charts and guidance provided by the World Health Organization (WHO) or your national health authority, and consult a healthcare professional.
            </AccordionContent>
          </AccordionItem>
          <AccordionItem value="faq-5">
            <AccordionTrigger>Can this calculator be used for children of all ages?</AccordionTrigger>
            <AccordionContent>
              This specific calculator is designed for children typically from birth up to 5 years (60 months), which is the primary range for WHO growth standards. For older children and adolescents, different growth charts (e.g., CDC charts) are often used.
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </div>
    </div>
  );
};

export default ChildWeightPercentileEducationalContent;
