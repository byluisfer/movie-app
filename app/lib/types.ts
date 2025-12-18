export type MediaType = "movie" | "tv";

export interface TMDBMedia {
  id: number;
  title?: string;
  name?: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date?: string;
  first_air_date?: string;
  media_type: MediaType;
}

export interface TMDBResponse<T> {
  page: number;
  results: T[];
}

export interface TMDBListResponse<T> {
  page: number;
  results: T[];
}

export interface TMDBMovie {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
}

export interface TMDBTV {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
}

export interface TMDBGenre {
  id: number;
  name: string;
}

export interface TMDBMovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  release_date: string;
  genres: TMDBGenre[];
  vote_average: number;
  runtime: number;
}

export interface TMDBTVDetail {
  id: number;
  name: string;
  overview: string;
  poster_path: string | null;
  backdrop_path: string | null;
  first_air_date: string;
  genres: TMDBGenre[];
  vote_average: number;
  number_of_seasons: number;
}

export interface TMDBProvider {
  provider_id: number;
  provider_name: string;
  logo_path: string | null;
}
