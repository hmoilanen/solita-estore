<template>
  <div class="view--home">
    <Shop-product
			v-for="product in products"
			:key="product.id"
			:product="product"
		/>
  </div>
</template>

<script>
import ShopProduct from '@/components/ShopProduct'

export default {
	name: 'ViewHome',

	components: { ShopProduct },

	computed: {
		products() {
			return this.$store.state.products
		}
	}
}
</script>
