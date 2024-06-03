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
In your HTML, import SwipeDeck as a wrapper for your cards. Each SwipeCard component represents a card in the deck. It must be a direct child of SwipeDeck. The content of the card can be anything you like, just place it inside SwipeCard.

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

<SwipeDeck>
  {#each cards as card (card.id)}
    <SwipeCard>
      <p>{card.text}</p>
    </SwipeCard>
  {/each}
</SwipeDeck>
```
## Events
When a card is swiped, the component emits an event. You can listen to this event and update your data accordingly. 
Moreover, as soon as the card is swiped in a specific direction (relative to the starting position), the component emits an event for that direction. You can listen to these events and update your data or style your component accordingly.

```html

{#each cards as card (card.id)}
  <SwipeCard
    on:swipe={() => console.log('swipe')}
    on:swipe_right={() => console.log('right')}
    on:swipe_left={() => console.log('left')}
    on:swipe_up={() => console.log('up')}
    on:swipe_down={() => console.log('down')}
    on:move_left={() => console.log('move left')}
    on:move_right={() => console.log('move right')}
    on:move_up={() => console.log('move up')}
    on:move_down={() => console.log('move down')}
  />
```

## Props
SwipeDeck components accept the following props:
| Prop | Description |
| --- | --- |
| `class` | pass in your CSS classes to further style the deck |

SwipeCard components accept the following props:
| Prop | Description | type | default |
| --- | --- | --- | --- |
| `index` | the index of the card in the deck | number (required) | - |
| `class` | pass in your CSS classes to further style the card | string | '' |
| `allowedDirections` | allow the card to be swiped in specific directions. | 'all', 'horizontal', 'vertical' | 'all' |
| `threshold` | the minimum distance (percentage) the card must be swiped to trigger a swipe event | number between 1 and 100 | 50 |
| `transitionDuration` | the duration of the transition duration after a swipe in milliseconds. affects opacity and transform | number | 150 |

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