<template>
	<div class="checkout-summary">
		<Base-title
			:center="true"
			size="s"
		>Order summary</Base-title>

		<div
			v-if="minimized"
			class="narrow"
		>
			<Base-text size="l">{{ totalAmountOfProducts }} items</Base-text>
			<Base-title tag="h3">{{ dynamicPrice(summaryOfProductPrices) }}</Base-title>
		</div>

		<template v-else>
			<hr>
			<Summary-info topic="Total amount of items">{{ totalAmountOfProducts }}</Summary-info>
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
		</template>

		<div
			class="toggle"
			@click="toggleSummaryMode"
		>
			<Base-text
				:center="true"
				size="s"
			>{{ textOfToggle }}</Base-text>
		</div>
	</div>
</template>

<script>
import { mapGetters } from 'vuex'
import SummaryInfo from '@/components/SummaryInfo'

export default {
	name: 'CheckoutSummary',

	components: { SummaryInfo },

	props: {
		narrow: false // Comes from Checkout.vue's scoped slot this components lives in
	},

	data() {
		return {
			minimized: true
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

		textOfToggle() {
			return this.minimized ? 'show details' : 'minimize'
		}
	},

	methods: {
		dynamicPrice(price) {
			return this.getPrice(price)
		},

		toggleSummaryMode() {
			if (this.narrow) {
				this.minimized = !this.minimized
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$checkout-summary--color--bg: $app-color--white;
$checkout-summary--color--hr: $app-color--main-l2;

.checkout-summary {
	position: relative;
	border-radius: $app-vars--border-radius;
	padding: $app-vars--card-padding;
	background: $checkout-summary--color--bg;
	@extend %app-style--card-shadow;
	margin-bottom: 2rem;

	.narrow {
		margin-top: 0.2rem;
		display: flex;
		align-items: baseline;
		justify-content: space-between;
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

	.toggle {
		position: absolute;
		left: 0;
		right: 0;
		bottom: 0;
		padding: 0.35rem 0;
		@extend %clickable;
		&:hover {
			//background: $checkout-summary--color--hr;
			background: transparentize($checkout-summary--color--hr, 0.7);
		}
	}
}
</style>