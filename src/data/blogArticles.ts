
export interface BlogArticle {
  slug: string;
  title: string;
  excerpt: string;
  heroImage: string;
  heroImageAlt: string;
  category: string;
  tags: string[];
  content: string;
  readTimeMinutes: number;
  publishDate: string;
}

import { understandingYourBmi } from '../blog/article-data/understanding-your-bmi';
import { dailyCalorieNeedsExplained } from '../blog/article-data/daily-calorie-needs-explained';
import { weightPercentilesExplained } from '../blog/article-data/weight-percentiles-explained';
import { sustainableWeightManagementTips } from '../blog/article-data/sustainable-weight-management-tips';
import { holisticHealthBeyondWeight } from '../blog/article-data/holistic-health-beyond-weight';
import { theWorldOnTheScale } from '../blog/article-data/the-world-on-the-scale';
import { childWeightPercentilesExplained } from '../blog/article-data/child-weight-percentiles-explained';


// Exportiere das Array aller Blogartikel
export const blogArticles: BlogArticle[] = [
  understandingYourBmi,
  dailyCalorieNeedsExplained,
  weightPercentilesExplained,
  sustainableWeightManagementTips,
  holisticHealthBeyondWeight,
  theWorldOnTheScale,
  childWeightPercentilesExplained,
].sort((a, b) => new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime());

// Helper functions (Diese bleiben, da sie auf das blogArticles Array zugreifen)
// Die calculateReadTime wurde verschoben!

export const getCategories = (): string[] => {
  const categories = blogArticles.map(article => article.category);
  return Array.from(new Set(categories));
};

export const getTags = (): string[] => { // Korrigiert: const getTags
  const tags = blogArticles.flatMap(article => article.tags);
  return Array.from(new Set(tags));
};

export const getRelatedArticles = (currentSlug: string, count: number = 3): BlogArticle[] => {
  const currentArticle = blogArticles.find(article => article.slug === currentSlug);
  if (!currentArticle) return [];

  const related = blogArticles
    .filter(article => article.slug !== currentSlug)
    .filter(article =>
      article.category === currentArticle.category ||
      article.tags.some(tag => currentArticle.tags.includes(tag))
    )
    .slice(0, count);

  // Wenn nicht genug verwandte Artikel gefunden wurden, fülle mit den neuesten Artikeln auf
  if (related.length < count) {
    const additional = blogArticles
      .filter(article => article.slug !== currentSlug && !related.includes(article))
      .slice(0, count - related.length);
    related.push(...additional);
  }
  return related;
};
