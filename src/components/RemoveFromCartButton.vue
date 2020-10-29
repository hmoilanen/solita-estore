<template>
	<div class="remove-from-cart-button">
		<Base-icon
			@click="openModal"
			:clickable="true"
			size="s"
		>x</Base-icon>
		
		<Confirmation-modal v-if="displayRemoveModal">
			<Base-icon
				class="warning"
				size="5rem"
			>warning</Base-icon>
			<Base-title>You are about to remove this item!</Base-title>
			<hr>
			<div class="product">
				<div class="left">
					<Base-icon>{{ product.image }}</Base-icon>
					<Base-title
						tag="h3"
						size=s
					>{{ product.name }}</Base-title>
				</div>
				<Base-text>x {{ product.amount }}</Base-text>
			</div>
			<hr>
			<Base-text
				size="m"
				:bold="true"
			>Are you sure?</Base-text>
			<div class="buttons">
				<Base-button
					@click="confirmRemove"
					:stretch="true"
					size="m"
				>Ok</Base-button>
				<Base-button
					@click="cancelRemove"
					:pseudo="true"
					:stretch="true"
					size="m"
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
	.warning {
		display: block;
		margin: 0 auto 2rem auto;
	}
	.product {
		margin: 2rem 0;
		display: flex;
		align-items: center;
		justify-content: space-between;
		.left {
			display: flex;
			align-items: center;
			.base-icon { margin-right: 0.8rem; }
		}
	}
	.buttons {
		margin-top: 2rem;
		*:first-child { margin-bottom: 1rem; }
	}
}
</style>