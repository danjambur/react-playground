import React, { useEffect, useRef } from "react";

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
  const loaderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    fetchMoreData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // scrolling observer
    const observer = new IntersectionObserver(handleObserver, {
      root: null,
      threshold: 1,
    });

    if (loaderRef.current) {
      observer.observe(loaderRef.current);
    }
    // don't forget to clean up!
    return () => {
      if (loaderRef.current) {
        observer.unobserve(loaderRef.current);
      }
    };
  }, []);

  const handleObserver: IntersectionObserverCallback = (items) => {
    const target = items[0];
    if (target.isIntersecting) {
      fetchMoreData();
    }
  };

  const fetchMoreData = async () => {
    if (!isLoading) {
      setIsLoading(true);
      try {
        const res = await fetch(`${apiEndpoint}?page=${page}&limit=${limit}`);
        const data = await res.json();
        setData((prevData) => [...prevData, ...data]);
        setPage((prevPage) => prevPage + 1);
      } catch (err) {
        console.log("Error fetching data", err);
      }
      setIsLoading(false);
    }
  };

  return (
    <div>
      {renderContent(data)}
      {isLoading && <div>Loading...</div>}
      <div ref={loaderRef} />
    </div>
  );
}

export default InfiniteLoader;
