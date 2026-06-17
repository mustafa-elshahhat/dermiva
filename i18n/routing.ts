import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // English and Arabic. English is the default locale.
  locales: ["en", "ar"],
  defaultLocale: "en",
  // Always show the locale in the URL (/en, /ar) so both are explicit.
  localePrefix: "always",
});

export type Locale = (typeof routing.locales)[number];
