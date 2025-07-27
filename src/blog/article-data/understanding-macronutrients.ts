// src/blog/article-data/understanding-macronutrients.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/understanding-macronutrients.md?raw';

export const understandingMacronutrients = {
  slug: "understanding-macronutrients",
  title: "Understanding Macronutrients: Carbs, Proteins, and Fats for Your Body",
  excerpt: "Dive into the world of macronutrients – carbohydrates, proteins, and fats. Learn their vital roles in your body, how they impact energy, health, and weight management, and why quality and balance are key.",
  heroImage: "/lovable-uploads/macronutrients-hero.webp", // This will be your hero image
  heroImageAlt: "A balanced composition of various healthy foods representing carbohydrates (e.g., whole grains, fruits), proteins (e.g., lean meat, legumes), and fats (e.g., avocado, nuts) arranged harmoniously.",
  category: "Nutrition", // Passt gut zu Nutrition
  tags: ["Macronutrients", "Carbohydrates", "Proteins", "Fats", "Nutrition", "Diet", "Weight Management", "Health", "Energy"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-08-01", // Aktuelles Datum
};
