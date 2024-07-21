<script>
	import { SwipeDeck, SwipeCard } from '$lib/index';

	export let data;
	const cards = data.products;

	console.log(data.products);
</script>

<section class="section">
	<h1>Svelte Swipe Card</h1>
	<SwipeDeck
		{cards}
		let:card
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
</style>
