import React, { useRef, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "react-query";

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
  const loaderRef = useRef(null);
  const [pageParam, setPageParam] = React.useState(1);

  const { data, isLoading, isError, fetchNextPage, hasNextPage } =
    useInfiniteQuery("data", () => fetchMoreData(), {
      getNextPageParam: (_lastPage, allPages) => {
        const nextPage = allPages.length + 1;
        return nextPage;
      },
    });

  const fetchMoreData = async () => {
    const res = await fetch(`${apiEndpoint}?page=${pageParam}&limit=${limit}`);
    const data = await res.json();
    setPageParam((prev) => prev + 1);
    return data;
  };

  const handleObserver = useCallback(
    (entries: [any]) => {
      const [target] = entries;
      if (target.isIntersecting) {
        fetchNextPage();
      }
    },
    [fetchNextPage, hasNextPage]
  );

  useEffect(() => {
    const element = loaderRef.current;
    const option = { threshold: 0 };

    const observer = new IntersectionObserver(handleObserver, option);
    observer.observe(element);
    return () => observer.unobserve(element);
  }, [fetchNextPage, hasNextPage, handleObserver]);

  return (
    <div>
      {data?.pages.map((page, i) => (
        <React.Fragment key={i}>{renderContent(page)}</React.Fragment>
      ))}
      {isLoading && <div>Loading...</div>}
      {isError && <div>Error fetching data</div>}
      <div ref={loaderRef} className="h-px opacity-0 pointer-events-none" />
    </div>
  );
}

export default InfiniteLoader;
