
import { config } from "@/utils/config";
import { cookies } from "next/headers";

export const serverQueryWithReauth = async ({ payload, endPoint, method }: { payload: FormData | string, endPoint: string, method: string }) => {
    const cookieStore = await cookies()
    const accessToken = cookieStore.get("accessToken")?.value;
    const refreshToken = cookieStore.get('refreshToken')?.value;

    const makeRequest = async (token?: string) => {
        
        return fetch(
            config.serverBaseApi + endPoint,
            {
                method,
                headers: {
                    ...(token ? { Authorization: `Bearer ${token}` } : {}),

                    ...(typeof payload === "string"
                        ? { "Content-Type": "application/json" }
                        : {}),

                },
                body: payload
            }
        );
    };

    let response = await makeRequest(accessToken);

    if (!response.ok && response.status === 401 && refreshToken) {

        const refreshResponse = await fetch(config.serverBaseApi + '/auth/refresh', {
            method: 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ refreshToken }),
        });

        if (refreshResponse.ok) {
            const data = await refreshResponse.json();
            const newAccessToken = data?.data?.accessToken;
            const newRefreshToken = data?.data?.refreshToken;

            // Save new access token cookie
            cookieStore.set('accessToken', newAccessToken, {
                httpOnly: false,
                maxAge: 14 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });
            cookieStore.set('refreshToken', newRefreshToken, {
                httpOnly: false,
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
                sameSite: 'lax',
                secure: config.hasSSL,
            });

            // Retry original request with new token
            response = await makeRequest(newAccessToken);
        } else {
            // Logout logic: remove cookies
            cookieStore.delete('accessToken');
            cookieStore.delete('refreshToken');
            // Optionally, send redirect info to client
            const errorData = await refreshResponse.json().catch(() => null);
            return { error: errorData?.message || "Request Failed, try again", redirect: '/login' };
        }

    } else if (!response.ok) {
        const errorData = await response.json().catch(() => null);

        return { error: errorData?.message || "Request Failed, try again", redirect: null };
    }

    return await response.json();
};