import axios from "axios"

const API_URL = "http://localhost:8080/api/image/"

class ImageService {
	async upload(formData: FormData) {
		return await axios.post(API_URL + "upload", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
			},
		})
	}
}

export default new ImageService()
