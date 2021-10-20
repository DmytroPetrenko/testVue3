export default function authHeader() {
	let user = null
	const item = localStorage.getItem("user")
	if (typeof item === "string") user = JSON.parse(item)

	if (user && user.accessToken) {
		return { "x-access-token": user.accessToken }
	} else {
		return {}
	}
}
