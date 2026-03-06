"use client";
import { useTranslations } from "next-intl";
import CountUp from "react-countup";

export default function Section5() {

    const t = useTranslations("Home.section5");

    return (
        <section className="relative w-full bg-primary">

            <div className="container grid grid-cols-2 lg:grid-cols-4 gap-x-5 gap-y-10 items-center py-10 md:py-14 lg:py-16">
                <div className="space-y-2">
                    <h6 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold font-popin"><CountUp end={8000} duration={2} enableScrollSpy={true} scrollSpyOnce />+</h6>
                    <p className="text-sm md:text-base lg:text-lg font-medium text-white font-popin">{t("pb_ads")}</p>
                </div>
                <div className="space-y-2">
                    <h6 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold font-popin"><CountUp end={20065} duration={2} enableScrollSpy={true} scrollSpyOnce />+</h6>
                    <p className="text-sm md:text-base lg:text-lg font-medium text-white font-popin">{t("rs_user")}</p>
                </div>
                <div className="space-y-2">
                    <h6 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold font-popin"><CountUp end={15000} duration={2} enableScrollSpy={true} scrollSpyOnce />+</h6>
                    <p className="text-sm md:text-base lg:text-lg font-medium text-white font-popin">{t("vs")}</p>
                </div>
                <div className="space-y-2">
                    <h6 className="text-2xl md:text-3xl lg:text-4xl text-white font-bold font-popin"><CountUp end={18000} duration={2} enableScrollSpy={true} scrollSpyOnce />+</h6>
                    <p className="text-sm md:text-base lg:text-lg font-medium text-white font-popin">{t("vc")}</p>
                </div>
            </div>

        </section>
    );
}
