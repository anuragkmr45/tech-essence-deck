import { useState } from "react";
import illustrationImg from "@/assets/anurag-illustration.png";
import photoImg from "@/assets/anurag-photo.png";

const FlipCard = () => {
  const [isFlipped, setIsFlipped] = useState(false);

  return (
    <div
      className="relative w-32 h-32 cursor-pointer perspective-1000 group"
      onClick={() => setIsFlipped(!isFlipped)}
      role="button"
      aria-label="Click to flip between illustration and photo"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          setIsFlipped(!isFlipped);
        }
      }}
    >
      <div
        className={`relative w-full h-full transition-transform duration-700 transform-style-3d ${
          isFlipped ? "rotate-y-180" : ""
        }`}
      >
        {/* Front - Illustration */}
        <div className="absolute w-full h-full backface-hidden rounded-full overflow-hidden border-2 border-primary/50 shadow-lg shadow-primary/20 group-hover:border-primary group-hover:shadow-primary/40 transition-all duration-300">
          <img
            src={illustrationImg}
            alt="Anurag Kumar - Illustration"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>

        {/* Back - Real Photo */}
        <div className="absolute w-full h-full backface-hidden rotate-y-180 rounded-full overflow-hidden border-2 border-primary shadow-lg shadow-primary/30">
          <img
            src={photoImg}
            alt="Anurag Kumar - Photo"
            className="w-full h-full object-cover"
          />
        </div>
      </div>

      {/* Hint text */}
      <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
        {isFlipped ? "Click to flip back" : "Click me!"}
      </span>
    </div>
  );
};

export default FlipCard;
