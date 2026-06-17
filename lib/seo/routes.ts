// Single source of truth for route shapes. Paths are locale-agnostic (leading
// slash, "" for home); the locale prefix is added later via localizedPath().

export const routes = {
  home: () => "",
  shop: () => "/shop",
  category: (cat: string) => `/category/${cat}`,
  product: (id: string) => `/product/${id}`,
  policy: (slug: string) => `/policy/${slug}`,
  about: () => "/about",
  contact: () => "/contact",
  search: () => "/search",
  cart: () => "/cart",
  checkout: () => "/checkout",
  wishlist: () => "/wishlist",
  login: () => "/login",
  register: () => "/register",
  account: () => "/account",
  orders: () => "/account/orders",
  orderDetail: (no: string) => `/account/orders/${no}`,
  addresses: () => "/account/addresses",
} as const;
