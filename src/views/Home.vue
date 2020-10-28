<template>
  <div class="view--home">
		<router-link :to="{ name: 'Shop' }">to shop</router-link>
		<div class="box colors">
			<div class="maini"></div>
			<div class="maini l1"></div>
			<div class="maini l2"></div>
			<div class="maini l3"></div>
			<div class="maini hl"></div>
			<div class="maini black"></div>
			<div class="maini white"></div>
		</div>
		<Base-button></Base-button>
		<Base-button :disabled="true"></Base-button>
		<Base-button :center="true"></Base-button>
		<Base-button :rounded="true"></Base-button>
		<Base-button :highlight="true"></Base-button>
		<Base-button :empty="true"></Base-button>
		<Base-button :empty="true" :highlight="true"></Base-button>
		<Base-button :pseudo="true"></Base-button>
		<Base-button :stretch="true"></Base-button>
		<Base-button size="s"></Base-button>
		<Base-button></Base-button>
		<Base-button size="m"></Base-button>
		<Base-button size="l"></Base-button>
		<hr>
		<Base-icon size="s">increase</Base-icon>
		<Base-icon>increase</Base-icon>
		<Base-icon size="m">increase</Base-icon>
		<Base-icon size="l">increase</Base-icon>
  </div>
</template>

<script>
export default { name: 'ViewHome' }
</script>

<style lang="scss" scoped>
.box {
	border: 1px solid $app-color--main;
	padding: 2rem;
	display: inline-flex;
	//&.colors { display: inline-flex; }
	&::v-deep .base-button {
		& > * { margin: 0.5rem;}
	}
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
.view--home {
	&::v-deep {
		.base-button {
			margin: 0.5rem;
		}
	}
}
</style>
