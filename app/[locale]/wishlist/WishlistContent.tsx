"use client";

import React from "react";
import { useLocale, useTranslations } from "next-intl";
import ProductImage from "@/components/ProductImage";
import { Link, usePathname, useRouter } from "@/i18n/navigation";
import { buildProductVMs } from "@/lib/view-models/product.vm";
import type { Locale } from "@/i18n/routing";
import { useWishlist } from "@/lib/store";
import { trackEvent } from "@/lib/analytics/analytics";

export default function WishlistContent() {
  const t = useTranslations();
  const locale = useLocale() as Locale;
  const route = usePathname();
  const router = useRouter();
  const { wishlist, toggleWishlist, moveToCart, hydrated } = useWishlist();

  const items = buildProductVMs(wishlist, locale);

  // Hold the layout with skeletons until the saved wishlist hydrates so the
  // empty-state message never flashes for users who actually have saved items.
  if (!hydrated) {
    return (
      <div className="dm-grid-products" aria-busy="true" aria-label={t("wishlist.loading")}>
        {[0, 1, 2].map((i) => (
          <div key={i} className="dm-skeleton" style={{ height: 360, borderRadius: 18 }} />
        ))}
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "70px 20px", background: "#fff", borderRadius: 24, border: "1px solid #f0dde1", maxWidth: 600, margin: "0 auto" }}>
        <div aria-hidden="true" style={{ fontSize: 54, marginBottom: 14 }}>♥</div>
        <h2 className="dm-serif" style={{ fontSize: 28, color: "#5a4145", margin: "0 0 8px" }}>{t("wishlist.emptyTitle")}</h2>
        <p style={{ fontSize: 14.5, color: "#a98e93", margin: "0 0 24px" }}>{t("wishlist.emptyText")}</p>
        <button onClick={() => router.push("/shop")} className="dm-btn-primary" style={{ fontSize: 13, letterSpacing: ".1em", textTransform: "uppercase", padding: "14px 34px" }}>{t("wishlist.exploreProducts")}</button>
      </div>
    );
  }

  return (
    <div className="dm-grid-products">
      {items.map((product) => {
        const name = product.name;
        const tagLabel = product.tag === "best-seller" ? t("common.tagBestSeller") : product.tag === "new" ? t("common.tagNew") : "";
        return (
        <div
          key={product.id}
          className="dm-card"
          style={{ display: "flex", flexDirection: "column", height: "100%" }}
        >
          <div style={{ position: "relative", aspectRatio: "1/1", overflow: "hidden" }}>
            <Link href={product.href} aria-label={name} style={{ display: "block", width: "100%", height: "100%" }}>
              <ProductImage image={product.image} mode="packshot" name={name} kind={product.kind} style={{ objectFit: "cover" }} />
            </Link>
            {tagLabel ? (
              <div style={{ position: "absolute", top: 12, insetInlineStart: 12, background: "linear-gradient(135deg,#d9a24f,#c2974f)", color: "#fff", fontSize: 11, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "5px 11px", borderRadius: 999 }}>
                {tagLabel}
              </div>
            ) : null}
            <button
              type="button"
              aria-label={`${t("wishlist.removeAria")}: ${name}`}
              onClick={() => {
                toggleWishlist(product.id);
                trackEvent("remove_from_wishlist", { locale, route, productId: product.id, categoryKey: product.categoryKey, price: product.price, currency: "EGP" });
              }}
              className="dm-card-wishlist-btn"
            >
              <span aria-hidden="true" style={{ color: "#c97f8d" }}>♥</span>
            </button>
          </div>
          <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", gap: 5, flex: 1 }}>
            <Link
              href={product.href}
              className="dm-serif"
              style={{ fontSize: 20, fontWeight: 600, color: "#4f3a3e", lineHeight: 1.1 }}
            >
              {name}
            </Link>
            <div style={{ fontSize: 12.5, color: "#a98e93" }}>{product.sub}</div>
            <div style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12.5, color: "#b08a4e", marginBottom: 12 }}>
              <span aria-hidden="true" style={{ color: "#d9a24f" }}>{"★"}</span>
              <span style={{ color: "#7c6468", fontWeight: 500 }}>{product.rating}</span>
              <span style={{ color: "#bfa6ab" }}>({product.reviews})</span>
            </div>

            <div style={{ marginTop: "auto", display: "flex", flexDirection: "column", gap: 8 }}>
              <div style={{ fontSize: 15.5, fontWeight: 600, color: "#4f3a3e", letterSpacing: ".01em", marginBottom: 4 }}>
                {product.priceFormatted}
              </div>
              <button
                type="button"
                aria-label={`${t("wishlist.moveToCart")}: ${name}`}
                onClick={() => { moveToCart(product.id); trackEvent("add_to_cart", { locale, route, productId: product.id, categoryKey: product.categoryKey, price: product.price, currency: "EGP", itemCount: 1 }); }}
                className="dm-btn-primary"
                style={{ width: "100%", fontSize: 12.5, fontWeight: 600, letterSpacing: ".06em", textTransform: "uppercase", padding: "13px 0" }}
              >
                {t("wishlist.moveToCart")}
              </button>
              <button
                type="button"
                aria-label={`${t("common.remove")} ${name}`}
                onClick={() => { toggleWishlist(product.id); trackEvent("remove_from_wishlist", { locale, route, productId: product.id, categoryKey: product.categoryKey, price: product.price, currency: "EGP" }); }}
                className="dm-btn-outline"
                style={{ width: "100%", fontSize: 12, fontWeight: 500, letterSpacing: ".06em", textTransform: "uppercase", padding: "12px 0" }}
              >
                {t("common.remove")}
              </button>
            </div>
          </div>
        </div>
        );
      })}
    </div>
  );
}
