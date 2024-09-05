"use client";
import React, { useEffect, useRef } from "react";
import ExplorerMovieCard from "@/components/explorer/explorer-movie-card";
import { usePopularMovie } from "@/hooks/useMovieQueries";
import { InfinitySpin } from "react-loader-spinner";
import { ExplorerLoader, ExplorerLoaderError } from "./explorer-wrapper-loader";

export default function ExplorerMoviesWrapper() {
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    status,
    isLoading,
  } = usePopularMovie();

  const observerTarget = useRef<HTMLDivElement>(null);

  // TODO: Add Error Status Handler
  // TODO: Add Loading Status Handler
  // TODO: Add Empty Status Handler

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasNextPage && !isFetchingNextPage) {
          console.log("INTERSECTED: Fetch Next Page");
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
    <div className="flex flex-wrap gap-4 justify-center">
      {/* initial loading  */}

      {!data && <ExplorerLoader />}

      {/* rendering the movies */}

      {data?.pages.map((page, index) =>
        page.results.map((movie, index) => (
          <ExplorerMovieCard
            key={movie.id}
            movie={movie}
            isLoading={isLoading}
          />
        ))
      )}

      {/* This is using the intersection observer to trigger the loading spinner, and i set it to the spinner */}

      {/* NOTE: I saw this loading technique in Youtube, so this is 3 dummy loading cards and a spinner */}

      {hasNextPage && isFetchingNextPage && (
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

      {status == "error" && <ExplorerLoaderError />}
    </div>
  );
}
