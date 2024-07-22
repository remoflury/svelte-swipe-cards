import { SvelteComponent } from "svelte";
import type { AllowedDirections, Directions, IntRange } from './types';
declare const __propDef: {
    props: {
        [x: string]: any;
        cards: any[];
        deckClass?: string | undefined;
        threshold?: IntRange<0, 101> | undefined;
        transitionDuration?: number | undefined;
        allowedDirections?: AllowedDirections | undefined;
        swipe?: ((direction: Directions) => void) | undefined;
    };
    events: {
        move_down: CustomEvent<any>;
        move_left: CustomEvent<any>;
        move_right: CustomEvent<any>;
        move_up: CustomEvent<any>;
        swipe: CustomEvent<any>;
    } & {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {
            card: any;
        };
        'swipe-btn': {};
    };
    exports?: undefined;
    bindings?: undefined;
};
export type SwipeDeckProps = typeof __propDef.props;
export type SwipeDeckEvents = typeof __propDef.events;
export type SwipeDeckSlots = typeof __propDef.slots;
export default class SwipeDeck extends SvelteComponent<SwipeDeckProps, SwipeDeckEvents, SwipeDeckSlots> {
    get swipe(): (direction: Directions) => void;
}
export {};
