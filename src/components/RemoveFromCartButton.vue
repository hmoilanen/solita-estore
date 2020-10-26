<template>
	<div>
		<button @click="openModal">poista tuote</button>
		
		<Confirmation-modal v-if="displayRemoveModal">
			<h3>Are you sure you want to remove this item?</h3>
			<div>{{ product.amount }} x {{ product.name }}</div>
			<button @click="confirmRemove">Ok</button>
			<button @click="cancelRemove">Cancel</button>
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