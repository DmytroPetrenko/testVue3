<template>
	<div v-if="content" class="container">
		<form encType="multipart/form-data" @submit.prevent="upload">
			<input ref="formInput" type="file" name="image" @change="selectFile" />
			<input type="submit" value="Upload!" />
		</form>
	</div>

	<div v-else class="container">
		<header class="jumbotron">
			<h3>{{ content }}</h3>
		</header>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import UserService from "../services/user.service"
import ImageService from "../services/image.service"

export default defineComponent({
	setup() {
		onMounted(() => {
			UserService.getAdminBoard().then(
				(response) => {
					content.value = response.data
				},
				(error) => {
					content.value =
						(error.response &&
							error.response.data &&
							error.response.data.message) ||
						error.message ||
						error.toString()
				}
			)
		})
		const content = ref(false)
		const formInput = ref(null)
		let file: File
		const upload = () => {
			const formData = new FormData()
			formData.append('file', file)
			ImageService.upload(formData)
		}
		const selectFile = (e: Event) => {
			const target = e.target as HTMLInputElement
			file = target.files![0]
		}
		return { content, formInput, upload, selectFile }
	},
})
</script>
