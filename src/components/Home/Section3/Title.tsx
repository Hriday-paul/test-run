"use client"
import { motion } from "motion/react"

function Title() {
    return (
        <div className="py-10 md:py-14 lg:py-16 xl:py-20 space-y-2 md:space-y-3">
            <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.8,
                        type: "spring"
                    },
                }}
                viewport={{once : true}}
                className="flex items-center gap-x-3 justify-center">
                <span className="h-0.5 bg-primary w-10"></span>
                <h4 className="font-figtree text-black font-medium text-lg md:text-xl">Featured Ads</h4>
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, x: -30 }}
                animate={{
                    opacity: 1,
                    x: 0,
                    transition: {
                        duration: 0.8,
                        type: "spring"
                    },
                }}
                viewport={{ once: true }}
                className='text-2xl md:text-3xl lg:text-4xl font-figtree font-semibold text-black text-center'>
                {"Explore Featured Ads"?.split("").map((i, indx) => {
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
        </div>
    )
}

export default Title