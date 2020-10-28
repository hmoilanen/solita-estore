<template>
	<div class="content-grid">
		<div class="title">
			<slot name="title"></slot>
		</div>
		<div class="wrapper">
			<main class="main">
				<slot name="main"></slot>
			</main>

			<aside class="aside">
				<slot name="aside"></slot>
			</aside>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ContentGrid',
}
</script>

<style lang="scss" scoped>
$content-grid--padding: 1rem;

.content-grid {
	padding:
		calc(#{$app-vars--nav-top--height} + #{$content-grid--padding})
		$content-grid--padding
		100px
		$content-grid--padding;

	.wrapper {
		max-width: 1000px;
		margin: 0 auto;
		display: grid;
		grid-template-columns: 1fr minmax(0, 300px);
		grid-template-rows: auto;
		grid-template-areas: "main aside";
		column-gap: 30px;

		@media only screen and (max-width: 700px) {
			grid-template-columns: 1fr;
			grid-template-rows: auto 1fr;
			grid-template-areas:
				"aside"
				"main";
			column-gap: 0;
		}
	}
	
	.title {
		padding-bottom: 1.6rem;
	}
	.main {
		grid-area: main;
		min-height: 1000px; // DUMMY -> TEE JOTENKIN PAREMMIN
	}
	.aside {
		grid-area: aside;
		@media only screen and (max-width: 700px) {
			position: fixed;
			left: 1rem;
			right: 1rem;
			bottom: 1rem;
		}
	}
}
</style>