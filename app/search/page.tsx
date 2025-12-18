import { searchMulti } from "@/app/lib/tmdb";
import MediaCard from "@/app/components/MediaCard";

interface Props {
  searchParams: Promise<{
    q?: string;
  }>;
}

export default async function SearchPage({ searchParams }: Props) {
  const { q } = await searchParams;

  if (!q || !q.trim()) {
    return (
      <div className="mx-auto max-w-6xl px-4 py-6 text-zinc-400">
        Start typing to search movies or TV shows.
      </div>
    );
  }

  const results = await searchMulti(q);

  return (
    <section className="mx-auto max-w-6xl px-4 py-6">
      <h1 className="mb-4 text-xl font-semibold">Results for “{q}”</h1>

      {results.length === 0 ? (
        <p className="text-zinc-400">No results found.</p>
      ) : (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
          {results.map((item) => (
            <MediaCard key={`${item.media_type}-${item.id}`} media={item} />
          ))}
        </div>
      )}
    </section>
  );
}
