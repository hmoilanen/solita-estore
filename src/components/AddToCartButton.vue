<template>
	<button @click="addToCart">lisää ostoskoriin</button>
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

	methods: {
		addToCart() {
			//addProductToCart(this.product) // DUMMY VIELÄ TÄLLÄ HETKELLÄ

			this.$store.dispatch('ADD_PRODUCT_TO_CART', {
				product: this.product,
				amount: this.amount
			})
		}
	}
}
</script>