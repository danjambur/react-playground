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
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const fetchMoreData = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiEndpoint}?page=${page}&limit=${limit}`);
        const data = await res.json();
        setData((prevData) => [...prevData, ...data.data]);
        setPage((prevPage) => prevPage + 1);
      } catch (err) {
        console.log("Error fetching data", err);
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1>InfiniteLoader</h1>
    </div>
  );
}

export default InfiniteLoader;
