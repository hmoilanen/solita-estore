<template>
  <div id="app">
		<Nav-top/>
    <router-view/>
  </div>
</template>

<script>
import NavTop from '@/components/NavTop'

export default {
	name: 'App',

	components: { NavTop },

	created() {
		// Check if local storage contains product data and get it
		const ls = window.localStorage
		const productsInLocalStorage = ls.getItem('whee-products')

		if (productsInLocalStorage) {
			this.$store.dispatch(
				'SET_CART',
				JSON.parse(productsInLocalStorage)
			)
		}

	}
}
</script>

<style lang="scss">
*,
*::before,
*::after {
	box-sizing: border-box;
	margin: 0;
	padding: 0;
}


input {
	&[type='number'] {
  	-moz-appearance:textfield;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
    -webkit-appearance: none;
	}
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
</style>
