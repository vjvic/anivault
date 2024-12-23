import axios from "axios";
import rateLimit from "axios-rate-limit";

// Anime Interface
export interface Anime {
  mal_id: number;
  title: string;
  title_japanese: string;
  synopsis: string;
  score: number;
  favorites: number;
  type: string;
  episode: string;
  duration: string;
  genres: {
    mal_id: number;
    name: string;
  };
  images: {
    jpg: {
      large_image_url: string;
    };
  };
  trailer: {
    embed_url: string;
    images: {
      large_image_url: string;
      small_image_url: string;
    };
  };
}

// Characters Interface
export interface Characters {
  mal_id: number;
  name: string;
  about: string;
  favorites: number;
  images: {
    jpg: {
      image_url: string;
    };
  };
  nicknames: string[];
  url: string;
}

export interface Genres {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

// Axios Instance with Rate Limiting
const axiosInstance = rateLimit(
  axios.create({
    baseURL: process.env.PUBLIC_API_BASE_URL,
  }),
  { maxRequests: 1, perMilliseconds: 1000 }
);

// Generic Response Interface
export interface AnimeResponse<T> {
  data: T[];
}

// Generic Fetch Function
const fetchData = async <T>(
  url: string,
  params?: Record<string, string>
): Promise<AnimeResponse<T>> => {
  try {
    const response = await axiosInstance.get<AnimeResponse<T>>(url, { params });
    return response.data;
  } catch (error: any) {
    console.error(
      "Error fetching data:",
      error.response?.data || error.message
    );
    throw new Error("Failed to fetch data");
  }
};

// Fetch Top Anime
export const fetchTopAnime = async ({
  type = "",
  filter = "",
  page = 1,
}: {
  type: string;
  filter: string;
  page: number;
}): Promise<AnimeResponse<Anime>> => {
  return fetchData<Anime>(`/top/anime`, {
    type,
    filter,
    page: page.toString(),
  });
};

// Fetch Top Characters
export const fetchTopCharacters = async (): Promise<
  AnimeResponse<Characters>
> => {
  return fetchData<Characters>(`/top/characters`);
};

// Fetch Anime by ID
export const fetchAnimeById = async (id: number): Promise<Anime> => {
  const response = await axiosInstance.get(`/anime/${id}/full`);
  return response.data.data;
};

// Fetch Characters by Anime ID
export const fetchCharactersById = async (
  id: number
): Promise<AnimeResponse<Characters>> => {
  const response = await axiosInstance.get(`/anime/${id}/characters`);
  return response.data.data;
};

// Fetch Recommendations by Anime ID
export const fetchRecommendations = async (
  id: number
): Promise<AnimeResponse<Characters>> => {
  const response = await axiosInstance.get(`/anime/${id}/recommendations`);
  return response.data.data;
};

// Fetch Anime by Search Query
export const fetchAnimeSearch = async ({
  q,
  page = 1,
}: {
  q: string;
  page?: number;
}): Promise<AnimeResponse<Anime>> => {
  const response = await axiosInstance.get(`/anime`, {
    params: { q, page: page.toString() },
  });
  return response.data;
};

// Fetch All Anime Genres
export const getGenres = async (): Promise<AnimeResponse<Genres>> => {
  const response = await axiosInstance.get(`/genres/anime`);
  return response.data;
};

// Fetch Anime by Genre
export const getAnimeByGenres = async (
  id: string,
  page: number
): Promise<AnimeResponse<Anime>> => {
  const response = await axiosInstance.get(`/anime`, {
    params: { genres: id, page: page.toString() },
  });
  return response.data;
};
