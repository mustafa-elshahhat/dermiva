import React from "react";
import Image from "next/image";

// Single source of truth for the Dermiva brand logo: the original golden
// female-profile mark with the DERMIVA wordmark. Every site-identity placement
// (header, mobile menu, footer) renders this component so the logo stays
// consistent everywhere. The asset already includes the wordmark — do not pair
// it with separate "DERMIVA" text.
const LOGO_SRC = "/brand/dermiva-logo.webp";
const INTRINSIC_WIDTH = 512;
const INTRINSIC_HEIGHT = 493;
const ASPECT = INTRINSIC_WIDTH / INTRINSIC_HEIGHT;

export default function BrandLogo({
  height = 48,
  priority = false,
  className,
}: {
  height?: number;
  priority?: boolean;
  className?: string;
}) {
  const width = Math.round(height * ASPECT);
  return (
    <Image
      src={LOGO_SRC}
      alt="Dermiva"
      width={width}
      height={height}
      priority={priority}
      className={className}
      // contain + auto width preserves the aspect ratio so the logo never
      // stretches, crops, or blurs; transparent background is kept.
      style={{ height, width: "auto", objectFit: "contain", display: "block" }}
    />
  );
}
