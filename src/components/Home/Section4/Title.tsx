"use client"
import { motion } from "motion/react"

function Title() {
    return (
        <div>
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
                className="flex items-center gap-x-3 justify-center mb-5">
                <span className="h-0.5 bg-primary w-10"></span>
                <h4 className="font-figtree text-black font-medium text-lg md:text-xl">Flexible Pricing Plan</h4>
            </motion.div>

            <div className="text-zinc-800 text-center space-y-5 mb-12">
                <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{
                        opacity: 1,
                        y: 0,
                        transition: {
                            duration: 0.5,
                        },
                    }}
                    viewport={{ once: true }}
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold font-figtree max-w-xs mx-auto md:max-w-full">Our Pricing Plan Made Simple</motion.h2>
                <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{
                    opacity: 1,
                    y: 0,
                    transition: {
                        duration: 0.5,
                        delay : 0.1
                    }
                    
                }}
                viewport={{once : true}}
                className="font-figtree text-sm md:text-base text-zinc-600 max-w-md md:max-w-lg mx-auto">
                    All types of businesses need access to development resources, so we give you the option to decide how much you need to use.
                </motion.p>
            </div>
        </div>
    )
}

export default Title