// src/blog/article-data/stress-and-weight.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/stress-and-weight.md?raw';

export const stressAndWeight = {
  slug: "stress-and-weight",
  title: "Stress and Your Weight: The Mind-Body Connection",
  excerpt: "Discover the powerful link between chronic stress and weight gain. Learn how the stress hormone cortisol affects your body and explore effective strategies to manage stress for a healthier mind and body.",
  heroImage: "/lovable-uploads/stress-weight-hero.webp",
  heroImageAlt: "A person meditating in a calm, natural setting, with a subtle visual representation of a connection between their mind and a balanced scale, symbolizing stress management and weight control.",
  category: "Mind & Body",
  tags: ["Stress", "Cortisol", "Weight Management", "Mental Health", "Mindfulness", "Nutrition", "Wellness"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-08-17",
};
