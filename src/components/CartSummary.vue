<template>
	<div class="cart-summary">
		<Base-title
			:center="true"
			size="s"
		>Order summary</Base-title>

		<Summary-info topic="Total">{{ dynamicPrice }}</Summary-info>
		<Summary-info topic="Shipping">Free</Summary-info>

		<Base-button
			@click="goTo('Checkout')"
			:stretch="true"
			size="m"
		>Check out</Base-button>
		<Base-button
			@click="goTo('Shop')"
			:pseudo="true"
			:stretch="true"
			size="m"
		>Continue shopping</Base-button>
	</div>
</template>

<script>
import SummaryInfo from '@/components/SummaryInfo'

export default {
	name: 'CartSummary',

	components: { SummaryInfo },

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

	.base-button:first-of-type { margin-bottom: 1rem; }
}
</style>