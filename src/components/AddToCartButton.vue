<template>
	<div class="add-to-cart-button">
		<Base-button @click="addToCart">Add to cart</Base-button>

		<Confirmation-modal v-if="displayConfirmationModal">
			<div>Product has been added to cart!</div>
			<h3>{{ product.name }}</h3>
			<div>{{ dynamicPrice }}</div>
			<div>Quantity: <strong>{{ amount }}</strong></div>
			<div>
				You have currently
				<strong>{{ totalAmountOfProductsInCart }}</strong>
				products in your cart.
			</div>
			<router-link :to="{ name: 'Cart' }">View or edit your cart.</router-link>
			<hr>
			<Base-button
				@click="closeConfirmationModal"
				:empty="true"
			>Continue shopping</Base-button>
			<Base-button @click="goToCheckout">Checkout</Base-button>
		</Confirmation-modal>
	</div>
</template>

<script>
import ConfirmationModal from '@/components/ConfirmationModal'

export default {
	name: 'AddToCartButton',

	components: { ConfirmationModal },

	props: {
		product: {
			type: Object,
			required: true
		},
		amount: {
			type: Number,
			required: true
		}
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