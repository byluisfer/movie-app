"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/app/lib/useUser";
import { getWatchStatus, setWatchStatus } from "../lib/watchStatus";

interface Props {
  tmdbId: number;
  mediaType: "movie" | "tv";
}

export default function WatchButton({ tmdbId, mediaType }: Props) {
  const user = useUser();
  const router = useRouter();

  const [status, setStatus] = useState<"watched" | "pending" | null>(null);

  useEffect(() => {
    if (!user) return;
    getWatchStatus(tmdbId, mediaType).then(setStatus);
  }, [tmdbId, mediaType, user]);

  async function updateStatus(newStatus: "watched" | "pending") {
    if (!user) {
      router.push("/auth");
      return;
    }

    await setWatchStatus(tmdbId, mediaType, newStatus);
    setStatus(newStatus);
  }

  return (
    <div className="flex gap-3">
      <button
        onClick={() => updateStatus("watched")}
        className={`rounded px-4 py-2 text-sm ${
          status === "watched" ? "bg-green-600 text-white" : "bg-zinc-800"
        }`}
      >
        Watched
      </button>

      <button
        onClick={() => updateStatus("pending")}
        className={`rounded px-4 py-2 text-sm ${
          status === "pending" ? "bg-yellow-600 text-white" : "bg-zinc-800"
        }`}
      >
        Pending
      </button>
    </div>
  );
}
