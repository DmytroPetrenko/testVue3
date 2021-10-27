<template>
	<div v-if="currentUser" class="container">
		<header class="jumbotron">
			<h3>
				<strong>{{ userForShow.username }}</strong> Profile
			</h3>
			<div v-if="currentUser.img.name">
				<img :src="`http://localhost:8080/${currentUser.img.name}`" />
			</div>
		</header>
		<div v-for="(value, name, index) in userForShow" :key="name">
			<ul v-if="isStringType(value) && value.length">
				<li>{{ name }}:</li>
				<li v-if="index !== activeInputIndex">
					{{ value }}
					<font-awesome-icon
						icon="pencil-alt"
						@click="showPropInput({ index, value })"
					/>
				</li>
				<li v-show="index === activeInputIndex">
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
			<ul v-if="value === null || undefined || !value.length">
				<li>{{ name }}:</li>
				<li v-if="index !== activeInputIndex">
					<span class="helper-info" @click="showPropInput({ index, value })">
						Input some data here
					</span>
					<font-awesome-icon
						icon="pencil-alt"
						@click="showPropInput({ index, value })"
					/>
				</li>
				<li v-show="index === activeInputIndex">
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
			<ul v-if="isArr(value)">
				<li>
					{{ name }}:
					<span v-for="str in value" :key="str">{{ str }}</span>
				</li>
			</ul>
		</div>
		<button @click="saveUserDataChanges">Save</button>
	</div>
</template>

<script lang="ts">
import { computed, defineComponent, onMounted, ref, onBeforeUpdate } from "vue"
import { useRouter } from "vue-router"
import { useLoggedInUserStore } from "@/store/loggedInUser"

export default defineComponent({
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

		return {
			currentUser,
			userForShow,
			activeInputIndex,
			input,
			inputElements,
			isArr,
			isStringType,
			showPropInput,
			blurEventHandler,
			saveUserDataChanges,
		}
	},
})
</script>

<style lang="scss" scoped>
.helper-info {
	color: grey;
	opacity: 0.6;
}
</style>
