export const TextTruncate = (
  text?: string | null,
  maxLength = 160
): string => {
  if (!text) return "";

  const cleanText = text
    // Remove HTML tags
    .replace(/<[^>]*>/g, "")
    // Replace repeated symbols (.... ::::: ---)
    .replace(/([:.!_-]){3,}/g, "$1")
    // Normalize whitespace
    .replace(/\s+/g, " ")
    // Remove invisible characters
    .replace(/[\u200B-\u200D\uFEFF]/g, "")
    .trim();

  if (cleanText.length <= maxLength) {
    return cleanText;
  }

  return cleanText.slice(0, maxLength).trim() + "...";
};
