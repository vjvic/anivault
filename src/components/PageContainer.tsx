import React from "react";

const PageContainer = ({ children }: { children: React.ReactNode }) => {
  return <div className="py-6 container mx-auto">{children}</div>;
};

export default PageContainer;
