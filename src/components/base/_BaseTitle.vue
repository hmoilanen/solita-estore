<template>
  <component
    :is="tag"
    class="base-title"
    :class="classing"
    :style="styling"
    v-on="listeners"
  >
    <slot>{{ $options.name }}</slot>
  </component>
</template>

<script>
export default {
  name: 'BaseTitle',

  props: {
    tag: {
      type: String,
      default: 'h2'
		},
		size: String,
    center: Boolean,
    truncate: Boolean,
		uppercase: Boolean,
    lineHeight: {
      type: [String, Number],
      default: '1.4em'
    }
  },
	
  computed: {
    classing() {
      return {
        truncate: this.truncate,
        center: this.center
      }
    },

    styling() {
			let size

			switch (this.size) {
				case 's':
					size = '1.2rem'
					break
				case 'm':
					size = '1.8rem'
					break
				case 'l':
					size = '2.6rem'
					break
				default:
					size = this.size
			}

			const lineHeight = this.lineHeight
      
      if (typeof this.lineHeight === 'number') {
        lineHeight += 'em'
      }

      return {
				fontSize: this.size ? size : '1.5rem',
        lineHeight,
        textTransform: this.uppercase
          ? 'uppercase'
          : false
      }
    },

    listeners() {
      return { ...this.$listeners }
    }
  }
}
</script>

<style lang="scss" scoped>
$base-title--color--text: $app-color--black;
$base-title--color--selection: $app-color--main-l2;

.base-title {
  word-break: break-word;
  overflow-wrap: break-word; // !
	letter-spacing: 0.02em;
	color: $base-title--color--text;
	&::selection { background: $base-title--color--selection; }
  &.truncate { @extend %truncate; }
  &.center { text-align: center; }
}
</style>
