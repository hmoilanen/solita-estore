<template>
	<div class="content-grid">
		<div class="title">
			<slot name="title"></slot>
		</div>

			<!-- :class="currentView" -->
		<div
			class="wrapper"
			:class="classing"
		>
			<main class="main">
				<slot name="main"></slot>
				<slot :name="dynamicAsideSlot.helper"></slot>
			</main>

			<aside
				v-if="dynamicAsideSlot.displayed"
				class="aside">
				<slot name="aside"></slot>
			</aside>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ContentGrid',

	data() {
		return {
			displayAside: false
		}
	},

	created() {
		const trackWindowWidth = () => {
			if (window.innerWidth > 800) {
				this.displayAside = true
				return
			}

			this.displayAside = false
		}

		trackWindowWidth()

		window.addEventListener('resize', trackWindowWidth)
		this.$once('hook:beforeDestroy', () => {      
      window.removeEventListener('resize', trackWindowWidth)
    })
	},

	computed: {
		currentView() {
			const view = this.$route.name
			
			return `mode-${view.toLowerCase()}`
		},

		dynamicAsideSlot() {
			// Display default aside slot if currently not on shop route
			// and / or screen width is enough for wide layout.
			// If displayed, change helper slot's name to 'dummy' to leave it empty.
			let displayAside = true

			//if (this.currentView === 'mode-shop' || !this.displayAside) {
			if (this.$route.name === 'Shop' || !this.displayAside) {
				displayAside = false
			}

			return {
				displayed: displayAside,
				helper: this.displayAside ? 'dummy' : 'aside'
			}
		},

		classing() {
			return {
				'narrow-mode': !this.displayAside,
				[`mode-${this.$route.name.toLowerCase()}`]: true
			}
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
		&.narrow-mode {
			&.mode-cart,
			&.mode-checkout {
				//column-gap: 0;
			}	
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