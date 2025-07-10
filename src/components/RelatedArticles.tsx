
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock } from "lucide-react";
import { BlogArticle } from "@/data/blogArticles";

interface RelatedArticlesProps {
  articles: BlogArticle[];
}

const RelatedArticles = ({ articles }: RelatedArticlesProps) => {
  if (articles.length === 0) {
    return null;
  }

  return (
    <Card className="mt-12">
      <CardHeader>
        <CardTitle>Related Articles</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {articles.map((article) => (
            <Link
              key={article.slug}
              to={`/blog/${article.slug}`}
              className="block group"
            >
              <div className="border rounded-lg overflow-hidden hover:shadow-md transition-shadow">
                <img
                  src={article.heroImage}
                  alt={article.heroImageAlt}
                  className="w-full h-32 object-cover"
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="secondary" className="text-xs">
                      {article.category}
                    </Badge>
                    <div className="flex items-center text-xs text-muted-foreground">
                      <Clock className="w-3 h-3 mr-1" />
                      {article.readTimeMinutes} min
                    </div>
                  </div>
                  <h3 className="font-semibold text-sm group-hover:text-primary transition-colors line-clamp-2">
                    {article.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default RelatedArticles;
