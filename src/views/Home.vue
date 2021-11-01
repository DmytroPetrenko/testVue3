<template>
	<div class="container">
		<header class="jumbotron">
			<h3>{{ content }}</h3>
		</header>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref } from "vue"
import UserService from "../services/user.service"

export default defineComponent({
	setup() {
		onMounted(() => {
			UserService.getPublicContent().then(
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
		const content = ref("")

		return { content }
	},
})
</script>
