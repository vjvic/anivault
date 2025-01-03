import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const SectionLoading = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-8 gap-4 container mx-auto py-3">
      {Array.from({ length: 16 }).map((_, index) => (
        <div key={index}>
          <Skeleton className="w-full h-60 rounded" />
        </div>
      ))}
    </div>
  );
};

export default SectionLoading;
