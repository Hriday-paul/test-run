import PaymentSuccess from "@/shared/PaymentSuccess";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Payment Success",
    description: "Runbd Payment Success",
    robots: {
        index: false,
        follow: false,
        nocache: false,
        googleBot: {
            index: false,
            follow: false,
            noimageindex: true,
        },
    }
}

export default function Page() {
    

    return (
        <div>
            <PaymentSuccess />
        </div>
    )
}

