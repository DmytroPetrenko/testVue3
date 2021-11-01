<template>
	<div id="modal">
		<div class="container" @click.self="closeModal">
			<ul class="image-list">
				<li v-for="ava in avatars" :key="ava.name" class="image-element">
					<img
						:src="`http://localhost:8080/${ava.name}`"
						class="image"
						@click="changeAvatar(ava)"
					/>
				</li>
			</ul>
		</div>
	</div>
</template>
<script lang="ts">
import { defineComponent } from "vue"
import { useImagesStore } from "@/store/images"
import { useLoggedInUserStore } from "@/store/loggedInUser"

export default defineComponent({
	props: {},
	emits: ["closeModal"],
	setup(props, context) {
		const imagesStore = useImagesStore()
		const loggedInUserStore = useLoggedInUserStore()
		imagesStore.getAllImagesNames()
		const avatars = imagesStore.avatarImagesNames

		const closeModal = () => {
			context.emit("closeModal")
		}

		const changeAvatar = (ava: any) => {
			loggedInUserStore.changeUserAvatar(ava)
		}

		return { avatars, closeModal, changeAvatar }
	},
})
</script>

<style lang="scss" scoped>
#modal {
	position: absolute;
	top: 0;
	left: 0;
	background: rgba(0, 0, 0, 0.6);
	width: 100%;
	height: 100%;
	.container {
		width: 100%;
		height: 100vh;
		margin: 0;
		.image-list {
			position: absolute;
			padding: 20px;
			left: 50%;
			top: 50%;
			-webkit-transform: translateX(-50%) translateY(-50%);
			transform: translateX(-50%) translateY(-50%);
			width: 400px;
			height: 400px;
			max-width: 100%;
			max-height: 100%;
			background: rgba(255, 255, 255, 1);
			display: flex;
			flex-wrap: wrap;

			.image-element {
				list-style-type: none;
				padding: 10px;
				.image {
					max-width: 100px;
					max-height: 100px;
					cursor: pointer;
				}
			}
		}
	}
}
</style>
