// src/blog/article-data/hydration-for-health.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/hydration-for-health.md?raw';

export const hydrationForHealth = {
  slug: "hydration-for-health",
  title: "Hydration for Health: The Overlooked Key to Well-being and Weight Management",
  excerpt: "Discover the profound importance of water for your body, how much you truly need, the subtle signs of dehydration, and how optimal hydration can boost your metabolism and support healthy weight management.",
  heroImage: "/lovable-uploads/hydration-hero.webp",
  heroImageAlt: "An athletic woman is drinking mineral water from bottle, symbolizing the importance of hydration for health and activity.",
  category: "Nutrition",
  tags: ["Hydration", "Water Intake", "Dehydration", "Health", "Well-being", "Weight Management", "Metabolism", "Nutrition"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-08-10",
