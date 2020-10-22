<template>
	<div class="shop-product">
		<!-- LISÄÄ TÄNNE MYÖS KUVA -->
		<div>
			<h2>{{ product.name }}</h2>
			<p>{{ product.description }}</p>
		</div>
		<div>
			<div>{{ product.price }}€</div>
			<Add-to-cart-button :product="product"/>
		</div>
	</div>
</template>

<script>
import AddToCartButton from '@/components/AddToCartButton'

export default {
	name: 'ShopProduct',

	components: { AddToCartButton },

	props: {
		product: {
			type: Object,
			required: true
		}
	}
}
</script>

<style lang="scss" scoped>
.shop-product {
	display: flex;
	justify-content: space-between;
	border: 1px solid lightgreen;
	padding: 1rem;
	max-width: 800px;
	margin: 0.5rem auto;
}
</style>