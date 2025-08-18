import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useState } from "react";

interface SearchBarProps {
  onSearch: (query: string, source?: string) => void;
  isLoading?: boolean;
}

export function SearchBar({ onSearch, isLoading }: SearchBarProps) {
  const [query, setQuery] = useState("");
  const [source, setSource] = useState("all");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(query, source !== "all" ? source : undefined);
  };

  return (
    <form onSubmit={handleSearch} className="flex gap-2 max-w-4xl mx-auto p-4">
      <Input
        type="text"
        placeholder="Search for images..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="flex-grow"
      />
      <Select value={source} onValueChange={setSource}>
        <SelectTrigger className="w-[150px]">
          <SelectValue placeholder="Source" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Sources</SelectItem>
          <SelectItem value="unsplash">Unsplash</SelectItem>
          <SelectItem value="pexels">Pexels</SelectItem>
          <SelectItem value="pixabay">Pixabay</SelectItem>
        </SelectContent>
      </Select>
      <Button type="submit" disabled={isLoading}>
        {isLoading ? "Searching..." : "Search"}
      </Button>
    </form>
  );
}
