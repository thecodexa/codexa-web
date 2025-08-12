import React, { useState, useRef } from "react";

const IlluminatedText = () => {
  const [cursorPos, setCursorPos] = useState({ x: -100, y: -100 });
  const containerRef = useRef(null);

  const handleMouseMove = (e) => {
    const rect = containerRef.current.getBoundingClientRect();
    setCursorPos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const spotlightSize = 80; // radius of spotlight

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={() => setCursorPos({ x: -100, y: -100 })}
      className=" relative w-full  h-screen  select-none flex justify-center"
    >
      <p
        className="m-0 leading-none text-[16vw] font-[750] bg-clip-text text-transparent "
        style={{
          backgroundImage: `
            radial-gradient(
              circle ${spotlightSize}px at ${cursorPos.x}px ${cursorPos.y}px,
              #3b82f6 ,      /* bright blue glow */
              #1e40af 100%,  /* darker blue fade */
              transparent 250%
            )
          `,
          WebkitBackgroundClip: "text",
          backgroundClip: "text",
          transition: "background-position 0.1s",
          userSelect: "none",
        }}
      >
        c o d e X a
      </p>
    </div>
  );
};
export default IlluminatedText;
