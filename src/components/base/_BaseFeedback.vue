<template>
	<component class="base-feedback" :is="tag">
		<slot></slot>
	</component>
</template>

<script>
export default {
  name: 'BaseFeedback',

  props: {
    tag: {
      type: String,
      default: 'p',
    }
  }
}
</script>

<style lang="scss" scoped>
.base-feedback {
  line-height: 1.4em;
	color: purple;
}
</style>
