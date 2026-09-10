// Formats a star rating the French way: one decimal, comma separator.
// 4.9 → "4,9", 5 → "5,0".

export function formatRating(rating: number): string {
  return rating.toFixed(1).replace('.', ',');
}
