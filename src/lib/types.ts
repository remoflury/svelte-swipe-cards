import type { Writable } from "svelte/store";

export type AllowedDirections = "all" | "horizontal" | "vertical"

type Enumerate<N extends number, Acc extends number[] = []> = Acc['length'] extends N
  ? Acc[number]
  : Enumerate<N, [...Acc, Acc['length']]>;

export type IntRange<F extends number, T extends number> = Exclude<Enumerate<T>, Enumerate<F>>;

export type SwipeDeckStoreProps = {
  currentIndex: number;
  height: number | null;
}

export interface SwipeDeckStore extends Writable<SwipeDeckStoreProps> {
  setHeight: (height: number) => void;
  setIndex: (index: number) => void;
}
