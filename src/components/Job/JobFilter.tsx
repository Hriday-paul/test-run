"use client"
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion"

import { Checkbox } from "@/components/ui/checkbox"
import { useAllDivisionsQuery } from "@/redux/api/locations.api";
import { useRouter, useSearchParams } from "next/navigation";
import { useCallback } from "react";
import { Skeleton } from "../ui/skeleton";
import RangeFilter from "@/shared/RangeFilter";
import { useMaxBikesCountQuery } from "@/redux/api/ads.api";
import { bikeBrands } from "@/utils/config";


function JobFilter() {
    const { isLoading, data } = useAllDivisionsQuery();
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedJobTypes = searchParams.get("jobType")?.split(",") || [];
    const selecteemployment_types = searchParams.get("employmentType")?.split(",") || [];
    const selecteddivisions = searchParams.get("division")?.split(",") || [];

    const updateQueryParam = useCallback(
        (key: string, value: string) => {
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

            // Use shallow routing to prevent scroll to top
            router.replace(`?${params.toString()}`);
        },
        [searchParams, router]
    );


    return (
        <div className="space-y-5">

            {/* ------------- job type filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="Job Type">
                <AccordionItem value="Job Type">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Job Type</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            ["Onsite", "Remote"].map(i => {
                                const isChecked = selectedJobTypes.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("jobType", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{i}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* ------------- employment type filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="bike_type">
                <AccordionItem value="bike_type">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Employment Type</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            ["Fulltime", "Parttime"].map(i => {
                                const isChecked = selecteemployment_types.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("employmentType", i)} />
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

export default JobFilter

