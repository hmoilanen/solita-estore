<template>
	<button @click="removeFromCart">poista tuote</button>
</template>

<script>
export default {
	name: 'RemoveFromCartButton',

	props: {
		product: {
			type: Object,
			required: true
		}
	},

	methods: {
		removeFromCart() {
			this.$store.dispatch('REMOVE_PRODUCT_FROM_CART', productId)
		}
	}
}
</script>