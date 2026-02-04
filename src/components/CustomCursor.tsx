import { useEffect, useState } from "react";

const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isPointer, setIsPointer] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const [isClicking, setIsClicking] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
    };

    const updateCursorType = () => {
      const hoveredElement = document.elementFromPoint(position.x, position.y);
      if (hoveredElement) {
        const computedStyle = window.getComputedStyle(hoveredElement);
        setIsPointer(
          computedStyle.cursor === "pointer" ||
          hoveredElement.tagName === "A" ||
          hoveredElement.tagName === "BUTTON" ||
          hoveredElement.closest("a") !== null ||
          hoveredElement.closest("button") !== null ||
          hoveredElement.getAttribute("role") === "button"
        );
      }
    };

    const handleMouseDown = () => setIsClicking(true);
    const handleMouseUp = () => setIsClicking(false);
    const handleMouseLeave = () => setIsHidden(true);
    const handleMouseEnter = () => setIsHidden(false);

    window.addEventListener("mousemove", updatePosition);
    window.addEventListener("mousemove", updateCursorType);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.body.addEventListener("mouseleave", handleMouseLeave);
    document.body.addEventListener("mouseenter", handleMouseEnter);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      window.removeEventListener("mousemove", updateCursorType);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.body.removeEventListener("mouseleave", handleMouseLeave);
      document.body.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [position.x, position.y]);

  if (isHidden) return null;

  return (
    <>
      {/* Main cursor dot - illustrated style */}
      <div
        className="fixed pointer-events-none z-[9999] mix-blend-difference"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
        }}
      >
        {/* Inner dot */}
        <div
          className={`rounded-full bg-primary transition-all duration-150 ease-out ${
            isClicking ? "scale-75" : "scale-100"
          } ${isPointer ? "w-3 h-3" : "w-2 h-2"}`}
        />
      </div>

      {/* Outer ring - follows with delay for illustrated effect */}
      <div
        className="fixed pointer-events-none z-[9998]"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          transition: "left 0.15s ease-out, top 0.15s ease-out, width 0.2s, height 0.2s, border-color 0.2s",
        }}
      >
        <div
          className={`rounded-full border-2 border-primary/60 transition-all duration-200 ease-out ${
            isClicking ? "scale-90 border-primary" : "scale-100"
          } ${isPointer ? "w-10 h-10 border-primary" : "w-8 h-8"}`}
        />
      </div>

      {/* Trailing particles for illustrated effect */}
      <div
        className="fixed pointer-events-none z-[9997]"
        style={{
          left: position.x,
          top: position.y,
          transform: "translate(-50%, -50%)",
          transition: "left 0.25s ease-out, top 0.25s ease-out",
        }}
      >
        <div className="relative">
          <div className="absolute -top-1 -left-4 w-1 h-1 rounded-full bg-primary/40" />
          <div className="absolute -top-3 left-2 w-1.5 h-1.5 rounded-full bg-primary/30" />
          <div className="absolute top-2 -left-3 w-1 h-1 rounded-full bg-primary/20" />
        </div>
      </div>
    </>
  );
};

export default CustomCursor;
