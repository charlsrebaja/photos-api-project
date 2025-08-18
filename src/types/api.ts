// API Response Types
export interface UnsplashImage {
  id: string;
  urls: {
    raw: string;
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt_description: string;
  user: {
    name: string;
    portfolio_url: string;
  };
  links: {
    download: string;
  };
}

export interface PexelsImage {
  id: number;
  src: {
    original: string;
    large2x: string;
    large: string;
    medium: string;
    small: string;
    tiny: string;
  };
  alt: string;
  photographer: string;
  photographer_url: string;
}

export interface PixabayImage {
  id: number;
  largeImageURL: string;
  webformatURL: string;
  previewURL: string;
  user: string;
  pageURL: string;
  tags: string;
}

// Unified Image Type
export interface UnifiedImage {
  id: string;
  source: "unsplash" | "pexels" | "pixabay";
  url: {
    full: string;
    regular: string;
    small: string;
    thumb: string;
  };
  alt: string;
  author: {
    name: string;
    url: string;
  };
  downloadUrl: string;
}

// Search Response Types
export interface SearchResponse {
  images: UnifiedImage[];
  hasMore: boolean;
  totalResults: number;
}
