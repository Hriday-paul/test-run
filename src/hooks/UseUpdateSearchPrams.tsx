"use client";

import { useSearchParams, useRouter } from "next/navigation";

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