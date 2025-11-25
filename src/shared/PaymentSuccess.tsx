"use client"

import { useEffect } from "react"
import { motion } from "motion/react"
import confetti from "canvas-confetti"
import { CheckCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

function PaymentSuccess() {

    useEffect(() => {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 },
        })
    }, [])


    return (

        <div>

            <div className="min-h-[70vh] flex items-center justify-center p-4 ">
                <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
                    <div className="w-full max-w-md bg-gradient-to-b from-green-50 to-green-100 p-10 rounded-md space-y-8 font-popin border border-stroke">
                        <div>
                            <div className="text-center text-2xl font-bold text-green-600 flex items-center justify-center font-popin">
                                <CheckCircle className="mr-2" />
                                Payment Successful!
                            </div>
                        </div>
                        <div>
                            <p className="text-center text-gray-600 mb-6 font-popin">
                                Thank you for your payment. Your payment has been processed successfully.
                            </p>
                        </div>
                        <div className="flex flex-row gap-x-4 items-center">
                            <Link href="/" className="w-1/2">
                                <Button className="w-full cursor-pointer">Return to Home</Button>
                            </Link>
                            <Link href='/profile' className="w-1/2">
                                <Button className="w-full bg-green-700 hover:bg-success hover:bg-opacity-90 duration-200 cursor-pointer">Go Profile</Button>
                            </Link>
                        </div>
                    </div>

                </motion.div>
            </div>

        </div>
    )
}



export default PaymentSuccess;