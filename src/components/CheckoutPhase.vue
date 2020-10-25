<template>
	<div class="checkout-phase">
		<h3>{{ phase.main.id }}: {{ phase.main.title }}</h3>
		<button
			v-if="allowEditing"
			@click="editPhase"
		>muokkaa</button>

		<template v-if="phase.main.opened">
			<input
				v-for="(field, key) in fields"
				:key="key"
				v-model="field.value"
				:type="field.type || 'text'"
				:placeholder="field.label"
			>
			<input
				v-if="phase.main.id === 2"
				v-model="billingSameAsShipping"
				type="checkbox"
			>
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
			billingSameAsShipping: false
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

				if (currentField.pattern && !currentField.pattern.test(currentField.value)) {
					allValid = false
					break
				}
			}

			// If all fields are validated update phases in store
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
			}
		},

		editPhase() {
			this.$store.dispatch('EDIT_PHASE', this.phase.main.id)
		}
	}
}
</script>

<style lang="scss" scoped>
.checkout-phase {
	padding: 0.5rem 0;
	border-bottom: 1px solid lightgreen;

	input {
		display: block;
		padding: 0.2rem;
		margin-bottom: 0.2rem;
	}
}
</style>