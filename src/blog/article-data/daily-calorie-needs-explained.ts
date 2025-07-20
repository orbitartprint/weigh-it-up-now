// src/blog/article-data/daily-calorie-needs-explained.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/daily-calorie-needs-explained.md?raw';

export const dailyCalorieNeedsExplained = {
  slug: "daily-calorie-needs-explained",
  title: "Daily Calorie Needs Explained: Your Guide to Energy Balance",
  excerpt: "Discover how to calculate your daily calorie needs for weight loss, maintenance, or gain, and understand the importance of energy balance.",
  heroImage: "/lovable-uploads/metabolism-diagram.jpg", // Passe den Pfad bei Bedarf an
  heroImageAlt: "Food pyramid with various food groups and a calculator icon, symbolizing calorie calculation and balanced diet",
  category: "Nutrition",
  tags: ["Calories", "Weight Management", "Energy Balance", "Nutrition"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2023-02-01", // Beispiel-Datum
};
