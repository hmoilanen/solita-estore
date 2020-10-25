<template>
  <div class="view--home">
		<h1>Tuotteet / kauppa</h1>

    <Product
			v-for="product in products"
			:key="product.id"
			:product="product"
		/>
  </div>
</template>

<script>
import Product from '@/components/Product'

export default {
	name: 'ViewHome',

	components: { Product },

	computed: {
		products() {
			return this.$store.state.products
		}
	}
}
</script>
