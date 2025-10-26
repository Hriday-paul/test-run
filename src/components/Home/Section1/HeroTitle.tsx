"use client"
import { motion } from "motion/react"

const HeroTitle = ({ line1 }: { line1: string }) => {
    return (
        <div className="space-y-5">
            <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.8,
                        type: "spring"
                    },
                }}
                className="flex items-center gap-x-3">
                <span className="h-0.5 bg-primary w-10"></span>
                <h4 className="font-figtree text-white font-medium text-xl">Find Your Dream Property Easily</h4>
            </motion.div>

            <div>
                <motion.h1
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 0.8,
                            type: "spring"
                        },
                    }}
                    viewport={{ once: true }}
                    className='text-xl md:text-2xl lg:text-4xl xl:text-5xl font-figtree font-semibold text-secondary text-white max-w-60 md:max-w-[400px] xl:max-w-[700px]'>
                    {line1?.split("").map((i, indx) => {
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
                    })}
                </motion.h1>

                <motion.h2
                    initial={{ opacity: 0, x: 30 }}
                    whileInView={{
                        opacity: 1,
                        x: 0,
                        transition: {
                            duration: 0.8,
                            type: "spring",
                            delay: 0.2
                        },
                    }}
                    viewport={{ once: true }}
                    className='text-xl md:text-2xl lg:text-4xl xl:text-5xl font-figtree font-semibold text-secondary text-white max-w-60 md:max-w-[400px] xl:max-w-[700px]'>
                    {"All in One Click."?.split("").map((i, indx) => {
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
                    })}
                </motion.h2>
            </div>

            <motion.p
                initial={{ opacity: 0, x: 30 }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.8,
                        type: "spring",
                        delay: 0.3
                    },
                }}
                className="flex items-center gap-x-3 font-figtree text-white text-lg max-w-2xl">
                Skip the hassle and delays — easily buy, sell, or access essential services anytime from one reliable and secure platform.
            </motion.p>


        </div>
    );
};

export default HeroTitle