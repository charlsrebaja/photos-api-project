import { UnifiedImage } from "@/types/api";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import Image from "next/image";
import { FaDownload, FaStar } from "react-icons/fa";

interface ImageCardProps {
  image: UnifiedImage;
  onToggleFavorite: (image: UnifiedImage) => void;
  isFavorite: boolean;
}

export function ImageCard({
  image,
  onToggleFavorite,
  isFavorite,
}: ImageCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Card className="overflow-hidden">
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>
          <CardContent className="p-0 cursor-pointer">
            <div className="relative aspect-[4/3]">
              <Image
                src={image.url.regular}
                alt={image.alt}
                fill
                className="object-cover transition-transform hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              />
            </div>
          </CardContent>
        </DialogTrigger>
        <DialogContent className="max-w-4xl">
          <DialogTitle className="sr-only">
            {image.alt || "Image preview"}
          </DialogTitle>
          <div className="relative aspect-[4/3]">
            <Image
              src={image.url.full}
              alt={image.alt}
              fill
              className="object-contain"
              sizes="(max-width: 1200px) 100vw, 1200px"
              priority
            />
          </div>
          <div className="flex justify-between items-center mt-4">
            <a
              href={image.author.url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm hover:underline"
            >
              Photo by {image.author.name} on {image.source}
            </a>
            <a
              href={image.downloadUrl}
              download
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2"
            >
              <Button>
                <FaDownload className="mr-2" />
                Download
              </Button>
            </a>
          </div>
        </DialogContent>
      </Dialog>

      <CardFooter className="flex justify-between p-2">
        <a
          href={image.author.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-sm hover:underline truncate"
        >
          {image.author.name}
        </a>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => onToggleFavorite(image)}
          className={isFavorite ? "text-yellow-500" : ""}
        >
          <FaStar />
        </Button>
      </CardFooter>
    </Card>
  );
}
