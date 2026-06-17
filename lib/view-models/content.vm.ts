// Visible content guidance builders. Pure + server-safe; no metadata or schema.

import type { Locale } from "@/i18n/routing";
import type { CategoryViewModel } from "@/lib/types/category";
import type { ProductViewModel } from "@/lib/types/product";
import type { ProductGuidanceViewModel } from "@/lib/types/content";

function categoryRoutineTip(category: CategoryViewModel, locale: Locale): string {
  if (locale === "ar") {
    if (category.key === "face") return "أدخلي منتجات الوجه تدريجيًا واستخدمي واقي الشمس في روتين النهار.";
    if (category.key === "hair") return "اجمعي بين التنظيف والترطيب واللمسة النهائية حسب احتياج شعرك في ذلك اليوم.";
    if (category.key === "body") return "استخدمي منتجات الجسم بعد التنظيف، واتبعي التقشير بترطيب مناسب.";
    return "احتفظي بمنتج الشفاه قريبًا لإعادة الاستخدام عند الحاجة خلال اليوم.";
  }

  if (category.key === "face") return "Introduce face products gradually and keep SPF in your daytime routine.";
  if (category.key === "hair") return "Combine cleansing, conditioning and finishing steps based on what your hair needs that day.";
  if (category.key === "body") return "Use body care after cleansing, and follow exfoliation with a moisturizing step.";
  return "Keep lip care nearby so you can reapply whenever lips feel dry.";
}

function shortProductAnswer(product: ProductViewModel, category: CategoryViewModel, locale: Locale): string {
  if (locale === "ar") {
    return `${product.name} هو منتج تجميلي من Dermiva ضمن فئة ${category.label}، يساعد على دعم روتين العناية بمظهر وملمس ألطف دون ادعاءات علاجية.`;
  }

  return `${product.name} is a Dermiva cosmetic ${category.label.toLowerCase()} product that supports a care routine for a better-looking, better-feeling finish without medical treatment claims.`;
}

export function buildProductGuidanceVM(
  product: ProductViewModel,
  category: CategoryViewModel,
  locale: Locale,
): ProductGuidanceViewModel {
  const categoryUse = category.content.howto;

  if (locale === "ar") {
    return {
      shortAnswer: shortProductAnswer(product, category, locale),
      bestFor: category.content.bestFor.slice(0, 4),
      benefits: category.content.benefits,
      routineTips: [categoryUse, categoryRoutineTip(category, locale)],
      ingredientHighlights: category.content.ingredients,
      goodToKnow: [
        "منتجات Dermiva تجميلية وليست مخصصة لعلاج حالات طبية.",
        "اختبري المنتج على منطقة صغيرة أولًا إذا كانت بشرتك أو فروة رأسك حساسة.",
        `ينتمي ${product.name} إلى فئة ${category.label}.`,
      ],
      questionAnswers: [
        { question: `ما هو ${product.name}؟`, answer: shortProductAnswer(product, category, locale) },
        { question: `كيف أستخدم ${product.name}؟`, answer: categoryUse },
        { question: `متى أستخدم ${product.name}؟`, answer: category.key === "face" ? "استخدميه ضمن روتين العناية على بشرة نظيفة، مع واقي الشمس نهارًا عند استخدام منتجات الوجه." : "استخدميه ضمن روتين العناية المناسب لفئته وحسب احتياجك خلال اليوم أو الأسبوع." },
        { question: "هل يمكن استخدامه مع منتجات أخرى؟", answer: "نعم، يمكن إدخاله ضمن روتين Dermiva تدريجيًا مع منتجات مناسبة من الفئة نفسها." },
        { question: "لمن يناسب؟", answer: `يناسب من يبحث عن عناية تجميلية ضمن فئة ${category.label}، مع مراعاة اختبار المنتج أولًا عند الحساسية.` },
        { question: "إلى أي فئة ينتمي؟", answer: `${product.name} ينتمي إلى فئة ${category.label} من Dermiva.` },
      ],
    };
  }

  return {
    shortAnswer: shortProductAnswer(product, category, locale),
    bestFor: category.content.bestFor.slice(0, 4),
    benefits: category.content.benefits,
    routineTips: [categoryUse, categoryRoutineTip(category, locale)],
    ingredientHighlights: category.content.ingredients,
    goodToKnow: [
      "Dermiva products are cosmetic products, not medical treatments.",
      "Patch-test first if your skin or scalp is sensitive.",
      `${product.name} belongs to the ${category.label} category.`,
    ],
    questionAnswers: [
      { question: `What is ${product.name}?`, answer: shortProductAnswer(product, category, locale) },
      { question: `How do I use ${product.name}?`, answer: categoryUse },
      { question: `When should I use ${product.name}?`, answer: category.key === "face" ? "Use it in your routine on clean skin, with SPF in the daytime when using face care." : "Use it as part of the care routine for its category, based on your daily or weekly needs." },
      { question: "Can it be used with other products?", answer: "Yes. Add it gradually alongside suitable Dermiva products from the same category." },
      { question: "Who is it suitable for?", answer: `It is suitable for shoppers looking for cosmetic care in ${category.label}, with patch-testing if sensitivity is a concern.` },
      { question: "What category does it belong to?", answer: `${product.name} belongs to Dermiva ${category.label}.` },
    ],
  };
}
