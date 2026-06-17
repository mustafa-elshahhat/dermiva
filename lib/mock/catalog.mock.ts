// Dermiva mock catalog data + pure query helpers.
//
// Ported faithfully from the design handoff (Dermiva.dc.html). Prices are in
// Egyptian Pounds (EGP). Ids, prices, image paths, ratings, review counts and
// category keys are language-independent; user-visible text is Localized<T>.
//
// This module is the temporary stand-in for the future .NET catalog API. The
// api/catalog.service.ts layer reads from here today and will switch to the
// HTTP client later without changing any caller. Client-safe (no `server-only`).

import type { Product, ProductId, CategoryKey } from "@/lib/types/product";
import type { Category, CategoryContent } from "@/lib/types/category";
import type { Faq } from "@/lib/types/faq";

export const PRODUCTS: Product[] = [
  { id: "super-serum", cat: "face", name: { en: "Super Serum", ar: "Super Serum" }, sub: { en: "30 ml", ar: "30 مل" }, price: 550, kind: "serum", tag: "best-seller", rating: "4.9", reviews: 128, packshotImage: "/products/super-serum.webp" },
  { id: "glow-peel-pads", cat: "face", name: { en: "Glow Peel Pads", ar: "Glow Peel Pads" }, sub: { en: "30 Pads", ar: "30 باندة" }, price: 480, kind: "jar", tag: "best-seller", rating: "4.8", reviews: 96, packshotImage: "/products/glow-peel-pads.webp" },
  { id: "vitamin-c-serum", cat: "face", name: { en: "Vitamin C Serum", ar: "Vitamin C Serum" }, sub: { en: "30 ml", ar: "30 مل" }, price: 580, kind: "serum", tag: "", rating: "4.7", reviews: 41, packshotImage: "/products/vitamin-c-serum.webp" },
  { id: "niacinamide", cat: "face", name: { en: "Niacinamide 10%", ar: "Niacinamide 10%" }, sub: { en: "30 ml", ar: "30 مل" }, price: 520, kind: "serum", tag: "", rating: "4.8", reviews: 87, packshotImage: "/products/niacinamide-10.webp" },
  { id: "hair-therapy-oil", cat: "hair", name: { en: "Hair Therapy Oil", ar: "Hair Therapy Oil" }, sub: { en: "100 ml", ar: "100 مل" }, price: 600, kind: "pump", tag: "best-seller", rating: "4.9", reviews: 74, packshotImage: "/products/hair-therapy-oil.webp" },
  { id: "hair-mask", cat: "hair", name: { en: "Hair Mask", ar: "Hair Mask" }, sub: { en: "200 g", ar: "200 جم" }, price: 520, kind: "jar", tag: "", rating: "4.8", reviews: 53, packshotImage: "/products/hair-mask.webp" },
  { id: "repair-shampoo", cat: "hair", name: { en: "Repair Shampoo", ar: "Repair Shampoo" }, sub: { en: "300 ml", ar: "300 مل" }, price: 320, kind: "pump", tag: "", rating: "4.5", reviews: 44, packshotImage: "/products/repair-shampoo.webp" },
  { id: "body-lotion", cat: "body", name: { en: "Nourish Body Lotion", ar: "Nourish Body Lotion" }, sub: { en: "250 ml", ar: "250 مل" }, price: 390, kind: "pump", tag: "", rating: "4.6", reviews: 38, packshotImage: "/products/nourish-body-lotion.webp" },
  { id: "body-scrub", cat: "body", name: { en: "Glow Body Scrub", ar: "Glow Body Scrub" }, sub: { en: "200 g", ar: "200 جم" }, price: 350, kind: "jar", tag: "", rating: "4.7", reviews: 29, packshotImage: "/products/glow-body-scrub.webp" },
  { id: "shea-butter", cat: "body", name: { en: "Shea Body Butter", ar: "Shea Body Butter" }, sub: { en: "150 g", ar: "150 جم" }, price: 410, kind: "jar", tag: "new", rating: "4.9", reviews: 33, packshotImage: "/products/shea-body-butter.webp" },
  { id: "lip-balm", cat: "lip", name: { en: "Lip Balm", ar: "Lip Balm" }, sub: { en: "Strawberry", ar: "فراولة" }, price: 120, kind: "tube", tag: "new", rating: "4.7", reviews: 210, packshotImage: "/products/lip-balm.webp" },
  { id: "lip-oil", cat: "lip", name: { en: "Plumping Lip Oil", ar: "Plumping Lip Oil" }, sub: { en: "10 ml", ar: "10 مل" }, price: 180, kind: "tube", tag: "new", rating: "4.8", reviews: 62, packshotImage: "/products/plumping-lip-oil.webp" },
];

export const CATS: Record<CategoryKey, Category> = {
  face: {
    label: { en: "Face Care", ar: "العناية بالوجه" },
    tagline: { en: "Serums, treatments & glow essentials for radiant skin.", ar: "سيرومات وعلاجات وأساسيات الإشراق لبشرة مشرقة." },
    cardImage: "/category/category-card/face-care-card.webp",
    heroImages: {
      desktop: "/category/category-hero/en/face-care-desktop.webp",
      tablet: "/category/category-hero/en/face-care-tablet.webp",
      mobile: "/category/category-hero/en/face-care-mobile.webp",
    },
    heroImagesRtl: {
      desktop: "/category/category-hero/ar/face-care-desktop.webp",
      tablet: "/category/category-hero/ar/face-care-tablet.webp",
      mobile: "/category/category-hero/ar/face-care-mobile.webp",
    },
  },
  hair: {
    label: { en: "Hair Care", ar: "العناية بالشعر" },
    tagline: { en: "Oils, masks & repair for stronger, shinier hair.", ar: "زيوت وماسكات وإصلاح لشعر أقوى وأكثر لمعانًا." },
    cardImage: "/category/category-card/hair-care-card.webp",
    heroImages: {
      desktop: "/category/category-hero/en/hair-care-desktop.webp",
      tablet: "/category/category-hero/en/hair-care-tablet.webp",
      mobile: "/category/category-hero/en/hair-care-mobile.webp",
    },
    heroImagesRtl: {
      desktop: "/category/category-hero/ar/hair-care-desktop.webp",
      tablet: "/category/category-hero/ar/hair-care-tablet.webp",
      mobile: "/category/category-hero/ar/hair-care-mobile.webp",
    },
  },
  body: {
    label: { en: "Body Care", ar: "العناية بالجسم" },
    tagline: { en: "Lotions, scrubs & butters for soft, nourished skin.", ar: "لوشن ومقشّرات وزبدات لبشرة ناعمة ومغذّاة." },
    cardImage: "/category/category-card/body-care-card.webp",
    heroImages: {
      desktop: "/category/category-hero/en/body-care-desktop.webp",
      tablet: "/category/category-hero/en/body-care-tablet.webp",
      mobile: "/category/category-hero/en/body-care-mobile.webp",
    },
    heroImagesRtl: {
      desktop: "/category/category-hero/ar/body-care-desktop.webp",
      tablet: "/category/category-hero/ar/body-care-tablet.webp",
      mobile: "/category/category-hero/ar/body-care-mobile.webp",
    },
  },
  lip: {
    label: { en: "Lip Care", ar: "العناية بالشفاه" },
    tagline: { en: "Balms & oils for soft, smooth, plump lips.", ar: "بلسم وزيوت لشفاه ناعمة وملساء وممتلئة." },
    cardImage: "/category/category-card/lip-care-card.webp",
    heroImages: {
      desktop: "/category/category-hero/en/lip-care-desktop.webp",
      tablet: "/category/category-hero/en/lip-care-tablet.webp",
      mobile: "/category/category-hero/en/lip-care-mobile.webp",
    },
    heroImagesRtl: {
      desktop: "/category/category-hero/ar/lip-care-desktop.webp",
      tablet: "/category/category-hero/ar/lip-care-tablet.webp",
      mobile: "/category/category-hero/ar/lip-care-mobile.webp",
    },
  },
};

export const CATEGORY_CONTENT: Record<CategoryKey, CategoryContent> = {
  face: {
    desc: {
      en: "A lightweight, fast-absorbing treatment formulated to brighten, smooth and visibly renew your skin with every use.",
      ar: "علاج خفيف سريع الامتصاص مصمم لتفتيح البشرة وتنعيمها وتجديدها بشكل ملحوظ مع كل استخدام.",
    },
    benefits: {
      en: ["Brightens & evens tone", "Boosts hydration", "Smooths texture"],
      ar: ["يفتّح ويوحّد لون البشرة", "يعزّز الترطيب", "ينعّم الملمس"],
    },
    ingredients: {
      en: ["Vitamin C", "Niacinamide", "Hyaluronic Acid", "Alpha Arbutin", "Collagen Peptide"],
      ar: ["فيتامين C", "نياسيناميد", "حمض الهيالورونيك", "ألفا أربوتين", "ببتيد الكولاجين"],
    },
    howto: {
      en: "Apply 3–4 drops to clean skin morning and evening. Follow with moisturizer and SPF during the day.",
      ar: "ضعي 3–4 قطرات على بشرة نظيفة صباحًا ومساءً. اتبعيها بمرطّب وواقٍ من الشمس خلال النهار.",
    },
  },
  hair: {
    desc: {
      en: "Nourishing care that strengthens strands, tames frizz and restores healthy, glossy shine from root to tip.",
      ar: "عناية مغذّية تقوّي الخصلات وتروّض التطاير وتعيد اللمعان الصحي من الجذور حتى الأطراف.",
    },
    benefits: {
      en: ["Strengthens & repairs", "Adds shine", "Reduces frizz"],
      ar: ["يقوّي ويصلح", "يضيف لمعانًا", "يقلّل التطاير"],
    },
    ingredients: {
      en: ["Argan Oil", "Biotin", "Keratin", "Vitamin E", "Rosemary Extract"],
      ar: ["زيت الأرغان", "البيوتين", "الكيراتين", "فيتامين E", "خلاصة إكليل الجبل"],
    },
    howto: {
      en: "Massage through damp or dry hair, focusing on mid-lengths and ends. Use 2–3 times a week.",
      ar: "دلّكيه على الشعر الرطب أو الجاف مع التركيز على الأطوال الوسطى والأطراف. استخدميه 2–3 مرات أسبوعيًا.",
    },
  },
  body: {
    desc: {
      en: "Rich yet breathable body care that deeply nourishes, softens and leaves skin smooth with a subtle glow.",
      ar: "عناية غنية وقابلة للتنفّس بالجسم تغذّي بعمق وتنعّم وتترك البشرة ملساء بإشراقة خفيفة.",
    },
    benefits: {
      en: ["Deeply nourishes", "Softens skin", "Long-lasting comfort"],
      ar: ["يغذّي بعمق", "ينعّم البشرة", "راحة تدوم طويلًا"],
    },
    ingredients: {
      en: ["Shea Butter", "Almond Oil", "Glycerin", "Vitamin E", "Aloe Vera"],
      ar: ["زبدة الشيا", "زيت اللوز", "الجليسرين", "فيتامين E", "الألوة فيرا"],
    },
    howto: {
      en: "Apply generously to clean skin and massage until absorbed. Use daily for best results.",
      ar: "ضعي كمية وفيرة على بشرة نظيفة ودلّكي حتى الامتصاص. استخدميه يوميًا لأفضل النتائج.",
    },
  },
  lip: {
    desc: {
      en: "A silky, conditioning formula that softens, smooths and adds a hint of natural-looking plumpness to lips.",
      ar: "تركيبة حريرية مرطّبة تنعّم وتملّس وتضيف امتلاءً طبيعي المظهر للشفاه.",
    },
    benefits: {
      en: ["Softens & smooths", "Adds subtle plump", "Lasting moisture"],
      ar: ["ينعّم ويملّس", "يضيف امتلاءً خفيفًا", "ترطيب يدوم"],
    },
    ingredients: {
      en: ["Shea Butter", "Jojoba Oil", "Vitamin E", "Peppermint Oil"],
      ar: ["زبدة الشيا", "زيت الجوجوبا", "فيتامين E", "زيت النعناع"],
    },
    howto: {
      en: "Glide over lips as needed throughout the day. Reapply after eating or drinking.",
      ar: "مرّريه على الشفاه حسب الحاجة طوال اليوم. أعيدي وضعه بعد الأكل أو الشرب.",
    },
  },
};

export const FAQS: Faq[] = [
  { q: { en: "How long does delivery take?", ar: "كم يستغرق التوصيل؟" }, a: { en: "2-4 business days within Cairo & Giza, 3-6 days elsewhere in Egypt.", ar: "2-4 أيام عمل داخل القاهرة والجيزة، و3-6 أيام في باقي أنحاء مصر." } },
  { q: { en: "Are products authentic?", ar: "هل المنتجات أصلية؟" }, a: { en: "Yes, 100% genuine Dermiva products, formulated and sealed in Egypt.", ar: "نعم، منتجات Dermiva أصلية 100%، مُصنّعة ومختومة في مصر." } },
  { q: { en: "What is your return policy?", ar: "ما هي سياسة الإرجاع؟" }, a: { en: "Unopened items can be returned within 14 days for a full refund.", ar: "يمكن إرجاع العناصر غير المفتوحة خلال 14 يومًا لاسترداد كامل." } },
];

// ----- pure query helpers (the future API surface) -----

export function getAllProducts(): Product[] {
  return PRODUCTS.slice();
}

export function findProductById(id: ProductId): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

export function getProductsByCategoryKey(cat: CategoryKey): Product[] {
  return PRODUCTS.filter((p) => p.cat === cat);
}

export function getProductCountByCategory(cat: CategoryKey): number {
  return PRODUCTS.reduce((n, p) => (p.cat === cat ? n + 1 : n), 0);
}

/** Best sellers shown on the home page (capped at 4, mirrors the prototype). */
export function getBestSellerProducts(): Product[] {
  const best = PRODUCTS.filter((p) => p.tag === "best-seller");
  const extra = findProductById("niacinamide");
  return (extra ? best.concat(extra) : best).slice(0, 4);
}

/** Related products in the same category, excluding the current one (max 4). */
export function getRelatedProducts(cat: CategoryKey, excludeId: ProductId): Product[] {
  return PRODUCTS.filter((p) => p.cat === cat && p.id !== excludeId).slice(0, 4);
}

/** First product in a category (used for category preview tiles). */
export function getFirstProductInCategory(cat: CategoryKey): Product {
  return PRODUCTS.find((p) => p.cat === cat) ?? PRODUCTS[0];
}

export function getAllCategoryKeys(): CategoryKey[] {
  return Object.keys(CATS) as CategoryKey[];
}
