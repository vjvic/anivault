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
  { title: "Home", url: "#" },
  { title: "Top Anime", url: "#" },
  { title: "Top Airing", url: "#" },
  { title: "Top Movies", url: "#" },
  { title: "Top Upcoming", url: "#" },
  { title: "Most Popular", url: "#" },
  { title: "Most Favorites", url: "#" },
];

const AppSidebar = () => {
  // Fetch genres with React Query
  const {
    data: genreList,
    isLoading,
    isError,
  } = useQuery<AnimeResponse<Genres> | null, Error>({
    queryKey: ["genres"], // Unique key to identify the query
    queryFn: getGenres,
  });

  return (
    <Sidebar>
      {/* Header with logo and search */}
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton asChild>
              <a href="#" className="font-bold text-[26px] text-primary">
                <span>AniVault</span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        <SearchForm />
      </SidebarHeader>

      <SidebarContent>
        {/* Static Anime Links */}
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

        {/* Genres Section */}
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
