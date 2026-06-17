"use client";

import React from "react";
import Link from "next/link";
import { useCartState, useWishlist, useAuth } from "@/lib/store";
import { SearchIcon, AccountIcon, HeartIcon, CartIcon } from "./icons";

function Badge({ count }: { count: number }) {
  if (count <= 0) return null;
  return (
    <span style={{ position: "absolute", top: 4, right: 4, background: "#c07f8d", color: "#fff", fontSize: 10, minWidth: 16, height: 16, borderRadius: 999, display: "flex", alignItems: "center", justifyContent: "center", padding: "0 4px", fontWeight: 600 }}>
      {count}
    </span>
  );
}

export default function HeaderActions() {
  const { cartCount } = useCartState();
  const { wishlist } = useWishlist();
  const { loggedIn, hydrated } = useAuth();

  const accountHref = hydrated && loggedIn ? "/account" : "/login";

  return (
    <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
      <Link href="/search" aria-label="Search" title="Search" className="dm-icon-btn">
        <SearchIcon />
      </Link>
      <Link href={accountHref} aria-label="Account" title="Account" className="dm-icon-btn dm-header-desktop-only">
        <AccountIcon />
      </Link>
      <Link href="/wishlist" aria-label="Wishlist" title="Wishlist" className="dm-icon-btn dm-header-desktop-only">
        <HeartIcon />
        <Badge count={wishlist.length} />
      </Link>
      <Link href="/cart" aria-label="Cart" title="Cart" className="dm-icon-btn">
        <CartIcon />
        <Badge count={cartCount} />
      </Link>
    </div>
  );
}
