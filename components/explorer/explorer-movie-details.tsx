"use client";

import { ArrowLeft, MoveUpRight, Play, Star } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { getMovieDuration } from "@/lib/get-movie-duration";
import ExplorerMovieDetailsSkeleton from "./explorer-movie-details-skeleton";
import Link from "next/link";
import { MovieDetails } from "@/types/movie";
import { BASE_IMAGE_URL } from "@/lib/constants";

interface ExplorerMovieDetailsProps {
  open: boolean;
  onClose: (open: boolean) => void;
  movie: MovieDetails | undefined;
  isLoading: boolean;
  isError: boolean;
}

export default function ExplorerMovieDetails({
  open,
  onClose,
  movie,
  isLoading,
  isError,
}: ExplorerMovieDetailsProps) {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 h-[512px] max-h-[512px]  rounded-lg">
        {isLoading ? (
          <ExplorerMovieDetailsSkeleton />
        ) : (
          <div className="relative flex z-10">
            <div
              className="absolute inset-0 rounded-t-lg h-48 w-full p-4"
              style={{
                backgroundImage: `url(${BASE_IMAGE_URL}${movie?.backdrop_path})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <div className="flex items-center justify-between">
                <Button
                  size={"icon"}
                  variant={"secondary"}
                  onClick={() => onClose(false)}
                >
                  <ArrowLeft className="h-5 w-5" />
                </Button>
                <Badge
                  variant="secondary"
                  className="flex items-center gap-1 text-base"
                >
                  {movie?.vote_average.toFixed(1)}
                  <Star className="h-4 w-4 fill-yellow-500 text-yellow-500" />
                </Badge>
              </div>
            </div>

            <div className="relative z-10 bg-background mt-40 w-full rounded-b-lg rounded-t-3xl shadow-inner shadow-md">
              <div className="absolute left-0 -top-8 flex items-center justify-center w-full">
                <Link href={movie?.homepage || "#"} target="_blank">
                  <Button
                    variant={"secondary"}
                    className="h-16 w-16 rounded-full shadow-xl shadow-primary/20 bg-background hover:bg-background hover:shadow-md transition-all duration-300"
                  >
                    <Play className="h-6 w-6" />
                  </Button>
                </Link>
              </div>

              <div className="flex flex-col h-full max-h-[calc(512px-192px)] p-6 lg:p-8 overflow-y-scroll">
                <div className="flex items-center justify-between">
                  <h1 className="text-3xl font-extrabold">{movie?.title}</h1>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date(movie?.release_date || "").toDateString()}
                  </span>
                </div>

                <div className="flex flex-row items-center mt-3 gap-x-1">
                  <div className="flex items-center gap-x-2">
                    <span className="text-sm text-muted-foreground">
                      Genre:
                    </span>
                    {movie?.genres.map((genre) => (
                      <Badge key={genre.id} variant="outline">
                        {genre.name}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="mt-2 flex flex-row items-center gap-x-2">
                  <span className="text-sm text-muted-foreground">
                    Runtime: {getMovieDuration(movie?.runtime || 0)}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-x-2">
                  <p className="text-sm mt-2 pb-12">{movie?.overview}</p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex rounded-b-lg bg-background flex items-center justify-between px-12 py-4 gap-4">
                <Link
                  href={movie?.homepage || "#"}
                  target="_blank"
                  className="w-full"
                >
                  <Button
                    variant={"outline"}
                    size={"lg"}
                    className="uppercase w-full h-12 font-bold"
                  >
                    Buy Ticket
                    <MoveUpRight className="ml-1 h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
