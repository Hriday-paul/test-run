import { config } from "@/utils/config";
import { tags } from "../Tags";

export const GetPlans = async () => {
    try {
        const response = await fetch(
            config.serverBaseApi + `/packages`,
            {
                next: {
                    tags: [tags.packages],
                },
            }
        );
        if (!response.ok) {
            // This will activate the closest `error.js` Error Boundary
            throw new Error("Failed to load data");
        }
        const res = response.json();
        return res;
    } catch (err) {
        throw err;
    }
};