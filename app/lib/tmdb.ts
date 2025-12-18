import {
  TMDBMedia,
  TMDBResponse,
  TMDBMovie,
  TMDBTV,
  TMDBListResponse,
} from "./types";

const BASE_URL = "https://api.themoviedb.org/3";

export async function getTrending(): Promise<TMDBMedia[]> {
  const res = await fetch(`${BASE_URL}/trending/all/week`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    const text = await res.text();
    console.error(text);
    throw new Error("Failed to fetch trending");
  }

  const data: TMDBResponse<TMDBMedia> = await res.json();
  return data.results;
}

export async function getPopularMovies(): Promise<TMDBMedia[]> {
  const res = await fetch(`${BASE_URL}/movie/popular`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  const data: TMDBListResponse<TMDBMovie> = await res.json();

  return data.results.map((movie) => ({
    ...movie,
    media_type: "movie",
  }));
}

export async function getPopularTV(): Promise<TMDBMedia[]> {
  const res = await fetch(`${BASE_URL}/tv/popular`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  const data: TMDBListResponse<TMDBTV> = await res.json();

  return data.results.map((tv) => ({
    ...tv,
    media_type: "tv",
  }));
}

export async function getUpcomingMovies(): Promise<TMDBMedia[]> {
  const res = await fetch(`${BASE_URL}/movie/upcoming`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  const data: TMDBListResponse<TMDBMovie> = await res.json();

  return data.results.map((movie) => ({
    ...movie,
    media_type: "movie",
  }));
}
