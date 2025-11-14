"use client"
import { motion } from "motion/react"

function Title() {
    return (
        <div>
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
                    className="text-3xl md:text-4xl lg:text-5xl font-semibold font-figtree">Our pricing plan made simple</motion.h2>
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
                className="font-figtree text-sm text-zinc-600 max-w-md mx-auto">
                    All types of businesses need access to development resources, so we give you the option to decide how much you need to use.
                </motion.p>
            </div>
        </div>
    )
}

export default Title