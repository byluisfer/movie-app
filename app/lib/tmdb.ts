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

  return data.results.filter(
    (item) =>
      (item.media_type === "movie" || item.media_type === "tv") &&
      typeof item.id === "number"
  );
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

export async function getMovieDetail(id: string) {
  const res = await fetch(`${BASE_URL}/movie/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.warn("Movie detail not found:", id);
    return null;
  }

  return res.json();
}

export async function getTVDetail(id: string) {
  const res = await fetch(`${BASE_URL}/tv/${id}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) {
    console.warn("TV detail not found:", id);
    return null;
  }

  return res.json();
}

export async function getProviders(type: "movie" | "tv", id: string) {
  const res = await fetch(`${BASE_URL}/${type}/${id}/watch/providers`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      "Content-Type": "application/json",
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to fetch providers");
  return res.json();
}
