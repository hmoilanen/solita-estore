<template>
	<div class="checkout-phase">
		<h3>
			{{ phase.main.id }}: {{ phase.main.title }}
			<span v-if="phase.main.validated">OK!</span>
		</h3>
		<Base-button
			v-if="allowEditing"
			@click="editPhase"
		>Edit</Base-button>

		<template v-if="phase.main.opened">
			<Base-input
				v-for="(field, key) in fields"
				:key="key"
				v-model="field.value"
				:type="field.type || 'text'"
				:label="field.label"
				:optional="!field.pattern"
				:feedback="!field.valid ? field.feedback : null"
				:disabled="mimicLoadingForCreditcardValidation"
			/>

			<div v-if="phase.main.id === 2">
				<input
					v-model="billingSameAsShipping"
					type="checkbox"
					@keydown.enter.prevent="toggleCheckbox"
				>
				<span>Billing address is same as shipping address</span>
			</div>

			<div v-if="phaseNotValidated && !mimicLoadingForCreditcardValidation">Please provide correct information to proceed...</div>
			<div v-if="mimicLoadingForCreditcardValidation">PLEASE WAIT...</div>
			<Base-button @click="validatePhase">Continue</Base-button>
		</template>
	</div>
</template>

<script>
export default {
	name: 'CheckoutPhase',

	props: {
		phase: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			billingSameAsShipping: false,
			phaseNotValidated: false,
			mimicLoadingForCreditcardValidation: false
		}
	},

	computed: {
		fields() {
			const { main, ...fields } = this.phase
			return fields
		},

		allowEditing() {
			const main = this.phase.main
			return main.validated && !main.opened
		}
	},

	methods: {
		async validatePhase() {
			let allValid = true

			await this.mimicAsyncForCreditcardValidation()

			// Validate all fields
			for (const field in this.fields) {
				const currentField = this.fields[field]

				if (currentField.pattern) {
					let validationState = true
					
					// Check if field's value is provided as required
					if (!currentField.pattern.test(currentField.value)) {
						allValid = false
						validationState = false
					}

					this.$emit('field-validation', {
						phaseId: this.phase.main.id,
						field,
						validationState
					})
				}
			}

			// If all fields are validated, update phases in store
			if (allValid) {
				let phaseFields = {}

				for (const field in this.fields) {
					phaseFields[field] = this.fields[field].value
				}

				this.$emit('update-phase', {
					phaseFields,
					phaseId: this.phase.main.id,
					duplicated: this.billingSameAsShipping
				})
			} else {
				this.phaseNotValidated = true
			}
		},

		editPhase() {
			this.$emit('edit-phase', this.phase.main.id)
		},

		toggleCheckbox() {
			this.billingSameAsShipping = !this.billingSameAsShipping
		},

		async mimicAsyncForCreditcardValidation() {
			// Mimic async/await when validating assumed credit card data
			if (this.phase.main.id === 4) {
				const delay = duration => new Promise(res => setTimeout(res, duration))
				
				this.mimicLoadingForCreditcardValidation = true
				await delay(3000)
				this.mimicLoadingForCreditcardValidation = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.checkout-phase {
	padding: 0.5rem 0;
	border-bottom: 1px solid lightgreen;

	input:not([type="checkbox"]) {
		display: block;
		padding: 0.2rem;
		margin-bottom: 0.2rem;
	}
}
</style>