import React from "react";
import { AnimeResponse, fetchRecommendations, Anime } from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import SectionLoading from "../SectionLoading";
import Image from "next/image";

const RecommendationsSection = ({ id }: { id: number }) => {
  const router = useRouter();

  const {
    data: recommendationList,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Anime> | null>({
    queryKey: ["animeRecommendations", id],
    queryFn: () => fetchRecommendations(id),
  });

  if (isLoading) return <SectionLoading />;
  if (isError) return <div>Error fetching anime</div>;

  const handleNavigate = (id: number) => {
    router.push(`/details/anime/${id}`);
  };

  return (
    <section>
      <div className="container mx-auto mt-10 px-4">
        <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
          <h3 className="text-3xl font-semibold">Recommendations</h3>
        </div>

        <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
          {recommendationList?.data.slice(0, 24).map((rec) => (
            <div
              key={rec.entry.mal_id}
              onClick={() => handleNavigate(rec.entry.mal_id)}
              className="group cursor-pointer relative overflow-hidden rounded"
            >
              <Image
                src={rec.entry.images.jpg.large_image_url}
                alt={rec.entry.title}
                className="w-full h-56 object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105"
                width={500}
                height={500}
              />

              <div className="absolute inset-0 bg-black bg-opacity-60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ease-in-out flex items-center justify-center">
                <span className="text-white font-semibold text-sm sm:text-base md:text-lg text-center px-2">
                  {rec.entry.title}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;
