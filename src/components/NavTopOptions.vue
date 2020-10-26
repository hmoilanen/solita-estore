<template>
	<div class="nav-top-options">
		<div class="currencies">
			<span
				v-for="currency in currencies"
				:key="currency"
				@click="changeCurrency(currency)"
			>{{ currency }}</span>
		</div>
		<button
			v-if="displaySummary"
			@click="goToCart"
		>{{ totalAmountOfProducts }}</button>
	</div>
</template>

<script>
export default {
	name: 'NavTopOptions',

	data() {
		return {
			currencies: ['eu', 'us']
		}
	},

	computed: {
		displaySummary() {
			return this.$route.name !== 'Checkout'
		},

		totalAmountOfProducts() {
			return this.$store.getters['TOTAL_AMOUNT_OF_PRODUCTS_IN_CART']
		}
	},

	methods: {
		changeCurrency(currency) {
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
.nav-top-options {
	display: flex;
	align-items: center;

	.currencies {
		display: flex;
		& > * { margin-right: 0.3rem; }
	}

	button {
		width: 30px; // DUMMY
		height: 30px; // DUMMY
	}
}
</style>