"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";

export function UseUpdateSearchParams(targetId?: string) {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const url = `?${params.toString()}`;
    router.push(url, { scroll: false }); // Prevent auto-scroll

    // Manually scroll to the section (after the push)
    setTimeout(() => {
      if (targetId) {
        document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
      }
    }, 50); // Delay to ensure layout is updated
  };

}

export function UseUpdateMultipleSearchParams(targetId?: string) {
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
