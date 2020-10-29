
<template>
  <component
    :is="tag"
    class="base-text"
    :class="classing"
    :style="styling"
    v-on="listeners"
  >
    <slot>{{ this.textContent }}</slot>
  </component>
</template>

<script>
export default {
  name: 'BaseText',

  props: {
    tag: {
      type: String,
      default: 'p'
		},
		size: String,
		bold: Boolean,
		center: Boolean,
    lorem: [Boolean, Number],
    clickable: Boolean
  },

  data() {
    return {
      loremIpsum: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc maximus risus sit amet aliquet laoreet. Sed accumsan lectus ac est commodo, a molestie urna placerat. Phasellus scelerisque tempor sagittis. Fusce ipsum turpis, blandit sit amet eleifend vitae, sagittis ac neque. Morbi finibus consectetur pellentesque. Etiam tortor mauris, faucibus quis vestibulum ut, cursus ac ante. Duis non vehicula mi. Etiam nec erat viverra, luctus tortor sit amet, eleifend est. Curabitur vel neque facilisis, mollis erat ac, viverra purus. Duis imperdiet molestie purus sed tempor. Mauris in pharetra erat. Pellentesque nisi felis, blandit id viverra id, interdum sit amet nunc. Donec quis eleifend dui. Mauris pellentesque quam nibh, sed mollis ipsum pulvinar sed. Praesent mattis egestas odio ut lobortis. Suspendisse pretium quam ac tellus laoreet volutpat. Fusce sollicitudin at tellus eget ultricies. Vestibulum blandit elit ex, a luctus massa rutrum quis. Proin eget ex ac sapien finibus sed urna ultricies.', // length = 1000
    }
  },

  computed: {
    textContent() {
      if (this.lorem && typeof this.lorem === 'boolean') {
        return this.loremIpsum
      } else if (this.lorem && typeof this.lorem === 'number') { // If number
        const length = this.lorem > this.loremIpsum.length - 1
          ? this.loremIpsum.length
          : this.lorem

        return this.loremIpsum.substring(0, length)
      } else {
        return this.$options.name
      }
    },

    classing() {
      return {
				bold: this.bold,
        center: this.center,
        clickable: this.clickable
      }
		},

		styling() {
			let size

			switch (this.size) {
				case 's':
					size = '0.75rem'
					break
				case 'm':
					size = '1.05rem'
					break
				case 'l':
					size = '1.2rem'
					break
				default:
					size = this.size
			}

      return {
				fontSize: this.size ? size : '0.9rem'
      }
    },

    listeners() {
      return { ...this.$listeners }
    }
  }
}
</script>

<style lang="scss" scoped>
$base-text--color--text: $app-color--black;
$base-text--color--selection: $app-color--main-l2;

.base-text {
	font-family: $app-font;
	line-height: 1.4em;
	color: $base-text--color--text;
	&::selection { background: $base-text--color--selection; }
	&.bold { font-family: $app-font--bold; }
	&.center { text-align: center; }
	&.clickable { @extend %clickable; }
}
</style>
