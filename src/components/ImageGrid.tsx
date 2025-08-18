import { UnifiedImage } from "@/types/api";
import { ImageCard } from "./ImageCard";
import Masonry from "react-masonry-css";
import InfiniteScroll from "react-infinite-scroll-component";

interface ImageGridProps {
  images: UnifiedImage[];
  hasMore: boolean;
  loadMore: () => void;
  favorites: Set<string>;
  onToggleFavorite: (image: UnifiedImage) => void;
}

export function ImageGrid({
  images,
  hasMore,
  loadMore,
  favorites,
  onToggleFavorite,
}: ImageGridProps) {
  const breakpointColumns = {
    default: 3,
    1100: 2,
    700: 1,
  };

  return (
    <InfiniteScroll
      dataLength={images.length}
      next={loadMore}
      hasMore={hasMore}
      loader={<h4 className="text-center py-4">Loading more images...</h4>}
      endMessage={
        <p className="text-center py-4">
          {images.length ? "You've seen it all!" : "No images found."}
        </p>
      }
    >
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-4 w-auto"
        columnClassName="pl-4 bg-background"
      >
        {images.map((image, index) => (
          <div key={`${image.source}-${image.id}-${index}`} className="mb-4">
            <ImageCard
              image={image}
              onToggleFavorite={onToggleFavorite}
              isFavorite={favorites.has(image.id)}
            />
          </div>
        ))}
      </Masonry>
    </InfiniteScroll>
  );
}
