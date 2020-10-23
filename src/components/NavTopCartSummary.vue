<template>
	<div>
		<span>{{ productsInCart }}</span>
		<button @click="showAddedProducts">cart</button>
		
	</div>
</template>

<script>
export default {
	name: 'NavTopCartSummary',

	computed: {
		productsInCart() {
			const products = this.$store.state.cart.products
			const amountOfProducts = Object.keys(products).length

			/* return products.length > 0
				? `${products.length} added products`
				: 'no added products' */
			return amountOfProducts > 0
				? `${amountOfProducts} added products`
				: 'no added products'
		}
	},

	methods: {
		showAddedProducts() {
			console.log('tästä aukeaa cart:n esikatselu');
		}
	}
}
</script>

<style>

</style>