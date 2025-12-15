"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Checkbox } from "@/components/ui/checkbox"
import { useAllDivisionsQuery } from "@/redux/api/locations.api";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Skeleton } from "../ui/skeleton";
import { ExchangeCategory } from "@/utils/config";


function ExchangeFilter() {
    const { isLoading, data } = useAllDivisionsQuery();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const selecteddivisions = searchParams.get("division")?.split(",") || [];
    const category = searchParams.get("category")?.split(",") || [];
    const condition = searchParams.get("condition")?.split(",") || [];

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


    return (
        <div className="space-y-5">

            {/* ------------- condition filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="condition">
                <AccordionItem value="condition">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Condition</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3 max-h-96 overflow-y-auto">
                        {
                            ["New", "Used"].map(i => {
                                const isChecked = condition.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("condition", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{i}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* ------------- category filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="category">
                <AccordionItem value="category">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Category</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3 max-h-80 overflow-y-auto">
                        {
                            ExchangeCategory.map(i => {
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


            {/* -----------------division------------- */}
            {isLoading ? <Skeleton className="h-60 w-full rounded-lg bg-zinc-200" /> : <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="division">
                <AccordionItem value="division">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Location</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            data?.data?.divisions?.map(i => {
                                const isChecked = selecteddivisions.includes(i?.name);
                                return <div key={i?.id} className="flex items-center gap-3">
                                    <Checkbox id={i?.id.toString()} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("division", i?.name)} />
                                    <label htmlFor={i?.id.toString()} className="font-popin text-base cursor-pointer">{i?.name}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>}


        </div>
    )
}

export default ExchangeFilter

