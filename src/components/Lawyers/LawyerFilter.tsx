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
import { lawyerSpecializations } from "@/utils/config";
import { useTranslations } from "next-intl";
import { useSearchParams } from "next/navigation";


function LawyerFilter() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    const t = useTranslations("lawyer.filter")

    const selectedgenders = searchParams.get("gender")?.split(",") || [];
    const selectspecialization = searchParams.get("specialization")?.split(",") || [];

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

            {/* ------------- Specilazation filter--------- */}
            <Accordion type="single" collapsible className="bg-white px-4 rounded-lg border border-stroke" defaultValue="Specilazation">
                <AccordionItem value="Specilazation">
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("specialization.title")}</AccordionTrigger>
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
                    <AccordionTrigger className="text-lg font-popin font-medium hover:no-underline cursor-pointer">{t("gender.title")}</AccordionTrigger>
                    <AccordionContent className="border-t border-stroke pt-4 space-y-3">
                        {
                            ["Male", "Female"].map(i => {
                                const isChecked = selectedgenders.includes(i);
                                return <div key={i} className="flex items-center gap-3">
                                    <Checkbox id={i} className="size-5 cursor-pointer" checked={isChecked} onCheckedChange={() => updateQueryParam("gender", i)} />
                                    <label htmlFor={i} className="font-popin text-base cursor-pointer">{t(`gender.${i}`)}</label>
                                </div>
                            })
                        }
                    </AccordionContent>
                </AccordionItem>
            </Accordion>

        </div>
    )
}

export default LawyerFilter

