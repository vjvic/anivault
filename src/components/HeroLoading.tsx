import React from "react";
import { Skeleton } from "@/components/ui/skeleton";

const HeroLoading = () => {
  return (
    <div>
      <Skeleton className="w-full h-[50vh] rounded" />
    </div>
  );
};

export default HeroLoading;
