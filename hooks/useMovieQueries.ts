import { moviesApi } from "@/lib/api";
import { MoviesResponse } from "@/types/movie";
import { useInfiniteQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useCallback, useState } from "react";

export const useMovies = () => {
  // ! Here I am managing the source of truth for the movies, it can be either popular or search
  // NOTE: I'm using the useInfiniteQuery hook, because it makes it easy to fetch data in a paginated way

  const [query, setQuery] = useState<string>("");

  const apiEndpoint = query ? `search/movie?query=${query}` : "movie/popular";

  // Am using the useCallback hook to cache the func definition
  const debouncedQuery = useCallback(
    debounce((q: string) => setQuery(q), 500),
    []
  );

  const onQueryChange = (value: string) => {
    debouncedQuery(value);
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MoviesResponse>({
    queryKey: ["movies", query],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await moviesApi.get<MoviesResponse>(apiEndpoint, {
        params: { page: pageParam },
      });
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },
    staleTime: 1000 * 60 * 5,
  });

  return {
    movies: data?.pages.flatMap((movies) => movies.results) ?? [],
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    query,
    onQueryChange,
  };
};
