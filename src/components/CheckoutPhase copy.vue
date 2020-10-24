<template>
	<div class="checkout-phase">
		<h3>{{ value.id }} - {{ value.title }}</h3>
		<input
			v-for="(field, key) in formFields"
			:key="key"
			:value="field"
			@input="updateFormData(key, $event.target.value)"
			:type="inputType(key)"
			:placeholder="key"
		>
		<button @click="validate">jatka</button>
	</div>
</template>

<script>
export default {
	name: 'CheckoutPhase',

	props: {
		value: {
			type: Object,
			required: true
		}
	},

	updated() {
		console.log('updeittas');
	},

	computed: {
		formFields() {
			const { id, title, ...fields } = this.value
			return fields
		}
	},

	methods: {
		inputType(key) {
			let type = 'text'
			const number = ['phone', 'cardNumber', 'security']

			if (number.indexOf(key) !== -1) { type = 'number' }

			if (key === 'email') { type = 'email' }

			return type
		},

		updateFormData(key, value) {
			this.$emit('input', { ...this.value, [key]: value })
		},

		validate() {
			this.$emit('validated', this.value.id)
		}
	}
}
</script>

<style lang="scss" scoped>
.checkout-phase {
	input {
		display: block;
		padding: 0.2rem;
		margin-bottom: 0.2rem;
	}
}
</style>