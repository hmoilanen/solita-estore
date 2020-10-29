<template>
	<div class="view--error">
		<Base-title
			:center="true"
			size="m"
		>Oopsie... No such page!</Base-title>
		<Base-button
			@click="$router.push({ name: 'Shop' })"
			:pseudo="true"
			size="l"
		>Go to shop</Base-button>
	</div>
</template>

<script>
export default {
	name: 'ViewError',
}
</script>

<style lang="scss" scoped>
.view--error {
	padding: calc(#{$app-vars--nav-top--height} * 2) $app-vars--layout-padding 0;
	& > * {
		margin: 0 auto;
		&:first-child { max-width: 800px; }
		&:last-child { margin-top: 4rem; }
	}
}
</style>
