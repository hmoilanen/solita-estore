<template>
	<div class="product-price">
		<div>
			<span v-if="inCart">price:</span>
			<strong>{{ dynamicPrice(product.price) }}</strong>
		</div>
		<div v-if="inCart">
			<span>total:</span>
			<strong>{{ dynamicPrice(totalPrice) }}</strong>
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

	computed: {
		inCart() {
			return this.$route.name === 'Cart'
		},

		totalPrice() {
			return this.product.price * this.product.amount
		}
	},

	methods: {
		dynamicPrice(price) {
			return this.$store.getters['GET_PRICE'](price)
		}
	}
}
</script>

<style>

</style>