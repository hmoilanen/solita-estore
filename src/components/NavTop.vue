<template>
	<div class="nav-top">
		<div class="left">
			<App-logo
				@click="goToShop"
				:height="65"
			/>
			<span v-if="displaySlogan">The most definitive shape store in the world!</span>
		</div>
		<Nav-top-options/>
	</div>
</template>

<script>
import AppLogo from '@/components/AppLogo'
import NavTopOptions from '@/components/NavTopOptions'

export default {
	name: 'NavTop',

	components: {
		AppLogo,
		NavTopOptions
	},

	data() {
		return {
			displaySlogan: false
		}
	},

	created() {		
		const trackWindowWidth = () => {
			if (window.innerWidth < 620) {
				this.displaySlogan = false
				return
			}

			this.displaySlogan = true
		}

		trackWindowWidth()

		window.addEventListener('resize', trackWindowWidth)
		this.$once('hook:beforeDestroy', () => {      
      window.removeEventListener('resize', trackWindowWidth)
    })
	},
	
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
	overflow: hidden;
	height: $app-vars--nav-top--height;
	padding: 0 1.5rem;
	display: flex;
	align-items: center;
	justify-content: space-between;
	background: $nav-top--color-bg;
	color: $nav-top--color;

	.left {
		display: flex;
		align-items: center;
		span {
			margin-left: 1rem;
			margin-right: 2rem;
			font-size: 0.7rem;
		}
	}
}

</style>