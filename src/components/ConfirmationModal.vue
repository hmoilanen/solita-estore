<template>
	<div class="confirmation-modal">
		<div class="wrapper">
			<slot>modal</slot>
		</div>
	</div>
</template>

<script>
export default {
	name: 'ConfirmationModal',

	created() {
		// Prevent scrolling of underlying layout when modal is open
		document.body.style.setProperty('overflow', 'hidden')

		// Allow scrolling again when modal is closed
		this.$once('hook:beforeDestroy', () => {      
      document.body.style.removeProperty('overflow')
    })
	}
}
</script>

<style lang="scss" scoped>
$confirmation-modal--color--wrapper: $app-color--white;

.confirmation-modal {
	z-index: 1;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: transparentize(lighten($app-color--main-l2, 13%), 0.065);
	display: flex;
	align-items: center;
	justify-content: center;
	padding: $app-vars--layout-padding;

	.wrapper {
		max-width: 450px;
		border-radius: $app-vars--border-radius;
		padding: $app-vars--card-padding;
		background: $confirmation-modal--color--wrapper;
		@extend %app-style--card-shadow;
		
	}
}
</style>