import React, { useRef, useEffect, useCallback } from "react";
import { useInfiniteQuery } from "react-query";
import { useInView } from "react-intersection-observer";

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
  const { ref, inView } = useInView();
  const [pageParam, setPageParam] = React.useState(1);

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery("data", () => fetchMoreData(), {
    getNextPageParam: (_lastPage, allPages) => {
      const nextPage = allPages.length + 1;
      return nextPage;
    },
  });

  const fetchMoreData = async () => {
    // we make the assumption here that the API will have both pages and a limit in order to paginate requests
    const res = await fetch(`${apiEndpoint}?page=${pageParam}&limit=${limit}`);
    const data = await res.json();
    setPageParam((prev) => prev + 1);
    return data;
  };

  useEffect(() => {
    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView]);

  return (
    <>
      <>
        {data?.pages.map((page) => renderContent(page))}
        {isLoading && <div>Loading...</div>}
        {isError && <div>Error fetching data</div>}
      </>
      <button
        ref={ref}
        onClick={() => fetchNextPage()}
        disabled={!hasNextPage || isFetchingNextPage}
        type="button"
        className="rounded bg-indigo-600 px-2 py-1 text-xs font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
      >
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load Newer"
          : "Nothing more to load"}
      </button>
    </>
  );
}

export default InfiniteLoader;
