import { config } from "@/utils/config";

const GetSimilarAd = async ({ id }: { id: string }) => {
    try {
        const response = await fetch(
            config.serverBaseApi + `/ads/similar/${id}`,
            {
                next: { revalidate: 10 }
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

export default GetSimilarAd;