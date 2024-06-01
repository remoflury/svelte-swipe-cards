import { SvelteComponent } from "svelte";
import type { IntRange } from './types';
declare const __propDef: {
    props: {
        [x: string]: any;
        allowedDirections?: "all" | "horizontal" | "vertical" | undefined;
        threshold?: IntRange<0, 101> | undefined;
        transitionDuration?: number | undefined;
        index: number;
    };
    events: {
        swipe: CustomEvent<any>;
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
}
export {};
