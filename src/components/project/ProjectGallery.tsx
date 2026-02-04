import { useState } from "react";
import { ZoomIn } from "lucide-react";
import type { GalleryImage } from "@/data/projectDetails";
import ImageLightbox from "@/components/case-study/ImageLightbox";

interface ProjectGalleryProps {
  images: GalleryImage[];
}

const ProjectGallery = ({ images }: ProjectGalleryProps) => {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const openLightbox = (index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  };

  if (!images || images.length === 0) return null;

  return (
    <>
      <section id="gallery" className="scroll-mt-24">
        <h2 className="text-xl md:text-2xl font-bold text-foreground mb-6 flex items-center gap-3">
          <span className="w-1 h-6 bg-primary rounded-full" />
          Gallery
        </h2>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {images.map((image, index) => (
            <button
              key={index}
              onClick={() => openLightbox(index)}
              className="group relative aspect-video overflow-hidden rounded-lg bg-secondary/30 border border-secondary/50 hover:border-primary/50 transition-all duration-300"
            >
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-background/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                <div className="p-3 rounded-full bg-primary text-primary-foreground">
                  <ZoomIn className="h-5 w-5" />
                </div>
              </div>
              {image.caption && (
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-background/90 to-transparent">
                  <p className="text-sm text-foreground truncate">
                    {image.caption}
                  </p>
                </div>
              )}
            </button>
          ))}
        </div>
      </section>

      <ImageLightbox
        images={images}
        initialIndex={lightboxIndex}
        isOpen={lightboxOpen}
        onClose={() => setLightboxOpen(false)}
      />
    </>
  );
};

export default ProjectGallery;
