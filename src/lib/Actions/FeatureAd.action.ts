"use server"

import { revalidateTag } from "next/cache"
import { tags } from "../Tags"
import { IncludeFeatureAds } from "../services/FeatureAdds"

export const adFeature = async ({ id }: { id: string }) => {
    const res = await IncludeFeatureAds({ id });

    revalidateTag(tags.feature_add, "max");

    return res;
}