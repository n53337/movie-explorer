import { moviesApi } from "@/lib/api";
import { MovieDetails, MoviesResponse } from "@/types/movie";
import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import debounce from "lodash.debounce";
import { useCallback, useMemo, useState } from "react";

export const useMovies = () => {
  // ! Here I am managing the source of truth for the movies, it can be either popular or search based.
  // NOTE: I'm using the useInfiniteQuery hook, because it makes it easy to fetch data in a paginated way

  const [query, setQuery] = useState<string>("");
  const [debouncedQuery, setDebouncedQuery] = useState<string>("");

  const apiEndpoint = useMemo(
    () => (debouncedQuery ? `search/movie?query=${query}` : "movie/popular"),
    [debouncedQuery]
  );

  // Am using the useCallback hook to cache the func definition
  const debounceQuery = useCallback(
    debounce((q: string) => setDebouncedQuery(q), 500),
    []
  );

  const onQueryChange = (value: string) => {
    setQuery(value);
    debounceQuery(value);
  };

  const {
    data,
    isLoading,
    isError,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery<MoviesResponse>({
    queryKey: ["movies", debouncedQuery],
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
    staleTime: 5 * 60 * 1000,
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

export const useMovieDetails = () => {
  const [movieId, setMovieId] = useState<number | null>(null);

  const { data, isError, isLoading } = useQuery<MovieDetails>({
    queryKey: ["movieDetails", movieId],
    queryFn: async () => {
      const response = await moviesApi.get<MovieDetails>(`movie/${movieId}`);
      console.log(response.status);
      return response.data;
    },
    enabled: !!movieId,
    staleTime: 5 * 60 * 1000,
  });

  return {
    movieDetails: data,
    isLoading,
    isError,
    movieId,
    setMovieId,
  };
};
