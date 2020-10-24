<template>
  <div class="view--cart">
		<h1>Kassa</h1>
		<div>validatedPhases: {{ validatedPhases }}</div>
		<form @submit.prevent>
			<Checkout-phase
				v-for="phase in phases"
				:key="phase.id"
				:ref="`phase${phase.id}`"
				:phase="phase"
				:opened="openedPhase === phase.id"
				:validated="validatedPhases[`phase${phase.id}`]"
				@validate="validatePhase"
				@edit="editPhase"
			/>
		</form>
  </div>
</template>

<script>
import CheckoutPhase from '@/components/CheckoutPhase'

export default {
	name: 'ViewCart',

	components: { CheckoutPhase },

	data() {
		return {
			phases: [
				{ id: 1, title: 'Tilaaja' },
				{ id: 2, title: 'Vastaanottaja' },
				{ id: 3, title: 'Maksaja' },
				{ id: 4, title: 'Maksusuoritus' }
			],
			openedPhase: 1,
			validatedPhases: {
				phase1: false,
				phase2: false,
				phase3: false,
				phase4: false
			}
		}
	},

	methods: {
		validatePhase(phaseId) {
			this.validatedPhases[`phase${phaseId}`] = true

			// Open the first not-validated phase
			for (let i = 1; i <= 4; i++) {
				if (!this.validatedPhases[`phase${i}`]) {
					this.openedPhase = i
					break
				}
			}
		},

		editPhase(phaseId) {
			this.openedPhase = phaseId
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