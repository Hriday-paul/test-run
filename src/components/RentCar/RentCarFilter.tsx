"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Checkbox } from "@/components/ui/checkbox"
import { usePathname, useRouter } from "@/i18n/navigation";
import { useCallback } from "react";
import { carType } from "@/utils/config";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";


function RentCarFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const t = useTranslations("car_rent.filter")

    const category = searchParams.get("category")?.split(",") || [];

    const updateQueryParam = useCallback(
        (key: string, value: string, targetId?: string) => {
            const currentValues = searchParams.get(key)?.split(",") || [];

            let newValues: string[];
            if (currentValues.includes(value)) {
                newValues = currentValues.filter((v) => v !== value);
            } else {
                newValues = [...currentValues, value];
            }

            const params = new URLSearchParams(searchParams.toString());
            if (newValues.length > 0) {
                params.set(key, newValues.join(","));
                params.set("page", "1"); // Reset page to 1 when a filter is applied
            } else {
                params.delete(key);
            }

           router.push(`${pathname}?${params.toString()}`, { scroll: false });

            // optional scroll to element
            setTimeout(() => {
                if (targetId) {
                    document.getElementById(targetId)?.scrollIntoView({ behavior: "smooth" });
                }
            }, 50);
        },
        [searchParams, router]
    );


    return (
        <div className="space-y-5">

            {/* ------------- category filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="category">
                <AccordionItem value="category">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("category.title")}</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3 max-h-80 overflow-y-auto">
                        {
                            carType.map(i => {
                                const isChecked = category.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("category", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{i}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default RentCarFilter

