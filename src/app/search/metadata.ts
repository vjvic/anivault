import { Metadata } from "next";

export async function generateMetadata({
  params,
}: {
  params: { q: string };
}): Promise<Metadata> {
  const query = params.q || "Anime";

  return {
    title: `Search Results for "${query}" - AniVault`,
    description: `Browse through anime search results for "${query}" on AniVault. Explore new and popular anime based on your search.`,
    keywords: `${query} anime, search results, AniVault anime`,
  };
}
