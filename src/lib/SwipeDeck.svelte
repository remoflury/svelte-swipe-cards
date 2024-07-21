<script lang="ts">
	import type { IntRange } from './types';
	import { onMount } from 'svelte';
	import { SwipeCard } from '$lib/index';

	export let cards: any[];
	export let threshold: IntRange<0, 101> = 50;
	export let transitionDuration: number = 150;
	let cardComponents: any[] = [];

	let deckElem: HTMLUListElement;
	let maxHeight = 0;

	const setMaxHeight = () => {
		const cards = deckElem.querySelectorAll('[data-swipe-card]');
		maxHeight = Math.max(...Array.from(cards).map((card) => card.clientHeight)) ?? 0;
	};

	export const swipeCard = (index: number, direction: 'left' | 'right' | 'up' | 'down') => {
		if (cardComponents[index]) {
			cardComponents[index].swipe(direction);
		}
	};

	onMount(() => {
		setMaxHeight();
	});
</script>

<svelte:window on:resize={setMaxHeight} />
<ul class={$$props.class} bind:this={deckElem} style:height="{maxHeight}px">
	{#each cards as card, index}
		<SwipeCard
			class="card"
			{index}
			{threshold}
			{transitionDuration}
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
</style>
