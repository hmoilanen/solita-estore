<template>
  <div class="view--home">
		<router-link to="/shop">to shop</router-link>
    <QuantitySelector/>
    <!-- <QuantitySelector v-model="amount"/> -->
		<div>amount: {{amount}}</div>
  </div>
</template>

<script>
import QuantitySelector from '@/components/QuantitySelector'

export default {
	name: 'ViewHome',

	components: { QuantitySelector },

	/* data() {
		return {
			amount: 4
		}
	} */
}
</script>
