import { writable, type Writable } from "svelte/store";
import type { SwipeDeckStore, SwipeDeckStoreProps } from "./types";


export const createSwipeDeckStore = (): SwipeDeckStore => {
  const { subscribe, set, update } = writable<SwipeDeckStoreProps>({
    currentIndex: 0,
    height: null,
  });

  const setHeight = (height: number) => {
    update((store) => ({ ...store, height }));
  }

  const setIndex = (index: number) => {
    update((store) => ({ ...store, currentIndex: index }));
  }

  return {
    subscribe,
    set,
    setHeight,
    setIndex,
    update,
  };
}