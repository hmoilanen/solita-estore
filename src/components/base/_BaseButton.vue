<template>
  <button
    v-on="listeners"
		@click="buttonClicked"
    class="base-button"
    :class="classing"
    :style="styling"
  >
    <slot>{{ $options.name }}</slot>
  </button>
</template>

<script>
export default {
  name: 'BaseButton',

  props: {
		size: {
			type: String
		},
    disabled: Boolean,
    center: Boolean,
    stretch: Boolean,
    rounded: Boolean,
    highlight: Boolean,
    empty: Boolean,
    pseudo: Boolean
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    classing() {
      return {
        disabled: this.disabled,
        center: this.center,
        stretch: this.stretch,
        rounded: this.rounded,
        highlight: this.highlight,
        empty: this.empty,
        pseudo: this.pseudo
      }
		},
		
		styling() {
			let size

			switch (this.size) {
				case 's':
					size = '0.7rem'
					break
				case 'm':
					size = '0.95rem'
					break
				case 'l':
					size = '1.1rem'
					break
				default:
					size = this.size
			}

			return {
				fontSize: this.size ? size : '0.8rem'
			}
		}
	},
	
	methods: {
		buttonClicked() {
			this.$emit('clicked')
		}
	}
};
</script>

<style lang="scss" scoped>
$base-button--color--white: $app-color--white;
$base-button--color--black: $app-color--black;
$base-button--color--main: $app-color--main;
$base-button--color--main-l1: $app-color--main-l1;
$base-button--color--main-l2: $app-color--main-l2;
$base-button--color--hl: $app-color--hl;
$base-button--color--hl2: $app-color--hl2;

$base-button--height: 2.4em !default;
$base-button--side-padding: 1.4em !default;

.base-button {
	position: relative; // For indication of :focus
	display: block;
  padding: 0 $base-button--side-padding;
	height: $base-button--height;
	@extend %app-style--input;
	background: $base-button--color--main;
	color: $base-button--color--white;
	line-height: 1.4em;
  //font-size, see: this.styling
  font-weight: 700;
  @extend %clickable;
  outline: 0;
  &:focus {
    &::before {
      $focused--border-width: -0.2em;
      content: '';
      position: absolute;
      top: $focused--border-width;
      left: $focused--border-width;
      right: $focused--border-width;
      bottom: $focused--border-width;
      border: calc(#{$focused--border-width} * -2) solid $base-button--color--main-l2;
			border-radius: $app-vars--border-radius;
    }
  }
	&:hover { background: $base-button--color--main-l1; }
  &.disabled {
    @extend %app-style--input-disabled;
    &:focus {
      &::before { border-color: transparent; }
    }
  }
  &.rounded {
    border-radius: calc(#{$base-button--height} / 2) !important;
    padding: 0 1.8em;
  }
  &.center { margin: 0 auto; }
  &.stretch {
		width: 100%;
		height: calc(#{$base-button--height} * 1.2);
  }
	&.highlight {
		background: $base-button--color--hl;
		color: $base-button--color--black;
		&:hover {
			background: $base-button--color--hl2;
			color: $base-button--color--white;
		}
	}
	&.empty {
		$border-thickness: 2px;
		// Compensate added border to keep button sizes coherent
		padding: 0 calc(#{$base-button--side-padding} - #{$border-thickness});
		height: $base-button--height;
		border: $border-thickness solid $base-button--color--main;
		background: $base-button--color--white;
		color: $base-button--color--main;
		&:hover {
			opacity: 1 !important;
			background-color: $base-button--color--main;
			color: $base-button--color--white;
		}
		&.highlight {
			border-color: $base-button--color--hl;
			background: $base-button--color--white;
			color: $base-button--color--hl;
			&:hover {
				background: $base-button--color--hl;
				color: $base-button--color--black;
			}
		}
	}
	&.pseudo {
		border: 1px solid transparent;
		background: transparent;
		color: $base-button--color--main;
		&:hover { background: $base-button--color--main-l2; }
	}
}
</style>
