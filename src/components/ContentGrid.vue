<template>
	<div class="content-grid">
		<div class="title">
			<slot name="title"></slot>
		</div>

		<div
			class="wrapper"
			:class="classing"
		>
			<main class="main">
				<slot 
					v-if="dynamicSlots.displayHelper.top"
					:narrow="!wide"
					:name="dynamicSlots.helper"
				></slot>
				<slot name="main"></slot>
				<slot
					v-if="dynamicSlots.displayHelper.bottom"
					:name="dynamicSlots.helper"
				></slot>
			</main>

			<aside
				v-if="dynamicSlots.displayAside"
				class="aside"
			>
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
			wide: false
		}
	},

	created() {
		const trackWindowWidth = () => {
			if (window.innerWidth > 1050) {
				this.wide = true
				return
			}

			this.wide = false
		}

		trackWindowWidth()

		window.addEventListener('resize', trackWindowWidth)
		this.$once('hook:beforeDestroy', () => {      
      window.removeEventListener('resize', trackWindowWidth)
    })
	},

	computed: {
		inShop() {
			return this.$route.name === 'Shop' ? true : false
		},

		dynamicSlots() {
			// Display default aside slot if currently not on shop route
			// and / or screen width is enough for wide layout.
			// If displayed, change helper slot's name to 'dummy' to leave it empty.
			const route = this.$route.name

			return {
				displayAside: this.wide && !this.inShop,
				helper: this.wide ? 'dummy' : 'aside',
				displayHelper: {
					top: route === 'Checkout' ? true : false,
					bottom: route === 'Cart' ? true : false
				}
				//helperTop: this.wide && route === 'Checkout' ? 'dummy' : 'aside',
				//helperBottom: this.wide && route === 'Cart' ? 'dummy' : 'aside'
			}
		},

		classing() {
			return {
				'wide-mode': this.wide && !this.inShop
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
		max-width: 700px;
		display: grid;
		grid-template-columns: 1fr;
		grid-template-areas: "main";
		&.wide-mode {
			max-width: 1050px;
			grid-template-columns: 1fr 400px;
			grid-template-areas: "main aside";
			column-gap: calc(#{$app-vars--layout-padding} * 1.5);
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