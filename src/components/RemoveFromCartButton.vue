<template>
	<div class="remove-from-cart-button">
		<Base-icon
			@click="openModal"
			:clickable="true"
		>x</Base-icon>
		
		<Confirmation-modal v-if="displayRemoveModal">
			<!-- <h3>Are you sure you want to remove this item?</h3> -->
			<Base-icon size="5rem">warning</Base-icon>
			<h3>You are about to remove this item!</h3>
			<div>{{ product.amount }} x {{ product.name }}</div>
			<h3>Are you sure?</h3>
			<div class="buttons">
				<Base-button
					@click="confirmRemove"
					size="m"
				>Ok</Base-button>
				<Base-button
					@click="cancelRemove"
					size="m"
					:pseudo="true"
				>Cancel</Base-button>
			</div>
		</Confirmation-modal>
	</div>
</template>

<script>
import ConfirmationModal from '@/components/ConfirmationModal'

export default {
	name: 'RemoveFromCartButton',

	components: { ConfirmationModal },

	props: {
		product: {
			type: Object,
			required: true
		}
	},

	data() {
		return {
			displayRemoveModal: false
		}
	},

	methods: {
		openModal() {
			this.displayRemoveModal = true
		},

		confirmRemove() {
			this.$store.dispatch('REMOVE_PRODUCT_FROM_CART', this.product.id)
		},

		cancelRemove() {
			this.displayRemoveModal = false
		}
	}
}
</script>

<style lang="scss" scoped>
.remove-from-cart-button {
	.buttons {
		display: flex;
		& > * { margin-right: 1rem;}
	}
}
</style>