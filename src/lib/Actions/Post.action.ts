"use server"

import { revalidateTag } from "next/cache"
import { serverQueryWithReauth } from "../services/Mutation.Ad";

export const postNewAdd = async ({ payload, endPoint, tags }: { payload: FormData | string, endPoint: string, tags: string[] }) => {

    const res = await serverQueryWithReauth({ payload, endPoint, method : "POST" });

    for (let tag of tags) {
        revalidateTag(tag, "max");
    }

    return res;
}

export const updateAdd = async ({ payload, endPoint, tags }: { payload: FormData | string, endPoint: string, tags: string[] }) => {

    const res = await serverQueryWithReauth({ payload, endPoint, method : "PATCH" });

    for (let tag of tags) {
        revalidateTag(tag, "max");
    }

    return res;
}

export const DeleteAdd = async ({ payload, endPoint, tags }: { payload: FormData | string, endPoint: string, tags: string[] }) => {

    const res = await serverQueryWithReauth({ payload, endPoint, method : "DELETE" });

    for (let tag of tags) {
        revalidateTag(tag, "max");
    }

    return res;
}