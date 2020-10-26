<template>
	<div class="checkout-phase">
		<h3>
			{{ phase.main.id }}: {{ phase.main.title }}
			<span v-if="phase.main.validated">OK!</span>
		</h3>
		<button
			v-if="allowEditing"
			@click="editPhase"
		>muokkaa</button>

		<template v-if="phase.main.opened">
			<Base-input
				v-for="(field, key) in fields"
				:key="key"
				v-model="field.value"
				:type="field.type || 'text'"
				:label="field.label"
				:optional="!field.pattern"
			/>
			<div v-if="phase.main.id === 2">
				<input
					v-model="billingSameAsShipping"
					type="checkbox"
					@keydown.enter.prevent="toggleCheckbox"
				>
				<span>Billing address same as shippping address</span>
			</div>
			<div v-if="phaseNotValidated">Please provide correct information to proceed...</div>
			<button @click="validatePhase">jatka</button>
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
			phaseNotValidated: false
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
		validatePhase() {
			let allValid = true

			// Validate all fields
			for (const field in this.fields) {
				const currentField = this.fields[field]

				// Check if field's value is provided as required
				if (currentField.pattern && !currentField.pattern.test(currentField.value)) {
					allValid = false

					// Invalidate all necessary fields
					this.$store.dispatch('INVALIDATE_CHECKOUT_PHASE_FIELD', {
						phaseId: this.phase.main.id,
						field
					})
				}
			}

			// If all fields are validated, update phases in store
			if (allValid) {
				let phaseFields = {}

				for (const field in this.fields) {
					phaseFields[field] = this.fields[field].value
				}

				this.$store.dispatch('UPDATE_CHECKOUT_PHASE', {
					phaseFields,
					phaseId: this.phase.main.id,
					duplicated: this.billingSameAsShipping
				})
			} else {
				this.phaseNotValidated = true
			}
		},

		editPhase() {
			this.$store.dispatch('EDIT_CHECKOUT_PHASE', this.phase.main.id)
		},

		toggleCheckbox() {
			this.billingSameAsShipping = !this.billingSameAsShipping
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