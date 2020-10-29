<template>
	<div class="content-grid">
		<div class="title">
			<slot name="title"></slot>
		</div>

		<div
			class="wrapper"
			:class="currentView"
		>
			<main class="main">
				<slot name="main"></slot>
			</main>

			<aside
				v-if="currentView !== 'mode-shop'"
				class="aside">
				<slot name="aside"></slot>
			</aside>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ContentGrid',

	computed: {
		currentView() {
			const view = this.$route.name
			
			return `mode-${view.toLowerCase()}`
		}
	}
}
</script>

<style lang="scss" scoped>
$content-grid--padding: $app-vars--layout-padding;

.content-grid {
	padding:
		calc(#{$app-vars--nav-top--height} + #{$content-grid--padding})
		$content-grid--padding
		100px
		$content-grid--padding;

	.wrapper {
		margin: 0 auto;
		max-width: 1000px;
		display: grid;
		grid-template-rows: auto;
		&.mode-shop {
			max-width: 800px;
			grid-template-columns: 1fr;
			grid-template-areas: "main";
		}
		&.mode-cart,
		&.mode-checkout {
			
			grid-template-areas: "main aside";
			column-gap: 30px;
		}
		

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