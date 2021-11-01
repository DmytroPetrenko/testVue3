import axios from "axios"

const API_URL = "http://localhost:8080/api/authUser/"

class AuthUserService {
	saveUserDataChanges(user: {
		id: number
		username: string
		email: string
		name: string
		surname: string
		university: string
		img: any
	}) {
		return axios
			.post(API_URL + "edit", {
				propsForChange: {
					username: user.username,
					email: user.email,
					name: user.name,
					surname: user.surname,
					university: user.university,
					imgId: user.img.id
				},
				id: user.id,
			})
			.then((response) => {
				const lsUser = JSON.parse(localStorage.getItem("user") || "{}")
				const accessToken = lsUser.accessToken
				const user = { ...response.data, accessToken }
				if (user.accessToken) {
					localStorage.setItem("user", JSON.stringify(user))
				}

				return response.data
			})
	}
}

export default new AuthUserService()
