export default function shuffleArray<T>(arr: T[]): T[] {
  return Array.from(arr).sort(() => Math.random() - 0.5);
}
