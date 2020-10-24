<template>
	<div class="checkout-phase">
		<h3>{{ phase.id }}: {{ phase.title }}</h3>
		<button
			v-if="allowEditing"
			@click="editPhase"
		>muokkaa</button>
		<div v-for="(field, key) in currentPhase">{{ key }}: {{ field.value }}</div>

		<template v-if="opened">
			<input
				v-for="(field, key) in currentPhase"
				:key="key"
				v-model="field.value"
				:type="field.type || 'text'"
				:placeholder="field.label"
			>
			<button @click="validatePhase">jatka</button>
		</template>
	</div>
</template>

<script>
import { valueExists, onlyNumbers, validateEmail } from '@/utils/regex'

export default {
	name: 'CheckoutPhase',

	props: {
		phase: {
			type: Object,
			required: true
		},
		opened: {
			type: Boolean,
			default: true
		},
		validated: {
			type: Boolean,
			default: true
		},
	},

	computed: {
		currentPhase() {
			return this[`phase${this.phase.id}-fields`]
		},

		allowEditing() {
			return this.validated && !this.opened
		}
	},

	methods: {
		validatePhase() {
			let allValid = true

			for (const field in this.currentPhase) {
				const currentField = this.currentPhase[field]

				if (currentField.pattern && !currentField.pattern.test(currentField.value)) {
					allValid = false
					break
				}
			}

			if (allValid) {
				this.$emit('validate', this.phase.id)
			}
		},

		editPhase() {
			this.$emit('edit', this.phase.id)
		}
	},

	data() {
		return {
			'phase1-fields': {
				email: { value: '', label: 'Sähköpostiosoite', type: 'email', valid: true, pattern: validateEmail }
			},
			'phase2-fields': {
				firstName: { value: '', label: 'Etunimi', pattern: valueExists },
				lastName: { value: '', label: 'Sukunimi', pattern: valueExists },
				address: { value: '', label: 'Katuosoite', pattern: valueExists },
				city: { value: '', label: 'Kaupunki', pattern: valueExists },
				country: { value: '', label: 'Maa', pattern: valueExists },
				//phone: { value: '', label: 'Puhelinnumero (*)', type: 'number', pattern: onlyNumbers }
				phone: { value: '', label: 'Puhelinnumero (*)', type: 'number' }
			},
			'phase3-fields': {
				firstName: { value: '', label: 'Etunimi', pattern: valueExists },
				lastName: { value: '', label: 'Sukunimi', pattern: valueExists },
				address: { value: '', label: 'Katuosoite', pattern: valueExists },
				city: { value: '', label: 'Kaupunki', pattern: valueExists },
				country: { value: '', label: 'Maa', pattern: valueExists },
				//phone: { value: '', label: 'Puhelinnumero (*)', type: 'number', pattern: onlyNumbers }
				phone: { value: '', label: 'Puhelinnumero (*)', type: 'number' }
			},
			'phase4-fields': {
				cardNumber: { value: '', label: 'Kortin numero', type: 'number', pattern: valueExists },
				nameOnCard: { value: '', label: 'Kortin omistaja', pattern: valueExists },
				validity: { value: '', label: 'Voimassa', type: 'number', pattern: valueExists },
				security: { value: '', label: 'CVV', type: 'number', pattern: valueExists }
			}
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