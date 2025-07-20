// src/blog/article-data/sustainable-weight-management-tips.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/sustainable-weight-management-tips.md?raw';

export const sustainableWeightManagementTips = {
  slug: "sustainable-weight-management-tips",
  title: "Sustainable Weight Management Tips: Beyond Quick Fixes",
  excerpt: "Discover practical, evidence-based strategies for long-term weight management that prioritize health over fleeting diet trends.",
  heroImage: "/lovable-uploads/holistic-health.jpg", // Passe den Pfad bei Bedarf an
  heroImageAlt: "Person balancing on a scale with healthy food and exercise equipment around, symbolizing balanced and sustainable weight management",
  category: "Weight Management",
  tags: ["Weight Loss", "Healthy Habits", "Nutrition", "Exercise", "Mindfulness"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2023-04-20", // Beispiel-Datum
};
