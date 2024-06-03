<script>
	import { SwipeDeck, SwipeCard } from '$lib/index';

	export let data;
	const cards = data.products;

	console.log(data.products);
</script>

<section class="section">
	<h1>Svelte Swipe Card</h1>
	<SwipeDeck>
		{#each cards as card, index (card.id)}
			<SwipeCard
				class="card"
				{index}
				threshold={30}
				on:swipe={() => console.log('swipe')}
				on:swipe_right={() => console.log('right')}
				on:swipe_left={() => console.log('left')}
				on:swipe_up={() => console.log('up')}
				on:swipe_down={() => console.log('down')}
				on:move_left={() => console.log('move left')}
				on:move_right={() => console.log('move right')}
				on:move_up={() => console.log('move up')}
				on:move_down={() => console.log('move down')}
			>
				<p>{card.id}</p>
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
