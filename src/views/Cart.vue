<template>
  <div class="view--cart">
		<router-link :to="{ name: 'Shop' }">takaisin kauppaan</router-link>
		
		<template v-if="typeof productsInCart === 'object'">
			<Cart-product
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
import CartProduct from '@/components/CartProduct'

export default {
	name: 'ViewCart',

	components: { CartProduct },

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
