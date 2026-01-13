export const tagKeys = ["feature_add", "my_ads", "cars"] as const;

export type TagKey = typeof tagKeys[number];

export const tags: Record<TagKey, string> = {
  feature_add: "feature-ads",
  my_ads: "my_ads",
  cars: "cars",
};
