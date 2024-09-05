"use client";

import { Skeleton } from "../ui/skeleton";

export default function ExplorerMovieDetailsSkeleton() {
  return (
    <div className="relative flex z-10">
      <div className="absolute inset-0 rounded-t-lg h-48 w-full p-4">
        <Skeleton className="z-10 h-full w-full rounded-b-none" />
      </div>

      <div className="relative z-10 bg-background mt-40 w-full rounded-b-lg rounded-t-3xl shadow-inner shadow-md">
        <div className="flex flex-col h-full max-h-[calc(512px-192px)] p-6 lg:p-8">
          <Skeleton className="h-8 w-32" />
          <Skeleton className="mt-2 h-10 w-full" />
          <Skeleton className="mt-4 h-8 w-full" />
          <Skeleton className="mt-4 h-24 w-full" />
        </div>
      </div>
    </div>
  );
}
