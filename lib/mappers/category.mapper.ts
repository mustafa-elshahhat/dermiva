// Pure raw-Category -> CategoryViewModel mapping for a given locale. Client-safe.

import type { Locale } from "@/i18n/routing";
import type {
  Category,
  CategoryContent,
  CategoryContentViewModel,
  CategoryKey,
  CategoryViewModel,
} from "@/lib/types/category";
import { getHeroImageSet } from "@/lib/images";

export function toCategoryContentVM(content: CategoryContent, locale: Locale): CategoryContentViewModel {
  return {
    desc: content.desc[locale],
    summary: content.summary[locale],
    bestFor: content.bestFor[locale],
    benefits: content.benefits[locale],
    ingredients: content.ingredients[locale],
    howto: content.howto[locale],
    chooseGuidance: content.chooseGuidance[locale],
    questionAnswers: content.questionAnswers[locale],
  };
}

export function toCategoryVM(
  key: CategoryKey,
  category: Category,
  content: CategoryContent,
  productCount: number,
  locale: Locale
): CategoryViewModel {
  return {
    key,
    label: category.label[locale],
    tagline: category.tagline[locale],
    cardImage: category.cardImage,
    hero: getHeroImageSet(category.heroImages, locale, category.heroImagesRtl),
    href: `/category/${key}`,
    productCount,
    content: toCategoryContentVM(content, locale),
  };
}
