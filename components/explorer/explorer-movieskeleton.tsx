"use client";

import { truncateText } from "@/lib/truncate";
import Image from "next/image";
import { Button } from "../ui/button";
import { ChevronRight } from "lucide-react";
import { useState } from "react";
import ExplorerImageError from "./explorer-imageerror";
import { Skeleton } from "../ui/skeleton";

export default function ExplorerMovieSkeleton() {
  return (
    <>
      <div className="border-b border-border h-[450px] ">
        <Skeleton className="h-full w-full rounded-b-none" />
      </div>
      <div className="flex flex-col p-4">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="mt-2 h-12 w-full" />
        <Skeleton className="mt-4 h-9 w-full" />
      </div>
    </>
  );
}
