"use client"
import { motion } from "motion/react"

function Title({subtitle, title}:{subtitle : string, title : string}) {
    return (
        <div className="pb-8 lg:pb-10 xl:pb-12 space-y-2 md:space-y-3">
            <motion.div
                initial={{ y: 20 }}
                whileInView={{
                    y: 0,
                    transition: {
                        duration: 1,
                        type: "spring"
                    },
                }}
                viewport={{ once: true }}
                className="flex items-center gap-x-3 justify-center">

                <h4 className="font-figtree text-primary font-medium text-sm bg-primary/10 px-2.5 py-0.5 rounded">{subtitle}</h4>
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
                {title?.split("").map((i, indx) => {
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
            
            <motion.div
                initial={{ width : 0 }}
                whileInView={{
                    width: "80px",
                    transition: {
                        duration: 0.8,
                        type: "spring"
                    },
                }}
                viewport={{ once: true }}
                className="h-0.5 bg-primary mx-auto mt-5"></motion.div>
        </div>
    )
}

export default Title