// src/pages/BlogArticle.tsx

import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import { ArrowLeft, Clock, Calendar } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import TableOfContents from "@/components/TableOfContents";
import RelatedArticles from "@/components/RelatedArticles";
import { blogArticles, getRelatedArticles } from "@/data/blogArticles";
import { useEffect } from "react";

// NEUE IMPORTE für Markdown Rendering
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // Für die Unterstützung von rohem HTML innerhalb von Markdown
import remarkGfm from 'remark-gfm'; // Für GitHub Flavored Markdown (Tabellen, Checkboxen etc.)

const BlogArticle = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  // Fallback für den Fall, dass der Artikel nicht gefunden wird
  if (!article) {
    return <div className="container mx-auto py-12 text-center">Article not found.</div>;
  }

  // Helferfunktion, um FAQs aus dem Markdown-Inhalt zu extrahieren
  const extractFaqs = (markdownContent: string) => {
    const faqs: { question: string; answer: string }[] = [];
    const faqSectionMatch = markdownContent.match(/## Frequently Asked Questions \(FAQ\)[^\n]*(.*?)(?=## |\n---|$)/s); // Anpassung des Regex, um den FAQ-Abschnitt besser zu isolieren

    if (faqSectionMatch && faqSectionMatch[1]) {
      const faqText = faqSectionMatch[1];
      const qaPairs = faqText.split(/(### Q: .*)/).slice(1); // Teilt den Text bei jedem "### Q:"

      for (let i = 0; i < qaPairs.length; i += 2) {
        const questionLine = qaPairs[i];
        const answerText = qaPairs[i + 1] ? qaPairs[i + 1].split('**A:**')[1]?.trim() : '';

        if (questionLine && answerText) {
          const question = questionLine.replace('### Q: ', '').trim();
          faqs.push({ question, answer: answerText });
        }
      }
    }
    return faqs;
  };

  const faqs = extractFaqs(article.content);

  // Schema Markup für Article
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "headline": article.title,
    "image": `https://www.weightvs.com${article.heroImage}`, // Absolute URL erstellen
    "datePublished": article.publishDate,
    "dateModified": article.publishDate, // Für Blog-Artikel oft gleich wie published, oder ein 'lastModified' Feld hinzufügen
    "author": {
      "@type": "Organization",
      "name": "WeightVs.com",
      "url": "https://www.weightvs.com"
    },
    "publisher": {
      "@type": "Organization",
      "name": "WeightVs.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.weightvs.com/logo.png" // Passe dies an dein Logo an
      }
    },
    "description": article.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.weightvs.com/blog/${article.slug}` // Absolute URL zum Artikel
    }
  };

  // Schema Markup für FAQPage
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  const relatedArticles = getRelatedArticles(article.slug);

  // useEffect für TableOfContents bleibt, da es die Headings im gerenderten HTML manipuliert
  // ABER: Es muss NACH dem ReactMarkdown-Rendering laufen
  useEffect(() => {
    if (article) {
      // Small delay to ensure ReactMarkdown has finished rendering
      const timeoutId = setTimeout(() => {
        const headingRegex = /^(H[1-6])(?=\s)/; // Regex to match heading tags (H1-H6)
        const contentElement = document.querySelector('.article-content');

        if (contentElement) {
          // Temporarily store innerHTML
          let innerHtml = contentElement.innerHTML;
          // Use a DOMParser to safely parse and manipulate HTML
          const parser = new DOMParser();
          const doc = parser.parseFromString(innerHtml, 'text/html');
          
          // Select all headings (h2 and h3 in your case)
          doc.querySelectorAll('h2, h3').forEach((heading) => {
            const text = heading.textContent || '';
            const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
            heading.setAttribute('id', id);
          });
          
          // Update the contentElement with the modified HTML
          contentElement.innerHTML = doc.body.innerHTML;
        }
      }, 50); // Kleiner Delay, um sicherzustellen, dass ReactMarkdown fertig ist
      return () => clearTimeout(timeoutId);
    }
  }, [article]); // Abhängigkeit vom Artikel, damit es bei Artikelwechsel neu läuft

  return (
    <>
      <Helmet>
        <title>{article.title} - WeightVs.com Blog</title>
        <meta name="description" content={article.excerpt} />
        {/* Canonical URL */}
        <link rel="canonical" href={`https://www.weightvs.com/blog/${article.slug}`} />

        {/* Article Schema Markup */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>

        {/* FAQPage Schema Markup (nur rendern, wenn FAQs vorhanden sind) */}
        {faqs.length > 0 && (
          <script type="application/ld+json">
            {JSON.stringify(faqSchema)}
          </script>
        )}
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <Link to="/blog" className="text-blue-600 hover:underline flex items-center mb-6">
            <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
          </Link>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <article>
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  className="w-full h-80 object-cover rounded-lg mb-6 shadow-md"
                />
                <h1 className="text-4xl font-bold text-gray-900 mb-4">{article.title}</h1>
                <div className="flex items-center text-gray-600 text-sm mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  <span>{new Date(article.publishDate).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                  <Clock className="h-4 w-4 ml-4 mr-2" />
                  <span>{article.readTimeMinutes} min read</span>
                </div>

                {/* Tags Section (Mobile) */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mb-6 flex flex-wrap gap-2 lg:hidden">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Article Content */}
                <Card>
                  <CardContent className="pt-6">
                    <div 
                      className="article-content prose prose-lg max-w-none"
                    >
                      {/* ReactMarkdown zum Rendern des Inhalts */}
                      <ReactMarkdown rehypePlugins={[rehypeRaw]} remarkPlugins={[remarkGfm]}>
                        {article.content}
                      </ReactMarkdown>
                    </div>
                  </CardContent>
                </Card>

                {/* Tags Section (Desktop) */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2 hidden lg:block">
                    {article.tags.map(tag => (
                      <Badge key={tag} variant="secondary" className="text-gray-600">
                        {tag}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Call to Action */}
                <Card className="mt-8">
                  <CardContent className="pt-6">
                    <div className="text-center">
                      <h3 className="text-xl font-semibold text-gray-900 mb-3">
                        Ready to Take Action?
                      </h3>
                      <p className="text-gray-600 mb-4">
                        Apply what you've learned with our free health calculators and tools.
                      </p>
                      <Button asChild>
                        <Link to="/calculators">Explore Our Calculators</Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>

                {/* Related Articles */}
                <RelatedArticles articles={relatedArticles} />
              </article>
            </div>

            {/* Desktop Table of Contents */}
            <div className="lg:col-span-1 hidden lg:block">
              <TableOfContents content={article.content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
