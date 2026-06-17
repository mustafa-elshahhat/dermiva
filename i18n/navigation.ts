import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

// Locale-aware navigation APIs. Internal links use these so the active locale
// is preserved automatically (e.g. <Link href="/shop"> -> /en/shop or /ar/shop).
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
