<template>
	<div class="quantity-selector">
		<button
			@click="increase"
			:class="classing.increase"
		>+</button>
		<div class="amount">{{ amount }}</div>
		<button
			@click="decrease"
			:class="classing.decrease"
		>-</button>
	</div>
</template>

<script>
import increaseAmount from '@/logic/increaseAmount'
import decreaseAmount from '@/logic/decreaseAmount'

export default {
	name: 'QuantitySelector',

	props: {
		max: {
			type: Number,
			default: 5
		}
	},

	data() {
		return {
			amount: 0,
			min: 0
		}
	},

	methods: {
		increase() {
			this.amount = increaseAmount(this.amount, this.max)
		},

		decrease() {
			// Decreasing amount of items can't get below 0!
			this.amount = decreaseAmount(this.amount, this.min)
		},
	},

	computed: {
		classing() {
			return {
				increase: { disabled: this.amount === this.max },
				decrease: { disabled: this.amount === this.min }
			}
		}
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