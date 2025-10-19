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
import remarkMath from 'remark-math'; // Importiere remark-math
import rehypeKatex from 'rehype-katex'; // Importiere rehype-katex
import 'katex/dist/katex.min.css';

// NEUE IMPORTE für Markdown Rendering
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';
import rehypeSlug from 'rehype-slug'; // Für automatische ID-Generierung

// NEUE IMPORTE für Shadcn Dialog
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog"; // Importiere Dialog Komponenten

const BlogArticle = () => {
  // Stellen Sie sicher, dass dies beim Laden eines neuen Artikels immer nach oben scrollt
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useParams().slug]); // Abhängigkeit vom slug, damit es bei jedem Artikelwechsel auslöst

  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  // Zustand für das Öffnen/Schließen des Bild-Modals
  const [isHeroImageModalOpen, setIsHeroImageModalOpen] = useState(false);

  // Fallback für den Fall, dass der Artikel nicht gefunden wird
  if (!article) {
    return <div className="container mx-auto py-12 text-center">Article not found.</div>;
  }

  const relatedArticles = getRelatedArticles(article.slug);

  return (
    <>
      <Helmet>
        <title>{article.title} - WeightVs Blog</title>
        <meta name="description" content={article.excerpt} />
        <link rel="canonical" href={`https://www.weightvs.com/blog/${article.slug}`} />
      </Helmet>
      <div className="bg-gradient-to-b from-blue-50 to-white min-h-screen">
        <div className="container mx-auto px-4 py-8 md:py-12">
          <Button variant="ghost" className="mb-6" asChild>
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Blog
            </Link>
          </Button>
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <div className="lg:col-span-3">
              <article className="bg-white p-6 rounded-lg shadow-sm">
                {/* Hero Image */}
                <Dialog open={isHeroImageModalOpen} onOpenChange={setIsHeroImageModalOpen}>
                  <DialogTrigger asChild>
                    <div className="mb-6 cursor-pointer overflow-hidden rounded-lg">
                      <img
                        src={article.heroImage}
                        alt={article.heroImageAlt}
                        className="w-full h-auto max-h-[400px] object-cover rounded-lg transform transition-transform duration-300 hover:scale-105"
                        onClick={() => setIsHeroImageModalOpen(true)}
                      />
                    </div>
                  </DialogTrigger>
                  <DialogContent className="max-w-4xl p-0">
                    <img
                      src={article.heroImage}
                      alt={article.heroImageAlt}
                      className="w-full h-auto rounded-lg"
                    />
                  </DialogContent>
                </Dialog>

                <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                  {article.title}
                </h1>
                <div className="flex items-center text-sm text-muted-foreground mb-6 space-x-4">
                  <div className="flex items-center">
                    <Calendar className="mr-1 h-4 w-4" />
                    {new Date(article.publishDate).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </div>
                  <div className="flex items-center">
                    <Clock className="mr-1 h-4 w-4" />
                    {article.readTimeMinutes} min read
                  </div>
                  <Badge variant="secondary" className="text-gray-600">
                    {article.category}
                  </Badge>
                </div>

                <div className="prose dark:prose-invert max-w-none prose-h2:text-2xl prose-h2:font-bold prose-h3:text-xl prose-h3:font-bold prose-a:text-blue-600 prose-a:hover:underline">
                  <ReactMarkdown
                    // Entfernen Sie rehypeAutolinkHeadings, da es Überschriften zu Links macht
                    // rehypeSlug generiert die IDs, die TableOfContents benötigt
                    rehypePlugins={[rehypeRaw, rehypeSlug,rehypeKatex]}
                    remarkPlugins={[remarkGfm,remarkMath]}
                    components={{
                      a: ({ node, ...props }) => {
                        const href = props.href || '';
                        const isExternal = href.startsWith('http://') || href.startsWith('https://');
                        const isOurDomain = href.includes('weightvs.com') || href.startsWith('/');
            
                        // Überprüfe, ob es sich um einen externen Link handelt UND nicht um deine eigene Domain
                        if (isExternal && !isOurDomain) {
                          return (
                            <a
                              {...props}
                              target="_blank"
                              rel="noopener noreferrer" // Wichtig für Sicherheit und Performance
                            />
                          );
                        }
                        return <a {...props} />; // Lasse interne Links normal
                      },
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                </div>

                {/* Tags Section */}
                {article.tags && article.tags.length > 0 && (
                  <div className="mt-8 flex flex-wrap gap-2">
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
              {/* TableOfContents liest die IDs jetzt direkt aus dem gerenderten DOM,
                  die von rehypeSlug gesetzt wurden. */}
              <TableOfContents content={article.content} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default BlogArticle;
