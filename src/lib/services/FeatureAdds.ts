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
