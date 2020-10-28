<template>
  <div class="view--home">
		<router-link :to="{ name: 'Shop' }">to shop</router-link>
		<div class="boxi">
			<div class="maini"></div>
			<div class="maini l1"></div>
			<div class="maini l2"></div>
			<div class="maini l3"></div>
			<div class="maini hl"></div>
			<div class="maini black"></div>
			<div class="maini white"></div>
		</div>
  </div>
</template>

<script>
export default { name: 'ViewHome' }
</script>

<style lang="scss" scoped>
.boxi {
	border: 1px solid $app-color--main;
	padding: 2rem;
	display: inline-flex;
}
.maini {
	width: 50px;
	height: 50px;
	background: $app-color--main;
	&.l1 { background: $app-color--main-l1; }
	&.l2 { background: $app-color--main-l2; }
	&.l3 { background: $app-color--main-l3; }
	&.hl { background: $app-color--hl; }
	&.black { background: $app-color--black; }
	&.white { background: $app-color--white; }
}
</style>
