import MediaCard from "@/app/components/MediaCard";
import Filters from "@/app/components/Filters";
import { discoverMovies, getMovieGenres, getProviders } from "@/app/lib/tmdb";

interface SearchParams {
  year?: string;
  rating?: string;
  genre?: string;
  provider?: string;
}

export default async function MoviesPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const [movies, genres, providers] = await Promise.all([
    discoverMovies({
      year: params.year ? Number(params.year) : undefined,
      minRating: params.rating ? Number(params.rating) : undefined,
      genre: params.genre ? Number(params.genre) : undefined,
      provider: params.provider ? Number(params.provider) : undefined,
    }),
    getMovieGenres(),
    getProviders("movie"),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">Movies</h1>

      <Filters genres={genres} providers={providers} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {movies.map((movie) => (
          <MediaCard key={movie.id} media={movie} />
        ))}
      </div>
    </section>
  );
}
