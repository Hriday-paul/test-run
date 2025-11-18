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
import { lawyerSpecializations } from "@/utils/config";


function LawyerFilter() {
    const { isLoading, data } = useAllDivisionsQuery();
    const searchParams = useSearchParams();
    const router = useRouter();

    const selectedgenders = searchParams.get("gender")?.split(",") || [];
    const selectspecialization = searchParams.get("specialization")?.split(",") || [];
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

            {/* ------------- Specilazation filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="Specilazation">
                <AccordionItem value="Specilazation">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Specilazation</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3 max-h-96 overflow-y-auto">
                        {
                            lawyerSpecializations.map(i => {
                                const isChecked = selectspecialization.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("specialization", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{i}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* ------------- gender type filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="gender">
                <AccordionItem value="gender">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">Gender</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            ["Male", "Female"].map(i => {
                                const isChecked = selectedgenders.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("gender", i)} />
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

export default LawyerFilter

