<template>
	<div class="product">
		<div>
			<h2>{{ product.name }}</h2>
			<p>{{ product.description }}</p>
			<Quantity-selector v-model="amountOfProducts"/>
		</div>
		
		<div>
			<Product-price :product="product"/>
			<Add-to-cart-button
				v-if="allowButtons.add"
				:product="product"
				:amount="amount"
			/>
			<Remove-from-cart-button
				v-if="allowButtons.remove"
				:product="product"
			/>
		</div>
	</div>
</template>

<script>
export default {
	name: 'Product',

	components: {
		QuantitySelector: () => import('@/components/QuantitySelector'),
		ProductPrice: () => import('@/components/ProductPrice'),
		AddToCartButton: () => import('@/components/AddToCartButton'),
		RemoveFromCartButton: () => import('@/components/RemoveFromCartButton')
	},

	props: {
		product: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			amount: 1 // Used only if in shop, not in cart, see: this.amountOfProducts
		}
	},

	computed: {
		amountOfProducts: {
			// In shop, related to amount of the product to be added to cart.
			// In cart, related to total amount of the product in cart.
			get: function() {
				switch (this.$route.name) {
					case 'Shop':
						return this.amount
						break
					case 'Cart':
						return this.product.amount
				}
				return this.product.amount
			},
			set: function(amount) {
				switch (this.$route.name) {
					case 'Shop':
						this.amount = amount
						break
					case 'Cart':
						this.$store.dispatch('UPDATE_PRODUCT_AMOUNT', {
							productId: this.product.id,
							amount
						})
				}
			}
		},

		allowButtons() {
			return {
				add: this.$route.name === 'Shop',
				remove: this.$route.name === 'Cart'
			}
		},
	}
}
</script>

<style lang="scss" scoped>
.product {
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgreen;
	padding: 1rem;
	max-width: 800px;
	margin: 0.5rem auto;
}
</style>