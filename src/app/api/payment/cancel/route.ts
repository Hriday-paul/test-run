import { NextResponse } from "next/server";

export async function POST() {
    try {

        return NextResponse.redirect(
            "https://runbd.org/payment/cancel",
            { status: 302 }
        );
    } catch (error) {
        console.error("SSLCommerz cancel error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
