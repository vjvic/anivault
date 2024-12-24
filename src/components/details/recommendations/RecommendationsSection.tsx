import React from "react";
import {
  AnimeResponse,
  fetchRecommendations,
  Recommendations,
} from "@/lib/api";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";

const RecommendationsSection = ({ id }: { id: number }) => {
  const router = useRouter();

  const { data: recommendationList, isLoading } =
    useQuery<AnimeResponse<Recommendations> | null>({
      queryKey: ["animeRecommendations", id],
      queryFn: () => fetchRecommendations(id),
    });

  if (isLoading) return <div>loading...</div>;

  console.log("rec");
  console.log(recommendationList);

  const handleNavigate = (id: number) => {
    router.push(`/details/anime/${id}`);
  };

  return (
    <section>
      <div className="container mx-auto mt-10">
        <div className="flex justify-between items-center mb-3 border-l-4 border-primary pl-2">
          <h3 className="text-3xl font-semibold">Recommendations</h3>
        </div>

        <div className="grid gap-4 grid-cols-8">
          {recommendationList?.data.slice(0, 24).map((rec) => (
            <div
              key={rec.entry.mal_id}
              onClick={() => handleNavigate(rec.entry.mal_id)}
              className="group cursor-pointer"
            >
              <Image
                src={rec.entry.images.jpg.large_image_url}
                alt={rec.entry.title}
                className="w-full object-top object-cover rounded transition-transform duration-300 ease-in-out group-hover:scale-105 group-hover:shadow-lg"
                width={500}
                height={500}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default RecommendationsSection;
