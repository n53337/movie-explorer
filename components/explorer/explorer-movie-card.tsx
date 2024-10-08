"use client";

import { truncateText } from "@/lib/truncate";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ExplorerImageError from "./explorer-image-error";
import ExplorerMovieSkeleton from "./explorer-movie-skeleton";
import { Badge } from "../ui/badge";
import ExplorerMovieDetails from "./explorer-movie-details";
import { Movie } from "@/types/movie";
import { BASE_IMAGE_URL } from "@/lib/constants";
import { useMovieDetails } from "@/hooks/useMovieQueries";

interface ExplorerMovieCardProps {
  isLoading: boolean;
  movie?: Movie;
}

export default function ExplorerMovieCard({
  movie,
  isLoading,
}: ExplorerMovieCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(true);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);

  const {
    setMovieId,
    movieDetails,
    isLoading: isDetailsLoading,
    isError: isDetailsError,
  } = useMovieDetails();

  const handleDetailsClick = () => {
    setMovieId(movie?.id || null);
    setIsDetailsOpen(true);
  };

  return (
    <>
      <div className="flex flex-col border border-border rounded-lg shadow-sm w-72">
        {isLoading && !movie ? (
          <ExplorerMovieSkeleton />
        ) : (
          <>
            <div className="border-b border-border min-h-[430px]">
              {isImageLoaded ? (
                <Image
                  src={`${BASE_IMAGE_URL}/${movie?.poster_path}`}
                  alt="Movie poster"
                  width={360}
                  height={500}
                  className="rounded-t-lg transition duration-500"
                  loading="lazy"
                  onError={() => setIsImageLoaded(false)}
                />
              ) : (
                <div className="flex justify-center items-center h-[450px]">
                  <ExplorerImageError />
                </div>
              )}
            </div>
            <div className="flex flex-col p-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-muted-foreground uppercase">
                  {new Date(movie?.release_date || "").toDateString()}
                </span>
                <Badge variant="secondary">
                  {movie?.vote_average.toFixed(1)}
                </Badge>
              </div>
              <p className="mt-2">{truncateText(movie?.overview || "")}</p>
              <Button className="mt-4" onClick={handleDetailsClick}>
                Details
                <ChevronRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </>
        )}
      </div>

      <ExplorerMovieDetails
        open={isDetailsOpen}
        onClose={setIsDetailsOpen}
        movie={movieDetails}
        isLoading={isDetailsLoading}
        isError={isDetailsError}
      />
    </>
  );
}
