<script lang="ts">
	import type { IntRange } from './types';
	import { getClickedPos, setPos } from './utils';

	export let allowedDirections: 'all' | 'horizontal' | 'vertical' = 'all';
	export let threshold: IntRange<0, 101> = 50;
	export let ariaRoleDescription: string = 'swiping card';

	let isDragging = false;
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
		const { x, y } = getClickedPos(event);

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

		const { x, y } = getClickedPos(event);
		// set the current position to the mouse position relative to the start position
		currentPos.x = setPos(x - startPos.x, y, allowedDirections).x;
		currentPos.y = setPos(x, y - startPos.y, allowedDirections).y;
		console.log('Dragging:', event);
	};

	const handleMouseUp = (event: MouseEvent | TouchEvent) => {
		if (!isDragging) return;
		isDragging = false;
		// Remove event listeners when dragging ends
		window.removeEventListener('mousemove', handleMouseMove);
		window.removeEventListener('touchmove', handleMouseMove);
		window.removeEventListener('mouseup', handleMouseUp);
		window.removeEventListener('touchend', handleMouseUp);
	};

	$: console.log(startPos);
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<div
	class="swipe-card"
	style={`transform: translate(${currentPos.x}px, ${currentPos.y}px)`}
	on:mousedown={handleMouseDown}
	on:touchstart={handleMouseDown}
	aria-roledescription={ariaRoleDescription}
	role="list"
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
	}
</style>
