# Svelte Swipe Cards
[Svelte Swipe Cards](https://github.com/remoflury/svelte-swipe-cards) is a Svelte component library that allows you to create a Tinder-like swipe card interface. 

## Demo
[Demo](https://svelte.dev/repl/ecba44b882604daaad887605569b4085)

## Features
* Swipe cards in all directions (up, down, left, right)
* Listen to swipe & move events
* Completely customizable with CSS

## Installation
Install the package via npm:
* `npm install svelte-swipe-cards`


## Usage
In your HTML, import SwipeDeck as a wrapper for your cards. TInstantiate the each card with the let:card directive to access the card object in the slot.

```html
<script lang="ts">
  import { SwipeDeck, SwipeCard } from 'svelte-swipe-cards';

  let cards = [
    { id: 1, text: 'Card 1' },
    { id: 2, text: 'Card 2' },
    { id: 3, text: 'Card 3' },
    { id: 4, text: 'Card 4' },
    { id: 5, text: 'Card 5' },
  ];
</script>

```html
<SwipeDeck {cards} let:card>
	<!-- The content of each card: -->
	<p>{card.id}</p>
	<p>{card.title}</p>
</SwipeDeck>
```

Inside of SwipeDeck all cards are automatically passed to the slot. You can style the card wrapper (SwipeDeck) and the cards (SwipeCard) with CSS. Be sure, to use the :global() selector to apply the styles globally, as the styles itself will be applied inside the component.

```html
<SwipeDeck 
  {cards} 
  let:card
  deckClass="card-deck"
  class="card"
>
		<p>{card.id}</p>
		<p>{card.title}</p>
</SwipeDeck>

<style>

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
```

## Events
When a card is swiped, the component emits an event. You can listen to this event and update your data accordingly. 
Moreover, as soon as the card is swiped in a specific direction (relative to the starting position), the component emits an event for that direction. You can listen to these events and update your data or style your component accordingly. You can access the index of the swiped card from the event object.

```html
<SwipeDeck
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
```

## Programatically swipe cards
You can also swipe cards programatically by calling the swipe method on the SwipeDeck component. The method accepts the index of the card to swipe and the direction to swipe the card. The direction can be 'left', 'right', 'up', or 'down'. Pass in the according html into the ```swipe-btn```slot.

```html

<script lang="ts">
	import { SwipeDeck } from '$lib/index';
	import type { SvelteComponent } from 'svelte';

	export let data;
	const cards = data.products;

	let deck: SvelteComponent;
	let currentIndex = 0;

	function handleSwipe(index: number, direction: string) {
		deck.swipeCard(index, direction);
		currentIndex++;
	}
</script>
<SwipeDeck
	bind:this={deck}
	{cards}
	let:card
>
	<p>{card.id}</p>
	<p>{card.title}</p>
	<svelte:fragment slot="swipe-btn">
		<button on:click={() => handleSwipe(currentIndex, 'left')}>Swipe Left</button>
		<button on:click={() => handleSwipe(currentIndex, 'right')}>Swipe Right</button>
		<button on:click={() => handleSwipe(currentIndex, 'up')}>Swipe Up</button>
		<button on:click={() => handleSwipe(currentIndex, 'down')}>Swipe Down</button>
	</svelte:fragment>
</SwipeDeck>
```

## Props
SwipeDeck components accept the following props:
| Prop | Description | type | default |
| --- | --- | --- | --- |
| `cards` | the array of the cards in the deck | any[] (required) | - |
| `deckClass` | pass in your CSS classes to further style the deck-wrapper element |
| `class` | pass in your CSS classes to further style each card element |
| `threshold` | the minimum distance (percentage) the card must be swiped to trigger a swipe event | number between 1 and 100 | 50 |
| `transitionDuration` | the duration of the transition duration after a swipe in milliseconds. affects opacity and transform | number | 150 |
| `allowedDirections` | allow the cards to be swiped only in specific directions. | 'all', 'horizontal', 'vertical' | 'all' |


### Example
```html
<SwipeDeck class="card-deck">
	{#each cards as card (card.id)}
		<SwipeCard
			class="card"
			allowedDirections="horizontal"
			threshold={30}
			transitionDuration={500}
		>
			<p>{card.title}</p>
		</SwipeCard>
	{/each}
</SwipeDeck>
```

If you have draggable elements inside your card, it may interfere with the swipe functionality. Just set `draggable="false"` on the element to disable dragging:

```html
<SwipeDeck class="card-deck">
	{#each cards as card (card.id)}
		<SwipeCard
			class="card"
			allowedDirections="horizontal"
			threshold={30}
			transitionDuration={500}
		>
			<p>{card.title}</p>
			<img src="..." draggable="false" />
		</SwipeCard>
	{/each}
</SwipeDeck>
```
## License
Published under the [MIT](https://github.com/remoflury/svelte-swipe-cards/blob/main/LICENSE.md) license.