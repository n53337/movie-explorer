import { APP_NAME } from "@/lib/constants";
import { Popcorn } from "lucide-react";
import React from "react";

export default function BrandLogo() {
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center p-2 rounded-sm bg-primary dark:bg-foreground shadow-md shadow-primary/30">
        <Popcorn className="h-5 w-5 dark:text-primary text-background" />
      </div>
      <span className="text-xl lg:text-2xl font-semibold text-foreground">
        {APP_NAME}
      </span>
    </div>
  );
}
