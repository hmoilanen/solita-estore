<template>
	<div
		class="base-checkbox"
		@click="checkboxClicked"
		@keydown.enter="checkboxClicked"
		tabindex=0
	>
		<Base-icon
			:icon="dynamicIcon"
			:clickable="true"
			size="s"
		/>
		<span>
			<slot></slot>
		</span>
	</div>
</template>

<script>
export default {
	name: 'BaseCheckbox',

	props: {
		value: {
			type: Boolean,
			required: true
		}
	},

	data() {
		return {
			checked: false
		}
	},

	computed: {
		dynamicIcon() {
			return this.checked ? 'checkbox' : 'checkbox-empty'
		}
	},

	methods: {
		checkboxClicked() {
			this.checked = !this.checked
			this.$emit('input', !this.value)
		}
	}
}
</script>

<style lang="scss" scoped>
$base-checkbox--color--border: $app-color--main-l2;

.base-checkbox {
	display: flex;
	align-items: center;
	outline: 0;
	user-select: none;
	span {
		margin-left: 0.4rem;
		font-size: 0.8rem;
		cursor: default;
	}
	&:focus {
		span { text-decoration: underline; }	
	}
}
</style>