<template>
	<div class="quantity-selector">
		<button
			@click="increaseAmount"
			:class="classing.increase"
		>+</button>
		<div class="amount">{{ value }}</div>
		<button
			@click="decreaseAmount"
			:class="classing.decrease"
		>-</button>
	</div>
</template>

<script>
import increaseAmountOfProducts from '@/logic/increaseAmountOfProducts'
import decreaseAmountOfProducts from '@/logic/decreaseAmountOfProducts'

export default {
	name: 'QuantitySelector',

	props: {
		value: {
			type: Number,
			required: true
		},
		max: {
			type: Number,
			default: 100
		},
		min: {
			type: Number,
			default: 1
		},
	},
	
	computed: {
		classing() {
			return {
				increase: { disabled: this.value >= this.max },
				decrease: { disabled: this.value <= this.min }
			}
		}
	},

	methods: {
		increaseAmount() {
			const increasedAmount = increaseAmountOfProducts(this.value, this.max)
			this.$emit('input', increasedAmount)
		},

		decreaseAmount() {
			const decreasedAmount = decreaseAmountOfProducts(this.value, this.min)
			this.$emit('input', decreasedAmount)
		},
	}
}
</script>

<style lang="scss" scoped>
.quantity-selector {
	display: flex;
	align-items: center;
	& * { user-select: none; }

	button {
		width: 30px; // dummy
		height: 30px; // dummy
		text-align: center;
		cursor: pointer;
		&.disabled {
			opacity: 0.4;
			pointer-events: none;
		}
	}

	.amount {
		font-size: 2rem;
		font-weight: 700;
		margin: 0 0.4rem;
	}
}
</style>