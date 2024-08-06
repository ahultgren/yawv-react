export function range(from: number, to: number): ReadonlyArray<number> {
  return [...Array(to - from).keys()].map((i) => i + from);
}
