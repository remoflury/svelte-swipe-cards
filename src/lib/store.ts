import { writable } from "svelte/store";

export const cardPropsStore = () => {
  const { subscribe, set, update } = writable({
    maxCardHeight: 0
  });

  const setMaxHeight = (height: number) => {
    update(prev => {
      if (height <= prev.maxCardHeight) return prev
      return { ...prev, maxCardHeight: height }
    })
  }

  return {
    subscribe,
    set,
    update,
    setMaxHeight
  };
}