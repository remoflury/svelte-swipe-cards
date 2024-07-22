import { SvelteComponent } from "svelte";
import type { AllowedDirections, Directions, IntRange } from './types';
declare const __propDef: {
    props: {
        [x: string]: any;
        allowedDirections?: AllowedDirections | undefined;
        threshold: IntRange<0, 101>;
        transitionDuration: number;
        index: number;
        swipe?: ((direction: Directions) => void) | undefined;
    };
    events: {
        move_right: CustomEvent<any>;
        move_left: CustomEvent<any>;
        move_down: CustomEvent<any>;
        move_up: CustomEvent<any>;
        swipe: CustomEvent<any>;
        swipe_left: CustomEvent<any>;
        swipe_right: CustomEvent<any>;
        swipe_up: CustomEvent<any>;
        swipe_down: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: undefined;
    bindings?: undefined;
};
export type SwipeCardProps = typeof __propDef.props;
export type SwipeCardEvents = typeof __propDef.events;
export type SwipeCardSlots = typeof __propDef.slots;
export default class SwipeCard extends SvelteComponent<SwipeCardProps, SwipeCardEvents, SwipeCardSlots> {
    get swipe(): (direction: Directions) => void;
}
export {};
