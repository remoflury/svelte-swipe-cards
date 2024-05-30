import type { AllowedDirections } from "./types";

export const setPos = (setPosX: number, setPosY: number, allowedDirections: AllowedDirections) => {
  let x;
  let y;
  switch (allowedDirections) {
    case 'horizontal':
      x = setPosX;
      y = 0;
      break;
    case 'vertical':
      x = 0;
      y = setPosY;
      break;
    case 'all':
    default:
      x = setPosX;
      y = setPosY;
      break;
  }
  return { x, y };
};
export const getCurrentPos = (event: MouseEvent | TouchEvent) => {
  if (event instanceof MouseEvent) {
    return {
      x: event.clientX,
      y: event.clientY
    };
  }

  return {
    x: event.touches[0].clientX,
    y: event.touches[0].clientY
  };
};

export const getDirection = (pos: number, direction: 'x' | 'y'): 'left' | 'right' | 'up' | 'down' | undefined => {
  if (pos < 0 && direction === 'x') return 'left';
  if (pos > 0 && direction === 'x') return 'right';
  if (pos < 0 && direction === 'y') return 'up';
  if (pos > 0 && direction === 'y') return 'down';
  return undefined
}
