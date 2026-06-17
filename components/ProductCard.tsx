"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductImage from "./ProductImage";
import { Link, usePathname } from "@/i18n/navigation";
import type { ProductViewModel } from "@/lib/types/product";
import { useWishlist, useCartActions } from "@/lib/store";
import { trackEvent } from "@/lib/analytics/analytics";

// Ported from ProductCard.dc.html. Whole card opens the product; the heart and
// the + button act without opening (stopPropagation), matching the prototype.
// Receives a locale-resolved view model — badge/aria labels remain UI strings
// resolved via next-intl off the stable `tag`.

export default function ProductCard({
  product,
  tracking,
}: {
  product: ProductViewModel;
  tracking?: { clickEventName: "search_result_click"; queryLength: number };
}) {
  const t = useTranslations();
  const locale = useLocale();
  const route = usePathname();
  const { wishlist, toggleWishlist } = useWishlist();
  const { addToCart } = useCartActions();
  const wished = wishlist.includes(product.id);

  const tagLabel = product.tag === "best-seller" ? t("common.tagBestSeller") : product.tag === "new" ? t("common.tagNew") : "";
  const productPayload = {
    locale,
    route,
    productId: product.id,
    categoryKey: product.categoryKey,
    price: product.price,
    currency: "EGP" as const,
  };

  const trackProductClick = () => {
    if (tracking?.clickEventName === "search_result_click") {
      trackEvent("search_result_click", { ...productPayload, queryLength: tracking.queryLength });
      return;
    }
    trackEvent("product_click", productPayload);
  };

  return (
    <article
      className="dm-card"
      style={{ display: "flex", flexDirection: "column", height: "100%" }}
    >
      <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
        <Link href={product.href} onClick={trackProductClick} aria-label={product.name} style={{ display: "block", width: "100%", height: "100%" }}>
          <ProductImage
            image={product.image}
            mode="packshot"
            name={product.name}
            kind={product.kind}
            style={{ objectFit: "cover" }}
          />
        </Link>
        {tagLabel ? (
          <div style={{ position: "absolute", top: 12, insetInlineStart: 12, background: "linear-gradient(135deg,#d9a24f,#c2974f)", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999, boxShadow: "0 4px 10px rgba(194,151,79,.3)" }}>
            {tagLabel}
          </div>
        ) : null}
        <button
          type="button"
          aria-label={`${wished ? t("product.removeFromWishlist") : t("product.addToWishlist")}: ${product.name}`}
          onClick={() => {
            toggleWishlist(product.id);
            trackEvent(wished ? "remove_from_wishlist" : "add_to_wishlist", productPayload);
          }}
          className="dm-card-wishlist-btn"
        >
          <span aria-hidden="true" style={{ color: wished ? "#c97f8d" : "#c9a7ad" }}>{wished ? "♥" : "♡"}</span>
        </button>
      </div>
      <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
        <Link href={product.href} onClick={trackProductClick} className="dm-serif" style={{ fontSize: 20, fontWeight: 600, color: "#4f3a3e", lineHeight: 1.1 }}>{product.name}</Link>
        <div style={{ fontSize: 12.5, color: "#a98e93" }}>{product.sub}</div>
        <div aria-label={`${product.rating} rating, ${product.reviews} reviews`} style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#b08a4e" }}>
          <span aria-hidden="true" style={{ color: "#d9a24f" }}>{"★"}</span>
          <span style={{ color: "#7c6468", fontWeight: 500 }}>{product.rating}</span>
          <span style={{ color: "#bfa6ab" }}>({product.reviews})</span>
        </div>
        <div style={{ marginTop: "auto", paddingTop: 8, display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
          <div style={{ fontSize: 15.5, fontWeight: 600, color: "#4f3a3e", letterSpacing: ".01em" }}>{product.priceFormatted}</div>
          <button
            type="button"
            aria-label={`${t("product.addToCartAria")}: ${product.name}`}
            className="dm-add-btn"
            onClick={() => {
              addToCart(product.id);
              trackEvent("add_to_cart", { ...productPayload, itemCount: 1 });
            }}
          >
            <span aria-hidden="true">{"+"}</span>
          </button>
        </div>
      </div>
    </article>
  );
}
