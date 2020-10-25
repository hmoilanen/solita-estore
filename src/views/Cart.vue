<template>
  <div class="view--cart">
		<router-link :to="{ name: 'Shop' }">takaisin kauppaan</router-link>

		<h1>Ostoskori</h1>
		
		<template v-if="typeof productsInCart === 'object'">
			<Cart-summary/>
			<Product
				v-for="product in productsInCart"
				:key="product.id"
				:product="product"
			/>
			<button @click="goToCheckout">Kassalle</button>
		</template>
		<h2 v-else>{{ productsInCart }}</h2>
  </div>
</template>

<script>
import CartSummary from '@/components/CartSummary'
import Product from '@/components/Product'

export default {
	name: 'ViewCart',

	components: {
		CartSummary,
		Product
	},

	computed: {
		productsInCart() {
			const productsInCart = this.$store.state.cart.products
			
			return Object.keys(productsInCart).length > 0
				? productsInCart
				: 'Ei lisättyjä tuotteita'
		}
	},

	methods: {
		goToCheckout() {
			this.$router.push({ name: 'Checkout' })
		}
	}
}
</script>
