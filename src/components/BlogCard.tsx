
import { Link } from "react-router-dom";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Clock } from "lucide-react";
import { BlogArticle } from "@/data/blogArticles";

interface BlogCardProps {
  article: BlogArticle;
  featured?: boolean;
}

const BlogCard = ({ article, featured = false }: BlogCardProps) => {
  return (
    <Card className={`h-full hover:shadow-lg transition-shadow ${featured ? 'md:col-span-2 lg:col-span-2' : ''}`}>
      <div className={featured ? 'md:flex' : ''}>
        <div className={featured ? 'md:w-1/2' : ''}>
          <img
            src={article.heroImage}
            alt={article.heroImageAlt}
            className={`w-full object-cover rounded-t-lg ${featured ? 'md:rounded-l-lg md:rounded-tr-none md:h-full' : 'h-48'}`}
          />
        </div>
        <div className={featured ? 'md:w-1/2 md:flex md:flex-col' : ''}>
          <CardHeader>
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary">{article.category}</Badge>
              <div className="flex items-center text-sm text-muted-foreground">
                <Clock className="w-4 h-4 mr-1" />
                {article.readTimeMinutes} min read
              </div>
            </div>
            <CardTitle className={featured ? 'text-xl md:text-2xl' : 'text-lg'}>
              {article.title}
            </CardTitle>
            <CardDescription className={featured ? 'text-base' : ''}>
              {article.excerpt}
            </CardDescription>
          </CardHeader>
          <CardContent className="flex-1">
            <div className="flex flex-wrap gap-1">
              {article.tags.slice(0, 3).map((tag) => (
                <Badge key={tag} variant="outline" className="text-xs">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <Button asChild className="w-full">
              <Link to={`/blog/${article.slug}`}>Read More</Link>
            </Button>
          </CardFooter>
        </div>
      </div>
    </Card>
  );
};

export default BlogCard;
