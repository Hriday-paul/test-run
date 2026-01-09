export const TextTruncate = (
  text?: string | null,
  maxLength = 160
): string | undefined => {
  if (!text) return undefined;
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + "...";
};
