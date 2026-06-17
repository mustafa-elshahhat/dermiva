// Barrel for the data-layer types. Import from "@/lib/types" for a single
// surface, or from a specific module (e.g. "@/lib/types/product") when needed.

export type { Localized, ApiError, ApiResult } from "./common";
export type { QuestionAnswerViewModel, QuickFactViewModel, ProductGuidanceViewModel } from "./content";
export type { Locale, Direction } from "./locale";
export type {
  ProductId,
  CategoryKey,
  BottleKind,
  ProductTag,
  Product,
  ProductViewModel,
  SortValue,
  FilterState,
} from "./product";
export { SORT_VALUES } from "./product";
export type {
  CategoryHeroImages,
  Category,
  CategoryContent,
  CategoryContentViewModel,
  CategoryTileViewModel,
  CategoryViewModel,
} from "./category";
export type { CartItem, CartLineViewModel, CartSummary } from "./cart";
export type {
  PaymentMethodId,
  PaymentMethod,
  PaymentMethodViewModel,
  CheckoutForm,
  CheckoutRequestItem,
  CheckoutRequest,
  CheckoutResponse,
} from "./checkout";
export type {
  OrderStatus,
  Order,
  OrderLineViewModel,
  OrderViewModel,
} from "./order";
export type { Address } from "./customer";
export type { PolicyKey, Policy, PolicyViewModel } from "./policy";
export type { Faq, FaqViewModel } from "./faq";
