import type { AllowedDirections } from "./types";
export declare const setPos: (setPosX: number, setPosY: number, allowedDirections: AllowedDirections) => {
    x: number;
    y: number;
};
export declare const getCurrentPos: (event: MouseEvent | TouchEvent) => {
    x: number;
    y: number;
};
