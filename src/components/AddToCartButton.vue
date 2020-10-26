<template>
	<div class="add-to-cart-button">
		<button @click="addToCart">lisää ostoskoriin</button>
		<div
			v-if="displayConfirmationModal"
			class="confirmation-modal"
		>
			<div class="product">
				<h3>{{ product.name }}</h3>
				<div>{{ product.price }}{{ currency }}</div>
				<div>Quantity: <strong>{{ amount }}</strong></div>
				<div>
					You have currently
					<strong>{{ totalAmountOfProductsInCart }}</strong>
					 products in your cart.
				</div>
				<router-link :to="{ name: 'Cart' }">View or edit your cart.</router-link>
				<hr>
				<button @click="closeConfirmationModal">Continue shopping</button>
				<button @click="goToCheckout">Checkout</button>
			</div>
		</div>
	</div>
</template>

<script>
import addProductToCart from '@/logic/addProductToCart'

export default {
	name: 'AddToCartButton',

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
			displayConfirmationModal: false,
			currency: '€'
		}
	},

	computed: {
		totalAmountOfProductsInCart() {
			return this.$store.getters['TOTAL_AMOUNT_OF_PRODUCTS_IN_CART']
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
	
	.confirmation-modal {
		z-index: 10;
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		background: rgba(144, 238, 144, 0.5);
		display: flex;
		align-items: center;
		justify-content: center;

		.product {
			background: white;
			border: 1px solid black;
			padding: 1rem;
			border-radius: 3px;
		}
	}
}
</style>