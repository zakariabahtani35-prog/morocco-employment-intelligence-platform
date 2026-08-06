import React, { useRef, useEffect } from 'react';

interface AutoPlayVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
  src: string;
}

export const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({ src, className, ...props }) => {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Set muted DOM properties explicitly for React hydration & autoplay policy compliance
    video.defaultMuted = true;
    video.muted = true;
    video.playsInline = true;

    const attemptPlay = () => {
      if (video.paused) {
        video.play().catch((err) => {
          console.warn('Autoplay prevented by browser policy:', err);
        });
      }
    };

    attemptPlay();

    video.addEventListener('loadeddata', attemptPlay);
    video.addEventListener('canplay', attemptPlay);

    return () => {
      video.removeEventListener('loadeddata', attemptPlay);
      video.removeEventListener('canplay', attemptPlay);
    };
  }, [src]);

  return (
    <video
      ref={videoRef}
      src={src}
      autoPlay
      loop
      muted
      playsInline
      preload="auto"
      className={className}
      {...props}
    />
  );
};
