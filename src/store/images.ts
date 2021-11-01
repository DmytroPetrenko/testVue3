import { defineStore } from "pinia"
import ImageService from "../services/image.service"

let avatarImagesNames: any = null
const item = localStorage.getItem("avatarImagesNames")
if (typeof item === "string") avatarImagesNames = JSON.parse(item)

export const useImagesStore = defineStore({
	id: "image",
	state: () => {
		return { avatarImagesNames }
	},
	actions: {
		async getAllImagesNames() {
			try {
				const images = await ImageService.getAllImagesNames()
				this.avatarImagesNames = images
				return Promise.resolve(this.avatarImagesNames)
			} catch (error) {
				return Promise.reject(error)
			}
		},
	},
})
