import { config } from "@/utils/config";

export const GetAdsByCategory = async ({ endPoint, query, tags }: { endPoint: string, query: { [key: string]: string }, tags: string[] }) => {

  try {

    const queryString = query ? `?${new URLSearchParams(query).toString()}` : "";

    const response = await fetch(
      config.serverBaseApi + endPoint + queryString,
      {
        next: {
          tags,
        },
      }
    );

    if (!response.ok) {
      const errorData = await response.json().catch(() => null);

      throw new Error(
        errorData?.message || "Failed to load ads"
      );
    }
    const res = response.json();
    return res;
  } catch (err) {
    throw err;
  }
};