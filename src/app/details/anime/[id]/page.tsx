"use client";
import React from "react";
import { useParams } from "next/navigation";
import HeroContent from "@/components/details/anime/HeroContent";

const AnimeDetails = () => {
  const { id } = useParams();

  return (
    <div>
      <HeroContent id={Number(id)} />
    </div>
  );
};

export default AnimeDetails;
