// Dermiva catalog + static content. Ported faithfully from the design handoff
// (Dermiva.dc.html). Prices are in Egyptian Pounds (EGP).

export type BottleKind = "serum" | "jar" | "tube" | "pump";
export type CategoryKey = "face" | "hair" | "body" | "lip";

export interface Product {
  id: string;
  cat: CategoryKey;
  name: string;
  sub: string;
  price: number;
  kind: BottleKind;
  tag: string;
  rating: string;
  reviews: number;
}

export const PRODUCTS: Product[] = [
  { id: "super-serum", cat: "face", name: "Super Serum", sub: "30 ml", price: 550, kind: "serum", tag: "Best Seller", rating: "4.9", reviews: 128 },
  { id: "glow-peel-pads", cat: "face", name: "Glow Peel Pads", sub: "30 Pads", price: 480, kind: "jar", tag: "Best Seller", rating: "4.8", reviews: 96 },
  { id: "vitamin-c-serum", cat: "face", name: "Vitamin C Serum", sub: "30 ml", price: 580, kind: "serum", tag: "", rating: "4.7", reviews: 41 },
  { id: "niacinamide", cat: "face", name: "Niacinamide 10%", sub: "30 ml", price: 520, kind: "serum", tag: "", rating: "4.8", reviews: 87 },
  { id: "hair-therapy-oil", cat: "hair", name: "Hair Therapy Oil", sub: "100 ml", price: 600, kind: "pump", tag: "Best Seller", rating: "4.9", reviews: 74 },
  { id: "hair-mask", cat: "hair", name: "Hair Mask", sub: "200 g", price: 520, kind: "jar", tag: "", rating: "4.8", reviews: 53 },
  { id: "repair-shampoo", cat: "hair", name: "Repair Shampoo", sub: "300 ml", price: 320, kind: "pump", tag: "", rating: "4.5", reviews: 44 },
  { id: "body-lotion", cat: "body", name: "Nourish Body Lotion", sub: "250 ml", price: 390, kind: "pump", tag: "", rating: "4.6", reviews: 38 },
  { id: "body-scrub", cat: "body", name: "Glow Body Scrub", sub: "200 g", price: 350, kind: "jar", tag: "", rating: "4.7", reviews: 29 },
  { id: "shea-butter", cat: "body", name: "Shea Body Butter", sub: "150 g", price: 410, kind: "jar", tag: "New", rating: "4.9", reviews: 33 },
  { id: "lip-balm", cat: "lip", name: "Lip Balm", sub: "Strawberry", price: 120, kind: "tube", tag: "New", rating: "4.7", reviews: 210 },
  { id: "lip-oil", cat: "lip", name: "Plumping Lip Oil", sub: "10 ml", price: 180, kind: "tube", tag: "New", rating: "4.8", reviews: 62 },
];

export interface CategoryInfo {
  label: string;
  tagline: string;
}

export const CATS: Record<CategoryKey, CategoryInfo> = {
  face: { label: "Face Care", tagline: "Serums, treatments & glow essentials for radiant skin." },
  hair: { label: "Hair Care", tagline: "Oils, masks & repair for stronger, shinier hair." },
  body: { label: "Body Care", tagline: "Lotions, scrubs & butters for soft, nourished skin." },
  lip: { label: "Lip Care", tagline: "Balms & oils for soft, smooth, plump lips." },
};

export const CAT_KIND: Record<CategoryKey, BottleKind> = {
  face: "serum",
  hair: "pump",
  body: "jar",
  lip: "tube",
};

export interface CategoryContent {
  desc: string;
  benefits: string[];
  ingredients: string[];
  howto: string;
}

export const CONTENT: Record<CategoryKey, CategoryContent> = {
  face: {
    desc: "A lightweight, fast-absorbing treatment formulated to brighten, smooth and visibly renew your skin with every use.",
    benefits: ["Brightens & evens tone", "Boosts hydration", "Smooths texture"],
    ingredients: ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Alpha Arbutin", "Collagen Peptide"],
    howto: "Apply 3–4 drops to clean skin morning and evening. Follow with moisturizer and SPF during the day.",
  },
  hair: {
    desc: "Nourishing care that strengthens strands, tames frizz and restores healthy, glossy shine from root to tip.",
    benefits: ["Strengthens & repairs", "Adds shine", "Reduces frizz"],
    ingredients: ["Argan Oil", "Biotin", "Keratin", "Vitamin E", "Rosemary Extract"],
    howto: "Massage through damp or dry hair, focusing on mid-lengths and ends. Use 2–3 times a week.",
  },
  body: {
    desc: "Rich yet breathable body care that deeply nourishes, softens and leaves skin smooth with a subtle glow.",
    benefits: ["Deeply nourishes", "Softens skin", "Long-lasting comfort"],
    ingredients: ["Shea Butter", "Almond Oil", "Glycerin", "Vitamin E", "Aloe Vera"],
    howto: "Apply generously to clean skin and massage until absorbed. Use daily for best results.",
  },
  lip: {
    desc: "A silky, conditioning formula that softens, smooths and adds a hint of natural-looking plumpness to lips.",
    benefits: ["Softens & smooths", "Adds subtle plump", "Lasting moisture"],
    ingredients: ["Shea Butter", "Jojoba Oil", "Vitamin E", "Peppermint Oil"],
    howto: "Glide over lips as needed throughout the day. Reapply after eating or drinking.",
  },
};

export interface Order {
  no: string;
  date: string;
  status: "Delivered" | "Shipped" | "Processing";
  total: number;
  items: { id: string; qty: number }[];
}

export const ORDERS: Order[] = [
  { no: "DRM-10482", date: "Jun 2, 2026", status: "Delivered", total: 790, items: [{ id: "super-serum", qty: 1 }, { id: "lip-balm", qty: 2 }] },
  { no: "DRM-10391", date: "May 18, 2026", status: "Shipped", total: 600, items: [{ id: "hair-therapy-oil", qty: 1 }] },
];

export type PolicyKey = "shipping" | "returns" | "privacy" | "terms";

export interface Policy {
  title: string;
  intro: string;
  sections: { h: string; b: string }[];
}

export const POLICIES: Record<PolicyKey, Policy> = {
  shipping: {
    title: "Shipping Policy",
    intro: "We deliver across Egypt with care and speed.",
    sections: [
      { h: "Delivery Time", b: "Orders are processed within 1-2 business days. Delivery takes 2-4 business days within Cairo & Giza, and 3-6 business days for other governorates." },
      { h: "Shipping Fees", b: "A flat EGP 40 shipping fee applies. Enjoy FREE shipping on all orders over EGP 500." },
      { h: "Order Tracking", b: "Once shipped, you will receive an SMS with your tracking details to follow your order to your door." },
    ],
  },
  returns: {
    title: "Returns & Refunds",
    intro: "Your satisfaction is our priority.",
    sections: [
      { h: "Return Window", b: "Unopened products may be returned within 14 days of delivery for a full refund or exchange." },
      { h: "How to Return", b: "Contact us via WhatsApp or email with your order number and reason. We will arrange a pickup." },
      { h: "Refunds", b: "Approved refunds are processed within 5-7 business days to your original payment method." },
    ],
  },
  privacy: {
    title: "Privacy Policy",
    intro: "We respect and protect your personal data.",
    sections: [
      { h: "Information We Collect", b: "We collect your name, contact details and order information solely to fulfil your orders and improve your experience." },
      { h: "How We Use It", b: "Your data is used for order processing, delivery and, with your consent, marketing communications. We never sell your data." },
      { h: "Your Rights", b: "You may request access to, correction of, or deletion of your personal data at any time by contacting us." },
    ],
  },
  terms: {
    title: "Terms & Conditions",
    intro: "The terms governing your use of Dermiva.",
    sections: [
      { h: "Use of Site", b: "By using this website you agree to provide accurate information and to use the site for lawful purposes only." },
      { h: "Pricing", b: "All prices are in Egyptian Pounds (EGP) and include applicable taxes. Prices may change without prior notice." },
      { h: "Products", b: "Dermiva products are cosmetic. Always patch-test and discontinue use if irritation occurs." },
    ],
  },
};


export const SORT_OPTIONS = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Top Rated" },
  { value: "name", label: "Name A-Z" },
];

export const FAQS = [
  { q: "How long does delivery take?", a: "2-4 business days within Cairo & Giza, 3-6 days elsewhere in Egypt." },
  { q: "Are products authentic?", a: "Yes, 100% genuine Dermiva products, formulated and sealed in Egypt." },
  { q: "What is your return policy?", a: "Unopened items can be returned within 14 days for a full refund." },
];

// ----- helpers -----

export function money(n: number): string {
  return "EGP " + Number(n).toFixed(2);
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function bestSellers(): Product[] {
  const best = PRODUCTS.filter((p) => p.tag === "Best Seller");
  const extra = getProduct("niacinamide");
  return (extra ? best.concat(extra) : best).slice(0, 4);
}

export interface FilterState {
  sort: string;
  max: number;
  query: string;
}

export function filteredList(catFilter: CategoryKey | null, f: FilterState): Product[] {
  let list = PRODUCTS.slice();
  if (catFilter) list = list.filter((p) => p.cat === catFilter);
  if (f.query && f.query.trim()) {
    const q = f.query.trim().toLowerCase();
    list = list.filter((p) => (p.name + " " + p.cat + " " + p.sub).toLowerCase().includes(q));
  }
  list = list.filter((p) => p.price <= f.max);
  if (f.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (f.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (f.sort === "rating") list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  else if (f.sort === "name") list.sort((a, b) => a.name.localeCompare(b.name));
  return list;
}

export function searchProducts(query: string): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => (p.name + " " + p.cat + " " + p.sub).toLowerCase().includes(q));
}

export function galleryKinds(kind: BottleKind): BottleKind[] {
  return [kind, kind === "serum" ? "pump" : "serum", kind === "jar" ? "tube" : "jar"];
}
