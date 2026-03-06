"use client"
import { useRouter } from "@/i18n/navigation";
import { motion } from "motion/react"
import { useTranslations } from "next-intl";

const HeroTitle = ({ line1 }: { line1: string }) => {

    const router = useRouter();

    const t = useTranslations('Home');
    const tn = useTranslations("navbar");

    const handlePostAdd = () => {
        router.push(`/vendor/post-ad`);
    }

    return (
        <div className="space-y-2 md:space-y-4 lg:space-y-5 xl:space-y-8 mx-auto flex flex-col justify-center">
            <div
                className="flex items-center justify-center gap-x-3">
                <motion.span
                initial={{ opacity: 0, x: -30 }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.8,
                        type: "spring"
                    },
                }}
                viewport={{ once: true }} className="h-0.5 bg-primary w-10"></motion.span>
                <h4 className="font-figtree text-white font-medium text-sm md:text-base lg:text-lg text-center">{t("section1.smTitle")}</h4>
                <motion.span
                initial={{ opacity: 0, x: 30 }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.8,
                        type: "spring"
                    },
                }}
                viewport={{ once: true }} className="h-0.5 bg-primary w-10"></motion.span>
            </div>

            <div className="mx-auto">
                <motion.h1
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.8,
                            type: "spring"
                        },
                    }}
                    viewport={{ once: true }}
                    className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-figtree font-semibold text-secondary text-white max-w-72 md:max-w-[400px] xl:max-w-[700px] text-center'>
                    {line1}
                    {/* {line1?.split("").map((i, indx) => {
                        return <motion.span initial={{ opacity: 0, x: 30 }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.7,
                                    delay: 0.02 * indx
                                },
                            }}
                            viewport={{ once: true }} key={indx}>{i}</motion.span>
                    })} */}
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.8,
                            type: "spring",
                            delay: 0.05
                        },
                    }}
                    viewport={{ once: true }}
                    className='text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-figtree font-semibold text-white max-w-60 md:max-w-[400px] xl:max-w-[700px] text-center'>
                    {t("section1.title.line2")}
                    {/* {t("section1.title.line2")?.split("").map((i, indx) => {
                        return <motion.span initial={{ opacity: 0, x: 30 }}
                            whileInView={{
                                opacity: 1,
                                x: 0,
                                transition: {
                                    duration: 0.7,
                                    delay: 0.02 * indx
                                },
                            }}
                            viewport={{ once: true }} key={indx}>{i}</motion.span>
                    })} */}
                </motion.h2>
            </div>

            <motion.p
                initial={{ opacity: 0, y: 30 }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.8,
                        type: "spring",
                        delay: 0.07
                    },
                }}
                viewport={{ once: true }}
                className="flex items-center gap-x-3 font-figtree text-white text-sm md:text-base lg:text-lg max-w-xl lg:max-w-2xl text-center">
                {t("section1.subtitle")}
            </motion.p>

            <button
                onClick={handlePostAdd}
                className="bg-white rounded-full hover:bg-primary text-primary hover:text-white text-base font-medium font-popin px-4 py-3 w-40 mx-auto transition-colors duration-200">
                <span>{tn("btn")}</span>

            </button>


        </div>
    );
};

export default HeroTitle