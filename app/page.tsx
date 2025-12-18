import { getTrending } from "./lib/tmdb";
import MediaCard from "./components/MediaCard";

export default async function HomePage() {
  const trending = await getTrending();

  return (
    <section className="flex flex-col gap-6">
      <h1 className="text-2xl font-semibold">Trending this week</h1>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {trending.map((item) => (
          <MediaCard key={`${item.media_type}-${item.id}`} media={item} />
        ))}
      </div>
    </section>
  );
}
