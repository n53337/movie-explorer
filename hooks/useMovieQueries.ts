import { moviesApi } from "@/lib/api";
import { PopularMoviesResponse } from "@/types/movie";
import { useInfiniteQuery } from "@tanstack/react-query";

export const usePopularMovie = () => {
  return useInfiniteQuery<PopularMoviesResponse>({
    queryKey: ["popularMovies"],
    initialPageParam: 1,
    queryFn: async ({ pageParam }) => {
      const response = await moviesApi.get<PopularMoviesResponse>(
        "movie/popular",
        {
          params: { page: pageParam },
        }
      );
      return response.data;
    },
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages
        ? lastPage.page + 1
        : undefined;
    },

    staleTime: Infinity,
  });
};
