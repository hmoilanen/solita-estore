<template>
	<div class="cart-product">
		<h3>{{ product.name }}</h3>
		<Quantity-selector v-model="amount"/>
	</div>
</template>

<script>
import QuantitySelector from '@/components/QuantitySelector'

export default {
	name: 'CartProduct',

	components: { QuantitySelector },

	props: {
		product: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			amount: 0
		}
	},

	created() {
		this.amount = this.product.amount
	}
}
</script>

<style lang="scss" scoped>
.cart-product {
	display: flex;
	justify-content: space-between;
	max-width: 600px;
	margin: 0.5rem auto;
	border: 1px solid lightgreen;
	border-radius: 3px;
	padding: 1rem;
}
</style>