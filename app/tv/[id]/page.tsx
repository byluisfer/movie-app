import Image from "next/image";
import { getTVDetail, getProviders } from "@/app/lib/tmdb";
import { TMDBTVDetail } from "@/app/lib/types";
import WatchButton from "@/app/components/WatchButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function TVDetailPage({ params }: Props) {
  const { id } = await params;
  const tv: TMDBTVDetail = await getTVDetail(id);
  const providers = await getProviders("tv", id);
  const flatrate = providers?.results?.ES?.flatrate ?? [];

  return (
    <div className="flex flex-col gap-8">
      {tv.backdrop_path && (
        <div className="relative h-[300px] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${tv.backdrop_path}`}
            alt={tv.name}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="mx-auto flex max-w-5xl gap-8 px-4">
        {tv.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${tv.poster_path}`}
            alt={tv.name}
            width={300}
            height={450}
            className="rounded-lg"
          />
        )}

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{tv.name}</h1>

          <p className="text-zinc-400">
            {tv.first_air_date.slice(0, 4)} · ⭐ {tv.vote_average.toFixed(1)} ·{" "}
            {tv.number_of_seasons} seasons
          </p>

          <div className="flex gap-2">
            {tv.genres.map((g) => (
              <span
                key={g.id}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="max-w-xl leading-relaxed">{tv.overview}</p>
          <WatchButton tmdbId={tv.id} mediaType="tv" />

          {flatrate.length > 0 && (
            <div className="flex flex-col gap-2">
              <h3 className="font-medium">Available on</h3>
              <div className="flex gap-3">
                {flatrate.map((p: any) => (
                  <Image
                    key={p.provider_id}
                    src={`https://image.tmdb.org/t/p/w92${p.logo_path}`}
                    alt={p.provider_name}
                    width={48}
                    height={48}
                    className="rounded"
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
