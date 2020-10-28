<template>
	<div class="quantity-selector">
		<Base-icon
			@click="increaseAmount"
			:class="classing.increase"
			:clickable="true"
		>increase</Base-icon>
		<!-- <button
			@click="increaseAmount"
			:class="classing.increase"
		>+</button> -->
		<input ref="paska" type="number" v-model="inputValue">
		<!-- <div class="amount">{{ value }}</div> -->
		<Base-icon
			@click="decreaseAmount"
			:class="classing.decrease"
			:clickable="true"
		>decrease</Base-icon>
		<!-- <button
			@click="decreaseAmount"
			:class="classing.decrease"
		>-</button> -->
		<span v-if="displayFeedback">Maximum of {{ max }} products can be added at a time!</span>
	</div>
</template>

<script>
import { onlyNumbers } from '@/utils/regex'

export default {
	name: 'QuantitySelector',

	props: {
		value: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			default: 999
		},
		min: {
			type: Number,
			default: 1
		},
	},

	data() {
		return {
			displayFeedback: false
		}
	},
	
	computed: {
		inputValue: {
			get: function() {
				return this.value
			},
			set: function(newValue) {
				// Check if value of input consists only of numbers
				if (onlyNumbers.test(newValue)) {
					// Don't allow 0 or less as a value
					if (Number(newValue) <= this.min) {
						this.$emit('input', this.min)
						this.$forceUpdate() // For forcing Vue to update input element's value
					}
					// Make sure value of input never exceed this.max
					else if (Number(newValue) <= this.max) {
						this.$emit('input', Number(newValue))
						this.displayFeedback = false
					}
					else {
						const controlledValue = newValue.slice(0, -1)

						this.displayFeedback = true
						this.$emit('input', Number(controlledValue))
						this.$forceUpdate() // For forcing Vue to update input element's value
					}
				}
			}
		},

		classing() {
			return {
				increase: { disabled: this.value >= this.max },
				decrease: { disabled: this.value <= this.min }
			}
		}
	},

	methods: {
		increaseAmount() {
			const increasedAmount = this.value < this.max
				?	this.value + 1
				: this.max
			this.$emit('input', increasedAmount)
		},

		decreaseAmount() {
			const decreasedAmount = this.value > this.min
				?	this.value - 1
				: this.min
			this.$emit('input', decreasedAmount)
		}
	}
}
</script>

<style lang="scss" scoped>
$quantity-selector--height: 1.6rem;

.quantity-selector {
	display: flex;
	align-items: center;
	& * { user-select: none; }

	input {
		outline: 0;
		border: none;
		text-align: center;
		height: $quantity-selector--height;
		width: calc(#{$quantity-selector--height} * 1.4);
		font-size: 1.2rem;
		font-weight: 700;
	}
}
</style>