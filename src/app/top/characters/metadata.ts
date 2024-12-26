import { fetchTopCharacters } from "@/lib/api";

export async function generateMetadata() {
  const charactersData = await fetchTopCharacters({ page: 1 });

  const characters = charactersData?.data || [];
  const totalCharacters = characters.length;
  const title =
    totalCharacters > 0
      ? `Top ${totalCharacters} Characters - AniVault`
      : "Top Characters - AniVault";
  const description = `Explore the top anime characters on AniVault. Discover your favorite characters from popular anime titles.`;

  return {
    title,
    description,
    keywords: "top anime characters, anime characters, best anime characters",
    openGraph: {
      title,
      description,
      url: `${process.env.NEXT_PUBLIC_APP_URL}/top/characters`,
      images: [
        {
          url: characters[0].images.jpg.image_url,
          width: 800,
          height: 600,
          alt: "Top Characters on AniVault",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: characters[0].images.jpg.image_url,
    },
  };
}
