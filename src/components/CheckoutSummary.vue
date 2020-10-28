<template>
	<div class="checkout-summary" :class="{ eom: extendedOnMobile }">
		<h2>Order summary</h2>
		<button @click="extendOnMobile">auki</button>
		<router-link :to="{ name: 'Cart' }">Edit cart</router-link>
		<hr>
		<div>
			<div>{{ totalAmountOfProducts }} items</div>
			<div
				v-for="product in products"
				:key="product.id"
			>{{ product.amount }} x {{ product.name }}</div>
		</div>
		<hr>
		<div>total: {{ dynamicPrice }}</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
	name: 'CheckoutSummary',

	data() {
		return {
			extendedOnMobile: false
		}
	},

	computed: {
		...mapGetters({
			totalAmountOfProducts: 'TOTAL_AMOUNT_OF_PRODUCTS_IN_CART',
			summaryOfProductPrices: 'SUMMARY_OF_PRODUCT_PRICES',
			getPrice: 'GET_PRICE'
		}),

		products() {
			return this.$store.state.cart.products
		},

		dynamicPrice() {
			return this.getPrice(this.summaryOfProductPrices)
		}
	},

	methods: {
		extendOnMobile() {
			this.extendedOnMobile = !this.extendedOnMobile
		}
	}
}
</script>

<style lang="scss" scoped>
.checkout-summary {
	border-radius: $app-vars--border-radius;
	@extend %app-style--card-shadow;
	padding: 1rem;
	background: lightgrey;

	&.eom { // VIMEISTELE TÄMÄ KOKO TSYDEEMI
		z-index: 1000;
		height: calc(100vh - 2rem);
	}
}
</style>