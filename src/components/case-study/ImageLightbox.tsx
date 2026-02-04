import { useState } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import type { GalleryImage } from "@/data/caseStudyDetails";

interface ImageLightboxProps {
  images: GalleryImage[];
  initialIndex?: number;
  isOpen: boolean;
  onClose: () => void;
}

const ImageLightbox = ({
  images,
  initialIndex = 0,
  isOpen,
  onClose,
}: ImageLightboxProps) => {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") handlePrev();
    if (e.key === "ArrowRight") handleNext();
    if (e.key === "Escape") onClose();
  };

  if (images.length === 0) return null;

  const currentImage = images[currentIndex];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent
        className="max-w-6xl w-[95vw] h-[90vh] p-0 gap-0 bg-background/95 backdrop-blur-xl border-border"
        onKeyDown={handleKeyDown}
      >
        {/* Close button */}
        <Button
          variant="ghost"
          size="icon"
          onClick={onClose}
          className="absolute top-4 right-4 z-50 h-10 w-10 rounded-full bg-background/80 hover:bg-background"
        >
          <X className="h-5 w-5" />
        </Button>

        {/* Navigation arrows */}
        {images.length > 1 && (
          <>
            <Button
              variant="ghost"
              size="icon"
              onClick={handlePrev}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-background/80 hover:bg-background"
            >
              <ChevronLeft className="h-6 w-6" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              onClick={handleNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-50 h-12 w-12 rounded-full bg-background/80 hover:bg-background"
            >
              <ChevronRight className="h-6 w-6" />
            </Button>
          </>
        )}

        {/* Image container */}
        <div className="flex flex-col items-center justify-center h-full p-8">
          <div className="relative max-w-full max-h-[70vh] flex items-center justify-center">
            <img
              src={currentImage.src}
              alt={currentImage.alt}
              className="max-w-full max-h-[70vh] object-contain rounded-lg shadow-2xl"
            />
          </div>

          {/* Caption */}
          {currentImage.caption && (
            <p className="mt-6 text-center text-muted-foreground max-w-2xl">
              {currentImage.caption}
            </p>
          )}

          {/* Dots indicator */}
          {images.length > 1 && (
            <div className="flex items-center gap-2 mt-6">
              {images.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-2 h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? "bg-primary w-4"
                      : "bg-muted-foreground/50 hover:bg-muted-foreground"
                  }`}
                  aria-label={`Go to image ${index + 1}`}
                />
              ))}
            </div>
          )}

          {/* Counter */}
          <p className="mt-2 text-sm text-muted-foreground">
            {currentIndex + 1} / {images.length}
          </p>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ImageLightbox;
