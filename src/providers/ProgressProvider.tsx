"use client";

import React, { Suspense, useEffect } from "react";
import { usePathname, useSearchParams } from "next/navigation";
import NProgress from "nprogress";
import "nprogress/nprogress.css";

const ProgressProvider = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    NProgress.start();

    const timeout = setTimeout(() => {
      NProgress.done();
    }, 300);

    return () => {
      clearTimeout(timeout);
    };
  }, [pathname, searchParams]);

  return null;
};

const SuspenseWrapper = () => {
  return (
    <Suspense fallback={null}>
      <ProgressProvider />
    </Suspense>
  );
};

export default SuspenseWrapper;
