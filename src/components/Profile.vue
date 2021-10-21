<template>
	<div v-if="currentUser" class="container">
		<header class="jumbotron">
			<h3>
				<strong>{{ currentUser.username }}</strong> Profile
			</h3>
		</header>
		<p>
			<strong>Token:</strong>
			{{ currentUser.accessToken.substring(0, 20) }} ...
			{{ currentUser.accessToken.substr(currentUser.accessToken.length - 20) }}
		</p>
		<p>
			<strong>Id:</strong>
			{{ currentUser.id }}
		</p>
		<p>
			<strong>Email:</strong>
			{{ currentUser.email }}
		</p>
		<strong>Authorities:</strong>
		<ul>
			<li v-for="role in currentUser.roles" :key="role">{{ role }}</li>
		</ul>
	</div>
</template>

<script lang="ts">
import { defineComponent, onMounted } from "vue"
import { useRouter } from "vue-router"
import { useLoggedInUserStore } from "@/store/loggedInUser"

export default defineComponent({
	setup() {
		onMounted(() => {
			if (!currentUser) router.push("/login")
		})
		const router = useRouter()
		const userStore = useLoggedInUserStore()
		const currentUser = userStore.user

		return { currentUser }
	},
})
</script>
