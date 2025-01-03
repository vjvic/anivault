import React from "react";
import { Skeleton } from "./ui/skeleton";

const GridLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 container mx-auto py-6">
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="w-full h-64 rounded" />
          <Skeleton className="w-full h-4 mt-2" />
        </div>
      ))}
    </div>
  );
};

export default GridLoading;
