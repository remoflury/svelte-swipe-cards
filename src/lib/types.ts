export type AllowedDirections = "all" | "horizontal" | "vertical"
export type Directions = "up" | "down" | "left" | "right"
type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;