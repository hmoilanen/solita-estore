<template>
	<div class="checkout-summary" :class="{ eom: extendedOnMobile }">
		<!-- <h2>Order summary</h2> -->
		<Base-title
			:center="true"
			size="s"
		>Order summary</Base-title>

		<!-- <button @click="extendOnMobile">auki</button> -->
		
		<router-link :to="{ name: 'Cart' }">Edit cart</router-link>
		<hr>

		<Summary-info topic="Total amount of items">{{ totalAmountOfProducts }}</Summary-info>
		<!-- <Summary-info
			v-for="product in products"
			:key="product.id"
		>{{ product.amount }} x {{ product.name }}</Summary-info> -->
		<div
			v-for="product in products"
			:key="product.id"
			class="product"
		>
			<div>
				<Base-icon>{{ product.image }}</Base-icon>
				<Base-text>{{ product.amount }} x {{ product.name }}</Base-text>
			</div>
			<Base-text>{{ dynamicPrice(product.price * product.amount) }}</Base-text>

		</div>
		<hr>
		<Summary-info topic="Shipping">Free</Summary-info>
		<Summary-info
			topic="Total"
			:bold="true"
		>{{ dynamicPrice(summaryOfProductPrices) }}</Summary-info>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import SummaryInfo from '@/components/SummaryInfo'

export default {
	name: 'CheckoutSummary',

	components: { SummaryInfo },

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
		}
	},

	methods: {
		dynamicPrice(price) {
			return this.getPrice(price)
		},

		extendOnMobile() {
			this.extendedOnMobile = !this.extendedOnMobile
		}
	}
}
</script>

<style lang="scss" scoped>
$checkout-summary--color--bg: $app-color--white;
$checkout-summary--color--hr: $app-color--main-l2;

.checkout-summary {
	border-radius: $app-vars--border-radius;
	padding: 1rem;
	background: $checkout-summary--color--bg;
	@extend %app-style--card-shadow;

	hr {
		margin: 1rem 0;
		border: 0;
		border-top: 1px solid $checkout-summary--color--hr;
	}

	.product {
		display: flex;
		justify-content: space-between;
		padding: 0.4rem 0;
		div {
			display: flex;
			align-items: center;
			.base-icon { margin-right: 0.8rem; }
		}
	}

	&.eom { // VIMEISTELE TÄMÄ KOKO TSYDEEMI
		z-index: 1000;
		height: calc(100vh - 2rem);
	}
}
</style>