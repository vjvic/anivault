import React from "react";
import { useQuery } from "@tanstack/react-query";
import { AnimeResponse, Anime, fetchTopAnime } from "@/lib/api";
import ShowcaseCarousel from "@/components/ShowcaseCarousel";
import SectionLoading from "@/components/home/SectionLoading";

const TopAnimeSection = () => {
  const { data, isLoading, isError } = useQuery<AnimeResponse<Anime>>({
    queryKey: ["topAnime"],
    queryFn: () => fetchTopAnime({ type: "", filter: "", page: 1 }),
  });

  if (isLoading) return <SectionLoading />;
  if (isError) return <div>Error fetching anime</div>;

  return (
    <section>
      <ShowcaseCarousel text="Top Anime" data={data?.data ?? []} link="/" />
    </section>
  );
};

export default TopAnimeSection;
