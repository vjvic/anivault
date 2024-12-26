import { fetchAnimeById } from "@/lib/api";

export async function generateMetadata({ params }: { params: { id: string } }) {
  const animeId = params.id;

  const animeDetails = await fetchAnimeById(Number(animeId));

  const animeName = animeDetails?.title || "Anime";
  const animeDescription =
    animeDetails?.synopsis || "No description available.";
  const animeImage = animeDetails?.images.jpg || "/default-image.jpg";

  return {
    title: `${animeName} - AniVault`,
    description: animeDescription,
    keywords: `${animeName}, anime details, anime characters, anime recommendations`,
    openGraph: {
      title: `${animeName} - AniVault`,
      description: animeDescription,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/anime/${animeId}`,
      images: [
        {
          url: animeImage,
          width: 800,
          height: 600,
          alt: `${animeName} cover image`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${animeName} - AniVault`,
      description: animeDescription,
      image: animeImage,
    },
  };
}
