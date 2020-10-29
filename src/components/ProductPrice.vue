<template>
	<div class="product-price">
		<template v-if="inShop">
			<Base-title tag="h3" size="m">{{ dynamicPrice(product.price) }}</Base-title>
		</template>

		<template v-else>
			<div>
				<span >price:</span>
				<strong>{{ dynamicPrice(product.price) }}</strong>
			</div>
			<div>
				<span>total:</span>
				<strong>{{ dynamicPrice(totalPrice) }}</strong>
			</div>
		</template>
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
		inShop() {
			return this.$route.name === 'Shop'
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