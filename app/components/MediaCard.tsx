import Image from "next/image";
import Link from "next/link";
import { TMDBMedia } from "../lib/types";

interface Props {
  media: TMDBMedia;
}

export default function MediaCard({ media }: Props) {
  const title = media.title || media.name;

  if (media.media_type !== "movie" && media.media_type !== "tv") {
    return null;
  }
  const href =
    media.media_type === "movie" ? `/movie/${media.id}` : `/tv/${media.id}`;

  return (
    <Link
      href={href}
      className="group flex flex-col gap-2 rounded-lg transition hover:scale-[1.02]"
    >
      <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg bg-zinc-200">
        {media.poster_path && (
          <Image
            src={`https://image.tmdb.org/t/p/w500${media.poster_path}`}
            alt={title ?? ""}
            fill
            className="object-cover"
          />
        )}
      </div>

      <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
        {title}
      </h3>
    </Link>
  );
}
