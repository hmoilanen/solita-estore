<template>
	<div class="quantity-selector">
		<button
			@click="increaseAmount"
			:class="classing.increase"
		>+</button>
		<div class="amount">{{ amount }}</div>
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
			//required: true
		},
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

	created() {
		// If amount is v-model:ed from parent
		if (this.value) {
			this.amount = this.value
		}
	},

	methods: {
		increaseAmount() {
			this.amount = increaseAmountOfProducts(this.amount, this.max)
			this.$emit('input', this.amount)
		},

		decreaseAmount() {
			this.amount = decreaseAmountOfProducts(this.amount, this.min)
			this.$emit('input', this.amount)
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