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
import RangeFilter from "@/shared/RangeFilter";
import { useMaxBikesCountQuery } from "@/redux/api/ads.api";
import { bikeBrands } from "@/utils/config";


function BikeFilter() {
    const { isLoading, data } = useAllDivisionsQuery();
    const { isLoading: countLoading, data: countdata } = useMaxBikesCountQuery();
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();
    const selectedConditions = searchParams.get("condition")?.split(",") || [];
    const selectedbrands = searchParams.get("brand")?.split(",") || [];
    const selecteddivisions = searchParams.get("division")?.split(",") || [];
    const selectedBikeTypes = searchParams.get("bike_type")?.split(",") || [];

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
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="item-1">
                <AccordionItem value="item-1">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Condition</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            ["New", "Used"].map(i => {
                                const isChecked = selectedConditions.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("condition", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{i}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* ------------- bike type filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="bike_type">
                <AccordionItem value="bike_type">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Bike Type</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            ["Motorcycle", "Scooters", "E-bikes"].map(i => {
                                const isChecked = selectedBikeTypes.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("bike_type", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{i}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* --------------mileage filter-------------- */}
            {countLoading ? <Skeleton className="h-40 w-full rounded-lg bg-zinc-200" /> : <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="mileage">
                <AccordionItem value="mileage">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Kilometers run</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {countdata && <RangeFilter min={0} max={countdata?.data?.maxMileage?._max?.mileage} defaultMax={countdata?.data?.maxMileage?._max?.mileage} defaultMin={0} minQueryKey="minMileage" maxQueryKey="maxMileage" />}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>}

            {/* --------------price filter-------------- */}
            {countLoading ? <Skeleton className="h-40 w-full rounded-lg bg-zinc-200" /> : <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="price">
                <AccordionItem value="price">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Price</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {countdata && <RangeFilter min={0} max={countdata?.data?.maxPrice?._max?.price} defaultMax={countdata?.data?.maxPrice?._max?.price} defaultMin={0} minQueryKey="minPrice" maxQueryKey="maxPrice" />}
                    </AccordionContent>
                </AccordionItem>
            </Accordion>}

            {/* --------------brand filter-------------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="brand">
                <AccordionItem value="brand">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Brand</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3 max-h-72 overflow-y-auto">
                        {
                            bikeBrands.map(i => {
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

export default BikeFilter

