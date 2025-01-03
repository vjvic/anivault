"use client";
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { getGenres, AnimeResponse, Genres } from "@/lib/api";
import Link from "next/link";

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
  SidebarFooter,
} from "@/components/ui/sidebar";
import { SearchForm } from "./SearchForm";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import Image from "next/image";

const staticItems = [
  { title: "Home", url: "/" },
  { title: "Top Anime", url: "/top" },
  { title: "Top Movies", url: "/top/movie" },
  { title: "Top Airing", url: "/top/tv/airing" },
  { title: "Most Popular", url: "/top/tv/bypopularity" },
  { title: "Most Favorites", url: "/top/tv/favorite" },
];

const ITEMS_PER_PAGE = 15;

const AppSidebar = () => {
  const {
    data: genreList,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Genres> | null>({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  const [visibleGenres, setVisibleGenres] = useState(ITEMS_PER_PAGE);

  const handleLoadMore = () => {
    setVisibleGenres((prev) => prev + ITEMS_PER_PAGE);
  };

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold text-primary">AniVault</h1>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Anime</SidebarGroupLabel>
          <SidebarMenu>
            {staticItems.map((item) => (
              <SidebarMenuItem key={item.title}>
                <SidebarMenuButton asChild>
                  <Link href={item.url}>
                    <span>{item.title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Genres</SidebarGroupLabel>
          <SidebarMenu>
            {isLoading ? (
              Array(6)
                .fill(0)
                .map((_, index) => (
                  <SidebarMenuItem key={index}>
                    <Skeleton className="h-4 w-[150px] mb-2" />
                    <Skeleton className="h-4 w-[100px] mb-2" />
                    <Skeleton className="h-4 w-[90px]" />
                  </SidebarMenuItem>
                ))
            ) : isError ? (
              <div className="text-red-500">Failed to load genres.</div>
            ) : (
              <>
                {genreList?.data.slice(0, visibleGenres).map((genre) => (
                  <SidebarMenuItem key={genre.mal_id}>
                    <SidebarMenuButton asChild>
                      <Link href={`/genre/${genre.mal_id}`}>
                        <span>{genre.name}</span>
                      </Link>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                ))}

                {visibleGenres < (genreList?.data.length || 0) && (
                  <SidebarMenuItem>
                    <button
                      onClick={handleLoadMore}
                      className="w-full text-center text-primary hover:text-primary-foreground py-2 transition-all duration-200"
                    >
                      Load More
                    </button>
                  </SidebarMenuItem>
                )}
              </>
            )}
          </SidebarMenu>
        </SidebarGroup>

        <SidebarFooter>
          <Card>
            <CardHeader>
              <CardTitle className="text-primary">AniVault</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs">
                AniVault offers the best anime titles. Browse and discover anime
                of all genres.
              </p>
            </CardContent>
            <CardFooter>
              <div>
                <p className="text-xs">
                  <span>Powered by </span>{" "}
                  <Link
                    href="https://jikan.moe/"
                    target="_blank"
                    rel="noopener noreferrer"
                    className=" text-primary"
                  >
                    Jikan API
                  </Link>
                </p>
                <div className="flex items-center gap-2 mt-2">
                  <Link
                    href="https://github.com/vjvic"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/github.svg"
                      alt="linkedin"
                      width={20}
                      height={50}
                    />
                  </Link>
                  <Link
                    href="https://www.linkedin.com/in/victor-sulit-jr/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Image
                      src="/linkedin.svg"
                      alt="linkedin"
                      width={20}
                      height={50}
                    />
                  </Link>
                </div>
              </div>
            </CardFooter>
          </Card>
        </SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
