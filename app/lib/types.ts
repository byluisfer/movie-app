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
