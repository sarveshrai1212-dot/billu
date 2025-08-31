


import React, { useState, useRef, useEffect } from "react";

export default function BeforeAfterSlider({ before, after, beforeLabel = '', afterLabel = '' }) {
  before = before || "/static-assets/LUT.jpg";
  after = after || "/static-assets/LUTS.jpg";
  const [sliderPosition, setSliderPosition] = useState(50);
  const containerRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleMouseDown = (e) => {
    setIsDragging(true);
    updateSliderPosition(e);
  };
  const handleMouseMove = (e) => {
    if (!isDragging) return;
    updateSliderPosition(e);
  };
  const handleMouseUp = () => {
    setIsDragging(false);
  };
  const updateSliderPosition = (e) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.touches ? e.touches[0].clientX : e.clientX) - rect.left;
    const percentage = Math.max(0, Math.min(100, (x / rect.width) * 100));
    setSliderPosition(percentage);
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleMouseUp);
    }
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleMouseUp);
    };
  }, [isDragging]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'ArrowLeft') {
        setSliderPosition(prev => Math.max(0, prev - 5));
      } else if (e.key === 'ArrowRight') {
        setSliderPosition(prev => Math.min(100, prev + 5));
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Aspect ratio based on image (default 16:9)
  const aspectRatio = 'aspect-[16/9]';

  return (
    <div className={`mx-auto my-8 w-full max-w-5xl ${aspectRatio}`}>
      <div
        ref={containerRef}
  className="relative w-full h-full overflow-hidden cursor-ew-resize bg-black"
        onMouseDown={handleMouseDown}
        onTouchStart={handleMouseDown}
        style={{ userSelect: 'none' }}
      >
        {/* Before Image */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 ${100 - sliderPosition}% 0 0)` }}
        >
          <img
            src={before}
            alt="Before"
            className="w-full h-full object-cover"
            draggable={false}
          />
          {beforeLabel && (
            <span className="absolute left-6 bottom-6 text-white text-lg font-semibold drop-shadow-lg tracking-widest">
              {beforeLabel}
            </span>
          )}
        </div>
        {/* After Image */}
        <div
          className="absolute inset-0"
          style={{ clipPath: `inset(0 0 0 ${sliderPosition}%)` }}
        >
          <img
            src={after}
            alt="After"
            className="w-full h-full object-cover"
            draggable={false}
          />
          {afterLabel && (
            <span className="absolute right-6 bottom-6 text-white text-lg font-semibold drop-shadow-lg tracking-widest text-right">
              {afterLabel}
            </span>
          )}
        </div>
        {/* Slider Line & Handle */}
        <div
          className="absolute top-0 bottom-0"
          style={{ left: `${sliderPosition}%`, zIndex: 10 }}
        >
          <div className="w-[2px] h-full bg-white mx-auto" />
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-white rounded-full flex items-center justify-center shadow-lg border border-gray-300 cursor-ew-resize"
            style={{ zIndex: 11 }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"/></svg>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#888" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 6 15 12 9 18"/></svg>
          </div>
        </div>
      </div>
    </div>
  );
}
