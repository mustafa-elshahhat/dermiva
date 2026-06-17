"use client";

import React, { useState } from "react";
import Bottle from "./Bottle";
import type { BottleKind } from "@/lib/catalog";

// Renders the canonical product image with graceful fallback to the CSS Bottle.
// `image` should come from the catalog resolver (productImage) so every surface
// — detail page, cards, cart, wishlist, checkout — shows the same picture.
// `mode` only tunes the fallback Bottle styling:
//   "cutout"  → light bottle (thumbnails, category/marketing tiles)
//   "packshot" → rich drawn bottle (product detail, hero)

interface ProductImageProps {
  /** Canonical image path from `productImage(product)`. */
  image?: string;
  mode?: "cutout" | "packshot";
  name: string;
  kind: BottleKind;
  /** CSS width/height for the image container. Defaults to 100%. */
  style?: React.CSSProperties;
}

export default function ProductImage({
  image,
  mode = "cutout",
  name,
  kind,
  style,
}: ProductImageProps) {
  const [imgError, setImgError] = useState(false);

  if (!image || imgError) {
    return <Bottle kind={kind} name={name} light={mode === "cutout"} />;
  }

  return (
    <img
      src={image}
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
