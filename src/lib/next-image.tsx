import React from "react";

export interface ImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  priority?: boolean;
  fill?: boolean;
}

const Image = React.forwardRef<HTMLImageElement, ImageProps>(
  ({ src, alt, width, height, priority, fill, className, style, ...props }, ref) => {
    return (
      <img
        ref={ref}
        src={src}
        alt={alt}
        width={width}
        height={height}
        className={className}
        style={{
          ...(fill ? { width: "100%", height: "100%", objectFit: "cover" } : {}),
          ...style,
        }}
        {...props}
      />
    );
  }
);

Image.displayName = "Image";

export default Image;
