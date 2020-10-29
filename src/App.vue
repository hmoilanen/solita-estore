<template>
  <div id="app">
		<Nav-top/>
    <router-view :key="$route.name"/>
  </div>
</template>

<script>
import { productData } from '@/store/productData'
import NavTop from '@/components/NavTop'

export default {
	name: 'App',

	components: { NavTop },

	created() {
		/* const urli = 'https://my-json-server.typicode.com/typicode/demo'
		const urli2 = 'https://my-json-server.typicode.com/hmoilanen/solita-estore---fake-REST/products'

		fetch(urli2, {
			mode: 'no-cors',
			headers: {
				'Access-Control-Allow-Origin': '*',
				"Access-Control-Allow-Credentials": true
			}
		})
			.then(res => {
				console.log('res:', res);
				res.json()
			})
			.then(data => console.log(data)) */

		// Mimic database with external js file
		this.$store.dispatch('STORE_PRODUCTS', productData)

		// Check if local storage contains products added in cart...
		const ls = window.localStorage
		const productsInLocalStorage = ls.getItem('whee-products')

		// ...and store them if so.
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

body { background: $app-color--main-l3; }

input {
	&[type='number'] {
  	-moz-appearance:textfield;
	}
	&::-webkit-outer-spin-button,
	&::-webkit-inner-spin-button {
    -webkit-appearance: none;
	}
}

hr {
	margin: 1rem 0;
	border: 0;
	border-top: 1px solid $app-color--main-l2;
}

#app {
	color: $app-color--black;
  //font-family: Avenir, Helvetica, Arial, sans-serif;
  font-family: $app-font--bold;
  -webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
</style>
