"use client";

import { ArrowLeft, MoveUpRight, Play } from "lucide-react";
import { Button } from "../ui/button";
import { Dialog, DialogContent } from "../ui/dialog";
import { Badge } from "../ui/badge";
import { getMovieDuration } from "@/lib/get-movie-duration";
import { useState } from "react";
import ExplorerMovieDetailsSkeleton from "./explorer-moviedetails-skeleton";
import Link from "next/link";

interface ExplorerMovieDetailsProps {
  // movieId: string;
  open: boolean;
  onClose: (open: boolean) => void;
}

export default function ExplorerMovieDetails({
  open,
  onClose,
}: ExplorerMovieDetailsProps) {
  const imgUrl =
    "https://image.tmdb.org/t/p/original/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg";
  const [loading, setLoading] = useState(false);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="p-0 h-[512px] max-h-[512px]  rounded-lg">
        {loading ? (
          <ExplorerMovieDetailsSkeleton />
        ) : (
          <div className="relative flex z-10">
            <div
              className="absolute inset-0 rounded-t-lg h-48 w-full p-4"
              style={{
                backgroundImage: `url(${imgUrl})`,
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <Button
                size={"icon"}
                variant={"secondary"}
                onClick={() => onClose(false)}
              >
                <ArrowLeft className="h-5 w-5" />
              </Button>
            </div>

            <div className="relative z-10 bg-background mt-40 w-full rounded-b-lg rounded-t-3xl shadow-inner shadow-md">
              <div className="absolute left-0 -top-8 flex items-center justify-center w-full">
                <Link href={"https://google.com"} target="_blank">
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
                  <h1 className="text-3xl font-extrabold">Jocker</h1>
                  <span className="text-xs text-muted-foreground mt-1">
                    {new Date("2024-07-24").toDateString()}
                  </span>
                </div>

                <div className="flex flex-row items-center mt-3 gap-x-1">
                  <div className="flex items-center gap-x-2">
                    <span className="text-sm text-muted-foreground">
                      Genre:
                    </span>

                    <Badge variant="outline">Art</Badge>
                    <Badge variant="outline">Funny</Badge>
                    <Badge variant="outline">Martial</Badge>
                  </div>
                </div>

                <div className="mt-2 flex flex-row items-center gap-x-2">
                  <span className="text-sm text-muted-foreground">
                    Runtime: {getMovieDuration(149)}
                  </span>
                </div>

                <div className="mt-3 flex flex-col gap-x-2">
                  <p className="text-sm mt-2 pb-12">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Sit
                    aperiam cupiditate ratione impedit sint quibusdam placeat.
                    Tempora assumenda, voluptatum eaque esse itaque ex, quae
                    tenetur consectetur dolorem quasi officia ipsum! Lorem ipsum
                    dolor sit amet consectetur adipisicing elit. Sit aperiam
                    cupiditate ratione impedit sint quibusdam placeat. Tempora
                    assumenda, voluptatum eaque esse itaque ex, quae tenetur
                  </p>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 flex rounded-b-lg bg-background flex items-center justify-between px-12 py-4 gap-4">
                <Button size={"lg"} className="uppercase w-full h-12 font-bold">
                  Buy Ticket
                  <MoveUpRight className="ml-1 h-4 w-4" />
                </Button>
                <div className="flex items-center justify-center rounded-full bg-gradient-to-r from-primary to-primary/70 px-4 h-12 w-12">
                  <p className="font-bold text-white">9.1</p>
                </div>
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
