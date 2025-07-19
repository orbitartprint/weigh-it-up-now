import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Search, X } from "lucide-react";
import { getCategories, getTags } from "@/data/blogArticles";

interface BlogSearchProps {
  onSearch: (query: string) => void;
  onCategoryFilter: (category: string | null) => void;
  onTagFilter: (tag: string | null) => void;
  searchQuery: string;
  selectedCategory: string | null;
  selectedTag: string | null;
}

const BlogSearch = ({
  onSearch,
  onCategoryFilter,
  onTagFilter,
  searchQuery,
  selectedCategory,
  selectedTag,
}: BlogSearchProps) => {
  const [localSearchQuery, setLocalSearchQuery] = useState(searchQuery);
  const categories = getCategories();
  const tags = getTags();

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(localSearchQuery);
  };

  const clearFilters = () => {
    setLocalSearchQuery("");
    onSearch("");
    onCategoryFilter(null);
    onTagFilter(null);
  };

  const hasActiveFilters = searchQuery || selectedCategory || selectedTag;

  return (
    <div className="space-y-6">
      {/* Search Bar */}
      <form onSubmit={handleSearchSubmit} className="flex gap-2"> {/* Added flex gap-2 here */}
        <div className="relative flex-grow"> {/* Added flex-grow here */}
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search articles..."
            value={localSearchQuery}
            onChange={(e) => setLocalSearchQuery(e.target.value)}
            className="pl-10 w-full" // Ensure input takes full width of its container
          />
        </div>
        <Button type="submit" size="sm" className="px-4"> {/* Added submit button */}
          <Search className="h-4 w-4" />
          <span className="sr-only">Search</span> {/* Accessible text for screen readers */}
        </Button>
      </form>

      {/* Categories */}
      <div>
        <h3 className="font-semibold mb-3">Categories</h3>
        <div className="flex flex-wrap gap-2">
          <Button
            variant={selectedCategory === null ? "default" : "outline"}
            size="sm"
            onClick={() => onCategoryFilter(null)}
          >
            All
          </Button>
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              size="sm"
              onClick={() => onCategoryFilter(category)}
            >
              {category}
            </Button>
          ))}
        </div>
      </div>

      {/* Tags */}
      <div>
        <h3 className="font-semibold mb-3">Tags</h3>
        <div className="flex flex-wrap gap-2">
          {tags.map((tag) => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? "default" : "outline"}
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground"
              onClick={() => onTagFilter(selectedTag === tag ? null : tag)}
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {/* Clear Filters */}
      {hasActiveFilters && (
        <Button
          variant="ghost"
          size="sm"
          onClick={clearFilters}
          className="flex items-center gap-2"
        >
          <X className="h-4 w-4" />
          Clear all filters
        </Button>
      )}
    </div>
  );
};

export default BlogSearch;
