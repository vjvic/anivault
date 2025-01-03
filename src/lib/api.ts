import axios from "axios";
import rateLimit from "axios-rate-limit";

const API_PATHS = {
  topAnime: "/top/anime",
  topCharacters: "/top/characters",
  animeById: "/anime",
  genres: "/genres/anime",
  searchAnime: "/anime",
};

const axiosInstance = rateLimit(
  axios.create({ baseURL: process.env.NEXT_PUBLIC_API_BASE_URL }),
  { maxRequests: 1, perMilliseconds: 1000 }
);

export interface AnimeResponse<T> {
  data: T[];
  pagination: { current_page: number; has_next_page: boolean };
}

export interface Anime {
  mal_id: number;
  title: string;
  title_japanese: string;
  synopsis: string;
  score: number;
  favorites: number;
  type: string;
  episodes: string;
  duration: string;
  genres: Genres[];
  images: { jpg: { large_image_url: string } };
  trailer: {
    embed_url: string;
    images: { large_image_url: string; small_image_url: string };
  };
}

export interface Genres {
  mal_id: number;
  name: string;
  url: string;
  count: number;
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

export interface Recommendations {
  entry: {
    mal_id: number;
    title: string;
    images: {
      jpg: {
        large_image_url: string;
      };
    };
  };
}

const fetchData = async <T>(
  url: string,
  params?: Record<string, string>
): Promise<AnimeResponse<T>> => {
  try {
    const response = await axiosInstance.get<AnimeResponse<T>>(url, { params });
    return response.data;
  } catch (error) {
    console.error(`Error fetching ${url}:`, error);
    return { data: [], pagination: { current_page: 1, has_next_page: false } };
  }
};

export const fetchTopAnime = ({
  type = "",
  filter = "",
  page = 1,
}: {
  type: string;
  filter: string;
  page: number;
}): Promise<AnimeResponse<Anime>> => {
  return fetchData<Anime>(API_PATHS.topAnime, {
    type,
    filter,
    page: page.toString(),
  });
};

export const fetchTopCharacters = (
  page = 1
): Promise<AnimeResponse<Characters>> => {
  return fetchData<Characters>(API_PATHS.topCharacters, {
    page: page.toString(),
  });
};

export const fetchAnimeById = async (id: number): Promise<Anime | null> => {
  try {
    const response = await axiosInstance.get(
      `${API_PATHS.animeById}/${id}/full`
    );
    return response.data.data || null;
  } catch (error) {
    console.error(`Error fetching anime by ID:`, error);
    return null;
  }
};

export const fetchCharactersById = (
  id: number
): Promise<AnimeResponse<CharactersAnimeDetails>> => {
  return fetchData<CharactersAnimeDetails>(
    `${API_PATHS.animeById}/${id}/characters`
  );
};

export const fetchRecommendations = (
  id: number
): Promise<AnimeResponse<Recommendations>> => {
  return fetchData<Recommendations>(
    `${API_PATHS.animeById}/${id}/recommendations`
  );
};

export const fetchAnimeSearch = ({
  q,
  page = 1,
}: {
  q: string;
  page?: number;
}): Promise<AnimeResponse<Anime>> => {
  return fetchData<Anime>(API_PATHS.searchAnime, { q, page: page.toString() });
};

export const getGenres = (): Promise<AnimeResponse<Genres>> => {
  return fetchData<Genres>(API_PATHS.genres);
};

export const getAnimeByGenres = (
  id: string,
  page: number
): Promise<AnimeResponse<Anime>> => {
  return fetchData<Anime>(API_PATHS.searchAnime, {
    genres: id,
    page: page.toString(),
  });
};
