import { Skeleton } from "../ui/skeleton";

export default function ExplorerMovieSkeleton() {
  return (
    <>
      <div className="border-b border-border h-[430px] ">
        <Skeleton className="h-full w-full rounded-b-none" />
      </div>
      <div className="flex flex-col p-4">
        <Skeleton className="h-3 w-32" />
        <Skeleton className="mt-4 h-10 w-full" />
        <Skeleton className="mt-6 h-9 w-full" />
      </div>
    </>
  );
}
