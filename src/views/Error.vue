<template>
  <div class="view--error">
		<h1>404</h1>
		<h1>Oopsie... No such page!</h1>
		<router-link :to="{ name: 'Shop' }">Go to shop</router-link>
  </div>
</template>

<script>
export default {
	name: 'ViewError',
}
</script>
