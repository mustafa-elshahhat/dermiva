import type { Locale } from "@/i18n/routing";
import type { CategoryViewModel } from "@/lib/types/category";
import type { ProductViewModel } from "@/lib/types/product";
import type { PolicyViewModel } from "@/lib/types/policy";
import type { JsonLdObject } from "./structured-data-script";
import { DEFAULT_OG_IMAGE, SITE_NAME } from "./config";
import { getSiteUrl, localizedPath } from "./url";
import { routes } from "./routes";

type SchemaContext = "https://schema.org";
type SchemaUrl = string;
type SchemaLanguage = Locale;

const SCHEMA_CONTEXT: SchemaContext = "https://schema.org";
const BRAND_LOGO = "/brand/dermiva-logo.webp";

export interface BrandJsonLd extends JsonLdObject {
  "@type": "Brand";
  name: string;
}

export interface OrganizationReferenceJsonLd extends JsonLdObject {
  "@type": "Organization";
  name: string;
}

export interface OrganizationJsonLd extends JsonLdObject {
  "@context": SchemaContext;
  "@type": "Organization";
  name: string;
  url: SchemaUrl;
  logo: SchemaUrl;
  image: SchemaUrl;
  areaServed: CountryJsonLd;
  brand: BrandJsonLd;
}

export interface CountryJsonLd extends JsonLdObject {
  "@type": "Country";
  name: string;
}

export interface WebSiteJsonLd extends JsonLdObject {
  "@context": SchemaContext;
  "@type": "WebSite";
  name: string;
  url: SchemaUrl;
  inLanguage: SchemaLanguage;
}

export interface BreadcrumbListJsonLd extends JsonLdObject {
  "@context": SchemaContext;
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbListItemJsonLd[];
}

export interface BreadcrumbListItemJsonLd extends JsonLdObject {
  "@type": "ListItem";
  position: number;
  name: string;
  item: SchemaUrl;
}

export interface AggregateRatingJsonLd extends JsonLdObject {
  "@type": "AggregateRating";
  ratingValue: number;
  reviewCount: number;
}

export interface OfferJsonLd extends JsonLdObject {
  "@type": "Offer";
  url: SchemaUrl;
  priceCurrency: "EGP";
  price: number;
  itemCondition: "https://schema.org/NewCondition";
  availability: "https://schema.org/InStock";
  seller: OrganizationReferenceJsonLd;
}

export interface ProductJsonLd extends JsonLdObject {
  "@context": SchemaContext;
  "@type": "Product";
  name: string;
  image: SchemaUrl;
  description: string;
  sku: string;
  brand: BrandJsonLd;
  category: string;
  offers: OfferJsonLd;
  aggregateRating?: AggregateRatingJsonLd;
}

export interface ItemListJsonLd extends JsonLdObject {
  "@type": "ItemList";
  itemListElement: ItemListElementJsonLd[];
}

export interface ItemListElementJsonLd extends JsonLdObject {
  "@type": "ListItem";
  position: number;
  url: SchemaUrl;
  name: string;
}

export interface CollectionPageJsonLd extends JsonLdObject {
  "@context": SchemaContext;
  "@type": "CollectionPage";
  name: string;
  description?: string;
  url: SchemaUrl;
  inLanguage: SchemaLanguage;
  mainEntity: ItemListJsonLd;
}

export interface AboutPageJsonLd extends JsonLdObject {
  "@context": SchemaContext;
  "@type": "AboutPage";
  name: string;
  description: string;
  url: SchemaUrl;
  inLanguage: SchemaLanguage;
  about: OrganizationReferenceJsonLd;
}

export interface ContactPageJsonLd extends JsonLdObject {
  "@context": SchemaContext;
  "@type": "ContactPage";
  name: string;
  description: string;
  url: SchemaUrl;
  inLanguage: SchemaLanguage;
  about: OrganizationReferenceJsonLd;
}

export interface WebPageJsonLd extends JsonLdObject {
  "@context": SchemaContext;
  "@type": "WebPage";
  name: string;
  description: string;
  url: SchemaUrl;
  inLanguage: SchemaLanguage;
}

export interface BreadcrumbItemInput {
  name: string;
  path: string;
}

export function absoluteUrl(path: string): SchemaUrl {
  return new URL(path, `${getSiteUrl()}/`).toString();
}

export function absoluteLocalizedUrl(locale: Locale, path: string): SchemaUrl {
  return absoluteUrl(localizedPath(locale, path));
}

function brand(): BrandJsonLd {
  return { "@type": "Brand", name: SITE_NAME };
}

function organizationReference(): OrganizationReferenceJsonLd {
  return { "@type": "Organization", name: SITE_NAME };
}

export function buildOrganizationJsonLd(locale: Locale): OrganizationJsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "Organization",
    name: SITE_NAME,
    url: absoluteLocalizedUrl(locale, routes.home()),
    logo: absoluteUrl(BRAND_LOGO),
    image: absoluteUrl(DEFAULT_OG_IMAGE.url),
    areaServed: { "@type": "Country", name: "Egypt" },
    brand: brand(),
    // address, telephone and sameAs are intentionally omitted until final
    // business contact details and production social URLs replace placeholders.
  };
}

export function buildWebSiteJsonLd(locale: Locale): WebSiteJsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebSite",
    name: SITE_NAME,
    url: absoluteLocalizedUrl(locale, routes.home()),
    inLanguage: locale,
    // SearchAction is intentionally omitted because /search does not currently
    // support a q={search_term_string} URL parameter.
  };
}

export function buildBreadcrumbListJsonLd(
  locale: Locale,
  items: BreadcrumbItemInput[],
): BreadcrumbListJsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.name,
      item: absoluteLocalizedUrl(locale, item.path),
    })),
  };
}

export function buildProductJsonLd(input: {
  locale: Locale;
  product: ProductViewModel;
  categoryLabel: string;
  description: string;
}): ProductJsonLd {
  const { locale, product } = input;
  const productJsonLd: ProductJsonLd = {
    "@context": SCHEMA_CONTEXT,
    "@type": "Product",
    name: product.name,
    image: absoluteUrl(product.image),
    description: input.description,
    sku: product.id,
    brand: brand(),
    category: input.categoryLabel,
    offers: {
      "@type": "Offer",
      url: absoluteLocalizedUrl(locale, routes.product(product.id)),
      priceCurrency: "EGP",
      price: product.price,
      itemCondition: "https://schema.org/NewCondition",
      // Storefront assumption: every visible product is buyable because there is
      // currently no inventory/stock-status concept in the data layer.
      availability: "https://schema.org/InStock",
      seller: organizationReference(),
      // shippingDetails and return policy structured data are intentionally
      // omitted until final business-approved commercial policy data exists.
    },
  };

  if (product.reviews > 0 && Number.isFinite(product.ratingValue)) {
    productJsonLd.aggregateRating = {
      "@type": "AggregateRating",
      ratingValue: product.ratingValue,
      reviewCount: product.reviews,
    };
  }

  return productJsonLd;
}

export function buildCollectionPageJsonLd(input: {
  locale: Locale;
  path: string;
  name: string;
  description?: string;
  products: ProductViewModel[];
}): CollectionPageJsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "CollectionPage",
    name: input.name,
    description: input.description,
    url: absoluteLocalizedUrl(input.locale, input.path),
    inLanguage: input.locale,
    mainEntity: {
      "@type": "ItemList",
      itemListElement: input.products.map((product, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: absoluteLocalizedUrl(input.locale, routes.product(product.id)),
        name: product.name,
      })),
    },
  };
}

export function buildCategoryCollectionPageJsonLd(input: {
  locale: Locale;
  category: CategoryViewModel;
  products: ProductViewModel[];
}): CollectionPageJsonLd {
  return buildCollectionPageJsonLd({
    locale: input.locale,
    path: routes.category(input.category.key),
    name: input.category.label,
    description: input.category.tagline,
    products: input.products,
  });
}

export function buildAboutPageJsonLd(input: {
  locale: Locale;
  name: string;
  description: string;
}): AboutPageJsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "AboutPage",
    name: input.name,
    description: input.description,
    url: absoluteLocalizedUrl(input.locale, routes.about()),
    inLanguage: input.locale,
    about: organizationReference(),
  };
}

export function buildContactPageJsonLd(input: {
  locale: Locale;
  name: string;
  description: string;
}): ContactPageJsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "ContactPage",
    name: input.name,
    description: input.description,
    url: absoluteLocalizedUrl(input.locale, routes.contact()),
    inLanguage: input.locale,
    about: organizationReference(),
    // phone, email and address are intentionally omitted until the final public
    // business contact details are confirmed for structured data use.
  };
}

export function buildPolicyWebPageJsonLd(input: {
  locale: Locale;
  policy: PolicyViewModel;
}): WebPageJsonLd {
  return {
    "@context": SCHEMA_CONTEXT,
    "@type": "WebPage",
    name: input.policy.title,
    description: input.policy.intro,
    url: absoluteLocalizedUrl(input.locale, routes.policy(input.policy.slug)),
    inLanguage: input.locale,
    // MerchantReturnPolicy is intentionally omitted until return-policy data is
    // final and business-approved for structured data.
  };
}
