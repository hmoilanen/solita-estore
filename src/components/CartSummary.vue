<template>
	<div class="cart-summary">
		<h2>Tilaus - yhteenveto</h2>

		<div>Yhteensä: {{ summaryOfProductPrices }}{{ currency }}</div>
	</div>
</template>

<script>
export default {
	name: 'CartSummary',

	data() {
		return {
			currency: '€'
		}
	},

	computed: {
		summaryOfProductPrices() {
			return this.$store.getters['SUMMARY_OF_PRODUCT_PRICES']
		}
	}
}
</script>

<style lang="scss" scoped>
.cart-summary {
	border: 1px solid grey;
	padding: 1rem;
	max-width: 800px;
	margin: 0.5rem auto;
	background: lightgrey;
}
</style>