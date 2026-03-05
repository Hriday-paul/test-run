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
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";


function JobFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const t = useTranslations("job.filter")

    const selectedJobTypes = searchParams.get("jobType")?.split(",") || [];
    const selecteemployment_types = searchParams.get("employmentType")?.split(",") || [];

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

            {/* ------------- job type filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="Job Type">
                <AccordionItem value="Job Type">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("job_type.title")}</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            ["Onsite", "Remote"].map(i => {
                                const isChecked = selectedJobTypes.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("jobType", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{t(`job_type.${i}`)}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

            {/* ------------- employment type filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="bike_type">
                <AccordionItem value="bike_type">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("employment_type.title")}</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            ["Fulltime", "Parttime"].map(i => {
                                const isChecked = selecteemployment_types.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("employmentType", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{t(`employment_type.${i}`)}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default JobFilter

