"use client";
import React, { useEffect, useRef } from "react";
import ExplorerMovieCard from "@/components/explorer/explorer-movie-card";
import { useMovies } from "@/hooks/useMovieQueries";
import { InfinitySpin } from "react-loader-spinner";
import {
  ExplorerLoader,
  ExplorerLoaderError,
  ExplorerNotFound,
} from "./explorer-wrapper-loader";
import ExplorerSearchbar from "./explorer-searchbar";

export default function ExplorerMoviesWrapper() {
  const {
    movies,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
    query,
    onQueryChange,
  } = useMovies();

  const observerTarget = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          // Here am making sure that i only fetch data when there no active fetching in the background
          fetchNextPage();
        }
      },
      {
        threshold: 1,
      }
    );

    if (observerTarget.current) {
      observer.observe(observerTarget.current);
    }

    return () => {
      if (!observerTarget.current) return;
      observer.unobserve(observerTarget.current);
    };
  }, [fetchNextPage, hasNextPage, isFetchingNextPage]);

  return (
    <div className="flex flex-col">
      <div className="sticky top-20 z-10 bg-background/85 w-full backdrop-blur-md pb-6 rounded-b-lg">
        <div className="max-w-lg mx-auto">
          <ExplorerSearchbar query={query} onSearch={onQueryChange} />
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-6">
        {/* initial loading  */}

        {isLoading && <ExplorerLoader />}

        {!movies.length && !isError && query && !isLoading && (
          <ExplorerNotFound query={query} />
        )}

        {/* rendering the movies */}

        {movies.map((movie) => (
          <ExplorerMovieCard
            key={movie.id}
            movie={movie}
            isLoading={isLoading}
          />
        ))}

        {/* This is using the intersection observer to trigger the loading spinner, and i set it to the spinner */}

        {/* NOTE: I saw this loading technique in Youtube, so this is 3 dummy loading cards and a spinner */}

        {hasNextPage && (
          <>
            <ExplorerLoader numberOfCards={3} />
            <div
              className="flex justify-center items-center w-full py-6"
              ref={observerTarget}
            >
              <InfinitySpin color="#7936EC" />
            </div>
          </>
        )}

        {isError && <ExplorerLoaderError />}
      </div>
    </div>
  );
}
