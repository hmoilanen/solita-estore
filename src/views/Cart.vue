<template>
  <div class="view--cart">
		<Content-grid>
			<template #title>
				<Base-title
					:center="true"
					size="l"
					tag="h1"
				>Cart</Base-title>
			</template>
			
			<template #main>
				<template v-if="typeof productsInCart === 'object'">
					<Product
						v-for="product in productsInCart"
						:key="product.id"
						:product="product"
					/>
				</template>
				<h2 v-else>{{ productsInCart }}</h2>
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

	computed: {
		productsInCart() {
			const productsInCart = this.$store.state.cart.products
			
			return Object.keys(productsInCart).length > 0
				? productsInCart
				: 'No added products'
		}
	}
}
</script>
