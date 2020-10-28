<template>
  <label class="base-label">
    <slot>{{ $options.name }}</slot>
    <span v-if="required"> *</span>
    <span v-if="optional"> (optional)</span>
  </label>
</template>

<script>
export default {
  name: 'BaseLabel',

  props: {
		required: Boolean,
		optional: Boolean
  }
}
</script>

<style lang="scss" scoped>
$base-label--color: $app-color--main-l1;

.base-label {
  display: block;
  margin-bottom: 0.3em;
  font-size: 0.9em; // Based on parent component's font-size

  span { color: $base-label--color; }
}
</style>
