<template>
	<div class="product-price">
		<div>
			<span v-if="inCart">price:</span>
			<strong>{{ product.price }}{{ currency }}</strong>
		</div>
		<div v-if="inCart">
			<span>total:</span>
			<strong>{{ totalPrice }}{{ currency }}</strong>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ProductPrice',

	props: {
		product: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			currency: '€'
		}
	},

	computed: {
		inCart() {
			return this.$route.name === 'Cart'
		},

		totalPrice() {
			return this.product.price * this.product.amount
		}
	}
}
</script>

<style>

</style>