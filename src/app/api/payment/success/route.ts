import { NextResponse } from "next/server";

export async function POST() {
  try {

    return NextResponse.redirect(
      "https://runbd.org/payment/success",
      { status: 302 }
    );
  } catch (error) {
    console.error("SSLCommerz success error:", error);
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
