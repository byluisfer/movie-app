import { TMDBMedia, TMDBResponse } from "./types";

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
