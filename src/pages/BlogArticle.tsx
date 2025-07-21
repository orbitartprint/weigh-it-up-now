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
import { useEffect, useState } from "react";

// NEUE IMPORTE für Markdown Rendering
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw'; // Für die Unterstützung von rohem HTML innerhalb von Markdown
import remarkGfm from 'remark-gfm'; // Für GitHub Flavored Markdown (Tabellen, Checkboxen etc.)

// NEUE IMPORTE für Shadcn Dialog
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"; // Importiere Dialog Komponenten

const BlogArticle = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  // Zustand für das Öffnen/Schließen des Bild-Modals
  const [isHeroImageModalOpen, setIsHeroImageModalOpen] = useState(false);

  // Fallback für den Fall, dass der Artikel nicht gefunden wird
  if (!article) {
    return <div className="container mx-auto py-12 text-center">Article not found.</div>;
  }

  // Helferfunktion, um IDs aus Überschriftentext zu generieren
  const generateId = (text: string) => {
    return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  };

  // Custom Renderer für Überschriften in ReactMarkdown
  const renderers = {
    h2: ({ node, children, ...props }: any) => {
      const text = Array.isArray(children) ? children.map((child: any) => typeof child === 'string' ? child : '').join('') : '';
      const id = generateId(text);
      return <h2 id={id} {...props}>{children}</h2>;
    },
    h3: ({ node, children, ...props }: any) => {
      const text = Array.isArray(children) ? children.map((child: any) => typeof child === 'string' ? child : '').join('') : '';
      const id = generateId(text);
      return <h3 id={id} {...props}>{children}</h3>;
    },
    // Füge hier weitere HTML-Tags hinzu, die du anpassen möchtest
  };


  // Helferfunktion, um FAQs aus dem Markdown-Inhalt zu extrahieren
  const extractFaqs = (markdownContent: string) => {
    const faqs: { question: string; answer: string }[] = [];
    const faqSectionMatch = markdownContent.match(/## Frequently Asked Questions \(FAQ\)[^\n]*(.*?)(?=## |\n---|$)/s);

    if (faqSectionMatch && faqSectionMatch[1]) {
      const faqText = faqSectionMatch[1];
      const qaPairs = faqText.split(/(### Q: .*)/).slice(1);

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
    "image": `https://www.weightvs.com${article.heroImage}`,
    "datePublished": article.publishDate,
    "dateModified": article.publishDate,
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
        "url": "https://www.weightvs.com/logo.png"
      }
    },
    "description": article.excerpt,
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://www.weightvs.com/blog/${article.slug}`
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
        const contentElement = document.querySelector('.article-content');

        if (contentElement) {
          // No need to parse innerHTML and re-set it. ReactMarkdown already handled it.
          // TableOfContents should now directly read IDs that ReactMarkdown set.
          // This useEffect can be simplified if TableOfContents directly reads from a ref
          // or if the IDs are guaranteed to be there by ReactMarkdown's renderers.
          // For now, we keep the structure but remove the innerHTML manipulation part that caused issues.
          // The TableOfContents component itself might need to fetch headings from the DOM.
          // If TableOfContents relies on `article.content` for parsing, it should parse the *raw* markdown,
          // and its internal logic for generating IDs should match the `generateId` function here.
        }
      }, 50);
      return () => clearTimeout(timeoutId);
    }
  }, [article]);

  return (
    <>
      <Helmet>
        <title>{article.title} - WeightVs.com Blog</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://www.weightvs.com/blog/${article.slug}`} />

        <script type="application/ld+json">
          {JSON.stringify(articleSchema)}
        </script>

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
                {/* Hero Image mit Dialog-Trigger */}
                <Dialog open={isHeroImageModalOpen} onOpenChange={setIsHeroImageModalOpen}>
                  <DialogTrigger asChild>
                    <img
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      className="w-full h-64 object-cover rounded-lg mb-6 shadow-md cursor-pointer" // cursor-pointer hinzugefügt
                      onClick={() => setIsHeroImageModalOpen(true)} // Optional: für bessere Klick-Erkennung
                    />
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[800px] p-0 border-none bg-transparent">
                    {/* Das Bild im Modal - 'object-contain' für volle Sichtbarkeit */}
                    <img
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      className="w-full h-auto max-h-[80vh] object-contain rounded-lg" // max-h-[90vh] begrenzt Höhe auf 90% des Viewports
                      //className="w-full h-100 object-cover rounded-lg mb-6 shadow-md cursor-pointer"
                    />
                  </DialogContent>
                </Dialog>

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

                {/* Article Content - Jetzt mit ReactMarkdown und custom Renderern */}
                <Card>
                  <CardContent className="pt-6">
                    <div 
                      className="article-content prose prose-lg max-w-none"
                    >
                      <ReactMarkdown 
                        rehypePlugins={[rehypeRaw]} 
                        remarkPlugins={[remarkGfm]}
                        components={renderers} // Wichtig: Hier werden die Custom Renderer übergeben
                      >
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
              {/* TableOfContents sollte jetzt die IDs korrekt lesen, da ReactMarkdown sie setzt */}
              <TableOfContents content={article.content} /> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
