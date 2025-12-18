import Image from "next/image";
import { getMovieDetail, getProviders } from "@/app/lib/tmdb";
import WatchButton from "@/app/components/WatchButton";

interface Props {
  params: Promise<{ id: string }>;
}

export default async function MovieDetailPage({ params }: Props) {
  const { id } = await params;
  const movie = await getMovieDetail(id);

  if (!movie) {
    return (
      <div className="py-24 text-center text-zinc-400">
        This movie information is not available.
      </div>
    );
  }

  const providers = await getProviders("movie", id);
  const flatrate = providers?.results?.ES?.flatrate ?? [];

  return (
    <div className="flex flex-col gap-8">
      {Boolean(movie.backdrop_path) && (
        <div className="relative h-[300px] w-full">
          <Image
            src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
            alt={movie.title}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-black/60" />
        </div>
      )}

      <div className="mx-auto flex max-w-5xl gap-8 px-4">
        {movie.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
            alt={movie.title}
            width={300}
            height={450}
            className="rounded-lg"
          />
        )}

        <div className="flex flex-col gap-4">
          <h1 className="text-3xl font-semibold">{movie.title}</h1>

          <p className="text-zinc-400">
            {movie.release_date ? movie.release_date.slice(0, 4) : "—"}
            {movie.vote_average.toFixed(1)}
          </p>

          <div className="flex gap-2">
            {movie.genres.map((g) => (
              <span
                key={g.id}
                className="rounded-full bg-zinc-800 px-3 py-1 text-sm"
              >
                {g.name}
              </span>
            ))}
          </div>

          <p className="max-w-xl leading-relaxed">{movie.overview}</p>
          <WatchButton tmdbId={movie.id} mediaType="movie" />

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
