<template>
	<div class="nav-top">
		<div>
			<strong @click="goToShop">WHEE</strong>
			<span>The most definitive shape store in the wööörld</span>
		</div>
		<Nav-top-options/>
	</div>
</template>

<script>
import NavTopOptions from '@/components/NavTopOptions'

export default {
	name: 'NavTop',

	components: { NavTopOptions },
	
	methods: {
		goToShop() {
			this.$router.push({ name: 'Shop' })
		}
	}
}
</script>

<style lang="scss" scoped>
$nav-top--color: $app-color--white;
$nav-top--color-bg: $app-color--main;

.nav-top {
	height: $app-vars--nav-top--height;
	padding: 0 1rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: $nav-top--color-bg;
	color: $nav-top--color;
}

</style>