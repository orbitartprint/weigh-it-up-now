// src/blog/article-data/holistic-health-beyond-weight.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/holistic-health-beyond-weight.md?raw';

export const holisticHealthBeyondWeight = {
  slug: "holistic-health-beyond-weight",
  title: "Holistic Health Beyond Weight: A Comprehensive Approach to Well-being",
  excerpt: "Explore the dimensions of holistic health – physical, mental, emotional, spiritual, and social – and understand why true well-being goes beyond just body weight.",
  heroImage: "/lovable-uploads/holistic-health.webp",
  heroImageAlt: "Young woman practicing yoga and meditation at home, cozy living room, healthy food and water bottle.",
  category: "Holistic Health",
  tags: ["Wellness", "Mental Health", "Well-being", "Stress Management", "Nutrition", "Lifestyle"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-07-28",
};
