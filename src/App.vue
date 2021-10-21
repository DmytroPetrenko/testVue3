<template>
	<div id="app">
		<nav class="navbar navbar-expand navbar-dark bg-dark">
			<a href="/" class="navbar-brand">bezKoder</a>
			<div class="navbar-nav mr-auto">
				<li class="nav-item">
					<router-link to="/home" class="nav-link">
						<font-awesome-icon icon="home" /> Home
					</router-link>
				</li>
				<li v-if="showAdminBoard" class="nav-item">
					<router-link to="/admin" class="nav-link">Admin Board</router-link>
				</li>
				<li v-if="showModeratorBoard" class="nav-item">
					<router-link to="/mod" class="nav-link">Moderator Board</router-link>
				</li>
				<li class="nav-item">
					<router-link v-if="currentUser" to="/user" class="nav-link"
						>User</router-link
					>
				</li>
			</div>

			<div v-if="!currentUser" class="navbar-nav ml-auto">
				<li class="nav-item">
					<router-link to="/register" class="nav-link">
						<font-awesome-icon icon="user-plus" /> Sign Up
					</router-link>
				</li>
				<li class="nav-item">
					<router-link to="/login" class="nav-link">
						<font-awesome-icon icon="sign-in-alt" /> Login
					</router-link>
				</li>
			</div>

			<div v-if="currentUser" class="navbar-nav ml-auto">
				<li class="nav-item">
					<router-link to="/profile" class="nav-link">
						<font-awesome-icon icon="user" />
						{{ currentUser.username }}
					</router-link>
				</li>
				<li class="nav-item">
					<a class="nav-link" @click.prevent="logOut">
						<font-awesome-icon icon="sign-out-alt" /> LogOut
					</a>
				</li>
			</div>
		</nav>

		<div class="container">
			<router-view />
		</div>
	</div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue"
import { useRouter } from "vue-router"
import { useLoggedInUserStore } from "@/store/loggedInUser"
export default defineComponent({
	setup() {
		const router = useRouter()
		const userStore = useLoggedInUserStore()
		const currentUser = computed(() => {
			return userStore.user
		})
		console.log(currentUser.value)
		const showAdminBoard = computed(() => {
			if (currentUser.value && currentUser.value["roles"]) {
				return currentUser.value["roles"].includes("ROLE_ADMIN")
			}

			return false
		})
		const showModeratorBoard = computed(() => {
			if (currentUser.value && currentUser.value["roles"]) {
				return currentUser.value["roles"].includes("ROLE_MODERATOR")
			}

			return false
		})
		const logOut = () => {
			userStore.logout()
			router.push("/login")
		}

		return { currentUser, showAdminBoard, showModeratorBoard, logOut }
	},
})
</script>
