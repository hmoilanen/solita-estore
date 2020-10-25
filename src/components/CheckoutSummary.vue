<template>
	<div class="checkout-summary">
		<h2>Order summary</h2>
		<router-link :to="{ name: 'Cart' }">Edit cart</router-link>
		<hr>
		<div>
			<div>{{ this.totalAmountOfProducts }} items</div>
			<div
				v-for="product in products"
				:key="product.id"
			>{{ product.amount }} x {{ product.name }}</div>
		</div>
		<hr>
		<div>total: {{ summaryOfProductPrices }}{{ currency }}</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'CheckoutSummary',

	data() {
		return {
			currency: '€'
		}
	},

	computed: {
		...mapGetters({
			totalAmountOfProducts: 'TOTAL_AMOUNT_OF_PRODUCTS_IN_CART',
			summaryOfProductPrices: 'SUMMARY_OF_PRODUCT_PRICES'
		}),

		products() {
			return this.$store.state.cart.products
		}
	}
}
</script>

<style lang="scss" scoped>
.checkout-summary {
	border: 1px solid grey;
	padding: 1rem;
	max-width: 800px;
	margin: 0.5rem auto;
	background: lightgrey;
}
</style>