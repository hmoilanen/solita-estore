<template>
  <div class="view--shop">
		<Content-grid>
			<template #title>
				<Base-title
					:center="true"
					size="l"
					tag="h1"
				>Products</Base-title>
			</template>

			<template #main>
				<Product
					v-for="product in products"
					:key="product.id"
					:product="product"
				/>
			</template>
		</Content-grid>
  </div>
</template>

<script>
import ContentGrid from '@/components/ContentGrid'
import Product from '@/components/Product'

export default {
	name: 'ViewShop',

	components: {
		ContentGrid,
		Product
	},

	computed: {
		products() {
			return this.$store.state.products
		}
	}
}
</script>
