"use client";

import React from "react";
import { Input } from "@/components/ui/input";
import { useMovies } from "@/hooks/useMovieQueries";

interface ExplorerSearchbarProps {
  query: string;
  onSearch: (query: string) => void;
}

export default function ExplorerSearchbar({
  query,
  onSearch,
}: ExplorerSearchbarProps) {
  return (
    <Input
      placeholder="Search movies..."
      type="text"
      value={query}
      onChange={(e) => onSearch(e.target.value)}
      className="py-6 bg-background"
    />
  );
}
