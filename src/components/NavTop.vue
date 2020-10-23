<template>
	<div class="nav-top">
		<div>
			<strong>WHEE</strong>
			<span>The most definitive shape store in the wööörld</span>
		</div>
		<Nav-top-cart/>
	</div>
</template>

<script>
import NavTopCart from '@/components/NavTopCart'

export default {
	name: 'NavTop',

	components: { NavTopCart }
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