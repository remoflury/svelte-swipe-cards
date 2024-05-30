<script lang="ts">
	export let allowedDirections: 'all' | 'horizontal' | 'vertical' = 'all';

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
		startPos.x = setPos(x, y).x;
		startPos.y = setPos(x, y).y;

		// Add event listener for mouse move and mouse up, aswell as touch move and touch end
		window.addEventListener('mousemove', handleMouseMove);
		window.addEventListener('touchmove', handleMouseMove);
		window.addEventListener('mouseup', handleMouseUp);
		window.addEventListener('touchend', handleMouseUp);
	};

	const handleMouseMove = (event: MouseEvent | TouchEvent) => {
		if (!isDragging) return;

		const { x, y } = getClickedPos(event);
		currentPos.x = setPos(x - startPos.x, y).x;
		currentPos.y = setPos(x, y - startPos.y).y;
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

	// const getElemOffset = (event: MouseEvent | TouchEvent) => {
	// 	const target = event.target as HTMLElement;
	// 	const elemOffsetTop = target.getBoundingClientRect().top;
	// 	const elemOffsetLeft = target.getBoundingClientRect().left;

	// 	return {
	// 		elemOffsetTop,
	// 		elemOffsetLeft
	// 	};
	// };

	const setPos = (setPosX: number, setPosY: number) => {
		let x;
		let y;
		switch (allowedDirections) {
			case 'horizontal':
				x = setPosX;
				y = 0;
				break;
			case 'vertical':
				x = 0;
				y = setPosY;
				break;
			case 'all':
			default:
				x = setPosX;
				y = setPosY;
				break;
		}
		return { x, y };
	};
	const getClickedPos = (event: MouseEvent | TouchEvent) => {
		if (event instanceof MouseEvent) {
			return {
				x: event.clientX,
				y: event.clientY
			};
		}

		return {
			x: event.touches[0].clientX,
			y: event.touches[0].clientY
		};
	};

	$: console.log(startPos);
</script>

<article
	class="swipe-card"
	style={`transform: translate(${currentPos.x}px, ${currentPos.y}px)`}
	on:mousedown={handleMouseDown}
	on:touchstart={handleMouseDown}
>
	<div class={$$props.class}>
		<slot />
	</div>
</article>

<style>
	.swipe-card {
		position: absolute;
		left: 0;
		right: 0;
	}
</style>
