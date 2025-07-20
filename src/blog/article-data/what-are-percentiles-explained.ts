// src/blog/article-data/what-are-percentiles.ts

import { calculateReadTime } from '../../utils/blogHelpers';
import articleContent from '../content/what-are-percentiles-explained.md?raw'; // Import the Markdown content

export const whatArePercentiles = {
  slug: "what-are-percentiles",
  title: "What are Percentiles and How Do We Use Them in Health?",
  excerpt: "Unravel the mystery of percentiles in health. Learn how these statistical tools are used to compare your health metrics to a population, from growth charts to weight assessments.",
  heroImage: "/lovable-uploads/percentile-curve.jpg",
  heroImageAlt: "Diagram showing a bell curve with percentile markers at 10th, 50th, and 90th percentiles",
  category: "Health Metrics",
  tags: ["Percentiles", "Health Data", "Statistics", "Growth Charts", "Weight Assessment", "Health Indicators"],
  content: articleContent,
  readTimeMinutes: calculateReadTime(articleContent),
  publishDate: "2024-07-20", // Current date
  // Schema Markup for the article (JSON-LD)
  schemaMarkup: {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": "What are Percentiles and How Do We Use Them in Health?",
    "image": [
      "https://www.weightvs.com/lovable-uploads/Percentile-Curve.jpg" // Example URL, please adjust
    ],
    "datePublished": "2024-07-20T10:00:00+01:00", // Example date and time
    "dateModified": "2024-07-20T10:00:00+01:00",
    "author": {
      "@type": "Person",
      "name": "WeightVs.com Editorial Team" // Or specific author
    },
    "publisher": {
      "@type": "@type": "Organization",
      "name": "WeightVs.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.weightvs.com/logo.png" // Example URL, please adjust
      }
    },
    "description": "Unravel the mystery of percentiles in health. Learn how these statistical tools are used to compare your health metrics to a population, from growth charts to weight assessments.",
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": "https://www.weightvs.com/blog/what-are-percentiles-explained" // Example URL, please adjust
    }
  }
};
