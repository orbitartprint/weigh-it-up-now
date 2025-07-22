// src/blog/article-data/child-weight-percentiles-explained.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/child-weight-percentiles-explained.md?raw';

export const childWeightPercentilesExplained = {
  slug: "child-weight-percentiles-explained",
  title: "Understanding Your Child's Weight Percentile: A Guide for Parents (0-5 Years)",
  excerpt: "Navigate your child's growth journey with confidence. Learn what weight percentiles mean for infants and toddlers, how to interpret their growth chart, and when to consult a pediatrician.",
  heroImage: "/lovable-uploads/child-growth-chart-hero.jpg", // This will be your hero image
  heroImageAlt: "A happy baby on a colorful growth chart with various percentile curves, emphasizing healthy development and monitoring.",
  category: "Child Health & Growth",
  tags: ["Child Health", "Baby Growth", "Weight Percentile", "Parenting", "Pediatrics", "Infant Care"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-07-22", // Current Date
};
