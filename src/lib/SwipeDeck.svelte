<script lang="ts">
	import { onMount } from 'svelte';

	let deckElem: HTMLDivElement;
	let maxHeight = 0;

	onMount(() => {
		const cards = deckElem.querySelectorAll('[data-swipe-card]');

		maxHeight = Math.max(...Array.from(cards).map((card) => card.clientHeight)) ?? 0;
	});
</script>

<div class={$$props.class} bind:this={deckElem} style:height="{maxHeight}px">
	<slot />
</div>

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
	}

	div {
		position: relative;
	}
</style>
