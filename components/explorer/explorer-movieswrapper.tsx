"use client";
import React from "react";
import ExplorerMovieCard from "@/components/explorer/explorer-moviecard";

export default function ExplorerMoviesWrapper() {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {Array(10)
        .fill(0)
        .map((_, index) => {
          return <ExplorerMovieCard isLoading={false} key={index} />;
        })}
    </div>
  );
}
