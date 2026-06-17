"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from "react";
import { getProduct } from "./catalog";

export interface CartItem {
  id: string;
  qty: number;
}

interface StoreState {
  cart: CartItem[];
  wishlist: string[];
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

const DEFAULTS: StoreState = {
  cart: [
    { id: "super-serum", qty: 1 },
    { id: "lip-balm", qty: 2 },
  ],
  wishlist: ["hair-therapy-oil"],
  promo: "",
  promoApplied: false,
  recent: ["Vitamin C", "Lip Balm", "Hair Oil"],
  loggedIn: false,
  userName: "",
  userEmail: "",
  toast: "",
};

const STORAGE_KEY = "dermiva-store-v1";

const StoreContext = createContext<StoreContextValue | null>(null);

export function StoreProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState<StoreState>(DEFAULTS);
  const [hydrated, setHydrated] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Hydrate from localStorage after mount (keeps SSR markup === first client render).
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const saved = JSON.parse(raw);
        setState((s) => ({ ...s, ...saved, toast: "" }));
      }
    } catch {
      /* ignore corrupt storage */
    }
    setHydrated(true);
  }, []);

  // Persist the durable slices (not the transient toast).
  useEffect(() => {
    if (!hydrated) return;
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
      showToast("Added to cart");
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
        showToast(has ? "Removed from wishlist" : "Added to wishlist");
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

  const setPromo = useCallback((v: string) => {
    setState((s) => ({ ...s, promo: v }));
  }, []);

  const applyPromo = useCallback(() => {
    setState((s) => {
      if (s.promo.trim().toUpperCase() === "GLOW10") {
        showToast("Promo applied: 10% off");
        return { ...s, promoApplied: true };
      }
      showToast("Invalid promo code");
      return { ...s, promoApplied: false };
    });
  }, [showToast]);

  const login = useCallback(
    (email: string, name?: string) => {
      setState((s) => ({ ...s, loggedIn: true, userEmail: email, userName: name ?? s.userName }));
      showToast("Welcome back!");
    },
    [showToast]
  );

  const register = useCallback(
    (email: string, name: string) => {
      setState((s) => ({ ...s, loggedIn: true, userEmail: email, userName: name }));
      showToast("Account created!");
    },
    [showToast]
  );

  const logout = useCallback(() => {
    setState((s) => ({ ...s, loggedIn: false }));
    showToast("Signed out");
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

  const value: StoreContextValue = {
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
  };

  return <StoreContext.Provider value={value}>{children}</StoreContext.Provider>;
}

export function useStore(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) throw new Error("useStore must be used within StoreProvider");
  return ctx;
}
