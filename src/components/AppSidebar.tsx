"use client";

import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getGenres, AnimeResponse, Genres } from "@/lib/api"; // Import genres API

import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarHeader,
} from "@/components/ui/sidebar";
import { SearchForm } from "./SearchForm";

const staticItems = [
  { title: "Home", url: "/" },
  { title: "Top Anime", url: "/top" },
  { title: "Top Movies", url: "/top/movie" },
  { title: "Top Airing", url: "/top/tv/airing" },
  { title: "Most Popular", url: "/top/tv/bypopularity" },
  { title: "Most Favorites", url: "/top/tv/favorite" },
];

const AppSidebar = () => {
  const {
    data: genreList,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Genres> | null, Error>({
    queryKey: ["genres"],
    queryFn: getGenres,
  });

  return (
    <Sidebar>
      <SidebarHeader>
        <h1 className="text-2xl font-bold text-primary">AniVault</h1>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Anime</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {staticItems.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <a href={item.url}>
                      <span>{item.title}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Genres</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {isLoading && <div>Loading Genres...</div>}
              {isError && <div>Failed to load genres.</div>}
              {genreList?.data.map((genre) => (
                <SidebarMenuItem key={genre.mal_id}>
                  <SidebarMenuButton asChild>
                    <a href={`/genre/${genre.mal_id}`}>
                      <span>{genre.name}</span>
                    </a>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
};

export default AppSidebar;
