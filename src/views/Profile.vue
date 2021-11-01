<template>
	<div v-if="currentUser" class="container">
		<header class="jumbotron">
			<h3 class="header-text">
				<strong>{{ userForShow.username }}</strong> Profile
			</h3>
			<div v-if="currentUser.img.name" class="avatar-container">
				<img
					:src="`http://localhost:8080/${currentUser.img.name}`"
					class="avatar"
					@click="showModalImages"
				/>
				<image-switcher-modal
					v-if="isModalActive"
					@closeModal="showModalImages"
				/>
			</div>
		</header>
		<div
			v-for="(value, name, index) in userForShow"
			:key="name"
			class="user-info"
		>
			<ul v-if="isStringType(value) && value.length" class="user-list">
				<li class="user-list-item item-header">{{ name }}:</li>
				<li v-if="index !== activeInputIndex" class="user-list-item">
					{{ value }}
					<font-awesome-icon
						icon="pencil-alt"
						@click="showPropInput({ index, value })"
					/>
				</li>
				<li v-show="index === activeInputIndex" class="user-list-item">
					<input
						v-model="input"
						:ref="
							(el) => {
								inputElements.push(el)
							}
						"
						:id="`input${index}`"
						type="text"
						@blur="blurEventHandler(name)"
					/>
				</li>
			</ul>
			<ul v-if="value === null || undefined || !value.length" class="user-list">
				<li class="user-list-item item-header">{{ name }}:</li>
				<li v-if="index !== activeInputIndex" class="user-list-item">
					<span class="helper-info" @click="showPropInput({ index, value })">
						Input some data here
					</span>
					<font-awesome-icon
						icon="pencil-alt"
						@click="showPropInput({ index, value })"
					/>
				</li>
				<li v-show="index === activeInputIndex" class="user-list-item">
					<input
						v-model="input"
						:ref="
							(el) => {
								inputElements.push(el)
							}
						"
						:id="`input${index}`"
						type="text"
						@blur="blurEventHandler(name)"
					/>
				</li>
			</ul>
			<ul v-if="isArr(value)" class="user-list">
				<li class="user-list-item item-header">
					{{ name }}:
					<span v-for="str in value" :key="str">{{ str }}</span>
				</li>
			</ul>
		</div>
		<button @click="saveUserDataChanges" class="save-changes-btn">Save</button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, onBeforeUpdate } from "vue"
import { useRouter } from "vue-router"
import { useLoggedInUserStore } from "@/store/loggedInUser"
import ImageSwitcherModal from "@/components/ImageSwitcherModal.vue"

export default defineComponent({
	components: { ImageSwitcherModal },
	setup() {
		onMounted(() => {
			if (!currentUser) router.push("/login")
		})
		onBeforeUpdate(() => {
			inputElements.value = []
		})
		const router = useRouter()
		const userStore = useLoggedInUserStore()
		const currentUser = userStore.user
		const activeInputIndex = ref(999)
		const input = ref("")
		const inputElements = ref([])
		const isModalActive = ref(false)
		const userForShow = computed(() => {
			const output: any = { ...currentUser }
			delete output.id
			delete output.accessToken
			delete output.roles
			delete output.img
			return output
		})
		const isArr = (value: any) => {
			return value instanceof Array
		}
		const isStringType = (value: any) => {
			return typeof value === "string"
		}

		const showPropInput = (data: { index: number; value: string }) => {
			activeInputIndex.value = data.index
			input.value = data.value
			const inp = inputElements.value[data.index - 1] as HTMLInputElement
			setTimeout(() => inp.focus(), 0)
		}
		const blurEventHandler = (name: string) => {
			userStore.changeUserPropValue(name, input.value)
			activeInputIndex.value = 999
		}
		const saveUserDataChanges = () => {
			userStore.saveUserDataChanges()
		}
		const showModalImages = () => {
			isModalActive.value = !isModalActive.value
		}

		return {
			currentUser,
			userForShow,
			activeInputIndex,
			input,
			inputElements,
			isModalActive,
			isArr,
			isStringType,
			showPropInput,
			blurEventHandler,
			saveUserDataChanges,
			showModalImages,
		}
	},
})
</script>

<style lang="scss" scoped>
.container {
	.jumbotron {
		display: flex;
		flex-direction: row;
		flex-wrap: nowrap;
		justify-content: space-between;

		.header-text {
		}

		.avatar-container {
			.avatar {
				max-width: 250px;
				max-height: 250px;
			}
		}
	}
	.user-info {
		.user-list {
			padding: 0;

			.user-list-item {
				list-style-type: none;
				margin: 0;
				padding: 0;

				.helper-info {
					color: grey;
					opacity: 0.6;
				}
			}

			.item-header {
				text-transform: uppercase;
			}
		}
	}
	.save-changes-btn {
		border: none;
		border-radius: 5px;
		padding: 10px 40px;
		color: white;
		background-color: green;
		text-transform: uppercase;
	}
}
</style>
