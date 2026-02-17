
import React from "react";
import { base_path } from "../../environment";

interface ImageWithBasePathProps {
  src: string; // required
  alt: string; // required for accessibility
  className?: string;
  width?: number | string;
  height?: number | string;
  id?: string;
}

const ImageWithBasePath: React.FC<ImageWithBasePathProps> = ({
  src,
  alt,
  className,
  width,
  height,
  id,
}) => {
  // If src already starts with 'http' or '/', don't prepend base_path
  const fullSrc = src.startsWith("http") || src.startsWith("/") ? src : `${base_path}${src}`;

  return <img src={fullSrc} alt={alt} className={className} width={width} height={height} id={id} />;
};

export default ImageWithBasePath;
