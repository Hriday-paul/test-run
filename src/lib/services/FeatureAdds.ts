import { config } from "@/utils/config";
import { tags } from "../Tags";
import { cookies } from "next/headers";

const GetFeatureAds = async () => {
    try {
        const response = await fetch(
            config.serverBaseApi + `/feature-ads`,
            {
                next: {
                    tags: [tags.feature_add],
                },
            }
        );
        if (!response.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error("Failed to fetch data");
        }
        const res = response.json();
        return res;
    } catch (err) {
        throw err;
    }
};

export default GetFeatureAds;

export const IncludeFeatureAds = async ({ id }: { id: string }) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(
        config.serverBaseApi + `/ads/feature/${id}`,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Failed to add feature ad"
        );
    }

    return await response.json();
};
