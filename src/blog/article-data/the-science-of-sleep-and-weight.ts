// src/blog/article-data/the-science-of-sleep-and-weight.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/the-science-of-sleep-and-weight.md?raw';

export const theScienceOfSleepAndWeight = {
  slug: "the-science-of-sleep-and-weight",
  title: "The Science of Sleep and Weight: How Rest Affects Your Metabolism & Health",
  excerpt: "Discover the powerful connection between your sleep habits and your body weight. Learn how sleep impacts hunger hormones, metabolism, and food choices, and get practical tips for better rest and healthier weight management.",
  heroImage: "/lovable-uploads/sleep-weight-hero.jpg", // This will be your hero image
  heroImageAlt: "A person peacefully sleeping with subtle abstract representations of hormones (like ghrelin, leptin, cortisol) and metabolism around them, illustrating the scientific connection between sleep and weight.",
  category: "Holistic Health", // Passt gut zu Holistic Health
  tags: ["Sleep", "Weight Management", "Metabolism", "Hormones", "Health", "Wellness", "Lifestyle"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-07-25", // Aktuelles Datum
};
