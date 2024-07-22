<script>import { getCurrentPos, setPos } from "./utils";
import { createEventDispatcher } from "svelte";
export let allowedDirections = "all";
export let threshold;
export let transitionDuration;
export let index;
let cardElem;
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
const handleMouseDown = (event) => {
  isDragging = true;
  const { x, y } = getCurrentPos(event);
  startPos.x = setPos(x, y, allowedDirections).x;
  startPos.y = setPos(x, y, allowedDirections).y;
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("touchmove", handleMouseMove);
  window.addEventListener("mouseup", handleMouseUp);
  window.addEventListener("touchend", handleMouseUp);
};
const handleMouseMove = (event) => {
  if (!isDragging)
    return;
  const { x, y } = getCurrentPos(event);
  currentPos.x = setPos(x - startPos.x, y, allowedDirections).x;
  currentPos.y = setPos(x, y - startPos.y, allowedDirections).y;
  if (currentPos.x > 0) {
    dispatch("move_right", { index });
  }
  if (currentPos.x < 0) {
    dispatch("move_left", { index });
  }
  if (currentPos.y > 0) {
    dispatch("move_down", { index });
  }
  if (currentPos.y < 0) {
    dispatch("move_up", { index });
  }
};
const handleMouseUp = (event) => {
  if (!isDragging)
    return;
  isDragging = false;
  const target = event.target;
  if (Math.abs(currentPos.x) > Math.abs(currentPos.y)) {
    if (Math.abs(currentPos.x) > threshold / 100 * target.clientWidth) {
      isSwiped = true;
      currentPos.x = currentPos.x > 0 ? target.clientWidth * 1.5 : -target.clientWidth * 1.5;
      dispatch("swipe_" + (currentPos.x > 0 ? "right" : "left"), { index });
      dispatch("swipe", { index });
    } else {
      resetPositions();
    }
  } else {
    if (Math.abs(currentPos.y) > threshold / 100 * target.clientHeight) {
      isSwiped = true;
      currentPos.y = currentPos.y > 0 ? target.clientHeight * 1.5 : -target.clientHeight * 1.5;
      dispatch("swipe_" + (currentPos.y > 0 ? "down" : "up"), { index });
      dispatch("swipe", { index });
    } else {
      resetPositions();
    }
  }
  window.removeEventListener("mousemove", handleMouseMove);
  window.removeEventListener("touchmove", handleMouseMove);
  window.removeEventListener("mouseup", handleMouseUp);
  window.removeEventListener("touchend", handleMouseUp);
  if (!isSwiped)
    return;
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
export const swipe = (direction) => {
  const targetWidth = cardElem.clientWidth;
  const targetHeight = cardElem.clientHeight;
  isSwiped = true;
  switch (direction) {
    case "left":
      currentPos.x = -targetWidth * 1.5;
      dispatch("swipe_left", { index });
      break;
    case "right":
      currentPos.x = targetWidth * 1.5;
      dispatch("swipe_right", { index });
      break;
    case "up":
      currentPos.y = -targetHeight * 1.5;
      dispatch("swipe_up", { index });
      break;
    case "down":
      currentPos.y = targetHeight * 1.5;
      dispatch("swipe_down", { index });
      break;
  }
  dispatch("swipe", { index });
  setTimeout(() => {
    cardElem.remove();
  }, transitionDuration);
};
</script>

<!-- svelte-ignore a11y-no-noninteractive-element-interactions -->
<li
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
	data-swipe-card={index}
>
	<div class={$$props.class}>
		<slot />
	</div>
</li>

<style>
	*,
	*::before,
	*::after {
		box-sizing: border-box;
		margin: 0;
	}

	.swipe-card {
		position: absolute;
		left: 0;
		right: 0;
		cursor: grab;
		opacity: 1;
		list-style: none;
		padding: 0;
	}

	.transition {
		opacity: 0;
		transition: all var(--transition-duration) ease;
	}
</style>
