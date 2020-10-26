<template>
	<div class="confirmation-modal">
		<div class="wrapper">
			<slot>modal</slot>
		</div>
	</div>
</template>

<script>
export default { name: 'ConfirmationModal' }
</script>

<style lang="scss" scoped>
.confirmation-modal {
	z-index: 10;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
	bottom: 0;
	background: rgba(144, 238, 144, 0.5);
	display: flex;
	align-items: center;
	justify-content: center;

	.wrapper {
		background: white;
		border: 1px solid black;
		padding: 1rem;
		border-radius: 3px;
	}
}
</style>