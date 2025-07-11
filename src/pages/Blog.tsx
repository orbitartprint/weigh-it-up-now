
import Navigation from "@/components/Navigation";
import { useState, useMemo } from "react";
import { Helmet } from "react-helmet";
import BlogCard from "@/components/BlogCard";
import BlogSearch from "@/components/BlogSearch";
import { blogArticles } from "@/data/blogArticles";

const Blog = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedTag, setSelectedTag] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const articlesPerPage = 9;

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
  }, [searchQuery, selectedCategory, selectedTag]);

  const paginatedArticles = useMemo(() => {
    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    return filteredArticles.slice(startIndex, endIndex);
  }, [filteredArticles, currentPage]);

  const totalPages = Math.ceil(filteredArticles.length / articlesPerPage);
  const featuredArticle = paginatedArticles[0];
  const regularArticles = paginatedArticles.slice(1);

  const resetFilters = () => {
    setCurrentPage(1);
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    resetFilters();
  };

  const handleCategoryFilter = (category: string | null) => {
    setSelectedCategory(category);
    resetFilters();
  };

  const handleTagFilter = (tag: string | null) => {
    setSelectedTag(tag);
    resetFilters();
  };

  return (
    <>
      <Helmet>
        <title>Health & Weight Management Blog | WeightVs.com</title>
        <meta
          name="description"
          content="Expert insights on BMI, weight management, nutrition, and holistic health. Evidence-based articles to support your wellness journey."
        />
      </Helmet>

      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        <Navigation />
        
        <div className="container mx-auto px-4 py-12">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              The WeightVs.com Blog
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Your comprehensive guide to health, weight management, and well-being. 
              Evidence-based insights to support your wellness journey.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            {/* Sidebar with Search and Filters */}
            <div className="lg:col-span-1">
              <div className="sticky top-4">
                <BlogSearch
                  onSearch={handleSearch}
                  onCategoryFilter={handleCategoryFilter}
                  onTagFilter={handleTagFilter}
                  searchQuery={searchQuery}
                  selectedCategory={selectedCategory}
                  selectedTag={selectedTag}
                />
              </div>
            </div>

            {/* Main Content */}
            <div className="lg:col-span-3">
              {filteredArticles.length === 0 ? (
                <div className="text-center py-12">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">No articles found</h2>
                  <p className="text-gray-600">Try adjusting your search or filter criteria.</p>
                </div>
              ) : (
                <>
                  {/* Articles Grid */}
                  <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
                    {/* Featured Article */}
                    {featuredArticle && (
                      <BlogCard article={featuredArticle} featured={true} />
                    )}
                    
                    {/* Regular Articles */}
                    {regularArticles.map((article) => (
                      <BlogCard key={article.slug} article={article} />
                    ))}
                  </div>

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
    </>
  );
};

export default Blog;
