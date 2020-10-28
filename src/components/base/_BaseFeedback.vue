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
$base-feedback--color: $app-color--hl2;

.base-feedback {
  line-height: 1.4em;
	color: $base-feedback--color;
}
</style>
