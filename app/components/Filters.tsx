"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface Props {
  genres: { id: number; name: string }[];
  providers: { provider_id: number; provider_name: string }[];
}

export default function Filters({ genres, providers }: Props) {
  const router = useRouter();
  const searchParams = useSearchParams();

  function updateParam(key: string, value: string) {
    const params = new URLSearchParams(searchParams.toString());

    if (!value) params.delete(key);
    else params.set(key, value);

    router.push(`?${params.toString()}`);
  }

  return (
    <div className="mb-6 flex flex-wrap gap-4">
      {/* Genre */}
      <select
        onChange={(e) => updateParam("genre", e.target.value)}
        defaultValue={searchParams.get("genre") ?? ""}
        className="rounded bg-zinc-800 px-3 py-2"
      >
        <option value="">All genres</option>
        {genres.map((g) => (
          <option key={g.id} value={g.id}>
            {g.name}
          </option>
        ))}
      </select>

      {/* Provider */}
      <select
        onChange={(e) => updateParam("provider", e.target.value)}
        defaultValue={searchParams.get("provider") ?? ""}
        className="rounded bg-zinc-800 px-3 py-2"
      >
        <option value="">All platforms</option>
        {providers.map((p) => (
          <option key={p.provider_id} value={p.provider_id}>
            {p.provider_name}
          </option>
        ))}
      </select>

      {/* Rating */}
      <select
        onChange={(e) => updateParam("rating", e.target.value)}
        defaultValue={searchParams.get("rating") ?? ""}
        className="rounded bg-zinc-800 px-3 py-2"
      >
        <option value="">Any rating</option>
        {[5, 6, 7, 8].map((r) => (
          <option key={r} value={r}>
            {r}+
          </option>
        ))}
      </select>

      {/* Year */}
      <select
        onChange={(e) => updateParam("year", e.target.value)}
        defaultValue={searchParams.get("year") ?? ""}
        className="rounded bg-zinc-800 px-3 py-2"
      >
        <option value="">Any year</option>
        {Array.from({ length: 30 }).map((_, i) => {
          const year = new Date().getFullYear() - i;
          return (
            <option key={year} value={year}>
              {year}
            </option>
          );
        })}
      </select>
    </div>
  );
}
