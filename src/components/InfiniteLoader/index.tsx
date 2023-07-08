import React from "react";

interface InfiniteLoaderProps<T> {
  apiEndpoint: string; // any api endpoint
  page: number; // pagination page
  limit: number; // pagination limit
  renderContent: (data: T[]) => React.ReactNode;
}

function InfiniteLoader<T>({
  apiEndpoint,
  page,
  limit,
  renderContent,
}: InfiniteLoaderProps<T>) {
  return (
    <div>
      <h1>InfiniteLoader</h1>
    </div>
  );
}

export default InfiniteLoader;
