"use client";

import React, { useState } from "react";
import Bottle from "./Bottle";
import type { BottleKind } from "@/lib/catalog";

// Renders a product image with graceful fallback to the CSS Bottle.
// mode: "cutout" for transparent product cutouts (cards, grids, thumbnails)
//        "packshot" for rich packshot images (product detail, hero, marketing)

interface ProductImageProps {
  cutoutImage?: string;
  packshotImage?: string;
  mode?: "cutout" | "packshot";
  name: string;
  kind: BottleKind;
  /** CSS width/height for the image container. Defaults to 100%. */
  style?: React.CSSProperties;
}

export default function ProductImage({
  cutoutImage,
  packshotImage,
  mode = "cutout",
  name,
  kind,
  style,
}: ProductImageProps) {
  const [imgError, setImgError] = useState(false);

  const src = mode === "packshot" ? (packshotImage || cutoutImage) : (cutoutImage || packshotImage);

  if (!src || imgError) {
    return <Bottle kind={kind} name={name} light={mode === "cutout"} />;
  }

  return (
    <img
      src={src}
      alt={name}
      onError={() => setImgError(true)}
      style={{
        width: "100%",
        height: "100%",
        objectFit: "contain",
        objectPosition: "center",
        display: "block",
        ...style,
      }}
      loading="lazy"
    />
  );
}
