<script lang="ts">
</script>

<article class="swipe-card">
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
