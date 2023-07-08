import React, { useEffect } from "react";

interface InfiniteLoaderProps<T> {
  apiEndpoint: string; // any api endpoint
  limit: number; // pagination limit
  renderContent: (data: T[]) => React.ReactNode;
}

function InfiniteLoader<T>({
  apiEndpoint,
  limit,
  renderContent,
}: InfiniteLoaderProps<T>) {
  const [data, setData] = React.useState<T[]>([]);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);
  const [page, setPage] = React.useState<number>(1);

  useEffect(() => {
    setIsLoading(true);
    fetch(`${apiEndpoint}?page=${page}&limit=${limit}`)
      .then((res) => res.json())
      .then((res) => {
        setData((prevData) => [...prevData, ...res.data]);
        setPage((prevPage) => prevPage + 1);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [apiEndpoint, page, limit]);

  return (
    <div>
      <h1>InfiniteLoader</h1>
    </div>
  );
}

export default InfiniteLoader;
