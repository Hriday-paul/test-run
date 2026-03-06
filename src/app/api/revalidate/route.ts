import { NextRequest, NextResponse } from "next/server";
import { revalidateTag } from "next/cache"
import { tags as builtInTags } from "@/lib/Tags";

export async function POST(req: NextRequest) {
    try {
        const body = await req.json();

        const { tags } = body;

        if (!tags || !Array.isArray(tags)) {
            return NextResponse.json({ message: "Missing tags" }, { status: 400 });
        }

        for (let tag of tags) {
            const findTag = (builtInTags as any)[tag];
            if (!findTag) {
                return NextResponse.json({ message: "Invalid Tag" }, { status: 400 });
            }
            revalidateTag(tag, "max");
        }

        return NextResponse.json({ message: `Tag refreshed successfully` });

    } catch (error: any) {
        return NextResponse.json({ message: error.message || "Error revalidating" }, { status: 500 });
    }
}