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

// ReactMarkdown Importe sind bereits vorhanden:
import ReactMarkdown from 'react-markdown';
import rehypeRaw from 'rehype-raw';
import remarkGfm from 'remark-gfm';

// Hilfsfunktion zur Generierung von IDs (kann hier oder in einem utils-File sein)
const generateId = (text: string) => {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
};

const BlogArticle = () => {
  // useEffect für das Scrollen zum Seitenanfang bei Artikelwechsel
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [useParams().slug]); // Abhängigkeit auf den Slug setzen, damit es bei Artikelwechsel feuert

  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  if (!article) {
    return <div>Article not found</div>; // Oder eine 404-Seite
  }

  const relatedArticles = getRelatedArticles(slug);

  return (
    <>
      <Helmet>
        <title>{article.title} - WeightVs</title>
        <meta name="description" content={article.excerpt} />
        {/* Weitere Meta-Tags */}
      </Helmet>
      <div className="min-h-screen flex flex-col">
        {/* Navigation, etc. */}
        {/* ... */}
        
        <div className="container mx-auto px-4 py-8 flex-grow">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content Area */}
            <div className="lg:col-span-3">
              {/* Zurück-Button */}
              <Button variant="ghost" className="mb-6" asChild>
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4 mr-2" /> Back to Blog
                </Link>
              </Button>

              {/* Hero Image */}
              {article.heroImage && (
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  className="w-full h-48 object-cover rounded-lg mb-6"
                />
              )}

              {/* Article Header */}
              <h1 className="text-4xl font-bold mb-4">{article.title}</h1>
              <div className="flex items-center text-muted-foreground text-sm mb-6">
                <Calendar className="h-4 w-4 mr-2" />
                <span>{new Date(article.publishDate).toLocaleDateString("en-US", { year: 'numeric', month: 'long', day: 'numeric' })}</span>
                <Clock className="h-4 w-4 ml-4 mr-2" />
                <span>{article.readTimeMinutes} min read</span>
                <Badge variant="secondary" className="ml-4">{article.category}</Badge>
              </div>

              {/* Mobile Table of Contents */}
              <div className="lg:hidden">
                <TableOfContents content={article.content} mobile={true} />
              </div>

              {/* Article Content - JETZT MIT ReactMarkdown */}
              <Card>
                <CardContent className="pt-6">
                  <ReactMarkdown
                    className="article-content prose prose-lg max-w-none"
                    rehypePlugins={[rehypeRaw]}
                    remarkPlugins={[remarkGfm]}
                    components={{
                      h2: ({ node, ...props }) => {
                        const children = Array.isArray(props.children) ? props.children.join('') : props.children;
                        const id = generateId(children.toString());
                        return <h2 id={id} {...props}>{props.children}</h2>;
                      },
                      h3: ({ node, ...props }) => {
                        const children = Array.isArray(props.children) ? props.children.join('') : props.children;
                        const id = generateId(children.toString());
                        return <h3 id={id} {...props}>{props.children}</h3>;
                      },
                    }}
                  >
                    {article.content}
                  </ReactMarkdown>
                </CardContent>
              </Card>

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
