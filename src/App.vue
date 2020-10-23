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

	components: { NavTop }
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

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

}
</style>
