import React from "react";
import { Play } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { fetchAnimeById, Anime, Genres } from "@/lib/api";
import { useRouter } from "next/navigation";
import Image from "next/image";
import HeroLoading from "@/components/HeroLoading";

const HeroSection = ({ id }: { id: number }) => {
  const router = useRouter();

  // Fetch Anime Data
  const { data, isLoading, isError } = useQuery<Anime | null>({
    queryKey: ["animeDetails", id],
    queryFn: () => fetchAnimeById(Number(id)),
  });

  const anime = data;

  // Loading or Error States
  if (isLoading) return <HeroLoading />;
  if (isError) return <div>Error fetching anime.</div>;
  if (!anime) return <div>Anime not found.</div>;

  const {
    title,
    synopsis,
    images,
    type,
    episodes,
    duration,
    favorites,
    score,
    genres,
    trailer,
  } = anime;

  // Redirect Handler
  const handleRedirect = (link: string) => {
    if (link.startsWith("http")) {
      window.open(link, "_blank");
    } else {
      router.push(link);
    }
  };

  return (
    <div className="h-full w-full">
      <div
        className="min-h-[50vh] md:h-[550px] bg-cover bg-center rounded"
        style={{
          backgroundImage: `url(${
            trailer?.images.large_image_url || "https://via.placeholder.com/500"
          })`,
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="w-full h-full bg-black bg-opacity-80 flex items-center justify-center">
          <div className="container mx-auto px-4 sm:px-6 md:px-8 grid gap-8 lg:gap-12 grid-cols-1 md:grid-cols-[350px,1fr] items-center">
            <Image
              src={images.jpg.large_image_url}
              alt={anime.title}
              className="object-cover rounded mx-auto lg:w-full w-[200px] shadow-lg my-4"
              width={350}
              height={350}
            />

            <div className="text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-bold mb-4 text-white">
                {title}
              </h3>

              <div className="flex flex-wrap gap-2 mb-5 justify-center md:justify-start">
                <Badge>{type}</Badge>
                <Badge>Episodes {episodes || "N/A"}</Badge>
                <Badge>{duration}</Badge>
                <Badge>⭐ {score}</Badge>
                <Badge>❤️ {favorites}</Badge>
              </div>

              {trailer?.embed_url && (
                <Button
                  variant="outline"
                  onClick={() => handleRedirect(trailer.embed_url)}
                  className="flex items-center gap-2 justify-center w-full md:w-auto mx-auto md:mx-0"
                >
                  <Play className="h-5 w-5" /> Watch Trailer
                </Button>
              )}

              <div className="my-7">
                <p className="text-sm sm:text-base text-white">{synopsis}</p>
              </div>

              <div className="flex flex-wrap gap-2 mb-4 justify-center md:justify-start">
                {genres.map((genre: Genres) => (
                  <Badge key={genre.mal_id}>{genre.name}</Badge>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
