<template>
	<div
		ref="product"
		class="product"
		:class="classing"
	>
		<div class="image">
			<Base-icon :size="styling.image">{{ product.image }}</Base-icon>
		</div>

		<div class="info">
			<Base-title
				class="name"
				:size="styling.title"
			>{{ product.name }}</Base-title>
			<Base-text
				class="description"
				:size="styling.text"
			>{{ product.description }}</Base-text>
		</div>

		<div class="specs">
			<Quantity-selector v-model="amountOfProducts"/>
			<Product-price
				class="price"
				:product="product"
			/>
		</div>

		<div class="buttons">
			<Add-to-cart-button
				v-if="allowButtons.add"
				:product="product"
				:amount="amount"
				:stretch="true"
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
			amount: 1, // Used only if in shop, not in cart, see: this.amountOfProducts
			wide: false
		}
	},

	mounted() {
		const trackWindowWidth = () => {
			if (this.$refs.product.offsetWidth > 500) {
				this.wide = true
				return
			}

			this.wide = false
		}

		trackWindowWidth()

		window.addEventListener('resize', trackWindowWidth)
		this.$once('hook:beforeDestroy', () => {      
      window.removeEventListener('resize', trackWindowWidth)
    })
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
						this.$store.dispatch('UPDATE_PRODUCT_AMOUNT_IN_CART', {
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

		classing() {
			return {
				'wide-mode': this.wide,
				'cart-mode': this.$route.name === 'Cart'
			}
		},

		styling() {
			let sizeImage = '6rem'
			let sizeTitle = 'm'
			let sizeText = 'm'

			if (this.$route.name === 'Cart') {
				sizeImage = '3rem'
				sizeTitle = 's'
				sizeText = 's'
			} else if (this.wide) {
				sizeImage = '8rem'
			}

			return {
				image: sizeImage,
				title: sizeTitle,
				text: sizeText
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$product--color--bg: $app-color--white;

.product {
	margin-bottom: $app-vars--card-padding;
	background: $product--color--bg;
	border-radius: $app-vars--border-radius;
	padding: $app-vars--card-padding;
	@extend %app-style--card-shadow;
	display: grid;
	grid-template-columns: 1fr;
	grid-template-rows: auto;
	grid-template-areas:
		"image"
		"info"
		"specs"
		"buttons";
	.image {
		grid-area: image;
		padding-top: 1rem;
		margin-bottom: 1.2rem;
		display: flex;
		justify-content: center;
	}
	.info {
		grid-area: info;
		margin-bottom: 2rem;
		display: flex;
		flex-direction: column;
		align-items: center;
		.description { text-align: center; }
	}
	.specs {
		grid-area: specs;
		margin-bottom: 1.2rem;
		display: flex;
		justify-content: space-between;
	}
	.buttons { grid-area: buttons; }

	&.wide-mode { // If at shop route and screen is wide enough
		grid-template-columns: auto 1fr auto;
		grid-template-rows: auto auto;
		grid-template-areas:
			"image info specs"
			"buttons buttons buttons";
		.image {
			padding-top: 0;
			margin-bottom: 0;
			display: block;
		}
		.info {
			margin: 0 $app-vars--card-padding;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.description {
				margin-top: 0.4rem;
				text-align: left;
			}
		}
		.specs {
			display: flex;
			flex-direction: column;
			justify-content: flex-start;
			.price { margin-top: 0.8rem; }
		}
		.buttons {
			margin-top: 2rem;
			margin: 2rem 0 0 auto;
			width: 250px;
		}
	}

	&.cart-mode {
		padding: calc(#{$app-vars--card-padding} * 0.8);
		grid-template-columns: auto 1fr auto;
		grid-template-rows: 1fr auto;
		grid-template-areas:
			"image info buttons"
			"image specs buttons";
		.image { padding-top: 0; }
		.info {
			margin: 0 $app-vars--card-padding;
			display: flex;
			flex-direction: column;
			align-items: flex-start;
			.description {
				margin-top: 0.4rem;
				text-align: left;
			}
		}
		.specs {
			margin: calc(#{$app-vars--card-padding} / 2) $app-vars--card-padding 0;
			display: flex;
			flex-direction: row;
			align-items: center;
			justify-content: flex-start;
			.price { margin: 0 0 0 1rem; }
		}
		.buttons {
			margin: 0;
			width: auto;
		}
	}
}
</style>