<script lang="ts">
	import { SwipeDeck } from '$lib/index';
	import type { SvelteComponent } from 'svelte';

	export let data;
	const cards = data.products;

	let deck: SvelteComponent;
</script>

<section class="section">
	<h1>Svelte Swipe Card</h1>
	<SwipeDeck deckClass="deck" class="card" {cards} let:card threshold={30} transitionDuration={500}>
		<p>{card.id}</p>
		<p>{card.title}</p>
	</SwipeDeck>
</section>
<section class="section">
	<h1>Svelte Swipe Card</h1>
	<SwipeDeck
		deckClass="deck"
		class="card"
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
			<button on:click={() => deck.swipe('left')}>Swipe Left</button>
			<button on:click={() => deck.swipe('right')}>Swipe Right</button>
			<button on:click={() => deck.swipe('up')}>Swipe Up</button>
			<button on:click={() => deck.swipe('down')}>Swipe Down</button>
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

	:global(.deck) {
		margin-top: 1rem;
	}

	:global(.card) {
		padding: 1rem;
		border: red 1px solid;
		aspect-ratio: 16/9;
		background-color: white;
	}
</style>
