import { Frown } from "lucide-react";
import ExplorerMovieCard from "./explorer-movie-card";

interface ExplorerWrapperLoaderProps {
  numberOfCards?: number;
}
export function ExplorerLoader({
  numberOfCards = 3,
}: ExplorerWrapperLoaderProps) {
  return Array(numberOfCards)
    .fill(0)
    .map((_, index) => <ExplorerMovieCard isLoading={true} key={index} />);
}

export function ExplorerLoaderError() {
  return (
    <div className="flex flex-col justify-center items-center h-[512px] w-[288px]">
      <Frown className="text-destructive h-16 w-16 " />
      <p className="text-sm text-destructive mt-2 text-center">
        Oops, something went wrong. I couldn't load the movies. Please try again
      </p>
    </div>
  );
}
