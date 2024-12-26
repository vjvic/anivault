import { fetchTopAnime } from "@/lib/api";

export async function generateMetadata({
  params,
}: {
  params: { segments?: string[] };
}) {
  const [type, filter] = params.segments || [];

  const animeType = (type || "") as string;
  const animeFilter = (filter || "") as string;

  const animes = await fetchTopAnime({
    type: animeType,
    filter: animeFilter,
    page: 1,
  });

  const title = `Top ${animeType} Anime - ${animeFilter} - AniVault`;
  const description = `Explore the best ${animeType} anime in the ${animeFilter} category on AniVault. Discover popular titles and top-rated anime based on ${animeFilter}.`;

  return {
    title,
    description,
    keywords: `${animeType} anime, ${animeFilter} anime, top ${animeType} anime, ${animeFilter} ${animeType} anime`,
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/top/${animeType}/${animeFilter}`,
      images: [
        {
          url: animes.data[0].images.jpg.large_image_url,
          width: 800,
          height: 600,
          alt: `Top ${animeType} Anime - ${animeFilter}`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: animes.data[0].images.jpg.large_image_url,
    },
  };
}
