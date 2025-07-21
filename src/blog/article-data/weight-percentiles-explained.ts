
// src/blog/article-data/weight-percentiles-explained.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/weight-percentiles-explained.md?raw';

export const weightPercentilesExplained = {
  slug: "weight-percentiles-explained",
  title: "Weight Percentiles Explained: What They Mean for You",
  excerpt: "Understand what weight percentiles are, how they're used, and what they can tell you about your weight compared to others.",
  heroImage: "/lovable-uploads/percentile-curve.jpg",
  heroImageAlt: "Growth chart with percentile curves for weight and height, symbolizing statistical comparison in health",
  category: "BMI & Metrics",
  tags: ["Weight", "Percentiles", "Health Assessment", "Growth"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-07-17", // Beispiel-Datum
};
