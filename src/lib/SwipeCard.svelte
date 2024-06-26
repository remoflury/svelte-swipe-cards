<script lang="ts">
	import type { IntRange } from './types';
	import { getCurrentPos, setPos } from './utils';
	import { createEventDispatcher } from 'svelte';

	export let allowedDirections: 'all' | 'horizontal' | 'vertical' = 'all';
	export let threshold: IntRange<0, 101> = 50;
	export let transitionDuration: number = 150;
	export let index: number;

	let cardElem: HTMLElement;

	const dispatch = createEventDispatcher();

	let isDragging = false;
	let isSwiped = false;

	const startPos = {
		x: 0,
		y: 0
	};

	const currentPos = {
		x: 0,
		y: 0
	};

	const handleMouseDown = (event: MouseEvent | TouchEvent) => {
		isDragging = true;
		const { x, y } = getCurrentPos(event);

		// set start position to the current mouse position
		startPos.x = setPos(x, y, allowedDirections).x;
		startPos.y = setPos(x, y, allowedDirections).y;

		// Add event listener for mouse move and mouse up, aswell as touch move and touch end
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('touchmove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('touchend', handleMouseUp);
	};

	const handleMouseMove = (event: MouseEvent | TouchEvent) => {
		if (!isDragging) return;

		const { x, y } = getCurrentPos(event);
		// set the current position to the mouse position relative to the start position
		currentPos.x = setPos(x - startPos.x, y, allowedDirections).x;
		currentPos.y = setPos(x, y - startPos.y, allowedDirections).y;

		if (currentPos.x > 0) {
			dispatch('move_right');
		}
		if (currentPos.x < 0) {
			dispatch('move_left');
		}

		if (currentPos.y > 0) {
			dispatch('move_down');
		}
		if (currentPos.y < 0) {
			dispatch('move_up');
		}
	};

	const handleMouseUp = (event: MouseEvent | TouchEvent) => {
		if (!isDragging) return;
		isDragging = false;

		const target = event.target as HTMLElement;

		// horizontal swipe
		if (Math.abs(currentPos.x) > Math.abs(currentPos.y)) {
			// if the card translation (x) is greater than the threshold,
			// set isSwiped to true
			// move it away
			if (Math.abs(currentPos.x) > (threshold / 100) * target.clientWidth) {
				isSwiped = true;
				currentPos.x = currentPos.x > 0 ? target.clientWidth * 1.5 : -target.clientWidth * 1.5;
				dispatch('swipe_' + (currentPos.x > 0 ? 'right' : 'left'));
				dispatch('swipe');
			} else {
				resetPositions();
			}
		}
		// vertical swipe
		else {
			// if the card translation (y) is greater than the threshold
			// set isSwiped to true
			// move it away
			if (Math.abs(currentPos.y) > (threshold / 100) * target.clientHeight) {
				isSwiped = true;
				currentPos.y = currentPos.y > 0 ? target.clientHeight * 1.5 : -target.clientHeight * 1.5;
				dispatch('swipe_' + (currentPos.y > 0 ? 'down' : 'up'));
				dispatch('swipe');
			} else {
				resetPositions();
			}
		}

		// Remove event listeners when dragging ends
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('touchmove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
		window.removeEventListener('touchend', handleMouseUp);

		if (!isSwiped) return;

		setTimeout(() => {
			isSwiped = false;
			cardElem.remove();
		}, transitionDuration);
	};

	const resetPositions = () => {
		startPos.x = 0;
		startPos.y = 0;
		currentPos.x = 0;
		currentPos.y = 0;
	};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	bind:this={cardElem}
	class="swipe-card"
	class:transition={isSwiped}
	style={`
		--transition-duration: ${transitionDuration}ms;
		transform: 
			translate(${currentPos.x}px, ${currentPos.y}px)
			rotate(${currentPos.x / 40}deg);
		z-index: ${index * -1};
		`}
	on:mousedown={handleMouseDown}
	on:touchstart={handleMouseDown}
	role="listitem"
>
	<div class={$$props.class}>
		<slot />
	</div>
</div>

<style>
	.swipe-card {
		position: absolute;
		left: 0;
		right: 0;
		cursor: grab;
		opacity: 1;
	}

	.transition {
		opacity: 0;
		transition: all var(--transition-duration) ease;
	}
</style>
