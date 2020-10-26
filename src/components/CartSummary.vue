<template>
	<div class="cart-summary">
		<h2>Order summary</h2>

		<div>Total: {{ dynamicPrice }}</div>
		<button @click="goTo('Shop')">Continue shopping</button>
		<button @click="goTo('Checkout')">Check out</button>
	</div>
</template>

<script>
export default {
	name: 'CartSummary',

	computed: {
		dynamicPrice() {
			const summaryOfProductPrices = this.$store.getters['SUMMARY_OF_PRODUCT_PRICES']
			return this.$store.getters['GET_PRICE'](summaryOfProductPrices)
		}
	},

	methods: {
		goTo(to) {
			this.$router.push({ name: to })
		}
	}
}
</script>

<style lang="scss" scoped>
.cart-summary {
	border: 1px solid grey;
	padding: 1rem;
	max-width: 800px;
	margin: 0.5rem auto;
	background: lightgrey;
}
</style>