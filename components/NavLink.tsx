"use client";

import React from "react";
import { Link, usePathname } from "@/i18n/navigation";

function isCurrentPath(current: string, href: string): boolean {
  if (href === "/") return current === "/";
  return current === href;
}

export default function NavLink({
  href,
  children,
  className,
  onClick,
  style,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  style?: React.CSSProperties;
}) {
  const pathname = usePathname();
  const current = isCurrentPath(pathname, href);

  return (
    <Link
      href={href}
      className={className}
      onClick={onClick}
      aria-current={current ? "page" : undefined}
      style={style}
    >
      {children}
    </Link>
  );
}
