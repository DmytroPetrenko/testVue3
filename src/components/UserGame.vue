<template>
	<div class="game">
		<p class="game-text">{{ game }}</p>
		<div class="teams">
			{{ game }}
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue"

export default defineComponent({
	props: {
		game: {
			type: String,
			default: "Game",
		},
	},
})
</script>
<style lang="scss" scoped>
.game {
	height: auto;
	display: inline-block;

	.game-text {
		padding: 0;
		margin: 0;
		height: auto;
	}

	.teams {
		display: none;
		background: cornsilk;
		border-radius: 0 0 5px 5px;
		padding: 5px;
	}

	&:hover {
		display: inline-block;

		.teams {
			display: inline-block;
			position: absolute;
		}
	}
}
</style>
