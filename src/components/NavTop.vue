<template>
	<div class="nav-top">
		<div>
			<strong>WHEE</strong>
			<span>The most definitive shape store in the wööörld</span>
		</div>
		<Nav-top-options/>
	</div>
</template>

<script>
import NavTopOptions from '@/components/NavTopOptions'

export default {
	name: 'NavTop',

	components: { NavTopOptions }
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