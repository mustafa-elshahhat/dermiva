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
    summary: {
      en: "Dermiva Face Care brings together serums, pads and daily glow essentials for smoother-looking, brighter-looking skin as part of a cosmetic routine.",
      ar: "تجمع العناية بالوجه من Dermiva بين السيرومات والبادز وأساسيات الإشراق اليومي لمظهر بشرة أنعم وأكثر إشراقًا ضمن روتين تجميلي.",
    },
    bestFor: {
      en: ["Daily face routines", "Dull-looking skin", "Uneven-looking texture", "Lightweight layering"],
      ar: ["روتين الوجه اليومي", "البشرة باهتة المظهر", "الملمس غير المتجانس", "الاستخدام بطبقات خفيفة"],
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
    chooseGuidance: {
      en: ["Choose serums when you want lightweight targeted care.", "Choose pads when you want a simple texture-smoothing step.", "Layer face products gradually and keep daytime SPF in your routine."],
      ar: ["اختاري السيرومات عندما ترغبين في عناية خفيفة ومركّزة.", "اختاري البادز عندما تحتاجين خطوة بسيطة لتحسين ملمس البشرة.", "أدخلي منتجات الوجه تدريجيًا واحرصي على واقي الشمس نهارًا."],
    },
    questionAnswers: {
      en: [
        { question: "What is Dermiva Face Care for?", answer: "It supports cosmetic face routines focused on hydration, glow and smoother-looking texture." },
        { question: "Which Dermiva products help with glow or texture?", answer: "Super Serum, Vitamin C Serum and Glow Peel Pads are positioned for glow and smoother-looking texture within the face care range." },
        { question: "How should a face care routine be used?", answer: "Start with clean skin, apply lightweight treatments first, moisturize, and use SPF during the day." }
      ],
      ar: [
        { question: "ما وظيفة عناية الوجه من Dermiva؟", answer: "تدعم روتين العناية التجميلي بالوجه مع التركيز على الترطيب والإشراق وملمس أنعم مظهرًا." },
        { question: "أي منتجات Dermiva مناسبة للإشراق أو الملمس؟", answer: "Super Serum وVitamin C Serum وGlow Peel Pads مناسبة ضمن فئة عناية الوجه للإشراق وملمس أنعم مظهرًا." },
        { question: "كيف يُستخدم روتين عناية الوجه؟", answer: "ابدئي ببشرة نظيفة، ثم المنتجات الخفيفة أولًا، وبعدها المرطّب، واستخدمي واقي الشمس نهارًا." }
      ],
    },
  },
  hair: {
    desc: {
      en: "Nourishing care that strengthens strands, tames frizz and restores healthy, glossy shine from root to tip.",
      ar: "عناية مغذّية تقوّي الخصلات وتروّض التطاير وتعيد اللمعان الصحي من الجذور حتى الأطراف.",
    },
    summary: {
      en: "Dermiva Hair Care covers oils, masks and shampoo for softer-feeling, shinier-looking hair and easier routine care.",
      ar: "تشمل عناية الشعر من Dermiva الزيوت والماسكات والشامبو لشعر أنعم ملمسًا وأكثر لمعانًا ومناسب لروتين أسهل.",
    },
    bestFor: {
      en: ["Dry-feeling hair", "Frizz-prone lengths", "Shine-focused routines", "Wash-day repair care"],
      ar: ["الشعر الجاف الملمس", "الأطراف المعرضة للتطاير", "روتين يركز على اللمعان", "عناية يوم غسل الشعر"],
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
    chooseGuidance: {
      en: ["Use shampoo as the cleansing step on wash days.", "Use a mask when hair needs richer conditioning.", "Use oil on mid-lengths and ends for shine and softness."],
      ar: ["استخدمي الشامبو كخطوة تنظيف في يوم غسل الشعر.", "استخدمي الماسك عندما يحتاج الشعر إلى ترطيب أغنى.", "استخدمي الزيت على منتصف الشعر والأطراف للمعان والنعومة."],
    },
    questionAnswers: {
      en: [
        { question: "What is Dermiva Hair Care for?", answer: "It supports cosmetic hair routines focused on softer feel, smoother-looking lengths and healthy-looking shine." },
        { question: "How can oils, masks and shampoo fit together?", answer: "Cleanse with shampoo, condition with a mask when needed, then finish with oil on mid-lengths and ends." },
        { question: "Who should consider hair repair products?", answer: "Anyone building a routine for dry-feeling, frizz-prone or dull-looking hair can consider this category." }
      ],
      ar: [
        { question: "ما وظيفة عناية الشعر من Dermiva؟", answer: "تدعم روتين الشعر التجميلي للنعومة وملمس أكثر انتظامًا ولمعان صحي المظهر." },
        { question: "كيف يمكن الجمع بين الزيت والماسك والشامبو؟", answer: "ابدئي بالشامبو للتنظيف، ثم الماسك عند الحاجة لترطيب أغنى، وأنهي بالزيت على منتصف الشعر والأطراف." },
        { question: "لمن تناسب منتجات إصلاح الشعر؟", answer: "تناسب من يرغب في روتين للشعر الجاف الملمس أو المعرض للتطاير أو الباهت المظهر." }
      ],
    },
  },
  body: {
    desc: {
      en: "Rich yet breathable body care that deeply nourishes, softens and leaves skin smooth with a subtle glow.",
      ar: "عناية غنية وقابلة للتنفّس بالجسم تغذّي بعمق وتنعّم وتترك البشرة ملساء بإشراقة خفيفة.",
    },
    summary: {
      en: "Dermiva Body Care includes lotion, scrub and body butter for softer-feeling skin, comfort and a smoother-looking finish.",
      ar: "تشمل عناية الجسم من Dermiva اللوشن والمقشر وزبدة الجسم لبشرة أنعم ملمسًا وأكثر راحة ومظهرًا أكثر نعومة.",
    },
    bestFor: {
      en: ["Daily body moisture", "Dry-feeling areas", "Shower routines", "Soft, comfortable skin"],
      ar: ["ترطيب الجسم اليومي", "المناطق الجافة الملمس", "روتين الاستحمام", "بشرة ناعمة ومريحة"],
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
    chooseGuidance: {
      en: ["Use scrub occasionally when skin feels rough or needs polishing.", "Use lotion for lighter daily moisture.", "Use body butter when you want a richer, more comforting finish."],
      ar: ["استخدمي المقشر من وقت لآخر عندما تشعرين بخشونة أو ترغبين في تنعيم الملمس.", "استخدمي اللوشن لترطيب يومي خفيف.", "استخدمي زبدة الجسم عندما ترغبين في عناية أغنى وراحة أكثر."],
    },
    questionAnswers: {
      en: [
        { question: "What is Dermiva Body Care for?", answer: "It supports cosmetic body routines for softer-feeling, smoother-looking and more comfortable skin." },
        { question: "When should body lotion be used?", answer: "Use body lotion on clean skin when you want lightweight daily moisture." },
        { question: "When should body scrub or butter be used?", answer: "Use scrub occasionally for polishing, then follow with lotion or body butter for comfort." }
      ],
      ar: [
        { question: "ما وظيفة عناية الجسم من Dermiva؟", answer: "تدعم روتين الجسم التجميلي لبشرة أنعم ملمسًا وأكثر نعومة وراحة." },
        { question: "متى يُستخدم لوشن الجسم؟", answer: "استخدمي اللوشن على بشرة نظيفة عندما ترغبين في ترطيب يومي خفيف." },
        { question: "متى يُستخدم مقشر الجسم أو الزبدة؟", answer: "استخدمي المقشر من وقت لآخر للتنعيم، ثم اتبعيه بلوشن أو زبدة جسم للراحة." }
      ],
    },
  },
  lip: {
    desc: {
      en: "A silky, conditioning formula that softens, smooths and adds a hint of natural-looking plumpness to lips.",
      ar: "تركيبة حريرية مرطّبة تنعّم وتملّس وتضيف امتلاءً طبيعي المظهر للشفاه.",
    },
    summary: {
      en: "Dermiva Lip Care focuses on balms and oils for softer-feeling lips, smoother-looking texture and easy daily touch-ups.",
      ar: "تركز عناية الشفاه من Dermiva على البلسم والزيوت لشفاه أنعم ملمسًا وملمس أكثر نعومة ولمسات يومية سهلة.",
    },
    bestFor: {
      en: ["Daily lip comfort", "Dry-feeling lips", "Glossy finish", "On-the-go touch-ups"],
      ar: ["راحة الشفاه اليومية", "الشفاه الجافة الملمس", "لمسة لامعة", "تجديد سريع خلال اليوم"],
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
    chooseGuidance: {
      en: ["Choose balm when you want easy comfort and moisture.", "Choose lip oil when you want a glossier finish.", "Reapply either format whenever lips feel dry."],
      ar: ["اختاري البلسم عندما ترغبين في راحة وترطيب سهلين.", "اختاري زيت الشفاه عندما ترغبين في لمسة أكثر لمعانًا.", "أعيدي استخدام أي منهما عندما تشعرين بجفاف الشفاه."],
    },
    questionAnswers: {
      en: [
        { question: "What is Dermiva Lip Care for?", answer: "It supports daily cosmetic lip routines for softness, comfort and a smoother-looking finish." },
        { question: "What is the difference between lip balm and lip oil?", answer: "Lip balm is a simple comfort step, while lip oil adds a glossier finish with a conditioned feel." },
        { question: "When should lip care be reapplied?", answer: "Reapply whenever lips feel dry, especially after eating or drinking." }
      ],
      ar: [
        { question: "ما وظيفة عناية الشفاه من Dermiva؟", answer: "تدعم روتين الشفاه التجميلي اليومي للنعومة والراحة ومظهر أكثر نعومة." },
        { question: "ما الفرق بين بلسم الشفاه وزيت الشفاه؟", answer: "البلسم خطوة بسيطة للراحة، أما زيت الشفاه فيمنح لمسة أكثر لمعانًا مع إحساس مرطّب." },
        { question: "متى يجب إعادة استخدام عناية الشفاه؟", answer: "أعيدي استخدامها عندما تشعرين بجفاف الشفاه، خاصة بعد الأكل أو الشرب." }
      ],
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
