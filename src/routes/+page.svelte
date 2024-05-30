<script>
	import { SwipeDeck, SwipeCard } from '$lib/index';

	export let data;
	const cards = data.products;

	console.log(data.products);
</script>

<section class="section">
	<h1>Svelte Swipe Card</h1>
	<SwipeDeck>
		{#each cards.slice(0, 1) as card (card.id)}
			<SwipeCard class="card" threshold={50}>
				<!-- on:move_down={() => console.log('doooown')}
				on:move_up={() => console.log('uuuup')}
				on:move_left={() => console.log('leeeft')}
				on:move_right={() => console.log('riiiight')} -->
				<p>{card.title}</p>
			</SwipeCard>
		{/each}
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
		aspect-ratio: 1/1;
		background-color: white;
	}
</style>
