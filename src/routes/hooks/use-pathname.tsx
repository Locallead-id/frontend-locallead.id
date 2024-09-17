import { useMemo } from "react";
import { useLocation } from "react-router-dom";

// Untuk mengambil pathname/url aktif

export function usePathname() {
  const { pathname } = useLocation();

  return useMemo(() => pathname, [pathname]);
}
