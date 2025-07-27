// src/blog/article-data/the-world-on-the-scale.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/the-world-on-the-scale.md?raw'; // Importiere den Markdown-Inhalt

export const theWorldOnTheScale = {
  slug: "the-world-on-the-scale",
  title: "The World on the Scale: Average Weights Across Countries",
  excerpt: "Explore how average body weights vary globally and discover the fascinating factors influencing these trends, from diet to culture and economics.",
  heroImage: "/lovable-uploads/world-scale-hero.webp",
  heroImageAlt: "The world on a scale.",
  category: "Global Health", // Neue Kategorie, falls noch nicht vorhanden
  tags: ["Average Weight", "Global Health", "Obesity", "Diet", "Lifestyle", "Statistics"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2025-07-30",
};
