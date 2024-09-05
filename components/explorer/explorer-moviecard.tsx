"use client";

import { truncateText } from "@/lib/truncate";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ExplorerImageError from "./explorer-imageerror";
import ExplorerMovieSkeleton from "./explorer-movieskeleton";

interface ExplorerMovieCardProps {
  //   movie: Movie;
  isLoading: boolean;
}

export default function ExplorerMovieCard({
  isLoading,
}: ExplorerMovieCardProps) {
  const [isImageLoaded, setIsImageLoaded] = useState(true);

  return (
    <div className="flex flex-col border border-border rounded-lg shadow-sm w-72">
      {isLoading ? (
        <ExplorerMovieSkeleton />
      ) : (
        <>
          <div className="border-b border-border">
            {isImageLoaded ? (
              <Image
                src="https://external-content.duckduckgo.com/iu/?u=https%3A%2F%2Fpicfiles.alphacoders.com%2F198%2F198975.jpg&f=1&nofb=1&ipt=1ac9336e602534c5d3891f48e18cbc6afe9e2134c6c7b255fb5a879bdaa17a48&ipo=images"
                alt="Movie poster"
                width={320}
                height={450}
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
            <span className="text-xs text-muted-foreground uppercase">
              {new Date("2024-07-24").toDateString()}
            </span>
            <p className="mt-2">
              {truncateText(
                "Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam maiores eveniet est quibusdam quasi voluptatum ab velit beatae dolorum. Illo delectus sit assumenda sequi inventore distinctio reprehenderit odio cumque saepe."
              )}
            </p>
            <Button className="mt-4">
              Details
              <ChevronRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
