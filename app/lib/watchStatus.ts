import { supabase } from "./supabase";

export async function setWatchStatus(
  tmdbId: number,
  mediaType: "movie" | "tv",
  status: "watched" | "pending"
) {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) {
    console.warn("No authenticated user");
    return;
  }

  const { error } = await supabase.from("watch_status").upsert(
    {
      user_id: user.id,
      tmdb_id: tmdbId,
      media_type: mediaType,
      status,
    },
    {
      onConflict: "user_id,tmdb_id,media_type",
    }
  );

  if (error) {
    console.error("Failed to save watch status", error);
  }
}

export async function getWatchStatus(
  tmdbId: number,
  mediaType: "movie" | "tv"
): Promise<"watched" | "pending" | null> {
  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser();

  if (userError || !user) return null;

  const { data, error } = await supabase
    .from("watch_status")
    .select("status")
    .eq("user_id", user.id)
    .eq("tmdb_id", tmdbId)
    .eq("media_type", mediaType)
    .maybeSingle();

  if (error) {
    console.error("Failed to fetch watch status", error);
    return null;
  }

  return data?.status ?? null;
}
