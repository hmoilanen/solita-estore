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
		size: [String, Number],
    disabled: Boolean,
    center: Boolean,
    stretch: Boolean,
    rounded: Boolean,
    highlight: Boolean,
    empty: Boolean,
    pseudo: Boolean,
    inverted: Boolean
  },

  computed: {
    listeners() {
      return { ...this.$listeners }
    },

    classing() {
      return {
        rounded: this.rounded,
        highlight: this.highlight,
        disabled: this.disabled,
        center: this.center,
        stretch: this.stretch,
        empty: this.empty,
        pseudo: this.pseudo,
        inverted: this.inverted
      }
		},
		
		styling() {
			return {
				fontSize: this.size ? `${this.size}rem` : false
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
$button-color: white;
$base-button--color-bg: lightgreen;
$base-button--color-highlight: green;
$base-button--color-focus: rgba(144, 238, 144, 0.6);
$base-button--height: 2.4em !default;
$base-button--side-padding: 1.4em !default;

.base-button {
	position: relative;
  display: flex;
  align-items: center;
  padding: 0 $base-button--side-padding;
  height: $base-button--height;
	border: none;
	//@extend %app-default--border-radius;
	border-radius: 3px;
	background: $base-button--color-bg;
	//background: $base-button--color-bg;
	color: $button-color;
  //line-height, see: this.styling
  //font-size, see: this.styling
  font-size: 0.8rem;
  font-weight: 700;
  //font-family: $button-font;
	line-height: 1.4em;
  //@extend %clickable; ->>
	cursor: pointer;
  user-select: none;
  outline: 0;
  -webkit-tap-highlight-color: transparent; // Ignore tap active state (non-standard across browsers)
  &:focus {
    &::before {
      $focused--border-width: -4px;
      content: '';
      position: absolute;
      top: $focused--border-width;
      left: $focused--border-width;
      right: $focused--border-width;
      bottom: $focused--border-width;
      border: 6px solid $base-button--color-focus;
			border-radius: 3px;
    }
  }
	&:hover {
		background: $base-button--color-highlight;
		color: $base-button--color-bg;
	}

  &.disabled {
    //@extend %disabled; ->>
		pointer-events: none !important;
    opacity: 0.2;
    outline: 0;
    &:focus {
      outline: 0;
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
    justify-content: center;
  }
	&.highlight {
		background: $base-button--color-highlight;
		&:hover {
			opacity: 1;
			color: $base-button--color-bg;
		}
	}
	&.empty {
		border: 1px solid $base-button--color-bg;
		background: $button-color;
		color: $base-button--color-bg;
		&:hover {
			opacity: 1 !important;
			background-color: $base-button--color-bg;
			color: $button-color;
		}
		&.highlight {
			border: 1px solid $base-button--color-highlight;
			background: $button-color;
			color: $base-button--color-highlight;
			&:hover {
				background: $base-button--color-highlight;
				color: $button-color;
			}
		}
	}
	&.pseudo {
		border: 1px solid transparent;
		background: transparent;
		color: $base-button--color-bg;
		&:hover { background: transparentize($base-button--color-bg, 0.85); }
	}
	&.inverted {
		border: 1px solid transparent;
		background: $button-color;
		color: $base-button--color-bg;
		&:hover { color: $base-button--color-highlight; }
	}
	&.loading {
		color: $base-button--color-bg;
		&.highlight { color: $base-button--color-highlight; }
		&.empty { color: $button-color; }
		&.pseudo { color: transparent; }
	}

	.base-icon {
    width: calc(#{$base-button--height} * 0.7);
    height: calc(#{$base-button--height} * 0.7);
    margin-right: 0.6rem;
  }
  .base-loader {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    left: 0.5em;
    right: 0.5em;
  }
}
</style>
