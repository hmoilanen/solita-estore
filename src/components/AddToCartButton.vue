<template>
	<button @click="addToCart">add to cart</button>
</template>

<script>
import addProductToCart from '@/logic/addProductToCart'

export default {
	name: 'AddToCartButton',

	props: {
		product: {
			type: Object,
			required: true
		}
	},

	methods: {
		addToCart() {
			addProductToCart(this.product.name)
		}
	}
}
</script>