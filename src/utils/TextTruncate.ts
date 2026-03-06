export const TextTruncate = (
  text?: string | null,
  maxLength = 160
): string => {
  if (!text) return "";

  const cleanText = text.trim();

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return cleanText.slice(0, maxLength).trim() + "...";
};
