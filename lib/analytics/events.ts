export type AnalyticsCurrency = "EGP";

export type AnalyticsStatus = "success" | "error" | "attempt" | "empty" | "applied" | "removed";

export type AnalyticsEventName =
  | "product_view"
  | "product_click"
  | "category_view"
  | "search_view"
  | "search_result_click"
  | "filter_apply"
  | "sort_change"
  | "add_to_cart"
  | "remove_from_cart"
  | "cart_view"
  | "begin_checkout"
  | "checkout_submit"
  | "order_success"
  | "add_to_wishlist"
  | "remove_from_wishlist"
  | "language_switch"
  | "newsletter_submit"
  | "contact_submit"
  | "policy_view"
  | "web_vital";

export interface AnalyticsBasePayload {
  locale?: string;
  route?: string;
  status?: AnalyticsStatus;
}

export interface AnalyticsCommercePayload extends AnalyticsBasePayload {
  productId?: string;
  categoryKey?: string;
  price?: number;
  currency?: AnalyticsCurrency;
  cartValue?: number;
  itemCount?: number;
}

export interface AnalyticsDiscoveryPayload extends AnalyticsCommercePayload {
  queryLength?: number;
  filterKey?: string;
  filterValue?: string | number;
  sort?: string;
  resultCount?: number;
}

export interface AnalyticsWebVitalPayload extends AnalyticsBasePayload {
  metricName: string;
  metricId: string;
  value: number;
  rating?: string;
  navigationType?: string;
}

export type AnalyticsEventPayloadMap = {
  product_view: AnalyticsCommercePayload;
  product_click: AnalyticsCommercePayload;
  category_view: AnalyticsDiscoveryPayload;
  search_view: AnalyticsDiscoveryPayload;
  search_result_click: AnalyticsDiscoveryPayload;
  filter_apply: AnalyticsDiscoveryPayload;
  sort_change: AnalyticsDiscoveryPayload;
  add_to_cart: AnalyticsCommercePayload;
  remove_from_cart: AnalyticsCommercePayload;
  cart_view: AnalyticsCommercePayload;
  begin_checkout: AnalyticsCommercePayload;
  checkout_submit: AnalyticsCommercePayload;
  order_success: AnalyticsCommercePayload;
  add_to_wishlist: AnalyticsCommercePayload;
  remove_from_wishlist: AnalyticsCommercePayload;
  language_switch: AnalyticsBasePayload & { fromLocale?: string; toLocale?: string };
  newsletter_submit: AnalyticsBasePayload;
  contact_submit: AnalyticsBasePayload;
  policy_view: AnalyticsBasePayload & { policySlug?: string };
  web_vital: AnalyticsWebVitalPayload;
};

export type AnalyticsEvent<TName extends AnalyticsEventName = AnalyticsEventName> = {
  name: TName;
  payload: AnalyticsEventPayloadMap[TName];
};
