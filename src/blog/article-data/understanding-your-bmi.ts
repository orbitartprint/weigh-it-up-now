// src/blog/article-data/understanding-your-bmi.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/understanding-your-bmi.md?raw'; // Importiere den Markdown-Inhalt

export const understandingYourBmi = {
  slug: "understanding-your-bmi",
  title: "Understanding Your BMI: A Complete Guide to Body Mass Index",
  excerpt: "Learn what BMI really means, its limitations, and how to interpret your results for better health decisions.",
  heroImage: "/lovable-uploads/BMI-Categories.jpg", // Passe den Pfad bei Bedarf an
  heroImageAlt: "BMI Categories Chart showing underweight, normal, overweight, and obesity ranges with color-coded visual representations",
  category: "BMI & Metrics",
  tags: ["BMI", "Health Assessment", "Weight Management", "Health"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-07-19", // Beispiel-Datum
};
