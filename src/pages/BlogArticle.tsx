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

  // useEffect für TableOfContents bleibt, da es die Headings im gerenderten HTML manipuliert
  // ABER: Es muss NACH dem ReactMarkdown-Rendering laufen
  useEffect(() => {
    if (article) {
      // Small delay to ensure ReactMarkdown has finished rendering
      const timeoutId = setTimeout(() => {
        const headingRegex = /^(H[1-6])(?=\s)/; // Regex to match heading tags (H1-H6)
        const contentElement = document.querySelector('.article-content');

        if (contentElement) {
          const headings = contentElement.querySelectorAll('h1, h2, h3, h4, h5, h6');
          headings.forEach((heading) => {
            const text = heading.textContent;
            if (text) {
              const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
              heading.setAttribute('id', id);
            }
          });
        }
      }, 100); // Adjust delay if needed

      return () => clearTimeout(timeoutId);
    }
  }, [article]); // Abhängigkeit von article hinzufügen

  if (!article) {
    return (
      <>
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-xl text-gray-600">Artikel nicht gefunden.</p>
        </div>
      </>
    );
  }

  const relatedArticles = getRelatedArticles(article.slug);

  // Funktion zum Formatieren des Datums für das Schema.org Markup (ISO 8601)
  const formatISODate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0]; // YYYY-MM-DD
  };

  // Generiere das Schema.org Markup (JSON-LD)
  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article", // Oder "BlogPosting"
    "headline": article.title,
    "image": article.heroImage,
    "datePublished": formatISODate(article.publishDate),
    "dateModified": formatISODate(article.publishDate), // Oder ein 'lastModifiedDate' wenn verfügbar
    "author": {
      "@type": "Person",
      "name": "WeightVs.com Team" // Passe den Autor an
    },
    "publisher": {
      "@type": "Organization",
      "name": "WeightVs.com",
      "logo": {
        "@type": "ImageObject",
        "url": "https://www.weightvs.com/logo.png" // Passe den Pfad zum Logo an
      }
    },
    "description": article.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.weightvs.com/blog/${article.slug}` // Passe die Basis-URL an
    },
    "articleBody": article.content.substring(0, 1000) + "..." // Optional: Kürze den Inhalt für Schema, um die Größe zu begrenzen
  };

  return (
    <>
      <Helmet>
        <title>{article.title} | WeightVs.com Blog</title>
        <meta name="description" content={article.excerpt} />
        <meta name="keywords" content={article.tags.join(', ')} />
        <link rel="canonical" href={`https://www.weightvs.com/blog/${article.slug}`} />

        {/* Open Graph / Facebook Meta Tags */}
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={`https://www.weightvs.com${article.heroImage}`} /> {/* Absolute URL */}
        <meta property="og:url" content={`https://www.weightvs.com/blog/${article.slug}`} />
        <meta property="og:type" content="article" />
        <meta property="og:site_name" content="WeightVs.com" />
        <meta property="article:published_time" content={new Date(article.publishDate).toISOString()} />
        <meta property="article:author" content="WeightVs.com Team" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={article.title} />
        <meta name="twitter:description" content={article.excerpt} />
        <meta name="twitter:image" content={`https://www.weightvs.com${article.heroImage}`} /> {/* Absolute URL */}

        {/* Schema.org JSON-LD Markup */}
        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>
      </Helmet>

      <div className="bg-gray-50 min-h-screen">
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <Link to="/blog" className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors mb-6">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Zurück zum Blog
            </Link>

            <img
              src={article.heroImage}
              alt={article.heroImageAlt}
              className="w-full h-auto object-contain mb-8 rounded-lg shadow-md"
            />

            <div className="flex justify-between items-center text-sm text-gray-600 mb-4">
              <div className="flex items-center space-x-4">
                <span className="flex items-center">
                  <Clock className="h-4 w-4 mr-1 text-gray-500" />
                  {article.readTimeMinutes} Min. Lesezeit
                </span>
                <span className="flex items-center">
                  <Calendar className="h-4 w-4 mr-1 text-gray-500" />
                  {new Date(article.publishDate).toLocaleDateString('de-DE', { year: 'numeric', month: 'long', day: 'numeric' })}
                </span>
              </div>
              <Badge variant="secondary" className="bg-blue-100 text-blue-800">{article.category}</Badge>
            </div>

            <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-6">
              {article.title}
            </h1>

            <p className="text-xl text-gray-700 mb-8 font-serif italic">
              {article.excerpt}
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
              {/* Mobile Table of Contents (hidden on large screens) */}
              <div className="lg:hidden mb-8">
                <TableOfContents content={article.content} isMobile={true} />
              </div>

              {/* Article Content */}
              <Card className="lg:col-span-3"> {/* Artikelinhalt nimmt mehr Platz ein */}
                <CardContent className="pt-6">
                  <div className="article-content prose prose-lg max-w-none">
                    {/* HIER WIRD DER MARKDOWN-INHALT GERENDERT */}
                    <ReactMarkdown
                      rehypePlugins={[rehypeRaw]}
                      remarkPlugins={[remarkGfm]}
                    >
                      {article.content}
                    </ReactMarkdown>
                  </div>
                </CardContent>
              </Card>

              {/* Desktop Table of Contents */}
              <div className="lg:col-span-1 hidden lg:block">
                <TableOfContents content={article.content} />
              </div>
            </div>

            {/* Tags Section */}
            {article.tags && article.tags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-2">
                {article.tags.map(tag => (
                  <Badge key={tag} variant="outline" className="text-gray-600 hover:bg-gray-100 cursor-pointer">
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
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
