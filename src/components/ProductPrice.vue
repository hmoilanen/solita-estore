<template>
	<div class="product-price">
		<template v-if="inShop">
			<Base-title tag="h3" size="m">{{ dynamicPrice(product.price) }}</Base-title>
		</template>

		<template v-else>
			<div
				class="in-cart"
				:class="classing"
			>
				<div>
					<Base-text size="s">Price: </Base-text>
					<Base-text
						size="s"
						:bold="true"
					> {{ dynamicPrice(product.price) }}</Base-text>
				</div>
				<div>
					<Base-text size="s">Total: </Base-text>
					<Base-text
						size="s"
						:bold="true"
					> {{ dynamicPrice(totalPrice) }}</Base-text>
				</div>
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
		},
		narrow: Boolean
	},

	computed: {
		inShop() {
			return this.$route.name === 'Shop'
		},

		totalPrice() {
			return this.product.price * this.product.amount
		},

		classing() {
			return {
				'narrow-mode': this.narrow
			}
		}
	},

	methods: {
		dynamicPrice(price) {
			return this.$store.getters['GET_PRICE'](price)
		}
	}
}
</script>

<style lang="scss" scoped>
.product-price {
	.in-cart {
		display: flex;
		&.narrow-mode { flex-direction: column; }
		& > * {
			display: flex;
			&:first-child { margin-right: 0.6rem; }
			& > *:first-child { margin-right: 0.2rem; }
		}
	}
}
</style>