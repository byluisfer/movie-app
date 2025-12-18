import { TMDBMedia } from "../lib/types";
import MediaCard from "./MediaCard";

interface Props {
  title: string;
  items: TMDBMedia[];
}

export default function MediaSection({ title, items }: Props) {
  if (!items.length) return null;

  return (
    <section className="flex flex-col gap-4">
      <h2 className="text-xl font-semibold">{title}</h2>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-5">
        {items.map((item) => (
          <MediaCard key={`${item.media_type}-${item.id}`} media={item} />
        ))}
      </div>
    </section>
  );
}
