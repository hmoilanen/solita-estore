<template>
  <div class="view--cart">
		<h1>Checkout</h1>

		<Checkout-summary/>
		
		<form @submit.prevent>
			<Checkout-phase
				v-for="phase in phases"
				:key="phase.main.id"
				:phase="phase"
				@update-phase="updatePhase"
				@edit-phase="editPhase"
				@field-validation="fieldValidation"
			/>
			<Base-button
				v-if="!allowCheckoutSubmit"
				@click="submitCheckout"
				:stretch="true"
				:size="1.2"
			>Place order</Base-button>
		</form>
  </div>
</template>

<script>
import { valueExists, validateEmail } from '@/utils/regex'
import CheckoutSummary from '@/components/CheckoutSummary'
import CheckoutPhase from '@/components/CheckoutPhase'

export default {
	name: 'ViewCart',

	components: {
		CheckoutSummary,
		CheckoutPhase
	},

	data() {
		return {
			phases: {
				phase1: {
					main: { id: 1, title: 'Customer', validated: false, opened: true },
					email: { value: '', label: 'Email', type: 'email', valid: true, pattern: validateEmail, feedback: 'Provide proper email' }
				},
				phase2: {
					main: { id: 2, title: 'Shipping', validated: false, opened: false },
					firstName: { value: '', label: 'First name', valid: true, pattern: valueExists, feedback: 'Provide information' },
					lastName: { value: '', label: 'Last name', valid: true, pattern: valueExists, feedback: 'Provide information' },
					address: { value: '', label: 'Address', valid: true, pattern: valueExists, feedback: 'Provide information' },
					city: { value: '', label: 'City', valid: true, pattern: valueExists, feedback: 'Provide information' },
					country: { value: '', label: 'Country', valid: true, pattern: valueExists, feedback: 'Provide information' },
					phone: { value: '', label: 'Phone', type: 'number' }
				},
				phase3: {
					main: { id: 3, title: 'Billing', validated: false, opened: false },
					firstName: { value: '', label: 'Etunimi', valid: true, pattern: valueExists, feedback: 'Provide information' },
					lastName: { value: '', label: 'Sukunimi', valid: true, pattern: valueExists, feedback: 'Provide information' },
					address: { value: '', label: 'Katuosoite', valid: true, pattern: valueExists, feedback: 'Provide information' },
					city: { value: '', label: 'Kaupunki', valid: true, pattern: valueExists, feedback: 'Provide information' },
					country: { value: '', label: 'Maa', valid: true, pattern: valueExists, feedback: 'Provide information' },
					phone: { value: '', label: 'Puhelinnumero', type: 'number' }
				},
				phase4: {
					main: { id: 4, title: 'Payment', validated: false, opened: false },
					cardNumber: { value: '', label: 'Kortin numero', type: 'number', valid: true, pattern: valueExists },
					nameOnCard: { value: '', label: 'Kortin omistaja', valid: true, pattern: valueExists },
					validity: { value: '', label: 'Voimassa', type: 'number', valid: true, pattern: valueExists },
					security: { value: '', label: 'CVV', type: 'number', valid: true, pattern: valueExists }
				}
			}
		}
	},

	computed: {
		allowCheckoutSubmit() {
			const phases = this.phases
			let allPhasesValidated = true

			for (let phase in phases) {
				if (!phases[phase].main.validated) {
					allPhasesValidated = false
					break
				}
			}

			return allPhasesValidated
		}
	},

	methods: {
		updatePhase({ phaseFields, phaseId, duplicated }) {
			const phases = this.phases
			const currentPhase = phases[`phase${phaseId}`]

			// Set all values of the corresponding fields and validate them (for UI)
			for (const field in phaseFields) {
				this.$set(currentPhase[field], 'value', phaseFields[field])
				this.$set(currentPhase[field], 'valid', true)
				
				// If billing information is same as shipping, update accordingy
				if (duplicated) {
					this.$set(phases[`phase${phaseId + 1}`][field], 'value', phaseFields[field])
				}
			}

			// Validate and close current phase
			this.$set(currentPhase.main, 'validated', true)
			this.$set(currentPhase.main, 'opened', false)
			
			// Open next not-validated phase
			const amountOfPhases = Object.keys(phases).length

			for (let i = 1; i <= amountOfPhases; i++) {
				const mainOfPhase = phases[`phase${i}`].main

				if (!mainOfPhase.validated) {
					this.$set(mainOfPhase, 'opened', true)
					break
				}
			}
		},

		editPhase(phaseId) {
			// First close currently opened phase...
			const phases = this.phases
			
			for (const phase in phases) {
				const mainOfPhase = phases[phase].main
				if (mainOfPhase.opened) {
					this.$set(mainOfPhase, 'opened', false)
				}
			}

			// ...then open the to-be-edited phase
			this.$set(phases[`phase${phaseId}`].main, 'validated', false)
			this.$set(phases[`phase${phaseId}`].main, 'opened', true)
		},

		fieldValidation({ phaseId, field, validationState }) {
			this.$set(this.phases[`phase${phaseId}`][field], 'valid', validationState)
		},

		submitCheckout() {
			const phases = this.phases
			let parsedCustomerData = {}

			for (const phase in phases) {
				const { main, ...fields } = phases[phase]
				const key = main.title.toLowerCase()

				parsedCustomerData[key] = {}
				for (const field in fields) {
					parsedCustomerData[key][field] = fields[field].value
				}
			}

			const checkoutData = JSON.stringify(parsedCustomerData)
			console.log('Checkout!:', checkoutData);
		}
	}
}
</script>

<style lang="scss" scoped>
.view--cart {
	max-width: 600px;
	margin: 0 auto;

	&::v-deep {
		.base-input {
			margin: 0.8rem 0;
		}
	}
}
</style>