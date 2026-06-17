"use client";

import React from "react";
import { useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { useCartState, useWishlist, useAuth, useHydrated } from "@/lib/store";
import { SearchIcon, AccountIcon, HeartIcon, CartIcon } from "./icons";

function Badge({ count, show }: { count: number; show: boolean }) {
  // Render nothing until persisted state has hydrated so the counter never
  // flashes a stale/zero value before the saved cart & wishlist load.
  if (!show || count <= 0) return null;
  return (
    <span style={{ position: "absolute", top: 4, insetInlineEnd: 4, background: "#c07f8d", color: "#fff", fontSize: 10, minWidth: 16, height: 16, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", fontWeight: 600 }}>
      {count}
    </span>
  );
}

export default function HeaderActions() {
  const t = useTranslations("nav");
  const { cartCount } = useCartState();
  const { wishlist } = useWishlist();
  const { loggedIn } = useAuth();
  const hydrated = useHydrated();

  const accountHref = hydrated && loggedIn ? "/account" : "/login";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Link href="/search" aria-label={t("searchAria")} title={t("searchAria")} className="dm-icon-btn">
        <SearchIcon />
      </Link>
      <Link href={accountHref} aria-label={t("accountAria")} title={t("accountAria")} className="dm-icon-btn dm-header-desktop-only">
        <AccountIcon />
      </Link>
      <Link href="/wishlist" aria-label={t("wishlistAria")} title={t("wishlistAria")} className="dm-icon-btn dm-header-desktop-only">
        <HeartIcon />
        <Badge count={wishlist.length} show={hydrated} />
      </Link>
      <Link href="/cart" aria-label={t("cartAria")} title={t("cartAria")} className="dm-icon-btn">
        <CartIcon />
        <Badge count={cartCount} show={hydrated} />
      </Link>
    </div>
  );
}
