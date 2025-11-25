
import { XCircle } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link";

const Page = () => {

    return (
        <div className="min-h-[70vh] flex items-center justify-center p-4">
            <div>
                <div className="w-full max-w-md bg-gradient-to-b from-red-50 to-red-100 p-10 rounded-md space-y-8 font-popin border border-stroke">
                    <div>
                        <div className="text-center text-2xl font-bold text-red-600 flex items-center justify-center font-popin">
                            <XCircle className="mr-2" />
                            Payment Cancelled
                        </div>
                    </div>
                    <div>
                        <p className="text-center text-gray-600 mb-6 font-popin">
                            Your payment has been cancelled. No charges have been made to your account.
                        </p>
                    </div>
                    <div className="flex flex-row space-x-2">
                        <Link href="/#pricing" className="w-full">
                            <Button className="w-full bg-red-600 hover:bg-red-700 cursor-pointer">Return to Purchase</Button>
                        </Link>
                        <Link href="/" className="w-full">
                            <Button className="w-full cursor-pointer">
                                Go to Home
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
};

export default Page;