<template>
  <!-- Note: viewBox is set to '0 0 50 50' to adapt to the size of svgs -->
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 50 50"
    :width="size"
    :height="size"
    class="base-icon"
    :class="classing"
    v-on="listeners"
    role="presentation"
    :aria-labelledby="icon"
  >
    <title
			v-if="tooltip"
			lang="en"
		>{{ tooltip }}</title>
    <g fill="currentColor">
      <component :is="dynamicIcon"></component>
    </g>
  </svg>
</template>

<script>
export default {
  name: 'BaseIcon',

  props: {
    icon: { // Note: for dynamic icons, use prop instead of slot
      type: String,
      default: 'ok'
		},
		size: {
			type: String,
			default: '50px'
		},
    tooltip: String,
		clickable: Boolean,
  },

  computed: {
    dynamicIcon() {
      if (this.$slots.default) { // By slot
        return 'Icon-' + this.$slots.default[0].text
      }
      return 'Icon-' + this.icon // By prop
    },

    listeners () {
      return { ...this.$listeners }
    },

    classing() {
      return {
				clickable: this.clickable
      }
    }
  },

  components: {
    IconCart: () => import('@/components/icons/IconCart'),
    IconCheckbox: () => import('@/components/icons/IconCheckbox'),
    IconCircle: () => import('@/components/icons/IconCircle'),
    IconDecrease: () => import('@/components/icons/IconDecrease'),
    IconIncrease: () => import('@/components/icons/IconIncrease'),
    IconOk: () => import('@/components/icons/IconOk'),
    IconSquare: () => import('@/components/icons/IconSquare'),
    IconTriangle: () => import('@/components/icons/IconTriangle'),
    IconWarning: () => import('@/components/icons/IconWarning'),
    IconX: () => import('@/components/icons/IconX'),
  }
}
</script>

<style lang="scss">
.base-icon {
	&.clickable {
		//@extend %clickable; ->>
		user-select: none;
		cursor: pointer;
		-webkit-tap-highlight-color: transparent;
	}
}
</style>
