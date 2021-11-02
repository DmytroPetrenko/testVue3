<template>
	<div id="modal" :style="{ top: top + 'px' }">
		<slot />
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"

export default defineComponent({
	setup() {
		const top = computed(() => {
			return window.scrollY
		})

		return { top }
	},
})
</script>

<style lang="scss" scoped>
#modal {
	position: absolute;
	background: rgba(0, 0, 0, 0.6);
	width: 100%;
	left: 0;
	height: 100vh;
}
</style>
