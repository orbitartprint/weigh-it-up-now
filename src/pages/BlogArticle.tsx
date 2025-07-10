
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

const BlogArticle = () => {
  const { slug } = useParams<{ slug: string }>();
  const article = blogArticles.find((a) => a.slug === slug);

  useEffect(() => {
    if (article && article.content) {
      // Add IDs to headings for table of contents
      const headingRegex = /^(#{2,3})\s+(.+)$/gm;
      const contentElement = document.querySelector('.article-content');
      
      if (contentElement) {
        const content = contentElement.innerHTML;
        const updatedContent = content.replace(headingRegex, (match, hashes, text) => {
          const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
          const tag = `h${hashes.length}`;
          return `<${tag} id="${id}">${text}</${tag}>`;
        });
        contentElement.innerHTML = updatedContent;
      }
    }
  }, [article]);

  if (!article) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Article Not Found</h1>
          <p className="text-gray-600 mb-6">The article you're looking for doesn't exist.</p>
          <Button asChild>
            <Link to="/blog">Back to Blog</Link>
          </Button>
        </div>
      </div>
    );
  }

  const relatedArticles = getRelatedArticles(article.slug);

  // Process article content to convert markdown-like syntax to HTML
  const processContent = (content: string) => {
    return content
      // Convert headers
      .replace(/^### (.+)$/gm, '<h3 class="text-xl font-semibold text-gray-900 mt-8 mb-4">$1</h3>')
      .replace(/^## (.+)$/gm, '<h2 class="text-2xl font-bold text-gray-900 mt-10 mb-6">$1</h2>')
      .replace(/^# (.+)$/gm, '<h1 class="text-3xl font-bold text-gray-900 mt-12 mb-8">$1</h1>')
      // Convert bold text
      .replace(/\*\*(.+?)\*\*/g, '<strong class="font-semibold">$1</strong>')
      // Convert italic text
      .replace(/\*(.+?)\*/g, '<em class="italic">$1</em>')
      // Convert links
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" class="text-primary hover:underline">$1</a>')
      // Convert paragraphs
      .split('\n\n')
      .map(paragraph => {
        paragraph = paragraph.trim();
        if (!paragraph) return '';
        if (paragraph.startsWith('<h') || paragraph.startsWith('<ul') || paragraph.startsWith('<ol')) {
          return paragraph;
        }
        return `<p class="text-gray-700 leading-relaxed mb-4">${paragraph}</p>`;
      })
      .join('\n');
  };

  const processedContent = processContent(article.content);

  return (
    <>
      <Helmet>
        <title>{article.title} | WeightVs.com Blog</title>
        <meta name="description" content={article.excerpt} />
        <meta property="og:title" content={article.title} />
        <meta property="og:description" content={article.excerpt} />
        <meta property="og:image" content={article.heroImage} />
        <meta property="og:type" content="article" />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="container mx-auto px-4 py-8">
          {/* Back Button */}
          <Button variant="ghost" asChild className="mb-6">
            <Link to="/blog" className="flex items-center gap-2">
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>
          </Button>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-3">
              {/* Hero Image */}
              <div className="mb-8">
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  className="w-full h-64 md:h-80 object-cover rounded-lg shadow-lg"
                />
              </div>

              {/* Article Header */}
              <div className="mb-8">
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge variant="secondary" className="text-sm">
                    {article.category}
                  </Badge>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Clock className="w-4 h-4 mr-1" />
                    {article.readTimeMinutes} min read
                  </div>
                  <div className="flex items-center text-sm text-muted-foreground">
                    <Calendar className="w-4 h-4 mr-1" />
                    {new Date(article.publishDate).toLocaleDateString()}
                  </div>
                </div>

                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                  {article.title}
                </h1>

                <p className="text-xl text-gray-600 leading-relaxed mb-6">
                  {article.excerpt}
                </p>

                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge key={tag} variant="outline">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Mobile Table of Contents */}
              <div className="lg:hidden mb-8">
                <TableOfContents content={article.content} mobile={true} />
              </div>

              {/* Article Content */}
              <Card>
                <CardContent className="pt-6">
                  <div 
                    className="article-content prose prose-lg max-w-none"
                    dangerouslySetInnerHTML={{ __html: processedContent }}
                  />
                </CardContent>
              </Card>

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
