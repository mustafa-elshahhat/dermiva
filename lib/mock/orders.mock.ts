// Mock order history + pure query helpers. Stand-in for the future .NET orders
// API. Money is numeric; only `date` carries localized display text.

import type { Order } from "@/lib/types/order";

export const ORDERS: Order[] = [
  { no: "DRM-10482", date: { en: "Jun 2, 2026", ar: "2 يونيو 2026" }, status: "delivered", total: 790, items: [{ id: "super-serum", qty: 1 }, { id: "lip-balm", qty: 2 }] },
  { no: "DRM-10391", date: { en: "May 18, 2026", ar: "18 مايو 2026" }, status: "shipped", total: 600, items: [{ id: "hair-therapy-oil", qty: 1 }] },
];

export function getAllOrders(): Order[] {
  return ORDERS.slice();
}

export function findOrderByNo(no: string): Order | undefined {
  return ORDERS.find((o) => o.no === no);
}
