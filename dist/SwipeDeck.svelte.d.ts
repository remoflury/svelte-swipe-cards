import { SvelteComponent } from "svelte";
declare const __propDef: {
    props: {
        [x: string]: any;
    };
    events: {
        [evt: string]: CustomEvent<any>;
    };
    slots: {
        default: {};
    };
    exports?: undefined;
    bindings?: undefined;
};
export type SwipeDeckProps = typeof __propDef.props;
export type SwipeDeckEvents = typeof __propDef.events;
export type SwipeDeckSlots = typeof __propDef.slots;
export default class SwipeDeck extends SvelteComponent<SwipeDeckProps, SwipeDeckEvents, SwipeDeckSlots> {
}
export {};
