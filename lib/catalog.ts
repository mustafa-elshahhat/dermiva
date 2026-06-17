// Dermiva catalog + static content. Ported faithfully from the design handoff
// (Dermiva.dc.html). Prices are in Egyptian Pounds (EGP).
//
// Bilingual model: ids, prices, image paths, ratings, review counts and category
// keys are language-independent. User-visible text is stored as Localized<T>
// ({ en, ar }) so we never duplicate business data per locale. Resolve text with
// the localize()/getXText() helpers below.

import type { Locale } from "@/i18n/routing";

export type BottleKind = "serum" | "jar" | "tube" | "pump";
export type CategoryKey = "face" | "hair" | "body" | "lip";

/** A value with one variant per supported locale. */
export type Localized<T> = Record<Locale, T>;

/** Stable, language-independent product badge key ("" means no badge). */
export type ProductTag = "" | "best-seller" | "new";

export interface Product {
  id: string;
  cat: CategoryKey;
  name: Localized<string>;
  sub: Localized<string>;
  price: number;
  kind: BottleKind;
  tag: ProductTag;
  rating: string;
  reviews: number;
  /** Canonical main product image (packshot). Single source of truth used by
   *  the product detail page, cards, cart, wishlist and checkout. */
  packshotImage: string;
}

export const PRODUCTS: Product[] = [
  { id: "super-serum", cat: "face", name: { en: "Super Serum", ar: "سوبر سيروم" }, sub: { en: "30 ml", ar: "30 مل" }, price: 550, kind: "serum", tag: "best-seller", rating: "4.9", reviews: 128, packshotImage: "/products/super-serum.webp" },
  { id: "glow-peel-pads", cat: "face", name: { en: "Glow Peel Pads", ar: "باندات التقشير المضيئة" }, sub: { en: "30 Pads", ar: "30 باندة" }, price: 480, kind: "jar", tag: "best-seller", rating: "4.8", reviews: 96, packshotImage: "/products/glow-peel-pads.webp" },
  { id: "vitamin-c-serum", cat: "face", name: { en: "Vitamin C Serum", ar: "سيروم فيتامين C" }, sub: { en: "30 ml", ar: "30 مل" }, price: 580, kind: "serum", tag: "", rating: "4.7", reviews: 41, packshotImage: "/products/vitamin-c-serum.webp" },
  { id: "niacinamide", cat: "face", name: { en: "Niacinamide 10%", ar: "نياسيناميد 10%" }, sub: { en: "30 ml", ar: "30 مل" }, price: 520, kind: "serum", tag: "", rating: "4.8", reviews: 87, packshotImage: "/products/niacinamide-10.webp" },
  { id: "hair-therapy-oil", cat: "hair", name: { en: "Hair Therapy Oil", ar: "زيت علاج الشعر" }, sub: { en: "100 ml", ar: "100 مل" }, price: 600, kind: "pump", tag: "best-seller", rating: "4.9", reviews: 74, packshotImage: "/products/hair-therapy-oil.webp" },
  { id: "hair-mask", cat: "hair", name: { en: "Hair Mask", ar: "ماسك الشعر" }, sub: { en: "200 g", ar: "200 جم" }, price: 520, kind: "jar", tag: "", rating: "4.8", reviews: 53, packshotImage: "/products/hair-mask.webp" },
  { id: "repair-shampoo", cat: "hair", name: { en: "Repair Shampoo", ar: "شامبو الإصلاح" }, sub: { en: "300 ml", ar: "300 مل" }, price: 320, kind: "pump", tag: "", rating: "4.5", reviews: 44, packshotImage: "/products/repair-shampoo.webp" },
  { id: "body-lotion", cat: "body", name: { en: "Nourish Body Lotion", ar: "لوشن الجسم المغذّي" }, sub: { en: "250 ml", ar: "250 مل" }, price: 390, kind: "pump", tag: "", rating: "4.6", reviews: 38, packshotImage: "/products/nourish-body-lotion.webp" },
  { id: "body-scrub", cat: "body", name: { en: "Glow Body Scrub", ar: "مقشّر الجسم المضيء" }, sub: { en: "200 g", ar: "200 جم" }, price: 350, kind: "jar", tag: "", rating: "4.7", reviews: 29, packshotImage: "/products/glow-body-scrub.webp" },
  { id: "shea-butter", cat: "body", name: { en: "Shea Body Butter", ar: "زبدة الشيا للجسم" }, sub: { en: "150 g", ar: "150 جم" }, price: 410, kind: "jar", tag: "new", rating: "4.9", reviews: 33, packshotImage: "/products/shea-body-butter.webp" },
  { id: "lip-balm", cat: "lip", name: { en: "Lip Balm", ar: "بلسم الشفاه" }, sub: { en: "Strawberry", ar: "فراولة" }, price: 120, kind: "tube", tag: "new", rating: "4.7", reviews: 210, packshotImage: "/products/lip-balm.webp" },
  { id: "lip-oil", cat: "lip", name: { en: "Plumping Lip Oil", ar: "زيت الشفاه الممتلئ" }, sub: { en: "10 ml", ar: "10 مل" }, price: 180, kind: "tube", tag: "new", rating: "4.8", reviews: 62, packshotImage: "/products/plumping-lip-oil.webp" },
];

export interface CategoryHeroImages {
  desktop: string;
  tablet: string;
  mobile: string;
}

export interface CategoryInfo {
  label: Localized<string>;
  tagline: Localized<string>;
  /** Final category card visual used in the "Shop by Category" cards. */
  cardImage: string;
  /** Final responsive hero banner imagery used as the full background of the
   *  category hero card (art-directed per breakpoint). */
  heroImages: CategoryHeroImages;
  /** Optional art-directed RTL variant for Arabic. When omitted, Arabic falls
   *  back to `heroImages` (no broken images). See lib/images.ts. */
  heroImagesRtl?: CategoryHeroImages;
}

export const CATS: Record<CategoryKey, CategoryInfo> = {
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

export const CAT_KIND: Record<CategoryKey, BottleKind> = {
  face: "serum",
  hair: "pump",
  body: "jar",
  lip: "tube",
};

export interface CategoryContent {
  desc: Localized<string>;
  benefits: Localized<string[]>;
  ingredients: Localized<string[]>;
  howto: Localized<string>;
}

export const CONTENT: Record<CategoryKey, CategoryContent> = {
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

export type OrderStatus = "delivered" | "shipped" | "processing";

export interface Order {
  no: string;
  date: Localized<string>;
  status: OrderStatus;
  total: number;
  items: { id: string; qty: number }[];
}

export const ORDERS: Order[] = [
  { no: "DRM-10482", date: { en: "Jun 2, 2026", ar: "2 يونيو 2026" }, status: "delivered", total: 790, items: [{ id: "super-serum", qty: 1 }, { id: "lip-balm", qty: 2 }] },
  { no: "DRM-10391", date: { en: "May 18, 2026", ar: "18 مايو 2026" }, status: "shipped", total: 600, items: [{ id: "hair-therapy-oil", qty: 1 }] },
];

export type PolicyKey = "shipping" | "returns" | "privacy" | "terms";

export interface Policy {
  title: Localized<string>;
  intro: Localized<string>;
  sections: { h: Localized<string>; b: Localized<string> }[];
}

export const POLICIES: Record<PolicyKey, Policy> = {
  shipping: {
    title: { en: "Shipping Policy", ar: "سياسة الشحن" },
    intro: { en: "We deliver across Egypt with care and speed.", ar: "نوصّل في جميع أنحاء مصر بعناية وسرعة." },
    sections: [
      { h: { en: "Delivery Time", ar: "وقت التوصيل" }, b: { en: "Orders are processed within 1-2 business days. Delivery takes 2-4 business days within Cairo & Giza, and 3-6 business days for other governorates.", ar: "تُجهّز الطلبات خلال 1-2 يوم عمل. يستغرق التوصيل 2-4 أيام عمل داخل القاهرة والجيزة، و3-6 أيام عمل لباقي المحافظات." } },
      { h: { en: "Shipping Fees", ar: "رسوم الشحن" }, b: { en: "A flat EGP 40 shipping fee applies. Enjoy FREE shipping on all orders over EGP 500.", ar: "تُطبّق رسوم شحن ثابتة قدرها 40 ج.م. استمتعي بشحن مجاني لجميع الطلبات التي تزيد عن 500 ج.م." } },
      { h: { en: "Order Tracking", ar: "تتبّع الطلب" }, b: { en: "Once shipped, you will receive an SMS with your tracking details to follow your order to your door.", ar: "بمجرد الشحن، ستصلك رسالة نصية بتفاصيل التتبّع لمتابعة طلبك حتى باب منزلك." } },
    ],
  },
  returns: {
    title: { en: "Returns & Refunds", ar: "الإرجاع والاسترداد" },
    intro: { en: "Your satisfaction is our priority.", ar: "رضاكِ هو أولويتنا." },
    sections: [
      { h: { en: "Return Window", ar: "فترة الإرجاع" }, b: { en: "Unopened products may be returned within 14 days of delivery for a full refund or exchange.", ar: "يمكن إرجاع المنتجات غير المفتوحة خلال 14 يومًا من التوصيل لاسترداد كامل أو استبدال." } },
      { h: { en: "How to Return", ar: "كيفية الإرجاع" }, b: { en: "Contact us via WhatsApp or email with your order number and reason. We will arrange a pickup.", ar: "تواصلي معنا عبر واتساب أو البريد الإلكتروني مع رقم طلبك والسبب. سنرتّب عملية الاستلام." } },
      { h: { en: "Refunds", ar: "الاسترداد" }, b: { en: "Approved refunds are processed within 5-7 business days to your original payment method.", ar: "تُعالَج المبالغ المستردّة المعتمدة خلال 5-7 أيام عمل إلى وسيلة الدفع الأصلية." } },
    ],
  },
  privacy: {
    title: { en: "Privacy Policy", ar: "سياسة الخصوصية" },
    intro: { en: "We respect and protect your personal data.", ar: "نحترم بياناتك الشخصية ونحميها." },
    sections: [
      { h: { en: "Information We Collect", ar: "المعلومات التي نجمعها" }, b: { en: "We collect your name, contact details and order information solely to fulfil your orders and improve your experience.", ar: "نجمع اسمك وبيانات التواصل ومعلومات الطلب فقط لتنفيذ طلباتك وتحسين تجربتك." } },
      { h: { en: "How We Use It", ar: "كيف نستخدمها" }, b: { en: "Your data is used for order processing, delivery and, with your consent, marketing communications. We never sell your data.", ar: "تُستخدم بياناتك لمعالجة الطلبات والتوصيل، وبموافقتك، للرسائل التسويقية. لا نبيع بياناتك أبدًا." } },
      { h: { en: "Your Rights", ar: "حقوقك" }, b: { en: "You may request access to, correction of, or deletion of your personal data at any time by contacting us.", ar: "يمكنك طلب الاطّلاع على بياناتك الشخصية أو تصحيحها أو حذفها في أي وقت بالتواصل معنا." } },
    ],
  },
  terms: {
    title: { en: "Terms & Conditions", ar: "الشروط والأحكام" },
    intro: { en: "The terms governing your use of Dermiva.", ar: "الشروط التي تحكم استخدامك لِديرميفا." },
    sections: [
      { h: { en: "Use of Site", ar: "استخدام الموقع" }, b: { en: "By using this website you agree to provide accurate information and to use the site for lawful purposes only.", ar: "باستخدامك لهذا الموقع فإنك توافقين على تقديم معلومات دقيقة واستخدام الموقع لأغراض مشروعة فقط." } },
      { h: { en: "Pricing", ar: "الأسعار" }, b: { en: "All prices are in Egyptian Pounds (EGP) and include applicable taxes. Prices may change without prior notice.", ar: "جميع الأسعار بالجنيه المصري (EGP) وتشمل الضرائب المطبّقة. قد تتغيّر الأسعار دون إشعار مسبق." } },
      { h: { en: "Products", ar: "المنتجات" }, b: { en: "Dermiva products are cosmetic. Always patch-test and discontinue use if irritation occurs.", ar: "منتجات ديرميفا تجميلية. أجري دائمًا اختبار البقعة وأوقفي الاستخدام عند حدوث تهيّج." } },
    ],
  },
};

/** Sort option values. Labels are translated in the UI (sorting namespace). */
export const SORT_VALUES = ["featured", "price-asc", "price-desc", "rating", "name"] as const;
export type SortValue = (typeof SORT_VALUES)[number];

export interface Faq {
  q: Localized<string>;
  a: Localized<string>;
}

export const FAQS: Faq[] = [
  { q: { en: "How long does delivery take?", ar: "كم يستغرق التوصيل؟" }, a: { en: "2-4 business days within Cairo & Giza, 3-6 days elsewhere in Egypt.", ar: "2-4 أيام عمل داخل القاهرة والجيزة، و3-6 أيام في باقي أنحاء مصر." } },
  { q: { en: "Are products authentic?", ar: "هل المنتجات أصلية؟" }, a: { en: "Yes, 100% genuine Dermiva products, formulated and sealed in Egypt.", ar: "نعم، منتجات ديرميفا أصلية 100%، مُصنّعة ومختومة في مصر." } },
  { q: { en: "What is your return policy?", ar: "ما هي سياسة الإرجاع؟" }, a: { en: "Unopened items can be returned within 14 days for a full refund.", ar: "يمكن إرجاع العناصر غير المفتوحة خلال 14 يومًا لاسترداد كامل." } },
];

// ----- locale helpers -----

/** Resolve a localized value for the active locale. */
export function localize<T>(value: Localized<T>, locale: Locale): T {
  return value[locale];
}

export function getProductText(product: Product, locale: Locale): { name: string; sub: string } {
  return { name: product.name[locale], sub: product.sub[locale] };
}

export function getCategoryText(cat: CategoryKey, locale: Locale): { label: string; tagline: string } {
  const c = CATS[cat];
  return { label: c.label[locale], tagline: c.tagline[locale] };
}

export function getCategoryContentText(
  cat: CategoryKey,
  locale: Locale
): { desc: string; benefits: string[]; ingredients: string[]; howto: string } {
  const c = CONTENT[cat];
  return {
    desc: c.desc[locale],
    benefits: c.benefits[locale],
    ingredients: c.ingredients[locale],
    howto: c.howto[locale],
  };
}

export function getPolicyText(
  policy: Policy,
  locale: Locale
): { title: string; intro: string; sections: { h: string; b: string }[] } {
  return {
    title: policy.title[locale],
    intro: policy.intro[locale],
    sections: policy.sections.map((s) => ({ h: s.h[locale], b: s.b[locale] })),
  };
}

// ----- catalog helpers -----

export function money(n: number): string {
  return "EGP " + Number(n).toFixed(2);
}

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

// Canonical product image resolver — the single source of truth for the main
// image shown wherever a product appears (detail page, cards, cart, wishlist,
// checkout). Always derive the image from current catalog data, never from
// values persisted in cart/wishlist storage (which only hold product ids).
export function productImage(product: Pick<Product, "packshotImage">): string {
  return product.packshotImage;
}

export function bestSellers(): Product[] {
  const best = PRODUCTS.filter((p) => p.tag === "best-seller");
  const extra = getProduct("niacinamide");
  return (extra ? best.concat(extra) : best).slice(0, 4);
}

export interface FilterState {
  sort: string;
  max: number;
  query: string;
}

function matchesQuery(p: Product, q: string, locale: Locale): boolean {
  const haystack = (p.name[locale] + " " + p.cat + " " + p.sub[locale]).toLowerCase();
  return haystack.includes(q);
}

export function filteredList(catFilter: CategoryKey | null, f: FilterState, locale: Locale): Product[] {
  let list = PRODUCTS.slice();
  if (catFilter) list = list.filter((p) => p.cat === catFilter);
  if (f.query && f.query.trim()) {
    const q = f.query.trim().toLowerCase();
    list = list.filter((p) => matchesQuery(p, q, locale));
  }
  list = list.filter((p) => p.price <= f.max);
  if (f.sort === "price-asc") list.sort((a, b) => a.price - b.price);
  else if (f.sort === "price-desc") list.sort((a, b) => b.price - a.price);
  else if (f.sort === "rating") list.sort((a, b) => parseFloat(b.rating) - parseFloat(a.rating));
  else if (f.sort === "name") list.sort((a, b) => a.name[locale].localeCompare(b.name[locale], locale));
  return list;
}

export function searchProducts(query: string, locale: Locale): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return PRODUCTS.filter((p) => matchesQuery(p, q, locale));
}

export function getCategoryProduct(cat: CategoryKey): Product {
  return PRODUCTS.find((p) => p.cat === cat) ?? PRODUCTS[0];
}

export function galleryKinds(kind: BottleKind): BottleKind[] {
  return [kind, kind === "serum" ? "pump" : "serum", kind === "jar" ? "tube" : "jar"];
}
