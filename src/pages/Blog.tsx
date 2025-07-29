// src/Blog.tsx

import { useState, useEffect, useMemo } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Helmet } from "react-helmet";
import BlogCard from "@/components/BlogCard";
import { blogArticles } from "@/data/blogArticles";
import { cn } from "@/lib/utils";

// UI Components, die für die Filter benötigt werden (vermutlich aus shadcn/ui)
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

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

  // Filterung der Artikel basierend auf Suchanfrage, Kategorie und Tag
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
  }, [searchQuery, selectedCategory, selectedTag, blogArticles]);

  // Featured Article: Der erste Artikel aus der GEFILTERTEN Liste
  const featuredArticle = useMemo(() => {
    return filteredArticles.length > 0 ? filteredArticles[0] : null;
  }, [filteredArticles]);

  // Artikel, die nach dem Featured Article übrig bleiben und paginiert werden
  const articlesForPagination = useMemo(() => {
    if (featuredArticle) {
      // Schließe den Featured Article aus der Liste aus, die paginiert wird
      return filteredArticles.slice(1);
    }
    return filteredArticles; // Wenn kein Featured Article, werden alle gefilterten Artikel paginiert
  }, [filteredArticles, featuredArticle]);

  // Gesamtzahl der Seiten basierend auf den Artikeln, die paginiert werden
  const totalPages = Math.ceil(articlesForPagination.length / articlesPerPage);

  // Aktuell paginierte Artikel
  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return articlesForPagination.slice(startIndex, endIndex);
  }, [currentPage, articlesForPagination, articlesPerPage]);

  // Reguläre Artikel sind einfach die paginierten Artikel
  const regularArticles = paginatedArticles;

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
          {/* NEUE ÜBERSCHRIFTEN START - jetzt immer zentriert */}
          <div className="mb-12 text-center"> {/* "md:text-left" entfernt */}
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4">
              The WeightVs.com Blog
            </h1>
            <p className="mt-4 text-lg leading-8 text-gray-600 max-w-3xl mx-auto"> {/* mx-auto für Zentrierung auch bei max-width */}
              Your comprehensive guide to health, weight management, and well-being.
              Evidence-based insights to support your wellness journey.
            </p>
          </div>
          {/* NEUE ÜBERSCHRIFTEN END */}

          {/* Haupt-Layout mit 2 Spalten - auf Desktop umgedreht */}
          <div className="flex flex-col md:flex-row-reverse gap-8">

            {/* Rechte Spalte (Desktop) / Filter-Bereich (Mobile: Suchfeld oben, Kategorien/Tags unten) */}
            <div className="md:w-1/4 order-2 md:order-last">

              {/* Suchleiste (bleibt oben, auch auf Mobile) */}
              <div className="mb-6 order-1 md:order-1">
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
              <div className="mb-6 order-3 md:order-2">
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
              <div className="order-4 md:order-3">
                <h3 className="text-lg font-semibold mb-2">Tags</h3>
                <div className="flex flex-wrap gap-2">
                  <Badge
                    onClick={() => setSelectedTag(null)} // Klick auf "All Tags" setzt Auswahl immer zurück
                    variant={selectedTag === null ? "default" : "outline"}
                    className={cn( // cn utility für konditionale Klassen
                      "cursor-pointer px-2 py-1 text-xs !transition-colors", // text-xs & instant-transition
                      selectedTag === null
                        ? "" // Wenn aktiv, keine zusätzlichen Hover-Klassen (bleibt blau)
                        : "hover:bg-primary hover:text-primary-foreground" // Wenn nicht aktiv, wird blau auf Hover
                    )}
                  >
                    All Tags
                  </Badge>
                  {allTags.map((tag) => (
                    <Badge
                      key={tag}
                      onClick={() => setSelectedTag(selectedTag === tag ? null : tag)} // Toggle-Logik: Aufheben bei erneutem Klick
                      variant={selectedTag === tag ? "default" : "outline"}
                      className={cn( // cn utility für konditionale Klassen
                        "cursor-pointer px-2 py-1 text-xs !transition-colors", // text-xs & instant-transition
                        selectedTag === tag
                          ? "" // Wenn aktiv, keine zusätzlichen Hover-Klassen (bleibt blau)
                          : "hover:bg-primary hover:text-primary-foreground" // Wenn nicht aktiv, wird blau auf Hover
                      )}
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
                      setCurrentPage(1); // Setze Seite zurück, wenn Filter gelöscht werden
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
            <div className="md:w-3/4 order-1 md:order-first">
              {showNoResults ? (
                <div className="text-center py-12">
                  <p className="text-xl text-muted-foreground">No articles found matching your criteria.</p>
                  <Button
                    onClick={() => {
                      setSearchQuery("");
                      setSelectedCategory(null);
                      setSelectedTag(null);
                      setCurrentPage(1); // Setze Seite zurück, wenn Filter gelöscht werden
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

                  {/* Regular Articles (die restlichen paginierten Artikel) */}
                  {regularArticles.length > 0 && ( // Nur anzeigen, wenn reguläre Artikel vorhanden sind
                     <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
                       {regularArticles.map((article) => (
                         <BlogCard key={article.slug} article={article} />
                       ))}
                     </div>
                   )}

                  {/* Pagination - nur anzeigen, wenn mehr als eine Seite für die restlichen Artikel existiert */}
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
