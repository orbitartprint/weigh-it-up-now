// src/blog/article-data/beyond-bmi.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/beyond-bmi.md?raw';

export const beyondBmi = {
  slug: "beyond-bmi",
  title: "Beyond BMI: When to Look at Other Health Metrics",
  excerpt: "The Body Mass Index (BMI) is a useful starting point, but it doesn't tell the whole story about your health. Discover other crucial metrics like waist circumference, waist-to-hip ratio, and body fat percentage that provide a more comprehensive view of your well-being.",
  heroImage: "/lovable-uploads/beyond-bmi-hero.webp",
  heroImageAlt: "A person standing on a scale, but their silhouette is filled with a complex diagram of interconnected health metrics beyond just weight, like a measuring tape, muscle icon, and heart symbol, all balanced on a hand.",
  category: "BMI & Metrics",
  tags: ["BMI", "Health Metrics", "Body Fat", "Waist Circumference", "Waist-to-Hip Ratio", "Muscle Mass", "Health Assessment", "Holistic Health"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-08-08",
};
