import MediaCard from "@/app/components/MediaCard";
import Filters from "@/app/components/Filters";
import { discoverTV, getTVGenres, getProviders } from "@/app/lib/tmdb";

interface SearchParams {
  year?: string;
  rating?: string;
  genre?: string;
  provider?: string;
}

export default async function TVPage({
  searchParams,
}: {
  searchParams: Promise<SearchParams>;
}) {
  const params = await searchParams;

  const [shows, genres, providers] = await Promise.all([
    discoverTV({
      year: params.year ? Number(params.year) : undefined,
      minRating: params.rating ? Number(params.rating) : undefined,
      genre: params.genre ? Number(params.genre) : undefined,
      provider: params.provider ? Number(params.provider) : undefined,
    }),
    getTVGenres(),
    getProviders("tv"),
  ]);

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-2xl font-semibold">TV Shows</h1>

      <Filters genres={genres} providers={providers} />

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {shows.map((tv) => (
          <MediaCard key={tv.id} media={tv} />
        ))}
      </div>
    </section>
  );
}
