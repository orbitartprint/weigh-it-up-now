// src/blog/article-data/daily-calorie-needs-explained.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/daily-calorie-needs-explained.md?raw';

export const dailyCalorieNeedsExplained = {
  slug: "daily-calorie-needs-explained",
  title: "Daily Calorie Needs Explained: Your Guide to Energy Balance",
  excerpt: "Master your weight goals by understanding your daily calorie needs. Learn how to calculate your personalized energy expenditure for sustainable weight loss, gain, or maintenance.",
  heroImage: "/lovable-uploads/metabolism-diagram.jpg",
  heroImageAlt: "A vibrant illustration depicting human metabolism with food, energy output, and a calculator symbol, representing daily calorie needs.",
  category: "Nutrition",
  tags: ["Calories", "Weight Management", "Energy Balance", "Nutrition", "Diet", "Health"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-07-21",
};
