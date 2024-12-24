import axios from "axios";
import rateLimit from "axios-rate-limit";

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
  genres: Genres[];
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

export interface CharactersAnimeDetails {
  character: {
    images: {
      jpg: {
        image_url: string;
      };
    };
    mal_id: number;
    name: string;
    url: string;
  };
  favorites: number;
  role: string;
}

export interface Genres {
  mal_id: number;
  name: string;
  url: string;
  count: number;
}

const axiosInstance = rateLimit(
  axios.create({
    baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
  }),
  { maxRequests: 1, perMilliseconds: 1000 }
);

export interface AnimeResponse<T> {
  data: T[];
}

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

export const fetchTopCharacters = async (): Promise<
  AnimeResponse<Characters>
> => {
  return fetchData<Characters>(`/top/characters`);
};

export const fetchAnimeById = async (id: number): Promise<Anime | null> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/full`);
    return response.data.data;
  } catch (error) {
    console.error("Error fetching anime by ID:", error);
    return null;
  }
};

export const fetchCharactersById = async (
  id: number
): Promise<AnimeResponse<CharactersAnimeDetails> | null> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/characters`);
    return response.data;
  } catch (error) {
    console.error("Error fetching characters by ID:", error);
    return null;
  }
};

export const fetchRecommendations = async (
  id: number
): Promise<AnimeResponse<Characters> | null> => {
  try {
    const response = await axiosInstance.get(`/anime/${id}/recommendations`);
    return response.data;
  } catch (error) {
    console.error("Error fetching recommendations:", error);
    return null;
  }
};

export const fetchAnimeSearch = async ({
  q,
  page = 1,
}: {
  q: string;
  page?: number;
}): Promise<AnimeResponse<Anime> | null> => {
  try {
    const response = await axiosInstance.get(`/anime`, {
      params: { q, page: page.toString() },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching anime search:", error);
    return null;
  }
};

export const getGenres = async (): Promise<AnimeResponse<Genres> | null> => {
  try {
    const response = await axiosInstance.get(`/genres/anime`);
    return response.data;
  } catch (error) {
    console.error("Error fetching genres:", error);
    return null;
  }
};

export const getAnimeByGenres = async (
  id: string,
  page: number
): Promise<AnimeResponse<Anime> | null> => {
  try {
    const response = await axiosInstance.get(`/anime`, {
      params: { genres: id, page: page.toString() },
    });
    return response.data;
  } catch (error) {
    console.error("Error fetching anime by genres:", error);
    return null;
  }
};
