<template>
	<div class="cart-summary">
		<h2>Order summary</h2>

		<div>Total: {{ dynamicPrice }}</div>
		<Base-button
			@click="goTo('Shop')"
			:empty="true"
		>Continue shopping</Base-button>
		<Base-button @click="goTo('Checkout')">Check out</Base-button>
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
$cart-summary--color--bg: $app-color--white;
.cart-summary {
	border-radius: $app-vars--border-radius;
	@extend %app-style--card-shadow;
	padding: 1rem;
	background: $cart-summary--color--bg;
}
</style>