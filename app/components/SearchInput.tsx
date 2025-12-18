"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const router = useRouter();
  const [query, setQuery] = useState("");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!query.trim()) return;

    router.push(`/search?q=${encodeURIComponent(query)}`);
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-sm">
      <input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search movies or TV shows..."
        className="w-full rounded-md bg-zinc-800 px-3 py-2 text-sm text-white placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
    </form>
  );
}
