"use client";

import { useState, useEffect } from "react";
import { SearchBar } from "@/components/SearchBar";
import { ImageGrid } from "@/components/ImageGrid";
import { UnifiedImage, SearchResponse } from "@/types/api";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";
import { FaMoon, FaSun } from "react-icons/fa";

export default function Page() {
  const [images, setImages] = useState<UnifiedImage[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [loading, setLoading] = useState(false);
  const [currentQuery, setCurrentQuery] = useState("");
  const [currentSource, setCurrentSource] = useState<string | undefined>();
  const [currentPage, setCurrentPage] = useState(1);
  const [favorites, setFavorites] = useState<Set<string>>(new Set());
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    const savedFavorites = localStorage.getItem("imageFavorites");
    if (savedFavorites) {
      setFavorites(new Set(JSON.parse(savedFavorites)));
    }
  }, []);

  const handleSearch = async (query: string, source?: string) => {
    setLoading(true);
    setCurrentQuery(query);
    setCurrentSource(source);
    setCurrentPage(1);
    setImages([]);

    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}${
          source ? `&source=${source}` : ""
        }&page=1`
      );
      const data: SearchResponse = await response.json();

      setImages(data.images);
      setHasMore(data.hasMore);
    } catch (error) {
      console.error("Error searching images:", error);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    const nextPage = currentPage + 1;
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(currentQuery)}${
          currentSource ? `&source=${currentSource}` : ""
        }&page=${nextPage}`
      );
      const data: SearchResponse = await response.json();

      setImages((prevImages) => [...prevImages, ...data.images]);
      setHasMore(data.hasMore);
      setCurrentPage(nextPage);
    } catch (error) {
      console.error("Error loading more images:", error);
    }
  };

  const handleToggleFavorite = (image: UnifiedImage) => {
    setFavorites((prevFavorites) => {
      const newFavorites = new Set(prevFavorites);
      if (newFavorites.has(image.id)) {
        newFavorites.delete(image.id);
      } else {
        newFavorites.add(image.id);
      }

      localStorage.setItem("imageFavorites", JSON.stringify([...newFavorites]));
      return newFavorites;
    });
  };

  return (
    <main className="min-h-screen p-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold">Global Image Finder</h1>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
          >
            {theme === "dark" ? <FaSun /> : <FaMoon />}
          </Button>
        </div>

        <SearchBar onSearch={handleSearch} isLoading={loading} />

        <ImageGrid
          images={images}
          hasMore={hasMore}
          loadMore={loadMore}
          favorites={favorites}
          onToggleFavorite={handleToggleFavorite}
        />
      </div>
    </main>
  );
}
