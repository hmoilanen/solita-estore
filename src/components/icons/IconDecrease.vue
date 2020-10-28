<template>
	<g class="base-icon--decrease">
		<rect class="base-icon--decrease-1" x="1" y="1" width="48" height="48" rx="6.16"/>
		<path class="base-icon--decrease-2" d="M37.6,28h-25a3,3,0,0,1,0-6h25a3,3,0,0,1,0,6Z"/>
	</g>
</template>

<style lang="scss" scoped>
.base-icon--decrease {
  .base-icon--decrease-1 { fill: $app-color--main-l2; }
  .base-icon--decrease-2 { fill: $app-color--white; }
	&:hover .base-icon--decrease-1 { fill: $app-color--main; }
}
</style>