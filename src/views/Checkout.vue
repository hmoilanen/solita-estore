<template>
  <div class="view--cart">
		<h1>Kassa</h1>
		<form @submit.prevent>
			<div>
				<input
					v-model="information.phase2.firstName"
					placeholder="etunimi"
				>
				<input
					v-model="information.phase2.lastName"
					placeholder="sukunimi"
				>
				<input
					v-model="information.phase2.address"
					placeholder="katuosoite"
				>
				<input
					v-model="information.phase2.city"
					placeholder="kaupunki"
				>
				<input
					v-model="information.phase2.country"
					placeholder="maa"
				>
				<input
					v-model="information.phase2.phone"
					type="number"
					placeholder="puhelinnumero (valinnainen)"
				>
			</div>
		</form>
  </div>
</template>

<script>
export default {
	name: 'ViewCart',

	data() {
		return {
			information: {
				phase1: {
					title: 'Tilaaja',
					email: ''
				},
				phase2: {
					title: 'Lähetys',
					firstName: '',
					lastName: '',
					address: '',
					city: '',
					country: '',
					phone: '',
				},
				phase3: {
					title: 'Laskutus',
					firstName: '',
					lastName: '',
					address: '',
					city: '',
					country: '',
					phone: '',
				},
				phase4: {
					title: 'Maksu',
					cardNumber: 0,
					nameOnCard: '',
					validity: '',
					security: 0,
				},
				deliverySameAsBilling: false,
				validated: false,
			}
		}
	}
}
</script>

<style lang="scss" scoped>
.view--cart {
	max-width: 600px;
	margin: 0 auto;

	input {
		display: block;
		padding: 0.2rem;
		margin-bottom: 0.2rem;
	}
}
</style>