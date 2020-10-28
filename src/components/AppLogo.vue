<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 110 50"
    :width="styling.width"
    :height="styling.height"
    class="app-logo"
    :class="classing"
    v-on="listeners"
  >
    <!-- <Wheee/> -->
		<g>
			<path d="M28.86,3c8.78.93,15.08,8.71,11.11,22.93s-27,27.52-8.32-7.54C21.24,26,13.93,41.87,12.3,47,14.24,30.83,16,26,16.42,23.83c1.55-6.29-.78-10.1-7.15-3.18S-.63,36.93,10,31.1"/>
			<path d="M49.48,4c1.45,11.6-6.92,37.19-9,37.19S49,26,53.66,23.43c2.8-1.57,3.9-.69,2.1,2.68s-5.84,16.75,6.52,8A21.74,21.74,0,0,0,69,26.4c2.1-4.8-2.31-7.79-6.08-2C54.89,37.72,73,41.37,81.5,25.72c2.1-4.79-2.31-7.79-6.08-2C67.36,37.05,85.5,40.69,94,25c2.1-4.79-2.31-7.79-6.08-2-6.73,11.16,4.83,15.54,13.75,7.55a21.46,21.46,0,0,0,5.14-5.83"/>
		</g>
  </svg>
</template>

<script>
import Wheee from '@/components/icons/IconWheee'

export default {
	name: 'AppLogo',
	
	components: { Wheee },

	props: {
		width: Number, // = px
		height: Number // = px
	},

  computed: {
    listeners () {
      return { ...this.$listeners }
    },

    classing() {
      return {
				clickable: this.clickable
      }
		},

		styling() {
			let width = 110
			let height = 50

			if (this.width) {
				width = this.width
				height = this.width * (50 / 110) // From the size of original svg
			}

			if (this.height) {
				height = this.height
				width = this.height * (110 / 50) // From the size of original svg
			}
			
			return {
				width: width + 'px',
				height: height + 'px'
			}
		}
  }
}
</script>

<style lang="scss">
$app-logo--color-stroke: $app-color--white;
$app-logo--color-stroke2: $app-color--main-l1;

.app-logo {
	margin-left: -0.7rem;
	display: block;
	position: relative;
	transform: rotate(-4deg);
	@extend %clickable;
	g {
		position: relative;
		width: 100%;
		height: 100%;
	}
	path {
		stroke: $app-logo--color-stroke2;
		stroke-width: 0.25rem;
		stroke-linecap: round;
		stroke-linejoin: round;
		fill: none;
		transition: stroke 0.4s ease;
	}
	&:hover path { stroke: $app-logo--color-stroke; }
}
</style>
