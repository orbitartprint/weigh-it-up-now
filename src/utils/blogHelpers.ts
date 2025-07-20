// src/utils/blogHelpers.ts

export const calculateReadTime = (content: string): number => {
  const wordsPerMinute = 225; // Durchschnittliche Lesegeschwindigkeit in Wörtern pro Minute
  const wordCount = content.trim().split(/\s+/).length;
  return Math.ceil(wordCount / wordsPerMinute);
};
