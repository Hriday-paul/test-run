"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Checkbox } from "@/components/ui/checkbox"
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Skeleton } from "../ui/skeleton";
import RangeFilter from "@/shared/RangeFilter";
import { useMaxcarsCountQuery } from "@/redux/api/ads.api";
import { Carbrands } from "@/utils/config";
import { useTranslations } from "next-intl";

function CarFilter() {
    const { isLoading: countLoading, data: countdata } = useMaxcarsCountQuery();
    const searchParams = useSearchParams();
    const router = useRouter();

    const t = useTranslations("car_buy.filter")

    const pathname = usePathname();

    const selectedConditions = searchParams.get("condition")?.split(",") || [];
    const selectedbrands = searchParams.get("brand")?.split(",") || [];

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

    const conditions = [
        {
            id: 1,
            label: "condition.new",
            value: "New"
        },
        {
            id: 2,
            label: "condition.used",
            value: "Used"
        },
    ]

    return (
        <div className="space-y-5">

            {/* ------------- condition filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("condition.title")}</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            conditions.map(i => {
                                const isChecked = selectedConditions.includes(i?.value);
                                return <div key={i?.id} className="flex items-center gap-3">
                                    <Checkbox id={i?.value} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("condition", i?.value)} />
                                    <label htmlFor={i?.value} className="font-popin text-base cursor-pointer">{t(i?.label)}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* --------------mileage filter-------------- */}
            {countLoading ? <Skeleton className="h-40 w-full rounded-lg bg-zinc-200" /> : <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="mileage">
                <AccordionItem value="mileage">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("km.title")}</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {countdata && <RangeFilter min={0} max={countdata?.data?.maxMileage?._max?.mileage} defaultMax={countdata?.data?.maxMileage?._max?.mileage} defaultMin={0} minQueryKey="minMileage" maxQueryKey="maxMileage" />}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>}

            {/* --------------price filter-------------- */}
            {countLoading ? <Skeleton className="h-40 w-full rounded-lg bg-zinc-200" /> : <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="price">
                <AccordionItem value="price">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("price.title")}</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {countdata && <RangeFilter min={0} max={countdata?.data?.maxPrice?._max?.price} defaultMax={countdata?.data?.maxPrice?._max?.price} defaultMin={0} minQueryKey="minPrice" maxQueryKey="maxPrice" />}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>}

            {/* --------------brand filter-------------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="brand">
                <AccordionItem value="brand">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("brand.title")}</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3 max-h-72 overflow-y-auto">
                        {
                            Carbrands.map(i => {
                                const isChecked = selectedbrands.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("brand", i)} />
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

export default CarFilter

