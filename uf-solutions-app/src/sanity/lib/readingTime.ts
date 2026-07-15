export function getReadingTime(
  body: Array<{ _type?: string; children?: Array<{ text?: string }> }> = []
): number {
  const words = body
    .filter((block) => block._type === "block")
    .map((block) =>
      (block.children || [])
        .map((child) => child.text || "")
        .join(" ")
    )
    .join(" ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;

  return Math.max(1, Math.round(words / 200));
}