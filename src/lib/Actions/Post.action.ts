"use server"

import { revalidateTag } from "next/cache"
import { PostNewAdd, UpdateAdd } from "../services/Mutation.Ad";

export const postNewAdd = async ({ payload, endPoint, tags }: { payload: FormData | string, endPoint: string, tags: string[] }) => {

    const res = await PostNewAdd({ payload, endPoint });

    for (let tag of tags) {
        revalidateTag(tag, "max");
    }

    return res;
}

export const updateAdd = async ({ payload, endPoint, tags }: { payload: FormData, endPoint: string, tags: string[] }) => {

    const res = await UpdateAdd({ payload, endPoint });

    for (let tag of tags) {
        revalidateTag(tag, "max");
    }

    return res;
}