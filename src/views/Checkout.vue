<template>
  <div class="view--cart">
		<Content-grid>
			<template #title>
				<Base-title
					:center="true"
					size="l"
					tag="h1"
				>Checkout</Base-title>
			</template>

			<template #main>
				<form @submit.prevent>
					<Checkout-phase
						v-for="phase in phases"
						:key="phase.main.id"
						:phase="phase"
						@update-phase="updatePhase"
						@edit-phase="editPhase"
						@field-validation="fieldValidation"
					/>
					<br>
					<Base-button
						@click="submitCheckout"
						:disabled="!allowCheckoutSubmit"
						:stretch="true"
						size="1.1rem"
					>Place order</Base-button>
				</form>
			</template>

			<template #aside>
				<Checkout-summary/>
			</template>
		</Content-grid>
  </div>
</template>

<script>
import ContentGrid from '@/components/ContentGrid'
import CheckoutSummary from '@/components/CheckoutSummary'
import CheckoutPhase from '@/components/CheckoutPhase'
//import storageCustomer from '@/logic/storageCustomer'
import {
	valueExists,
	onlyLettersAndWhitespace,
	onlyNumbers,
	validateEmail
} from '@/utils/regex'

export default {
	name: 'ViewCart',

	components: {
		ContentGrid,
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
					firstName: { value: '', label: 'First name', valid: true, pattern: valueExists, feedback: 'Provide information' },
					lastName: { value: '', label: 'Last name', valid: true, pattern: valueExists, feedback: 'Provide information' },
					address: { value: '', label: 'Address', valid: true, pattern: valueExists, feedback: 'Provide information' },
					city: { value: '', label: 'City', valid: true, pattern: valueExists, feedback: 'Provide information' },
					country: { value: '', label: 'Country', valid: true, pattern: valueExists, feedback: 'Provide information' },
					phone: { value: '', label: 'Phone', type: 'number' }
				},
				phase4: {
					main: { id: 4, title: 'Payment', validated: false, opened: false },
					cardNumber: { value: '', label: 'Credit card number', type: 'number', valid: true, pattern: onlyNumbers, feedback: 'Provide only numbers' },
					nameOnCard: { value: '', label: 'Name on card', valid: true, pattern: onlyLettersAndWhitespace, feedback: 'Provide correct name' },
					validity: { value: '', label: 'Expiration', type: 'number', valid: true, pattern: onlyNumbers, feedback: 'Provide only numbers' },
					security: { value: '', label: 'CVV', type: 'number', valid: true, pattern: onlyNumbers, feedback: 'Provide only numbers' }
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
		},

		parsedCustomerData() {
			// Include only necessary customer data and only from validated phases
			const { phase4, ...customerData } = this.phases
			const parsedCustomerData = {}

			for (const phase in customerData) {
				const { main, ...fields } = customerData[phase]

				if (main.validated) {
					const key = main.title.toLowerCase()
					
					//parsedCustomerData[`${main.id}-${key}`] = {}
					parsedCustomerData[key] = {}
	
					for (const field in fields) {
						parsedCustomerData[key][field] = fields[field].value
					}

				}
			}

			return parsedCustomerData
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

			// Save updated customer data to local storage
			//storageCustomer(this.parsedCustomerData)
			
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
			const phases = this.phases
			
			// First close currently opened phase...
			for (const phase in phases) {
				const mainOfPhase = phases[phase].main
				if (mainOfPhase.opened) {
					this.$set(mainOfPhase, 'opened', false)
				}
			}

			// ...then open the to-be-edited phase
			this.$set(phases[`phase${phaseId}`].main, 'validated', false)
			this.$set(phases[`phase${phaseId}`].main, 'opened', true)

			// Update customer data to local storage / remove non-validated phases
			//storageCustomer(this.parsedCustomerData)
		},

		fieldValidation({ phaseId, field, validationState }) {
			this.$set(this.phases[`phase${phaseId}`][field], 'valid', validationState)
		},

		submitCheckout() {
			const parsedProductData = this.$store.getters['PARSED_PRODUCTS_IN_CART']

			// Convert data to JSON
			const customerJSON = JSON.stringify(this.parsedCustomerData)
			const productJSON = JSON.stringify(parsedProductData)
			console.log('Checkout - customer data:', customerJSON)
			console.log('Checkout - product data:', productJSON)

			// POST data ->
			// ...
		}
	}
}
</script>

<style lang="scss" scoped>
.view--cart {
	&::v-deep {
		.base-input {
			margin: 0.8rem 0;
		}
	}
}
</style>