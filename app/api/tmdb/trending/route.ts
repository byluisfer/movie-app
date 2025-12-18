import { getTrending } from "@/app/lib/tmdb";

export async function GET() {
  try {
    const data = await getTrending();
    return Response.json(data);
  } catch {
    return new Response("Error fetching trending", { status: 500 });
  }
}
