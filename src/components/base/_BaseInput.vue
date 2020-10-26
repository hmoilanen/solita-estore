<template>
  <div
    class="base-input"
    :class="classing"
  >
    <Base-label
			v-if="label"
			:required="required"
			:optional="optional"
		>{{ this.label }}</Base-label>

    <div class="input-container">
      <input
        ref="input"
        :value="value"
        :type="type"
        :style="styling"
        v-bind="$attrs"
        v-on="listeners"
        @keydown.enter.prevent
      />
    </div>

    <Base-feedback v-if="feedback">{{ this.feedback }}</Base-feedback>
  </div>
</template>

<script>
export default {
  name: 'BaseInput',

  inheritAttrs: false,

  props: {
    type: {
      type: String,
      default: 'text',
      validator: prop => {
				const allowedTypes = ['text', 'password', 'email', 'number', 'search', 'tel', 'url']
        return allowedTypes.indexOf(prop) !== -1
      }
    },
    value: String,
    label: String,
    required: Boolean,
    optional: Boolean,
    disabled: Boolean,
    feedback: String,
    iconLeft: String,
    iconRight: String
  },

  methods: {
    focusInput() {
      this.$refs.input.focus()
    }
  },

  computed: {
    listeners() {
      return {
        ...this.$listeners,
        input: event => { // Override input from $listeners
          this.$emit('input', event.target.value)
        }
      }
    },

    classing() {
      return {
        disabled: this.disabled
      }
    },

    styling() {
      const inputHeight = 2.8 // = em
      const baseInputPadding = inputHeight * 0.25 // = em

      return {
				height: inputHeight + 'em',
				padding: `0 ${baseInputPadding}em`
			}
    }
  }
}
</script>

<style lang="scss" scoped>
//$input-color: $app-color--input;
//$input-color--border: $app-color--input-border;
//$input-color--bg: $app-color--theme;
//$input-color--bg-focus: $app-color--input-focus;
//$input-color--placeholder: $app-color--input-placeholder;
//$input-color--icons: $input-color;
//$input-color--feedback: $app-color--input-feedback;
//$input-font: $app-font--input;
//$input-font--placeholder: $app-font--placeholder;

.base-input {
  width: 100%;
  font-size: 0.8rem;
  &.disabled {
		//@extend %input--disabled;
		user-select: none;
		pointer-events: none !important;
		opacity: 0.2;
	}

	.input-container {
		font-size: inherit !important;
		position: relative;
	}
	input {
		transition: all 0.5s ease-in-out;
		outline: 0;

		//@extend %input--border; ->>>
		border-style: none;
  	//border-width: 1px;
		border-radius: 3px;
		//border-color: purple;
		//border-color: $input-color--border;

		width: 100%;
		//padding, see: this.styling.input
		background: rgb(240, 240, 240); 
		//background: $input-color--bg; 
		font-size: inherit;
		letter-spacing: 0.05em;
		//font-family: $input-font;
		//color: $input-color;
		//&:focus { background: $input-color--bg-focus; }
		&:focus { background: lightgreen; }
		&::placeholder { // Not supported in all browsers... Otherwise behaves like regular text content
			font-weight: 500;
			//font-family: $input-font--placeholder;
			color: rgb(200, 200, 200);
			//color: $input-color--placeholder;
		}
	}
}
</style>
