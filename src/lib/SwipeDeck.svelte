<script lang="ts">
	import { setContext } from 'svelte';
	import { createSwipeDeckStore } from './store';
	const deckStore = createSwipeDeckStore();

	setContext('deck', deckStore);
</script>

<div class={$$props.class} style={`min-height: ${$deckStore.height}px`}>
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
