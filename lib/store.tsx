"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProduct } from "./catalog";

export interface CartItem {
  id: string;
  qty: number;
}

export interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  gov: string;
  isDefault: boolean;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
  addresses: Address[];
  promo: string;
  promoApplied: boolean;
  recent: string[];
  loggedIn: boolean;
  userName: string;
  userEmail: string;
  toast: string;
}

interface CartTotals {
  subtotal: number;
  shipping: number;
  discount: number;
  total: number;
  cartCount: number;
}

interface StoreContextValue extends StoreState, CartTotals {
  hydrated: boolean;
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  toggleWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  setPromo: (v: string) => void;
  applyPromo: () => void;
  showToast: (msg: string) => void;
  login: (email: string, name?: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  addRecent: (term: string) => void;
}

// Initial runtime state must be empty/neutral — no demo cart, wishlist, recent
// searches, or user data. Real values come only from persisted client storage
// after hydration, so nothing fake ever flashes before the saved state loads.
const DEFAULTS: StoreState = {
  cart: [],
  wishlist: [],
  addresses: [],
  promo: "",
  promoApplied: false,
  recent: [],
  loggedIn: false,
  userName: "",
  userEmail: "",
  toast: "",
};

// Bumped to v2: previous builds persisted demo defaults into v1, so returning
// testers would otherwise hydrate stale demo data. v2 starts everyone clean.
const STORAGE_KEY = "dermiva-store-v2";

const StoreContext = createContext<StoreContextValue | null>(null);
const HydrationContext = createContext<boolean>(false);
const CartStateContext = createContext<(CartTotals & { cart: CartItem[]; hydrated: boolean }) | null>(null);
const CartActionsContext = createContext<{
  addToCart: (id: string, qty?: number) => void;
  setQty: (id: string, delta: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
} | null>(null);
const WishlistContext = createContext<{
  wishlist: string[];
  toggleWishlist: (id: string) => void;
  moveToCart: (id: string) => void;
  hydrated: boolean;
} | null>(null);
const AuthContext = createContext<{
  loggedIn: boolean;
  userName: string;
  userEmail: string;
  login: (email: string, name?: string) => void;
  register: (email: string, name: string) => void;
  logout: () => void;
  hydrated: boolean;
} | null>(null);
const AddressesContext = createContext<{
  addresses: Address[];
  setAddresses: (next: Address[]) => void;
  hydrated: boolean;
} | null>(null);
const ToastContext = createContext<{
  toast: string;
  showToast: (msg: string) => void;
} | null>(null);
const SearchContext = createContext<{
  recent: string[];
  addRecent: (term: string) => void;
} | null>(null);
const PromoContext = createContext<{
  promo: string;
  promoApplied: boolean;
  setPromo: (v: string) => void;
  applyPromo: () => void;
} | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage after mount (keeps SSR markup === first client render).
  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        // Merge over DEFAULTS so any newly-added slice (e.g. addresses) stays an
        // array even when older saved blobs predate it.
        setState((s) => ({ ...s, ...saved, toast: "" }));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist the durable slices (not the transient toast).
  useEffect(() => {
    if (!hydrated || typeof window === "undefined") return;
    try {
      const { toast, ...persist } = state;
      void toast;
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(persist));
    } catch {
      /* storage may be unavailable */
    }
  }, [state, hydrated]);

  useEffect(() => () => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
  }, []);

  const showToast = useCallback((msg: string) => {
    setState((s) => ({ ...s, toast: msg }));
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => {
      setState((s) => ({ ...s, toast: "" }));
    }, 1900);
  }, []);

  const addToCart = useCallback(
    (id: string, qty = 1) => {
      setState((s) => {
        const cart = s.cart.slice();
        const ex = cart.find((c) => c.id === id);
        if (ex) cart[cart.indexOf(ex)] = { ...ex, qty: ex.qty + qty };
        else cart.push({ id, qty });
        return { ...s, cart };
      });
      showToast("addedToCart");
    },
    [showToast]
  );

  const setQty = useCallback((id: string, delta: number) => {
    setState((s) => ({
      ...s,
      cart: s.cart.map((c) => (c.id === id ? { ...c, qty: Math.max(1, c.qty + delta) } : c)),
    }));
  }, []);

  const removeFromCart = useCallback((id: string) => {
    setState((s) => ({ ...s, cart: s.cart.filter((c) => c.id !== id) }));
  }, []);

  const clearCart = useCallback(() => {
    setState((s) => ({ ...s, cart: [], promo: "", promoApplied: false }));
  }, []);

  const toggleWishlist = useCallback(
    (id: string) => {
      setState((s) => {
        const has = s.wishlist.includes(id);
        showToast(has ? "removedFromWishlist" : "addedToWishlist");
        return { ...s, wishlist: has ? s.wishlist.filter((x) => x !== id) : s.wishlist.concat(id) };
      });
    },
    [showToast]
  );

  const moveToCart = useCallback(
    (id: string) => {
      addToCart(id);
      setState((s) => ({ ...s, wishlist: s.wishlist.filter((x) => x !== id) }));
    },
    [addToCart]
  );

  const setAddresses = useCallback((next: Address[]) => {
    setState((s) => ({ ...s, addresses: next }));
  }, []);

  const setPromo = useCallback((v: string) => {
    setState((s) => ({ ...s, promo: v }));
  }, []);

  const applyPromo = useCallback(() => {
    setState((s) => {
      if (s.promo.trim().toUpperCase() === "GLOW10") {
        showToast("promoApplied");
        return { ...s, promoApplied: true };
      }
      showToast("promoInvalid");
      return { ...s, promoApplied: false };
    });
  }, [showToast]);

  const login = useCallback(
    (email: string, name?: string) => {
      setState((s) => ({ ...s, loggedIn: true, userEmail: email, userName: name ?? s.userName }));
      showToast("welcomeBack");
    },
    [showToast]
  );

  const register = useCallback(
    (email: string, name: string) => {
      setState((s) => ({ ...s, loggedIn: true, userEmail: email, userName: name }));
      showToast("accountCreated");
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setState((s) => ({ ...s, loggedIn: false }));
    showToast("signedOut");
  }, [showToast]);

  const addRecent = useCallback((term: string) => {
    const t = term.trim();
    if (!t) return;
    setState((s) => ({ ...s, recent: [t, ...s.recent.filter((r) => r.toLowerCase() !== t.toLowerCase())].slice(0, 6) }));
  }, []);

  const totals = useMemo<CartTotals>(() => {
    const subtotal = state.cart.reduce((sum, c) => {
      const p = getProduct(c.id);
      return sum + (p ? p.price * c.qty : 0);
    }, 0);
    const shipping = subtotal === 0 ? 0 : subtotal >= 500 ? 0 : 40;
    const discount = state.promoApplied ? Math.round(subtotal * 0.1) : 0;
    const total = subtotal + shipping - discount;
    const cartCount = state.cart.reduce((sum, c) => sum + c.qty, 0);
    return { subtotal, shipping, discount, total, cartCount };
  }, [state.cart, state.promoApplied]);

  const cartStateValue = useMemo(() => ({
    ...totals,
    cart: state.cart,
    hydrated,
  }), [totals, state.cart, hydrated]);

  const cartActionsValue = useMemo(() => ({
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
  }), [addToCart, setQty, removeFromCart, clearCart]);

  const wishlistValue = useMemo(() => ({
    wishlist: state.wishlist,
    toggleWishlist,
    moveToCart,
    hydrated,
  }), [state.wishlist, toggleWishlist, moveToCart, hydrated]);

  const authValue = useMemo(() => ({
    loggedIn: state.loggedIn,
    userName: state.userName,
    userEmail: state.userEmail,
    login,
    register,
    logout,
    hydrated,
  }), [state.loggedIn, state.userName, state.userEmail, login, register, logout, hydrated]);

  const addressesValue = useMemo(() => ({
    addresses: state.addresses,
    setAddresses,
    hydrated,
  }), [state.addresses, setAddresses, hydrated]);

  const toastValue = useMemo(() => ({
    toast: state.toast,
    showToast,
  }), [state.toast, showToast]);

  const searchValue = useMemo(() => ({
    recent: state.recent,
    addRecent,
  }), [state.recent, addRecent]);

  const promoValue = useMemo(() => ({
    promo: state.promo,
    promoApplied: state.promoApplied,
    setPromo,
    applyPromo,
  }), [state.promo, state.promoApplied, setPromo, applyPromo]);

  const legacyStoreValue = useMemo<StoreContextValue>(() => ({
    ...state,
    ...totals,
    hydrated,
    addToCart,
    setQty,
    removeFromCart,
    clearCart,
    toggleWishlist,
    moveToCart,
    setPromo,
    applyPromo,
    showToast,
    login,
    register,
    logout,
    addRecent,
  }), [state, totals, hydrated, addToCart, setQty, removeFromCart, clearCart, toggleWishlist, moveToCart, setPromo, applyPromo, showToast, login, register, logout, addRecent]);

  return (
    <HydrationContext.Provider value={hydrated}>
      <CartStateContext.Provider value={cartStateValue}>
        <CartActionsContext.Provider value={cartActionsValue}>
          <WishlistContext.Provider value={wishlistValue}>
            <AuthContext.Provider value={authValue}>
              <AddressesContext.Provider value={addressesValue}>
                <ToastContext.Provider value={toastValue}>
                  <SearchContext.Provider value={searchValue}>
                    <PromoContext.Provider value={promoValue}>
                      <StoreContext.Provider value={legacyStoreValue}>
                        {children}
                      </StoreContext.Provider>
                    </PromoContext.Provider>
                  </SearchContext.Provider>
                </ToastContext.Provider>
              </AddressesContext.Provider>
            </AuthContext.Provider>
          </WishlistContext.Provider>
        </CartActionsContext.Provider>
      </CartStateContext.Provider>
    </HydrationContext.Provider>
  );
}

/**
 * Reusable hydration flag. Returns false during SSR and the first client render,
 * then true once persisted client state has loaded. Gate any UI that depends on
 * user/cart/wishlist state behind this so demo/empty values never flash.
 */
export function useHydrated() {
  return useContext(HydrationContext);
}

export function useAddresses() {
  const ctx = useContext(AddressesContext);
  if (!ctx) throw new Error("useAddresses must be used within StoreProvider");
  return ctx;
}

export function useCartState() {
  const ctx = useContext(CartStateContext);
  if (!ctx) throw new Error("useCartState must be used within StoreProvider");
  return ctx;
}

export function useCartActions() {
  const ctx = useContext(CartActionsContext);
  if (!ctx) throw new Error("useCartActions must be used within StoreProvider");
  return ctx;
}

export function useWishlist() {
  const ctx = useContext(WishlistContext);
  if (!ctx) throw new Error("useWishlist must be used within StoreProvider");
  return ctx;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within StoreProvider");
  return ctx;
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error("useToast must be used within StoreProvider");
  return ctx;
}

export function useSearch() {
  const ctx = useContext(SearchContext);
  if (!ctx) throw new Error("useSearch must be used within StoreProvider");
  return ctx;
}

export function usePromo() {
  const ctx = useContext(PromoContext);
  if (!ctx) throw new Error("usePromo must be used within StoreProvider");
  return ctx;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
