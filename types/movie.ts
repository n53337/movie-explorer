// ! I have to use any because i don't want to define all the properties of the movies

export interface Movie {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  vote_average: number;
  [key: string]: any;
}

export interface MovieGenre {
  id: number;
  name: string;
}

export interface MovieDetails {
  id: number;
  title: string;
  overview: string;
  backdrop_path: string;
  release_date: string;
  genres: MovieGenre[];
  homepage: string;
  runtime: number;
  vote_average: number;
  [key: string]: any;
}

export interface MoviesResponse {
  results: Movie[];
  page: number;
  total_pages: number;
  total_results: number;
}
