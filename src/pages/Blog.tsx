// src/Blog.tsx

import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import BlogCard from "@/components/BlogCard";
// BlogSearch wird nicht mehr direkt importiert, da die Logik hier aufgeteilt wird
import { blogArticles } from "@/data/blogArticles";

// UI Components, die für die Filter benötigt werden (vermutlich aus shadcn/ui)
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label"; // Für bessere Barrierefreiheit bei Eingabefeldern
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button"; // Für den "Clear Filters" Button

const Blog = () => {
  useEffect(() => { window.scrollTo(0, 0); }, []);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

  // Alle verfügbaren Kategorien und Tags extrahieren
  const allCategories = useMemo(() => {
    const categories = new Set<string>();
    blogArticles.forEach(article => categories.add(article.category));
    return Array.from(categories).sort();
  }, [blogArticles]);

  const allTags = useMemo(() => {
    const tags = new Set<string>();
    blogArticles.forEach(article => article.tags.forEach(tag => tags.add(tag)));
    return Array.from(tags).sort();
  }, [blogArticles]);

  const filteredArticles = useMemo(() => {
    return blogArticles.filter((article) => {
      const matchesSearch = searchQuery === "" ||
        article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.content.toLowerCase().includes(searchQuery.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchQuery.toLowerCase());

      const matchesCategory = selectedCategory === null || article.category === selectedCategory;

      const matchesTag = selectedTag === null || article.tags.includes(selectedTag);

      return matchesSearch && matchesCategory && matchesTag;
    });
  }, [searchQuery, selectedCategory, selectedTag, blogArticles]); // blogArticles hier als Abhängigkeit hinzufügen

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [currentPage, filteredArticles, articlesPerPage]);

  // Featured Article Logic
  const featuredArticle = useMemo(() => {
    // Wenn es keine Suchanfrage oder Filter gibt, den ersten Artikel als Featured nehmen
    // Andernfalls keinen Featured-Artikel anzeigen
    if (searchQuery === "" && selectedCategory === null && selectedTag === null && blogArticles.length > 0) {
      return blogArticles[0]; // Ersten Artikel als Featured nehmen
    }
    return null;
  }, [searchQuery, selectedCategory, selectedTag, blogArticles]);

  const regularArticles = useMemo(() => {
    if (featuredArticle) {
      return paginatedArticles.filter(article => article.slug !== featuredArticle.slug);
    }
    return paginatedArticles;
  }, [paginatedArticles, featuredArticle]);

  const showNoResults = filteredArticles.length === 0;


  return (
    <>
      <Helmet>
        <title>Blog - WeightVs.com</title>
        <meta name="description" content="Explore articles and insights on health, weight management, nutrition, and well-being from WeightVs.com." />
      </Helmet>
      <Navigation />
      <div className="relative isolate px-6 pt-14 lg:px-8">
        <div className="container mx-auto px-4 py-8 md:py-12">
          {/* Haupt-Layout mit 2 Spalten - auf Desktop umgedreht */}
          {/* Mobile: Filter oben (Suche), dann Artikel, dann Pagination, dann Filter unten (Kategorien/Tags) */}
          {/* Desktop: Artikel links, Filter rechts */}
          <div className="flex flex-col md:flex-row-reverse gap-8">

            {/* Rechte Spalte (Desktop) / Filter-Bereich (Mobile: Suchfeld oben, Kategorien/Tags unten) */}
            {/* order-2 auf mobile, damit er nach der Artikel-Spalte kommt (die order-1 ist) */}
            <div className="md:w-1/4 order-2 md:order-last">

              {/* Suchleiste (bleibt oben, auch auf Mobile) */}
              <div className="mb-6 order-1 md:order-1"> {/* order-1 sorgt dafür, dass die Suche immer zuerst kommt in diesem Block */}
                <h3 className="text-lg font-semibold mb-2">Search Articles</h3>
                <Label htmlFor="search" className="sr-only">Search articles...</Label>
                <Input
                  id="search"
                  type="text"
                  placeholder="Search articles..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full"
                />
              </div>

              {/* Kategorien-Filter (auf Mobile unter Pagination, auf Desktop unter Suche) */}
              <div className="mb-6 order-3 md:order-2"> {/* order-3 auf Mobile sorgt dafür, dass es nach Artikeln+Pagination kommt */}
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <Select onValueChange={(value) => setSelectedCategory(value === "all" ? null : value)} value={selectedCategory || "all"}>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="All Categories" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Categories</SelectItem>
                    {allCategories.map((category) => (
                      <SelectItem key={category} value={category}>{category}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Tag-Filter (auf Mobile unter Pagination, auf Desktop unter Kategorien) */}
              <div className="order-4 md:order-3"> {/* order-4 auf Mobile sorgt dafür, dass es nach Artikeln+Pagination kommt */}
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    onClick={() => setSelectedTag(null)}
                    variant={selectedTag === null ? "default" : "outline"}
                    className="cursor-pointer px-3 py-1 text-sm hover:bg-muted"
                  >
                    All Tags
                  </Badge>
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      onClick={() => setSelectedTag(tag)}
                      variant={selectedTag === tag ? "default" : "outline"}
                      className="cursor-pointer px-3 py-1 text-sm hover:bg-muted"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>

              {/* Clear Filters Button */}
              {(searchQuery !== "" || selectedCategory !== null || selectedTag !== null) && (
                <div className="mt-6 order-5 md:order-4">
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setCurrentPage(1);
                    }}
                    className="w-full"
                    variant="outline"
                  >
                    Clear Filters
                  </Button>
                </div>
              )}
            </div>

            {/* Linke Spalte (Desktop) / Artikel-Bereich (Mobile: nach Suche, vor Kategorien/Tags) */}
            {/* order-1 auf mobile, damit es nach der Suche, aber vor den Kategorien/Tags kommt */}
            <div className="md:w-3/4 order-1 md:order-first">
              {showNoResults ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setCurrentPage(1);
                    }}
                    className="mt-4"
                  >
                    Reset Filters
                  </Button>
                </div>
              ) : (
                <>
                  {/* Featured Article */}
                  {featuredArticle && (
                    <div className="mb-12">
                      <h2 className="text-2xl md:text-3xl font-bold mb-6">Featured Article</h2>
                      <BlogCard article={featuredArticle} featured={true} />
                    </div>
                  )}

                  {/* Regular Articles */}
                  {/* Sicherstellen, dass der Featured-Artikel nicht doppelt erscheint, wenn er auch in den regulären Artikeln wäre */}
                  {paginatedArticles.length > 0 && (
                     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                       {regularArticles.map((article) => (
                         <BlogCard key={article.slug} article={article} />
                       ))}
                     </div>
                   )}

                  {/* Pagination */}
                  {totalPages > 1 && (
                    <div className="flex justify-center mt-12">
                      <div className="flex gap-2">
                        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                          <button
                            key={page}
                            onClick={() => setCurrentPage(page)}
                            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
                              currentPage === page
                                ? "bg-primary text-primary-foreground"
                                : "bg-white text-gray-700 hover:bg-gray-100 border"
                            }`}
                          >
                            {page}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Blog;
