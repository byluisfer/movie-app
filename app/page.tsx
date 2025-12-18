import {
  getTrending,
  getPopularMovies,
  getPopularTV,
  getUpcomingMovies,
} from "./lib/tmdb";

import MediaSection from "./components/MediaSection";

export default async function HomePage() {
  const [trending, popularMovies, popularTV, upcomingMovies] =
    await Promise.all([
      getTrending(),
      getPopularMovies(),
      getPopularTV(),
      getUpcomingMovies(),
    ]);

  return (
    <div className="flex flex-col gap-12">
      <MediaSection title="Trending this week" items={trending} />
      <MediaSection title="Popular Movies" items={popularMovies} />
      <MediaSection title="Popular TV Shows" items={popularTV} />
      <MediaSection title="Upcoming Movies" items={upcomingMovies} />
    </div>
  );
}
