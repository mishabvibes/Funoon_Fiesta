import { useRef, useEffect } from "react";
import { gsap } from "gsap";

const CursorAnimation = () => {
  const circles = useRef([]);
  const colors = ["#FF6F61", "#FFD700", "#4CAF50", "#1E90FF"];
  
  // Add check for mobile/touch devices
  const isMobile = () => {
    return window.matchMedia("(max-width: 768px)").matches || 
           'ontouchstart' in window || 
           navigator.maxTouchPoints > 0;
  };

  const moveCircles = (x, y) => {
    if (!circles.current || circles.current.length < 1) return;

    circles.current.forEach((circle, i) => {
      if (circle) { // Check if circle ref exists
        gsap.to(circle, {
          x: x,
          y: y,
          xPercent: -50,
          yPercent: -50,
          delay: i * 0.05,
          ease: "power3.out",
          duration: 0.4,
        });
      }
    });
  };

  useEffect(() => {
    // Don't initialize on mobile
    if (isMobile()) return;

    const handleMouseMove = (e) => {
      moveCircles(e.clientX, e.clientY);
    };

    // Create context for cleanup
    const ctx = gsap.context(() => {
      window.addEventListener("mousemove", handleMouseMove);
    });

    // Cleanup
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      ctx.revert();
    };
  }, []);

  // Don't render on mobile
  if (isMobile()) return null;

  return (
    <div className="pointer-events-none fixed top-0 left-0 z-50">
      {[...Array(4)].map((_, i) => (
        <div
          key={i}
          ref={(ref) => (circles.current[i] = ref)}
          className="circle fixed top-0 left-0 h-8 w-8 rounded-full opacity-60"
          style={{
            backgroundColor: colors[i],
            transform: 'translate(-50%, -50%)',
          }}
        ></div>
      ))}
    </div>
  );
};

export default CursorAnimation;