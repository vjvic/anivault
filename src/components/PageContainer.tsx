import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-6 container mx-auto lg:px-0 px-4">{children}</div>;
};

export default PageContainer;
