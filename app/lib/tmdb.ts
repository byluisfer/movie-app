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

export async function getProviders(type: "movie" | "tv") {
  const res = await fetch(
    `${BASE_URL}/watch/providers/${type}?watch_region=ES`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
      next: { revalidate: 86400 },
    }
  );

  const data = await res.json();
  return data.results;
}

interface DiscoverParams {
  page?: number;
  year?: number;
  minRating?: number;
  genre?: number;
  provider?: number;
}

function buildDiscoverQuery(params: DiscoverParams) {
  const query = new URLSearchParams();

  if (params.page) query.set("page", String(params.page));
  if (params.year) query.set("primary_release_year", String(params.year));
  if (params.minRating) query.set("vote_average.gte", String(params.minRating));
  if (params.genre) query.set("with_genres", String(params.genre));
  if (params.provider) {
    query.set("with_watch_providers", String(params.provider));
    query.set("watch_region", "ES");
  }

  return query.toString();
}

export async function discoverMovies(params: DiscoverParams = {}) {
  const query = buildDiscoverQuery(params);

  const res = await fetch(`${BASE_URL}/discover/movie?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to discover movies");

  const data: TMDBListResponse<TMDBMovie> = await res.json();

  return data.results.map((m) => ({
    ...m,
    media_type: "movie" as const,
  }));
}

export async function discoverTV(params: DiscoverParams = {}) {
  const query = buildDiscoverQuery(params);

  const res = await fetch(`${BASE_URL}/discover/tv?${query}`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
    next: { revalidate: 3600 },
  });

  if (!res.ok) throw new Error("Failed to discover TV");

  const data: TMDBListResponse<TMDBTV> = await res.json();

  return data.results.map((t) => ({
    ...t,
    media_type: "tv" as const,
  }));
}

export async function getMovieGenres() {
  const res = await fetch(`${BASE_URL}/genre/movie/list`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
    next: { revalidate: 86400 },
  });

  const data = await res.json();
  return data.genres;
}

export async function getTVGenres() {
  const res = await fetch(`${BASE_URL}/genre/tv/list`, {
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
    next: { revalidate: 86400 },
  });

  const data = await res.json();
  return data.genres;
}

export async function searchMulti(query: string): Promise<TMDBMedia[]> {
  const res = await fetch(
    `${BASE_URL}/search/multi?query=${encodeURIComponent(
      query
    )}&include_adult=false`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
      next: { revalidate: 0 },
    }
  );

  if (!res.ok) throw new Error("Search failed");

  const data: TMDBResponse<TMDBMedia & { vote_count?: number }> =
    await res.json();

  return data.results
    .filter(
      (item) =>
        (item.media_type === "movie" || item.media_type === "tv") &&
        item.poster_path &&
        (item as any).vote_count !== undefined &&
        (item as any).vote_count > 50
    )
    .sort((a: any, b: any) => (b.vote_count ?? 0) - (a.vote_count ?? 0))
    .slice(0, 20);
}
