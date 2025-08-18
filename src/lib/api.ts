import axios from "axios";
import {
  UnsplashImage,
  PexelsImage,
  PixabayImage,
  UnifiedImage,
  SearchResponse,
} from "@/types/api";

const MAX_RESULTS = Number(process.env.NEXT_PUBLIC_MAX_RESULTS_PER_PAGE) || 30;

// API Clients
const unsplashApi = axios.create({
  baseURL: "https://api.unsplash.com",
  headers: {
    Authorization: `Client-ID ${process.env.UNSPLASH_ACCESS_KEY}`,
  },
});

const pexelsApi = axios.create({
  baseURL: "https://api.pexels.com/v1",
  headers: {
    Authorization: process.env.PEXELS_API_KEY,
  },
});

const pixabayApi = axios.create({
  baseURL: "https://pixabay.com/api",
});

// Image Adapters
const adaptUnsplashImage = (image: UnsplashImage): UnifiedImage => ({
  id: `unsplash-${image.id}`,
  source: "unsplash",
  url: {
    full: image.urls.full,
    regular: image.urls.regular,
    small: image.urls.small,
    thumb: image.urls.thumb,
  },
  alt: image.alt_description || "Unsplash image",
  author: {
    name: image.user.name,
    url: image.user.portfolio_url || `https://unsplash.com/@${image.user.name}`,
  },
  downloadUrl: image.links.download,
});

const adaptPexelsImage = (image: PexelsImage): UnifiedImage => ({
  id: `pexels-${image.id}`,
  source: "pexels",
  url: {
    full: image.src.original,
    regular: image.src.large2x,
    small: image.src.medium,
    thumb: image.src.small,
  },
  alt: image.alt || "Pexels image",
  author: {
    name: image.photographer,
    url: image.photographer_url,
  },
  downloadUrl: image.src.original,
});

const adaptPixabayImage = (image: PixabayImage): UnifiedImage => ({
  id: `pixabay-${image.id}`,
  source: "pixabay",
  url: {
    full: image.largeImageURL,
    regular: image.webformatURL,
    small: image.webformatURL,
    thumb: image.previewURL,
  },
  alt: image.tags || "Pixabay image",
  author: {
    name: image.user,
    url: image.pageURL,
  },
  downloadUrl: image.largeImageURL,
});

// Search Functions
export const searchImages = async (
  query: string,
  page: number = 1,
  source?: "unsplash" | "pexels" | "pixabay"
): Promise<SearchResponse> => {
  try {
    const promises: Promise<UnifiedImage[]>[] = [];

    if (!source || source === "unsplash") {
      promises.push(
        unsplashApi
          .get("/search/photos", {
            params: {
              query,
              page,
              per_page: MAX_RESULTS,
            },
          })
          .then((response) => response.data.results.map(adaptUnsplashImage))
      );
    }

    if (!source || source === "pexels") {
      promises.push(
        pexelsApi
          .get("/search", {
            params: {
              query,
              page,
              per_page: MAX_RESULTS,
            },
          })
          .then((response) => response.data.photos.map(adaptPexelsImage))
      );
    }

    if (!source || source === "pixabay") {
      promises.push(
        pixabayApi
          .get("/", {
            params: {
              key: process.env.PIXABAY_API_KEY,
              q: query,
              page,
              per_page: MAX_RESULTS,
            },
          })
          .then((response) => response.data.hits.map(adaptPixabayImage))
      );
    }

    const results = await Promise.all(promises);
    const images = results.flat();

    return {
      images: images.slice(0, MAX_RESULTS),
      hasMore: images.length >= MAX_RESULTS,
      totalResults: images.length,
    };
  } catch (error) {
    console.error("Error searching images:", error);
    return {
      images: [],
      hasMore: false,
      totalResults: 0,
    };
  }
};
