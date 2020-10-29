<template>
	<div class="nav-top-options">
		<div class="currencies">
			<div
				@click="changeCurrency('eu')"
				:class="{ active: currentCurrency === 'eu'}"
			>EU</div>
			<div class="separator"></div>
			<div
				@click="changeCurrency('us')"
				:class="{ active: currentCurrency === 'us'}"
			>US</div>
		</div>

		<div
			class="cart-button"
			@click="goToCart"
		>
			<Base-icon>cart</Base-icon>
			<div
				v-if="displaySummary.total"
				class="total"
			>
				<span>{{ totalAmountOfProducts }}</span>
			</div>
		</div>
	</div>
</template>

<script>
export default {
	name: 'NavTopOptions',

	data() {
		return {
			currentCurrency: 'eu'
		}
	},

	computed: {
		totalAmountOfProducts() {
			return this.$store.getters['TOTAL_AMOUNT_OF_PRODUCTS_IN_CART']
		},

		displaySummary() {
			return {
				total: this.totalAmountOfProducts > 0
			}
		}
	},

	methods: {
		changeCurrency(currency) {
			this.currentCurrency = currency
			this.$store.dispatch('SET_CURRENCY', currency)
		},

		goToCart() {
			if (this.$route.name !== 'Cart') {
				this.$router.push({ name: 'Cart' })
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$nav-top-options--color--hl: $app-color--hl;
$nav-top-options--color--text: $app-color--white;
$nav-top-options--color--text-secondary: $app-color--black;
$nav-top-options--color--inactive: $app-color--main-l1;
//$nav-top-options--color--separator: $app-color--main-l2;

.nav-top-options {
	display: flex;
	align-items: center;

	.currencies {
		display: flex;
		div {
			@extend %clickable;
			font-weight: 700;
			font-size: 0.75rem;
			color: $nav-top-options--color--inactive;
			transition: color 0.4s ease;
			&:not(.separator) { padding-top: 0.2rem;}
			&.separator {
				height: 22px;
				width: 1px;
				background: $nav-top-options--color--inactive;
				margin: 0 0.4rem;
			}
			&.active {
				color: $nav-top-options--color--text;
			}
		}
	}

	.cart-button {
		margin-left: 1rem;
		position: relative;
		@extend %flex--center;
		@extend %clickable;
		.base-icon {
			width: 2rem;
			height: 2rem;
		}
		.total {
			$amount-indicator--size: 20px;
			position: absolute;
			top: 0;
			right: 0;
			transform: translate(35%, -25%);
			width: $amount-indicator--size;
			height: $amount-indicator--size;
			border-radius: 50%;
			background: $nav-top-options--color--hl;
			color: $nav-top-options--color--text-secondary;
			font-size: 0.8rem;
			display: flex;
			align-items: center;
			justify-content: center;
			span {
				padding-top: 0.1rem;
				font-weight: 500;
			}
		}
	}
}
</style>