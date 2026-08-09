"use client";

import { useRouter } from "@/i18n/navigation";
import { useSearchParams } from "next/navigation";

export function UseUpdatePaginationSearchParams() {
  const searchParams = useSearchParams();
  const router = useRouter();

  return (key: string, value: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    console.log("=============current searchparams=============", params.toString());

    if (value === null) {
      params.delete(key);
    } else {
      params.set(key, value);
    }

    const url = `?${params.toString()}`;
    router.push(url, { scroll: true }); // Prevent auto-scroll
  };

}