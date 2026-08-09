"use client";

import { useRouter, usePathname } from "@/i18n/navigation";

export function useUpdateMultipleSearchParams(targetId?: string) {
  const router = useRouter();
  const pathname = usePathname();

  const updateMultiple = (updates: Record<string, string | null>) => {
    // dynamically get the current search params
    const currentParams = new URLSearchParams(window.location.search);

    Object.entries(updates).forEach(([key, value]) => {
      if (value === null) currentParams.delete(key);
      else currentParams.set(key, value);
    });

    router.push(`${pathname}?${currentParams.toString()}`, { scroll: false });

    // optional scroll to element
    setTimeout(() => {
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50);
  };

  return updateMultiple;
}
