import React, { useEffect, useState } from 'react';
import { motion, useSpring } from 'motion/react';

export const CustomCursor: React.FC = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);
  const [hoverText, setHoverText] = useState<string | null>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  // Smooth springs for cursor positioning
  const mouseX = useSpring(-100, { stiffness: 500, damping: 28 });
  const mouseY = useSpring(-100, { stiffness: 500, damping: 28 });
  const ringX = useSpring(-100, { stiffness: 250, damping: 22 });
  const ringY = useSpring(-100, { stiffness: 250, damping: 22 });

  useEffect(() => {
    // Check if device is coarse pointer (touch device)
    if (window.matchMedia('(pointer: coarse)').matches) {
      setIsTouchDevice(true);
      return;
    }

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      ringX.set(e.clientX);
      ringY.set(e.clientY);

      if (!isVisible) setIsVisible(true);

      // Check hovered element
      const target = e.target as HTMLElement | null;
      if (!target) return;

      const interactiveElement = target.closest(
        'a, button, input, select, textarea, [role="button"], .cursor-pointer, [data-cursor]'
      );

      if (interactiveElement) {
        setIsHovered(true);
        const textAttr = interactiveElement.getAttribute('data-cursor');
        setHoverText(textAttr || null);
      } else {
        setIsHovered(false);
        setHoverText(null);
      }
    };

    const handleMouseDown = () => {
      setIsClicked(true);
      setTimeout(() => setIsClicked(false), 200);
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    const handleMouseEnter = () => {
      setIsVisible(true);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mousedown', handleMouseDown);
    document.addEventListener('mouseleave', handleMouseLeave);
    document.addEventListener('mouseenter', handleMouseEnter);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mousedown', handleMouseDown);
      document.removeEventListener('mouseleave', handleMouseLeave);
      document.removeEventListener('mouseenter', handleMouseEnter);
    };
  }, [mouseX, mouseY, ringX, ringY, isVisible]);

  if (isTouchDevice || !isVisible) return null;

  return (
    <div className="pointer-events-none fixed inset-0 z-9999 overflow-hidden">
      {/* Outer Spring Ring */}
      <motion.div
        className="fixed top-0 left-0 rounded-full border border-[#E6004D]/60 bg-[#E6004D]/10 backdrop-blur-[1px] -translate-x-1/2 -translate-y-1/2 flex items-center justify-center font-mono-code text-[10px] font-bold text-white uppercase shadow-lg shadow-[#E6004D]/20 transition-all duration-150"
        style={{
          x: ringX,
          y: ringY,
          width: isHovered ? (hoverText ? 72 : 48) : 28,
          height: isHovered ? (hoverText ? 72 : 48) : 28,
          scale: isClicked ? 0.75 : 1,
          borderColor: isHovered ? '#E6004D' : 'rgba(230, 0, 77, 0.4)',
        }}
      >
        {hoverText && (
          <span className="px-1 text-center truncate tracking-tighter text-[#E6004D] bg-white/90 rounded px-1.5 py-0.5 shadow-xs">
            {hoverText}
          </span>
        )}
      </motion.div>

      {/* Inner Precision Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2.5 h-2.5 bg-[#E6004D] rounded-full -translate-x-1/2 -translate-y-1/2 shadow-xs shadow-[#E6004D]"
        style={{
          x: mouseX,
          y: mouseY,
          scale: isClicked ? 1.8 : isHovered ? 0.5 : 1,
        }}
      />
    </div>
  );
};
