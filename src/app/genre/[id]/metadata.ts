import { getGenres } from "@/lib/api";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const { id } = params;

  const genresData = await getGenres();

  const genre = genresData?.data.find((g) => g.mal_id === Number(id));

  const genreName = genre?.name || "Anime";

  return {
    title: `${genreName} Anime - AniVault`,
    description: `Discover the best ${genreName.toLowerCase()} anime on AniVault. Browse through popular titles and explore new favorites.`,
    keywords: `${genreName.toLowerCase()} anime, top ${genreName.toLowerCase()} anime, AniVault ${genreName.toLowerCase()}`,
  };
}
