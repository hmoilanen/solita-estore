<template>
  <div class="view--cart">
		<Content-grid>
			<template #title>
				<Base-title
					:center="true"
					size="l"
					tag="h1"
					@click="jee = !jee"
				>Cart</Base-title>
			</template>
			
			<template #main>
				<template v-if="productsInCart">
					<Product
						v-for="product in productsInCart"
						:key="product.id"
						:product="product"
					/>
				</template>
				<template v-else>
					<Base-title
						:center="true"
						size="m"
					>No products in cart</Base-title>
					<br><br>
				</template>
			</template>
			<template #aside>
				<Cart-summary/>
			</template>
		</Content-grid>
  </div>
</template>

<script>
import ContentGrid from '@/components/ContentGrid'
import CartSummary from '@/components/CartSummary'
import Product from '@/components/Product'

export default {
	name: 'ViewCart',

	components: {
		ContentGrid,
		CartSummary,
		Product
	},

	data() {
		return {
			jee: false
		}
	},

	computed: {
		productsInCart() {
			const productsInCart = this.$store.state.cart.products
			
			return Object.keys(productsInCart).length > 0
				? productsInCart
				: false
		}
	}
}
</script>