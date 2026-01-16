import { config } from "@/utils/config";
import { cookies } from "next/headers";

export const PostNewAdd = async ({ payload, endPoint }: { payload: FormData | string, endPoint: string }) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(
        config.serverBaseApi + endPoint,
        {
            method: "POST",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Failed to post new ad"
        );
    }

    return await response.json();
};

export const UpdateAdd = async ({ payload, endPoint }: { payload: FormData, endPoint: string }) => {
    const cookieStore = await cookies()
    const token = cookieStore.get("accessToken")?.value;

    const response = await fetch(
        config.serverBaseApi + endPoint,
        {
            method: "PATCH",
            headers: {
                Authorization: `Bearer ${token}`,
            },
            body: payload
        }
    );

    if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        throw new Error(
            errorData?.message || "Failed to update ad"
        );
    }

    return await response.json();
};