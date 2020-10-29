<template>
	<div class="add-to-cart-button">
		<Base-button
			@click="addToCart"
			:stretch="stretch"
			:size="size"
		>Add to cart</Base-button>

		<Confirmation-modal v-if="displayConfirmationModal">
			<Base-title>Product has been added to cart!</Base-title>
			<hr>
			<div class="product">
				<Base-icon>{{ product.image }}</Base-icon>
				<Base-title
					tag="h3"
					size=s
				>{{ product.name }}</Base-title>
			</div>
			<div class="info">
				<Summary-info topic="Quantity">{{ amount }}</Summary-info>
				<Summary-info topic="Total">{{ dynamicPrice }}</Summary-info>
			</div>
			<hr>
			<Base-text v-html="`You have currently <strong>${totalAmountOfProductsInCart}</strong> products in your cart.`"></Base-text>
			<div class="buttons">
				<Base-button
					@click="goToCheckout"
					:stretch="true"
					size="m"
				>Checkout</Base-button>
				<Base-button
					@click="closeConfirmationModal"
					:pseudo="true"
					:stretch="true"
					size="m"
				>Continue shopping</Base-button>
			</div>
		</Confirmation-modal>
	</div>
</template>

<script>
import ConfirmationModal from '@/components/ConfirmationModal'
import SummaryInfo from '@/components/SummaryInfo'

export default {
	name: 'AddToCartButton',

	components: {
		ConfirmationModal,
		SummaryInfo
	},

	props: {
		product: {
			type: Object,
			required: true
		},
		amount: {
			type: Number,
			required: true
		},
		size: String,
		stretch: Boolean
	},

	data() {
		return {
			displayConfirmationModal: false
		}
	},

	computed: {
		totalAmountOfProductsInCart() {
			return this.$store.getters['TOTAL_AMOUNT_OF_PRODUCTS_IN_CART']
		},

		dynamicPrice() {
			return this.$store.getters['GET_PRICE'](this.product.price)
		}
	},

	methods: {
		addToCart() {
			this.$store.dispatch('ADD_PRODUCT_TO_CART', {
				product: this.product,
				amount: this.amount
			})

			this.displayConfirmationModal = true
		},

		closeConfirmationModal() {
			this.displayConfirmationModal = false
		},

		goToCheckout() {
			this.$router.push({ name: 'Cart' })
		}
	}
}
</script>

<style lang="scss" scoped>
.add-to-cart-button {
	.product {
		margin-bottom: 1rem;
		display: flex;
		align-items: center;
		.base-icon { margin-right: 0.8rem; }
	}
	.buttons {
		margin-top: 2rem;
		*:first-child { margin-bottom: 1rem; }
	}
}
</style>