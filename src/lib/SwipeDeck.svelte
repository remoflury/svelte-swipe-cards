<script lang="ts">
	import type { IntRange } from './types';
	import { onMount } from 'svelte';
	import { SwipeCard } from '$lib/index';

	export let cards: any[];
	export let threshold: IntRange<0, 101> = 50;
	export let transitionDuration: number = 150;

	let deckElem: HTMLUListElement;
	let maxHeight = 0;

	const setMaxHeight = () => {
		const cards = deckElem.querySelectorAll('[data-swipe-card]');
		maxHeight = Math.max(...Array.from(cards).map((card) => card.clientHeight)) ?? 0;
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
