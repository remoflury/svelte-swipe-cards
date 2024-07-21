<script lang="ts">
	import { SwipeDeck, SwipeCard } from '$lib/index';
	import type { SvelteComponent } from 'svelte';

	export let data;
	let deck: SvelteComponent;
	let currentIndex = 0;
	const cards = data.products;

	console.log(data.products);

	function handleSwipe(index: number, direction: string) {
		deck.swipeCard(index, direction);
		currentIndex++;
	}
</script>

<section class="section">
	<h1>Svelte Swipe Card</h1>
	<SwipeDeck
		bind:this={deck}
		{cards}
		let:card
		threshold={30}
		transitionDuration={500}
		on:swipe={(e) => console.log(e.detail.index)}
		on:swipe_right={(e) => console.log(e.detail.index)}
		on:swipe_left={(e) => console.log(e.detail.index)}
		on:swipe_up={(e) => console.log(e.detail.index)}
		on:swipe_down={(e) => console.log(e.detail.index)}
		on:move_left={(e) => console.log(e.detail.index)}
		on:move_right={(e) => console.log(e.detail.index)}
		on:move_up={(e) => console.log(e.detail.index)}
		on:move_down={(e) => console.log(e.detail.index)}
	>
		<p>{card.id}</p>
		<p>{card.title}</p>
		<svelte:fragment slot="swipe-btn">
			<button on:click={() => handleSwipe(currentIndex, 'right')}>Swipe Right</button>
			<button on:click={() => handleSwipe(currentIndex, 'left')}>Swipe Left</button>
			<button on:click={() => handleSwipe(currentIndex, 'up')}>Swipe up</button>
			<button on:click={() => handleSwipe(currentIndex, 'down')}>Swipe down</button>
		</svelte:fragment>
	</SwipeDeck>
</section>

<style>
	:global(*, *::before, *::after) {
		box-sizing: border-box;
		margin: 0;
	}

	.section {
		padding-block: 20px;
		margin-inline: 1rem;
	}

	:global(.card) {
		padding: 1rem;
		border: red 1px solid;
		aspect-ratio: 16/9;
		background-color: white;
	}

	:global(body) {
		overflow-x: hidden;
	}
</style>
