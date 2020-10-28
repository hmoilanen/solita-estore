<template>
	<div class="checkout-phase">
		<div class="header">
			<h3>
				{{ phase.main.id }} - {{ phase.main.title }}
				<Base-icon 
					v-show="phase.main.validated"
					size="1rem"
				></Base-icon>
			</h3>
			<Base-button
				v-if="allowEditing"
				@click="editPhase"
				:pseudo="true"
				size="s"
			>Edit</Base-button>
		</div>

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

			<Base-checkbox
				v-if="phase.main.id === 2"
				v-model="billingSameAsShipping"
			>Billing address is same as shipping address</Base-checkbox>

			<div class="bottom">
				<Base-button @click="validatePhase">Continue</Base-button>
				<span v-if="feedback.displayed">{{ feedback.message }}</span>
			</div>
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
		},

		feedback() {
			let displayed = true
			let message = ''

			if (this.phaseNotValidated && !this.mimicLoadingForCreditcardValidation) {
				message = 'Please provide correct information to proceed...'
			} else if (this.mimicLoadingForCreditcardValidation) {
				message = 'PLEASE WAIT...'
			} else {
				displayed = false
			}

			return {
				displayed,
				message
			}
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

		testo() {
			this.$refs.checkbox.click()
		},

		toggleCheckbox() {
			this.billingSameAsShipping = !this.billingSameAsShipping
		},

		async mimicAsyncForCreditcardValidation() {
			// Mimic async/await when validating assumed credit card data
			if (this.phase.main.id === 4) {
				const delay = duration => new Promise(res => setTimeout(res, duration))
				
				this.mimicLoadingForCreditcardValidation = true
				await delay(2000)
				this.mimicLoadingForCreditcardValidation = false
			}
		}
	}
}
</script>

<style lang="scss" scoped>
$checkout-phase--color--separator: $app-color--main-l2;

.checkout-phase {
	padding: 0.8rem 0;
	border-bottom: 1px solid $checkout-phase--color--separator;

	.header {
		display: flex;
		align-items: center;
		justify-content: space-between;
		&::v-deep {
			.base-icon {
				position: relative;
				top: 0.1rem;
				left: 0.4rem;
			}
		}
	}

	.bottom {
		display: flex;
		align-items: center;
		span {
			margin-left: 0.4rem;
			font-size: 0.8rem;
		}
	}
}
</style>