<template>
	<div class="summary-info">
		<Base-text :bold="bold">{{ topic }}{{ colon }}</Base-text>
		<Base-text :bold="bold">
			<slot></slot>
		</Base-text>
	</div>
</template>

<script>
export default {
	name: 'SummaryInfo',

	props: {
		topic: String,
		bold: {
			type: Boolean
		}
	},

	computed: {
		colon() {
			return this.topic ? ':' : null
		}
	}
}
</script>

<style lang="scss" scoped>
.summary-info {
	display: flex;
	justify-content: space-between;
	margin: 0.5rem 0;
}
</style>