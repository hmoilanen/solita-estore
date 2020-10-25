<template>
  <div class="view--cart">
		<h1>Kassa</h1>

		<Checkout-summary/>
		
		<form @submit.prevent>
			<Checkout-phase
				v-for="phase in phases"
				:key="phase.main.id"
				:phase="phase"
			/>
			<button
				v-if="allowSubmit"
				@click="submitCheckout"
			>lähetä tilaus</button>
		</form>
  </div>
</template>

<script>
import CheckoutSummary from '@/components/CheckoutSummary'
import CheckoutPhase from '@/components/CheckoutPhase'
import { mapGetters } from 'vuex'

export default {
	name: 'ViewCart',

	components: {
		CheckoutSummary,
		CheckoutPhase
	},

	computed: {
		...mapGetters({
			allowSubmit: 'ALL_CHECKOUT_PHASES_VALIDATED',
			customerData: 'GET_CUSTOMER_DATA',
		}),

		phases() {
			return this.$store.state.checkout
		}
	},

	methods: {
		submitCheckout() {
			const checkoutData = this.customerData
			console.log('Checkout!:', checkoutData);
		}
	}
}
</script>

<style lang="scss" scoped>
.view--cart {
	max-width: 600px;
	margin: 0 auto;

	input {
		display: block;
		padding: 0.2rem;
		margin-bottom: 0.2rem;
	}
}
</style>