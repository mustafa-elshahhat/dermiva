import React from "react";

// Inline SVG icons ported from the prototype. Stroke uses currentColor so the
// parent's `color` drives them.

type IconProps = { size?: number };

export const SearchIcon = ({ size = 20 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <circle cx="11" cy="11" r="7" />
    <path d="M21 21l-4-4" />
  </svg>
);

export const AccountIcon = ({ size = 20 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c0-4 4-6 8-6s8 2 8 6" />
  </svg>
);

export const HeartIcon = ({ size = 20 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z" />
  </svg>
);

export const CartIcon = ({ size = 20 }: IconProps) => (
  <svg aria-hidden="true" width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.7}>
    <path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z" />
    <path d="M8.5 7V5.5a3.5 3.5 0 0 1 7 0V7" />
  </svg>
);

// Raw SVG strings rendered where a small inline glyph is needed inside content
// tiles (promise / trust / value / account icons).
export const RawIcon = ({ svg }: { svg: string }) => (
  <span aria-hidden="true" style={{ display: "flex", alignItems: "center", justifyContent: "center" }} dangerouslySetInnerHTML={{ __html: svg }} />
);

export const PROMISE_ICONS = {
  cruelty: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/></svg>',
  natural: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M11 21C6 21 4 16 4 11c5 0 9 2 9 9"/><path d="M20 4c0 7-4 11-9 11"/></svg>',
  science: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-8V3"/></svg>',
  egypt: '<svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
};

export const TRUST_ICONS = {
  pay: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="3" y="6" width="18" height="13" rx="2"/><path d="M3 10h18"/></svg>',
  ship: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><rect x="1" y="6" width="14" height="11" rx="1"/><path d="M15 9h4l3 3v5h-7z"/><circle cx="6" cy="18" r="1.6"/><circle cx="18" cy="18" r="1.6"/></svg>',
  auth: '<svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 3l7 3v6c0 4-3 7-7 9-4-2-7-5-7-9V6z"/><path d="M9 12l2 2 4-4"/></svg>',
};

export const ACCOUNT_ICONS = {
  orders: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2h9l4 4v16H6z"/><path d="M9 8h7M9 12h7M9 16h4"/></svg>',
  heart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>',
  pin: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M12 21s7-6 7-11a7 7 0 0 0-14 0c0 5 7 11 7 11z"/><circle cx="12" cy="10" r="2.5"/></svg>',
  cart: '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M5 7h14l-1.2 11.2a2 2 0 0 1-2 1.8H8.2a2 2 0 0 1-2-1.8L5 7z"/></svg>',
};

export const VALUE_ICONS = {
  leaf: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M11 21C6 21 4 16 4 11c5 0 9 2 9 9"/><path d="M20 4c0 7-4 11-9 11"/></svg>',
  flask: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M9 3h6M10 3v6l-5 8a2 2 0 0 0 1.8 3h10.4A2 2 0 0 0 19 17l-5-8V3"/></svg>',
  heart: '<svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.4"><path d="M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.5A4 4 0 0 1 19 11c0 5.5-7 10-7 10z"/></svg>',
};
