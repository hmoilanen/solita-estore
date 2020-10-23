<template>
	<div class="nav-top-cart">
		<button @click="goToCart">{{ productsInCart }}</button>
	</div>
</template>

<script>
export default {
	name: 'NavTopCartSummary',

	computed: {
		productsInCart() {
			const products = this.$store.state.cart.products
			let total = 0

			for (const product in products) {
				total += products[product].amount
			}

			return total
		}
	},

	methods: {
		goToCart() {
			if (this.$route.name !== 'Cart') {
				this.$router.push({ name: 'Cart' })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.nav-top-cart {
	button {
		width: 30px; // DUMMY
		height: 30px; // DUMMY
	}
}
</style>