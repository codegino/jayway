export function generateRandomColor(): string {
  // Only generate light colors to ensure text is easy to read
  return `hsl(${Math.random() * 360}, 100%, 75%)`;
}
