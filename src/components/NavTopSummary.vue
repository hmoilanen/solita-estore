<template>
	<div class="nav-top-summary">
		<button @click="goToCart">{{ totalAmountOfProducts }}</button>
	</div>
</template>

<script>
export default {
	name: 'NavTopSummary',

	computed: {
		totalAmountOfProducts() {
			return this.$store.getters['TOTAL_AMOUNT_OF_PRODUCTS_IN_CART']
		}
		//...mapGetters({ totalAmountOfProducts: 'TOTAL_AMOUNT_OF_PRODUCTS_IN_CART' })
		/* productsInCart() {
			const products = this.$store.state.cart.products
			let total = 0

			for (const product in products) {
				total += products[product].amount
			}

			return total
		} */
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
.nav-top-summary {
	button {
		width: 30px; // DUMMY
		height: 30px; // DUMMY
	}
}
</style>