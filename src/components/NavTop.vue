<template>
	<div class="nav-top">
		<div>
			<strong>WHEE</strong>
			<span>The most definitive shape store in the wööörld</span>
		</div>
		<Nav-top-summary v-if="displaySummary"/>
	</div>
</template>

<script>
import NavTopSummary from '@/components/NavTopSummary'

export default {
	name: 'NavTop',

	components: { NavTopSummary },

	computed: {
		displaySummary() {
			return this.$route.name !== 'Checkout'
		}
	}
}
</script>

<style lang="scss" scoped>
.nav-top {
	padding: 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: lightgreen;
}

</style>