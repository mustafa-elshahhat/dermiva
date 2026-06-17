// Dermiva – centralised social media links data source.
// This single list is the source of truth for every component that
// renders social icons (footer, contact page, etc.).
//
// Note: replace the "#" hrefs below with Dermiva's official profile URLs
// as they become available. The WhatsApp link uses the support number
// published on the contact page. Keep all entries so the UI stays in sync.

export interface SocialLink {
  /** Unique identifier, also used to resolve the icon path. */
  id: "whatsapp" | "facebook" | "instagram" | "telegram" | "tiktok";
  /** Human-readable network name (used for alt text / aria-label). */
  label: string;
  /** Destination URL. */
  href: string;
  /** Icon asset under /public/icons/social. */
  icon: string;
}

export const SOCIAL_LINKS: SocialLink[] = [
  {
    id: "whatsapp",
    label: "WhatsApp",
    href: "https://wa.me/201001234567",
    icon: "/icons/social/whatsapp.svg",
  },
  {
    id: "facebook",
    label: "Facebook",
    href: "#",
    icon: "/icons/social/facebook.svg",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "#",
    icon: "/icons/social/instagram.svg",
  },
  {
    id: "telegram",
    label: "Telegram",
    href: "#",
    icon: "/icons/social/telegram.svg",
  },
  {
    id: "tiktok",
    label: "TikTok",
    href: "#",
    icon: "/icons/social/tiktok.svg",
  },
];
