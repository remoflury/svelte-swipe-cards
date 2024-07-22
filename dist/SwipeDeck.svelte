<script>import { onMount } from "svelte";
import { SwipeCard } from "./index";
export let cards;
export let deckClass = "";
export let threshold = 50;
export let transitionDuration = 150;
export let allowedDirections = "all";
let cardComponents = [];
let deckElem;
let maxCardHeight = 0;
const setMaxHeight = () => {
  const cards2 = deckElem.querySelectorAll("[data-swipe-card]");
  maxCardHeight = Math.max(...Array.from(cards2).map((card) => card.clientHeight)) ?? 0;
};
export const swipeCard = (index, direction) => {
  if (cardComponents[index]) {
    cardComponents[index].swipe(direction);
  }
};
onMount(() => {
  setMaxHeight();
});
</script>

<svelte:window on:resize={setMaxHeight} />

<ul
	class={deckClass}
	bind:this={deckElem}
	style:min-height="{deckElem?.clientHeight + maxCardHeight}px"
>
	{#each cards as card, index}
		<SwipeCard
			{index}
			{threshold}
			{transitionDuration}
			{allowedDirections}
			class={$$props.class}
			bind:this={cardComponents[index]}
			on:move_down
			on:move_left
			on:move_right
			on:move_up
			on:swipe
		>
			<slot {card} />
		</SwipeCard>
	{/each}
</ul>

<slot name="swipe-btn" />

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
	}

	ul {
		position: relative;
		isolation: isolate;
		list-style: none;
		padding: 0;
	}

	:global(body) {
		overflow-x: hidden;
	}
</style>
